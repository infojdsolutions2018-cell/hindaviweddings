import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { WeddingBackend } from "@backend/index";
import { verifyAdminRequest } from "@/backend/auth";

export const dynamic = "force-dynamic";

// PATCH: Update category or title/description of a media item (Strictly Admin-Protected)
export async function PATCH(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, category } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Media item ID is required" },
        { status: 400 }
      );
    }

    const updated = await WeddingBackend.gallery.update(id, {
      title: title !== undefined ? String(title).trim().slice(0, 255) : undefined,
      category: category || undefined,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    try {
      revalidatePath("/gallery");
      revalidatePath("/admin");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update media item" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an uploaded media item (Strictly Admin-Protected)
export async function DELETE(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const fileId = searchParams.get("fileId");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Media item ID is required" },
        { status: 400 }
      );
    }

    const result = await WeddingBackend.gallery.delete(id, fileId || undefined);

    try {
      revalidatePath("/gallery");
      revalidatePath("/admin");
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate error:", e);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete media item" },
      { status: 500 }
    );
  }
}
