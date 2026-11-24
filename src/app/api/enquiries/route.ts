import { NextResponse } from "next/server";
import { WeddingBackend } from "@backend/index";
import { verifyAdminRequest } from "@/backend/auth";
import { checkRateLimit, getClientIp } from "@/backend/rateLimit";

export const dynamic = "force-dynamic";

// GET: Fetch all enquiries for admin (Strictly Admin-Protected)
export async function GET(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

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

// POST: Save new wedding proposal enquiry (Public with Rate-Limiting & Input Validation)
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    // Rate limit public submissions: max 6 submissions per 10 minutes per IP
    const rate = checkRateLimit(`enquiry-submit-${ip}`, 6, 600000);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many enquiries submitted from this network. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Strict input type & length sanitization
    const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 100) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 150) : "";

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Full Name, Phone number, and valid Email are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const saved = await WeddingBackend.enquiries.create({
      fullName,
      phone,
      email,
      eventDate: typeof body.eventDate === "string" ? body.eventDate.slice(0, 100) : undefined,
      tentativeMonthYear: typeof body.tentativeMonthYear === "string" ? body.tentativeMonthYear.slice(0, 100) : undefined,
      weddingDates: typeof body.weddingDates === "string" ? body.weddingDates.slice(0, 100) : undefined,
      guestCount: typeof body.guestCount === "string" ? body.guestCount.slice(0, 50) : undefined,
      estimatedBudget: typeof body.estimatedBudget === "string" ? body.estimatedBudget.slice(0, 50) : undefined,
      location: typeof body.location === "string" ? body.location.slice(0, 150) : undefined,
      message: typeof body.message === "string" ? body.message.slice(0, 2000) : undefined,
    });

    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save enquiry" },
      { status: 500 }
    );
  }
}

// PATCH: Update enquiry status and optional admin remark (Strictly Admin-Protected)
export async function PATCH(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

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

// DELETE: Delete an enquiry (Strictly Admin-Protected)
export async function DELETE(req: Request) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

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

