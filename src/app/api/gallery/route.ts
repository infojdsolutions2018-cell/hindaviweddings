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

    return NextResponse.json({
      success: true,
      data: mediaList,
      totalCount: mediaList.length,
    });
  } catch (error: any) {
    console.error("Failed to load ImageKit gallery media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read gallery media from ImageKit database" },
      { status: 500 }
    );
  }
}
