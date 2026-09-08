import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';
import { allowRequest, getClientIp } from '@/lib/server/rate-limit';
import { EmailConfigurationError, escapeHtml, sendEmail } from '@/lib/server/email';
import { renderBrandedEmail } from '@/lib/server/email-templates';

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
