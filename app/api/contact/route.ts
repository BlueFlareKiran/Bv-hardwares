import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';
import { anonymousKey, checkRateLimit, getClientIp, RateLimitBackendError, rememberSubmission, wasRecentlySubmitted } from '@/lib/server/rate-limit';
import { EmailConfigurationError, escapeHtml, sendEmail } from '@/lib/server/email';
import { renderBrandedEmail } from '@/lib/server/email-templates';
import { isSameOriginRequest } from '@/lib/server/request-origin';
import { verifyTurnstileToken } from '@/lib/server/turnstile';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function rateLimited(message: string, retryAfterSeconds: number) {
  return NextResponse.json(
    { error: message },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
  );
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Please submit a valid enquiry.' }, { status: 400 });
    }
    const name = clean(body.name, 120);
    const company = clean(body.company, 160);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 80);
    const productInterest = clean(body.productInterest, 160);
    const volume = clean(body.volume, 160);
    const message = clean(body.message, 4000);
    const website = clean(body.website, 200);
    const startedAt = Number(body.startedAt || 0);
    const turnstileToken = clean(body.turnstileToken, 2048);

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (startedAt && Date.now() - startedAt < 1200) {
      return NextResponse.json({ error: 'Please wait a moment and try again.' }, { status: 400 });
    }

    if (!name || !email || !phone || !productInterest || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const ipIdentity = anonymousKey(ip);
    const tenMinuteIpLimit = await checkRateLimit(`contact:ip:10m:${ipIdentity}`, 3, 10 * 60 * 1000);
    if (!tenMinuteIpLimit.allowed) {
      return rateLimited('Too many enquiries were submitted from this connection. Please try again later.', tenMinuteIpLimit.retryAfterSeconds);
    }

    const dailyIpLimit = await checkRateLimit(`contact:ip:day:${ipIdentity}`, 10, 24 * 60 * 60 * 1000);
    if (!dailyIpLimit.allowed) {
      return rateLimited('The daily enquiry limit has been reached for this connection. Please try again tomorrow.', dailyIpLimit.retryAfterSeconds);
    }

    const turnstile = await verifyTurnstileToken(turnstileToken, ip, 'contact_enquiry');
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: turnstile.reason || 'Anti-spam verification failed.' },
        { status: turnstile.unavailable ? 503 : 400 }
      );
    }

    const emailIdentity = anonymousKey(email);
    const emailLimit = await checkRateLimit(`contact:email:hour:${emailIdentity}`, 3, 60 * 60 * 1000);
    if (!emailLimit.allowed) {
      return rateLimited('Too many enquiries were submitted with this email address. Please try again later.', emailLimit.retryAfterSeconds);
    }

    const duplicateIdentity = anonymousKey(
      `${email}|${productInterest.toLowerCase()}|${message.toLowerCase().replace(/\s+/g, ' ')}`
    );
    if (await wasRecentlySubmitted(`contact:${duplicateIdentity}`)) {
      return rateLimited('This enquiry was already submitted recently. Please wait before sending it again.', 10 * 60);
    }

    const destination = process.env.CONTACT_EMAIL?.trim() || siteConfig.email;
    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company || 'Not provided'),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      productInterest: escapeHtml(productInterest),
      volume: escapeHtml(volume || 'Not provided'),
      message: escapeHtml(message).replaceAll('\n', '<br />'),
    };

    const delivery = await sendEmail({
      to: destination,
      replyTo: email,
      subject: `New product enquiry - ${productInterest}`,
      html: renderBrandedEmail({
        eyebrow: 'Bhagyashree Ventures',
        badge: 'Product enquiry',
        accentColor: '#f35b0a',
        title: 'New product enquiry',
        subtitle: `A new website enquiry has been submitted for ${safe.productInterest}. Review the request details below and reply directly to continue the conversation.`,
        rows: [
          { label: 'Name', value: safe.name },
          { label: 'Company', value: safe.company },
          { label: 'Email', value: `<a href="mailto:${safe.email}" style="color:#1237a5;text-decoration:none">${safe.email}</a>` },
          { label: 'Phone / WhatsApp', value: `<a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color:#1237a5;text-decoration:none">${safe.phone}</a>` },
          { label: 'Product / requirement', value: safe.productInterest },
          { label: 'Quantity / timeline', value: safe.volume },
        ],
        detailTitle: 'Requirement details',
        detailHtml: safe.message,
        footerNote: `Reply to this email to respond directly to ${safe.name}. The sender's email has been set as the Reply-To address for quick follow-up.`,
      }),
      text: [
        'New product enquiry',
        `Name: ${name}`,
        `Company: ${company || 'Not provided'}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone}`,
        `Product / requirement: ${productInterest}`,
        `Quantity / timeline: ${volume || 'Not provided'}`,
        '',
        'Requirement details:',
        message,
      ].join('\n'),
    });

    await rememberSubmission(`contact:${duplicateIdentity}`, 10 * 60 * 1000);

    return NextResponse.json({ ok: true, mode: delivery.mode });
  } catch (error) {
    console.error('Contact enquiry failed:', error);
    const configurationError = error instanceof EmailConfigurationError;
    const protectionError = error instanceof RateLimitBackendError;
    return NextResponse.json(
      {
        error: configurationError
          ? 'Email delivery is not configured yet. Please contact us by phone or WhatsApp.'
          : protectionError
            ? 'Submission protection is temporarily unavailable. Please try again shortly.'
            : 'We could not send your enquiry right now. Please try again or contact us on WhatsApp.',
      },
      { status: configurationError || protectionError ? 503 : 500 }
    );
  }
}
