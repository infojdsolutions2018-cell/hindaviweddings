import { NextResponse } from "next/server";
import { WeddingBackend } from "@backend/index";

export const dynamic = "force-dynamic";

export interface MediaItem {
  id: string;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";
  fileId?: string;
}

// GET: Returns ONLY ImageKit uploaded images and reels (no local hardcoded files)
export async function GET() {
  const reqStartTime = Date.now();
  console.log(`[API /api/gallery] GET request started at ${new Date().toISOString()}`);

  try {
    const customUploaded = await WeddingBackend.gallery.list();

    const mediaList: MediaItem[] = Array.isArray(customUploaded)
      ? customUploaded.map((c) => ({
          id: String(c.id),
          type: c.type,
          src: c.src,
          title: c.title,
          aspect: c.aspect || (c.type === "reel" ? "tall" : "square"),
          category: c.category || "Other",
          fileId: c.fileId,
        }))
      : [];

    console.log(`[API /api/gallery] GET completed (${Date.now() - reqStartTime}ms) | Total items: ${mediaList.length}`);

    return NextResponse.json({
      success: true,
      data: mediaList,
      totalCount: mediaList.length,
    });
  } catch (error: any) {
    console.error(`[API /api/gallery] GET failed (${Date.now() - reqStartTime}ms):`, error.message || error);
    return NextResponse.json(
      { success: false, error: "Failed to read gallery media from ImageKit database" },
      { status: 500 }
    );
  }
}
