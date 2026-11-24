import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAdminCredentials } from "@/backend/database";
import { createSessionToken, verifySessionToken } from "@/backend/auth";
import { checkRateLimit, getClientIp } from "@/backend/rateLimit";

export const dynamic = "force-dynamic";

// POST: Admin Login (Supports Mobile Number OR Email Address)
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: Max 5 login attempts per minute per IP to prevent brute-force
    const rateLimit = checkRateLimit(`login-ip-${ip}`, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please wait 1 minute before trying again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const identifier = body.identifier || body.mobile || body.email;
    const password = body.password;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Please enter your mobile number or email address, and password." },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).trim();

    // SHA-256 hash of the submitted password
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    // Authenticate strictly against Neon PostgreSQL wedding_admin_users (by mobile OR email)
    const adminUser = await verifyAdminCredentials(cleanIdentifier, passwordHash);

    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile/email or password." },
        { status: 401 }
      );
    }

    // Generate secure authenticated token
    const token = createSessionToken(cleanIdentifier);

    const res = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: {
        identifier: cleanIdentifier,
        mobile: adminUser.mobile_number,
        email: adminUser.email,
        role: adminUser.role || "admin",
      },
    });

    // Set HTTP-only secure cookie
    res.cookies.set("hw_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (error: any) {
    if (error?.message?.includes("ADMIN_SESSION_SECRET")) {
      console.error("Admin authentication configuration error: ADMIN_SESSION_SECRET is missing or empty.");
      return NextResponse.json(
        { success: false, message: "Server configuration error. Contact the administrator." },
        { status: 500 }
      );
    }
    console.error("Admin login API error:", error?.message || "Internal error");
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication." },
      { status: 500 }
    );
  }
}

// GET: Check Auth Session Status
export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("hw_admin_session")?.value;
    if (!cookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const verification = verifySessionToken(cookie);
    if (!verification.valid || !verification.mobile) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      mobile: verification.mobile,
      role: "admin",
    });
  } catch (error: any) {
    if (error?.message?.includes("ADMIN_SESSION_SECRET")) {
      console.error("Admin session verification error: ADMIN_SESSION_SECRET is missing or empty.");
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// DELETE: Admin Logout
export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out successfully" });
  res.cookies.delete("hw_admin_session");
  return res;
}

