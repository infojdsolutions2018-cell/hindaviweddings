import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { WeddingBackend } from "@backend/index";

export const dynamic = "force-dynamic";

// POST: Upload single or multiple images, videos, and reels to ImageKit & Neon DB
export async function POST(req: Request) {
  const reqStartTime = Date.now();
  console.log(`[API /api/gallery/upload] POST request started at ${new Date().toISOString()}`);

  // Environment checks (log booleans only, NEVER credentials)
  console.log(`[API /api/gallery/upload] Environment Check:`, {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasImageKitPublic: !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    hasImageKitPrivate: !!process.env.IMAGEKIT_PRIVATE_KEY,
    hasImageKitEndpoint: !!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    nodeEnv: process.env.NODE_ENV,
  });

  try {
    const formData = await req.formData();
    // Support both single "file" and multiple "files" inputs
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    
    const allFiles: File[] = files.length > 0 ? files : singleFile ? [singleFile] : [];

    const defaultTitle = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "Other";
    const forcedMediaType = formData.get("type") as string | null;

    console.log(`[UPLOAD] Request payload parsed: ${allFiles.length} file(s) | Category: ${category} | ForcedType: ${forcedMediaType || "auto"} | DefaultTitle: "${defaultTitle}"`);

    if (allFiles.length === 0) {
      console.warn(`[UPLOAD] Rejected: No files provided in request.`);
      return NextResponse.json(
        { success: false, error: "No files provided for upload" },
        { status: 400 }
      );
    }

    const uploadedRecords = [];
    const errors: string[] = [];

    // Process files
    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];
      const fileStartTime = Date.now();
      console.log(`[UPLOAD] Processing file ${i + 1}/${allFiles.length}: "${file.name}" | Size: ${(file.size / 1024).toFixed(2)} KB | MIME: ${file.type}`);

      try {
        const isVideo =
          forcedMediaType === "reel" ||
          file.type.startsWith("video/") ||
          /\.(mp4|webm|mov)$/i.test(file.name);

        const mediaType = isVideo ? "reel" : "image";
        const aspect = isVideo ? "tall" : "square";

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileTitle = defaultTitle ? defaultTitle.trim() : "";

        // 1. Upload to ImageKit CDN
        console.log(`[IMAGEKIT] Starting upload for "${file.name}" as [${mediaType}]...`);
        const uploadResult = await WeddingBackend.gallery.upload({
          file: buffer,
          fileName: file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
          folder: isVideo ? "/wedding-reels" : "/wedding-photos",
          tags: ["hindavi", category.toLowerCase(), mediaType],
        });

        if (!uploadResult || !uploadResult.url) {
          throw new Error("ImageKit returned an empty file URL");
        }
        console.log(`[IMAGEKIT] Uploaded "${file.name}" -> URL: ${uploadResult.url} (FileID: ${uploadResult.fileId})`);

        // 2. Save into Database (Neon PostgreSQL)
        console.log(`[NEON] Saving record into database...`);
        const savedRecord = await WeddingBackend.gallery.save({
          type: mediaType,
          src: uploadResult.url,
          title: fileTitle,
          aspect: aspect,
          category: category as any,
          fileId: uploadResult.fileId,
        });
        console.log(`[NEON] Successfully persisted record ID: ${savedRecord?.id} (${Date.now() - fileStartTime}ms total for file)`);

        uploadedRecords.push(savedRecord);
      } catch (err: any) {
        console.error(`[ERROR] Failed to process "${file.name}":`, err.message || err);
        errors.push(`${file.name}: ${err.message || "Upload failed"}`);
      }
    }

    if (uploadedRecords.length === 0 && errors.length > 0) {
      console.error(`[API /api/gallery/upload] All file uploads failed: ${errors.join(", ")}`);
      return NextResponse.json(
        { success: false, error: `Upload failed: ${errors.join(", ")}` },
        { status: 500 }
      );
    }

    // Bust Next.js App Router cache across public and admin pages
    try {
      revalidatePath("/gallery");
      revalidatePath("/admin");
      revalidatePath("/");
      console.log(`[API /api/gallery/upload] Revalidated paths: /gallery, /admin, /`);
    } catch (revalidateErr) {
      console.warn("[API /api/gallery/upload] Revalidation warning:", revalidateErr);
    }

    const totalDuration = Date.now() - reqStartTime;
    console.log(`[API /api/gallery/upload] Completed successfully in ${totalDuration}ms | Total saved: ${uploadedRecords.length} | Errors: ${errors.length}`);

    return NextResponse.json({
      success: true,
      data: uploadedRecords,
      totalUploaded: uploadedRecords.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error(`[API /api/gallery/upload] Multi-upload error after ${Date.now() - reqStartTime}ms:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process files" },
      { status: 500 }
    );
  }
}
