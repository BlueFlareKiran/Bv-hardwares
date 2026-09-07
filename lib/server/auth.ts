import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const CAREERS_SESSION_COOKIE = 'bv_careers_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sessionSecret() {
  return process.env.CAREERS_SESSION_SECRET?.trim() || '';
}

export function adminAuthConfigured() {
  return Boolean(
    process.env.CAREERS_ADMIN_USERNAME?.trim() &&
      process.env.CAREERS_ADMIN_PASSWORD?.trim() &&
      sessionSecret()
  );
}

export function validateAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.CAREERS_ADMIN_USERNAME?.trim() || '';
  const expectedPassword = process.env.CAREERS_ADMIN_PASSWORD || '';
  if (!expectedUsername || !expectedPassword) return false;
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

function signatureFor(payload: string) {
  return createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

export function createAdminSessionValue() {
  if (!adminAuthConfigured()) throw new Error('Careers admin authentication is not configured.');
  const username = process.env.CAREERS_ADMIN_USERNAME!.trim();
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString('base64url');
  return `${payload}.${signatureFor(payload)}`;
}

export function readAdminSessionValue(value?: string | null) {
  if (!value || !adminAuthConfigured()) return null;
  const parts = value.split('.');
  if (parts.length !== 2) return null;
  const [payload, suppliedSignature] = parts;
  if (!safeEqual(suppliedSignature, signatureFor(payload))) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      username?: unknown;
      expiresAt?: unknown;
    };
    const expectedUsername = process.env.CAREERS_ADMIN_USERNAME!.trim();
    if (parsed.username !== expectedUsername) return null;
    if (typeof parsed.expiresAt !== 'number' || parsed.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return { username: expectedUsername, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
}

export function verifyAdminSessionValue(value?: string | null) {
  return Boolean(readAdminSessionValue(value));
}

export function requestHasAdminSession(request: NextRequest) {
  return verifyAdminSessionValue(request.cookies.get(CAREERS_SESSION_COOKIE)?.value);
}

export const careersSessionMaxAge = SESSION_TTL_SECONDS;
