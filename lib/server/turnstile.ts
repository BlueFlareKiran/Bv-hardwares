import 'server-only';

interface TurnstileResponse {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
}

export interface TurnstileVerification {
  ok: boolean;
  enabled: boolean;
  reason?: string;
  unavailable?: boolean;
}

export async function verifyTurnstileToken(token: string, remoteIp: string, expectedAction?: string): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true, enabled: false };
  if (!token) return { ok: false, enabled: true, reason: 'Please complete the anti-spam verification.' };

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);

  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    });
  } catch {
    return { ok: false, enabled: true, unavailable: true, reason: 'Anti-spam verification is temporarily unavailable. Please try again.' };
  }

  if (!response.ok) {
    return { ok: false, enabled: true, unavailable: true, reason: 'Anti-spam verification is temporarily unavailable. Please try again.' };
  }

  const result = (await response.json()) as TurnstileResponse;
  if (!result.success) {
    return { ok: false, enabled: true, reason: 'Anti-spam verification failed. Please refresh and try again.' };
  }

  const expectedHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim().toLowerCase();
  if (expectedHostname && result.hostname?.toLowerCase() !== expectedHostname) {
    return { ok: false, enabled: true, reason: 'Anti-spam verification could not be validated for this website.' };
  }

  if (expectedAction && result.action !== expectedAction) {
    return { ok: false, enabled: true, reason: 'Anti-spam verification action did not match this form.' };
  }

  return { ok: true, enabled: true };
}
