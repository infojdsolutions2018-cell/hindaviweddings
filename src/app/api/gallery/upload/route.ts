import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { WeddingBackend } from "@backend/index";

export const dynamic = "force-dynamic";

// POST: Upload single or multiple images, videos, and reels to ImageKit & Neon DB
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Support both single "file" and multiple "files" inputs
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    
    const allFiles: File[] = files.length > 0 ? files : singleFile ? [singleFile] : [];

    const defaultTitle = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "Other";
    const forcedMediaType = formData.get("type") as string | null;

    if (allFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files provided for upload" },
        { status: 400 }
      );
    }

    const uploadedRecords = [];
    const errors: string[] = [];

    // Process files
    for (const file of allFiles) {
      try {
        const isVideo =
          forcedMediaType === "reel" ||
          file.type.startsWith("video/") ||
          /\.(mp4|webm|mov)$/i.test(file.name);

        const mediaType = isVideo ? "reel" : "image";
        const aspect = isVideo ? "tall" : "square";

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Only use caption if explicitly provided by admin; otherwise keep it empty string (no filename like 'WhatsApp Image...')
        const fileTitle = defaultTitle ? defaultTitle.trim() : "";

        // 1. Upload to ImageKit CDN
        const uploadResult = await WeddingBackend.gallery.upload({
          file: buffer,
          fileName: file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
          folder: isVideo ? "/wedding-reels" : "/wedding-photos",
          tags: ["hindavi", category.toLowerCase(), mediaType],
        });

        if (!uploadResult || !uploadResult.url) {
          throw new Error("ImageKit returned an empty file URL");
        }

        // 2. Save into Database (guaranteed to throw if Neon fails in production)
        const savedRecord = await WeddingBackend.gallery.save({
          type: mediaType,
          src: uploadResult.url,
          title: fileTitle,
          aspect: aspect,
          category: category as any,
          fileId: uploadResult.fileId,
        });

        uploadedRecords.push(savedRecord);
      } catch (err: any) {
        console.error(`Failed to upload ${file.name}:`, err);
        errors.push(`${file.name}: ${err.message || "Upload failed"}`);
      }
    }

    if (uploadedRecords.length === 0 && errors.length > 0) {
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
    } catch (revalidateErr) {
      console.warn("Revalidation warning:", revalidateErr);
    }

    return NextResponse.json({
      success: true,
      data: uploadedRecords,
      totalUploaded: uploadedRecords.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Multi-upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process files" },
      { status: 500 }
    );
  }
}
