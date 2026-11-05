import { NextResponse } from "next/server";
import { WeddingBackend } from "@backend/index";

export const dynamic = "force-dynamic";

// GET: Fetch all enquiries for admin
export async function GET() {
  try {
    const list = await WeddingBackend.enquiries.list();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// POST: Save new wedding proposal enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.phone || !body.email) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    const saved = await WeddingBackend.enquiries.create({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      eventDate: body.eventDate,
      eventType: body.eventType,
      tentativeMonthYear: body.tentativeMonthYear,
      weddingDates: body.weddingDates,
      guestCount: body.guestCount,
      estimatedBudget: body.estimatedBudget,
      location: body.location,
      message: body.message,
    });

    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save enquiry" },
      { status: 500 }
    );
  }
}

// PATCH: Update enquiry status and optional admin remark
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, remark } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await WeddingBackend.enquiries.updateStatus(Number(id), status, remark);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an enquiry
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID is required" },
        { status: 400 }
      );
    }

    const deleted = await WeddingBackend.enquiries.delete(Number(id));
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

