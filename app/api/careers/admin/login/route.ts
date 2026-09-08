import { NextResponse } from 'next/server';
import {
  adminAuthConfigured,
  CAREERS_SESSION_COOKIE,
  careersSessionMaxAge,
  createAdminSessionValue,
  validateAdminCredentials,
} from '@/lib/server/auth';
import { anonymousKey, checkRateLimit, getClientIp, RateLimitBackendError } from '@/lib/server/rate-limit';
import { isSameOriginRequest } from '@/lib/server/request-origin';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }
  const ip = getClientIp(request);
  try {
    const loginLimit = await checkRateLimit(`careers-login:${anonymousKey(ip)}`, 8, 15 * 60 * 1000);
    if (!loginLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(loginLimit.retryAfterSeconds) } }
      );
    }
  } catch (error) {
    if (error instanceof RateLimitBackendError) {
      return NextResponse.json({ error: 'Login protection is temporarily unavailable.' }, { status: 503 });
    }
    throw error;
  }

  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: 'Careers admin credentials are not configured yet.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === 'string' ? body.username.replace(/\0/g, '').trim().slice(0, 120) : '';
  const password = typeof body.password === 'string' ? body.password.slice(0, 300) : '';

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username });
  response.cookies.set(CAREERS_SESSION_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: careersSessionMaxAge,
  });
  return response;
}
