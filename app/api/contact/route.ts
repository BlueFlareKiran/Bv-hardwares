import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';
import { allowRequest, getClientIp } from '@/lib/server/rate-limit';
import { EmailConfigurationError, escapeHtml, sendEmail } from '@/lib/server/email';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!allowRequest(`contact:${ip}`, 6, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many enquiries were submitted. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

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
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#172033;line-height:1.6">
          <div style="border-bottom:3px solid #f35b0a;padding-bottom:16px;margin-bottom:22px">
            <div style="font-size:12px;font-weight:700;letter-spacing:.08em;color:#1237a5;text-transform:uppercase">Bhagyashree Ventures</div>
            <h1 style="font-size:24px;margin:6px 0 0">New product enquiry</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;font-weight:700;width:180px">Name</td><td>${safe.name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Company</td><td>${safe.company}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Email</td><td>${safe.email}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Phone / WhatsApp</td><td>${safe.phone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Product / requirement</td><td>${safe.productInterest}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Quantity / timeline</td><td>${safe.volume}</td></tr>
          </table>
          <div style="margin-top:22px;padding:18px;border-radius:12px;background:#f5f7fb">
            <div style="font-size:13px;font-weight:700;margin-bottom:8px">Requirement details</div>
            <div style="font-size:14px">${safe.message}</div>
          </div>
          <p style="font-size:12px;color:#667085;margin-top:20px">Reply to this email to respond directly to ${safe.name}.</p>
        </div>
      `,
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

    return NextResponse.json({ ok: true, mode: delivery.mode });
  } catch (error) {
    console.error('Contact enquiry failed:', error);
    const configurationError = error instanceof EmailConfigurationError;
    return NextResponse.json(
      {
        error: configurationError
          ? 'Email delivery is not configured yet. Please contact us by phone or WhatsApp.'
          : 'We could not send your enquiry right now. Please try again or contact us on WhatsApp.',
      },
      { status: configurationError ? 503 : 500 }
    );
  }
}
