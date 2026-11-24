import crypto from "crypto";
import { NextRequest } from "next/server";

export function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured or empty.");
  }
  return secret;
}

export function createSessionToken(identifier: string): string {
  const secret = getSessionSecret();
  const timestamp = Date.now();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${identifier}:${timestamp}`)
    .digest("hex");
  return Buffer.from(JSON.stringify({ identifier, timestamp, signature })).toString("base64");
}

export function verifySessionToken(token: string): { valid: boolean; identifier?: string; mobile?: string } {
  try {
    const secret = getSessionSecret();
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);
    const identifier = parsed.identifier || parsed.mobile;
    const { timestamp, signature } = parsed;

    if (!identifier || !timestamp || !signature) {
      return { valid: false };
    }

    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${identifier}:${timestamp}`)
      .digest("hex");

    // Timing-safe comparison to prevent timing attacks
    if (signature.length !== expectedSig.length) {
      return { valid: false };
    }
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSig, "hex");
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
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

export function verifyAdminRequest(req: NextRequest | Request): boolean {
  try {
    let cookieValue: string | undefined;

    if ("cookies" in req && typeof (req as NextRequest).cookies?.get === "function") {
      cookieValue = (req as NextRequest).cookies.get("hw_admin_session")?.value;
    } else {
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/hw_admin_session=([^;]+)/);
      if (match) {
        cookieValue = decodeURIComponent(match[1]);
      }
    }

    if (!cookieValue) return false;
    const { valid } = verifySessionToken(cookieValue);
    return valid;
  } catch {
    return false;
  }
}
