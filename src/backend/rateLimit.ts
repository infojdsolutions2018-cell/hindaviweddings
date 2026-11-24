// Lightweight in-memory rate limiter for serverless runtimes
// Keyed by IP or identifier with bounded size to prevent memory bloat in warm lambdas
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const MAX_ENTRIES = 5000;
const rateLimitStore = new Map<string, RateLimitRecord>();

function cleanupExpired(now: number) {
  rateLimitStore.forEach((record, key) => {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();

  // Bounded cleanup to avoid leaks if map grows large
  if (rateLimitStore.size > MAX_ENTRIES) {
    cleanupExpired(now);
    // If still over capacity after expiry cleanup, clear oldest
    if (rateLimitStore.size > MAX_ENTRIES) {
      rateLimitStore.clear();
    }
  }

  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, newRecord);
    return { allowed: true, remaining: limit - 1, resetTime: newRecord.resetTime };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

