type Entry = { count: number; resetAt: number };

const globalRateLimit = globalThis as typeof globalThis & {
  __bvRateLimitStore?: Map<string, Entry>;
};

const store = globalRateLimit.__bvRateLimitStore ?? new Map<string, Entry>();
globalRateLimit.__bvRateLimitStore = store;

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function allowRequest(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) return false;
  current.count += 1;
  return true;
}
