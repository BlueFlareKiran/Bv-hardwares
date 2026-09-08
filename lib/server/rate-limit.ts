import 'server-only';
import { createHash, createHmac } from 'crypto';

type Entry = { count: number; resetAt: number };
type RecentEntry = { expiresAt: number };

export class RateLimitBackendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitBackendError';
  }
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
  backend: 'memory' | 'upstash';
}

const globalRateLimit = globalThis as typeof globalThis & {
  __bvRateLimitStore?: Map<string, Entry>;
  __bvRecentSubmissionStore?: Map<string, RecentEntry>;
};

const memoryStore = globalRateLimit.__bvRateLimitStore ?? new Map<string, Entry>();
const recentStore = globalRateLimit.__bvRecentSubmissionStore ?? new Map<string, RecentEntry>();
globalRateLimit.__bvRateLimitStore = memoryStore;
globalRateLimit.__bvRecentSubmissionStore = recentStore;

function trimSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function getRateLimitMode(): 'memory' | 'upstash' {
  const configured = process.env.RATE_LIMIT_MODE?.trim().toLowerCase();
  if (configured === 'memory' || configured === 'upstash') return configured;

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return 'upstash';
  }

  return 'memory';
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim() || '';
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || '';
  if (!url || !token) {
    throw new RateLimitBackendError('Upstash Redis is not configured.');
  }
  return { url: trimSlash(url), token };
}

async function upstashCommand(command: unknown[]) {
  const { url, token } = getUpstashConfig();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new RateLimitBackendError(`Rate limit backend returned ${response.status}.`);
  }

  const payload = (await response.json()) as { result?: unknown; error?: string };
  if (payload.error) throw new RateLimitBackendError(`Rate limit backend error: ${payload.error}`);
  return payload.result;
}

function namespacedKey(key: string) {
  return `bv:v1:${key}`;
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function anonymousKey(value: string) {
  const normalized = value.trim().toLowerCase();
  const secret = process.env.RATE_LIMIT_HASH_SECRET?.trim();
  const digest = secret
    ? createHmac('sha256', secret).update(normalized).digest('hex')
    : createHash('sha256').update(normalized).digest('hex');
  return digest.slice(0, 40);
}

function memoryRateLimit(key: string, maxRequests: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - 1),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      backend: 'memory',
    };
  }

  const nextCount = current.count + 1;
  current.count = nextCount;
  const allowed = nextCount <= maxRequests;
  return {
    allowed,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - nextCount),
    resetAt: current.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    backend: 'memory',
  };
}

export async function checkRateLimit(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult> {
  if (getRateLimitMode() === 'memory') {
    return memoryRateLimit(namespacedKey(key), maxRequests, windowMs);
  }

  const redisKey = namespacedKey(`rate:${key}`);
  const script = [
    "local current = redis.call('INCR', KEYS[1])",
    "if current == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end",
    "local ttl = redis.call('PTTL', KEYS[1])",
    'return {current, ttl}',
  ].join(' ');

  const result = await upstashCommand(['EVAL', script, '1', redisKey, String(windowMs)]);
  const values = Array.isArray(result) ? result : [];
  const count = Number(values[0] ?? 0);
  const ttl = Math.max(1, Number(values[1] ?? windowMs));
  const allowed = count <= maxRequests;
  const now = Date.now();

  return {
    allowed,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - count),
    resetAt: now + ttl,
    retryAfterSeconds: Math.max(1, Math.ceil(ttl / 1000)),
    backend: 'upstash',
  };
}

export async function wasRecentlySubmitted(key: string) {
  const namespaced = namespacedKey(`recent:${key}`);

  if (getRateLimitMode() === 'memory') {
    const current = recentStore.get(namespaced);
    if (!current) return false;
    if (current.expiresAt <= Date.now()) {
      recentStore.delete(namespaced);
      return false;
    }
    return true;
  }

  const result = await upstashCommand(['EXISTS', namespaced]);
  return Number(result) > 0;
}

export async function rememberSubmission(key: string, ttlMs: number) {
  const namespaced = namespacedKey(`recent:${key}`);

  if (getRateLimitMode() === 'memory') {
    recentStore.set(namespaced, { expiresAt: Date.now() + ttlMs });
    return;
  }

  await upstashCommand(['SET', namespaced, '1', 'PX', String(ttlMs)]);
}
