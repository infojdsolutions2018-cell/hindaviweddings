import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAdminCredentials } from "@/backend/database";

export const dynamic = "force-dynamic";

// Secret salt for signing session tokens
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "hindavi-royal-wedding-admin-session-salt-2026";

function createSessionToken(identifier: string): string {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`${identifier}:${timestamp}`)
    .digest("hex");
  return Buffer.from(JSON.stringify({ identifier, timestamp, signature })).toString("base64");
}

function verifySessionToken(token: string): { valid: boolean; identifier?: string; mobile?: string } {
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);
    const identifier = parsed.identifier || parsed.mobile;
    const { timestamp, signature } = parsed;
    
    // Check signature
    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`${identifier}:${timestamp}`)
      .digest("hex");

    if (signature !== expectedSig) {
      return { valid: false };
    }

    // 7 days token expiration
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) {
      return { valid: false };
    }

    return { valid: true, identifier, mobile: identifier };
  } catch {
    return { valid: false };
  }
}

// POST: Admin Login (Supports Mobile Number OR Email Address)
export async function POST(req: NextRequest) {
  try {
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
    console.error("Admin login API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An error occurred during authentication." },
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
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// DELETE: Admin Logout
export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out successfully" });
  res.cookies.delete("hw_admin_session");
  return res;
}

