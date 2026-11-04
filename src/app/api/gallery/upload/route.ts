import { NextResponse } from "next/server";
import { WeddingBackend } from "@backend/index";

export const dynamic = "force-dynamic";

// POST: Upload Image or Video/Reel to ImageKit
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Wedding Gallery Moment";
    const category = (formData.get("category") as string) || "Marriage";
    const mediaType = (formData.get("type") as string) || "image";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload" },
        { status: 400 }
      );
    }

    // Convert file to Buffer for ImageKit
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine aspect ratio default
    const isVideo = mediaType === "reel" || file.type.startsWith("video/");
    const aspect = isVideo ? "tall" : "square";

    // Upload to ImageKit
    const uploadResult = await WeddingBackend.gallery.upload({
      file: buffer,
      fileName: file.name.replace(/[^a-zA-Z0-9.-]/g, "_"),
      folder: isVideo ? "/wedding-reels" : "/wedding-photos",
      tags: ["hindavi", category.toLowerCase(), isVideo ? "reel" : "photo"],
    });

    // Save record into database
    const savedRecord = await WeddingBackend.gallery.save({
      type: isVideo ? "reel" : "image",
      src: uploadResult.url,
      title: title,
      aspect: aspect,
      category: category as any,
      fileId: uploadResult.fileId,
    });

    return NextResponse.json({
      success: true,
      data: savedRecord,
      imagekit: {
        fileId: uploadResult.fileId,
        url: uploadResult.url,
        thumbnailUrl: uploadResult.thumbnailUrl,
      },
    });
  } catch (error: any) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file to ImageKit" },
      { status: 500 }
    );
  }
}

