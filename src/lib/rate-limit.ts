/**
 * Best-effort fixed-window rate limit (in-memory).
 * On multi-instance/serverless deploys each instance has its own counter; still reduces abuse.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_CONTACT_POSTS_PER_WINDOW = 5;

type Bucket = { count: number; windowStart: number };

const contactBuckets = new Map<string, Bucket>();

export function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export function allowContactPost(ip: string): boolean {
  const now = Date.now();
  const b = contactBuckets.get(ip);
  if (!b || now - b.windowStart > WINDOW_MS) {
    contactBuckets.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (b.count >= MAX_CONTACT_POSTS_PER_WINDOW) return false;
  b.count += 1;
  return true;
}
