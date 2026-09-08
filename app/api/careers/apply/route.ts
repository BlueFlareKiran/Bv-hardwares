import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';
import { getJobs } from '@/lib/server/careers-store';
import { anonymousKey, checkRateLimit, getClientIp, RateLimitBackendError, rememberSubmission, wasRecentlySubmitted } from '@/lib/server/rate-limit';
import { EmailConfigurationError, escapeHtml, sendEmail } from '@/lib/server/email';
import { renderBrandedEmail } from '@/lib/server/email-templates';
import { isSameOriginRequest } from '@/lib/server/request-origin';
import { verifyTurnstileToken } from '@/lib/server/turnstile';

export const runtime = 'nodejs';

const MAX_RESUME_BYTES = 3 * 1024 * 1024;
const allowedExtensions = new Set(['pdf', 'doc', 'docx']);
const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream',
  '',
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string, maxLength = 500) {
  const value = formData.get(key);
  return typeof value === 'string'
    ? value.replace(/\0/g, '').replace(/\r\n/g, '\n').trim().slice(0, maxLength)
    : '';
}

function validUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function hasValidSignature(file: File, extension: string) {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (extension === 'pdf') return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d;
  if (extension === 'doc') return [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1].every((value, index) => bytes[index] === value);
  if (extension === 'docx') return bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  return false;
}

function safeFilename(value: string) {
  const cleaned = value.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-180);
  return cleaned || 'resume';
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
    const formData = await request.formData().catch(() => null);
    if (!formData) return NextResponse.json({ error: 'Please submit a valid application form.' }, { status: 400 });
    if (text(formData, 'website', 200)) return NextResponse.json({ ok: true });
    const startedAt = Number(text(formData, 'startedAt', 30));
    if (startedAt && Date.now() - startedAt < 1500) {
      return NextResponse.json({ error: 'Please wait a moment and try again.' }, { status: 400 });
    }

    const jobId = text(formData, 'jobId', 120);
    const fullName = text(formData, 'fullName', 120);
    const email = text(formData, 'email', 180).toLowerCase();
    const phone = text(formData, 'phone', 80);
    const currentLocation = text(formData, 'currentLocation', 160);
    const totalExperience = text(formData, 'totalExperience', 120);
    const currentCompany = text(formData, 'currentCompany', 160);
    const noticePeriod = text(formData, 'noticePeriod', 120);
    const linkedinUrl = text(formData, 'linkedinUrl', 300);
    const coverMessage = text(formData, 'coverMessage', 3500);
    const turnstileToken = text(formData, 'turnstileToken', 2048);
    const resume = formData.get('resume');

    if (!jobId || !fullName || !email || !phone || !currentLocation || !totalExperience) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!emailPattern.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (!validUrl(linkedinUrl)) return NextResponse.json({ error: 'Enter a valid LinkedIn or portfolio URL.' }, { status: 400 });

    const job = (await getJobs()).find((item) => item.id === jobId && item.published);
    if (!job) return NextResponse.json({ error: 'This job is no longer available.' }, { status: 404 });

    const ipIdentity = anonymousKey(ip);
    const shortIpLimit = await checkRateLimit(`career:ip:30m:${ipIdentity}`, 3, 30 * 60 * 1000);
    if (!shortIpLimit.allowed) {
      return rateLimited('Too many applications were submitted from this connection. Please try again later.', shortIpLimit.retryAfterSeconds);
    }

    const dailyIpLimit = await checkRateLimit(`career:ip:day:${ipIdentity}`, 5, 24 * 60 * 60 * 1000);
    if (!dailyIpLimit.allowed) {
      return rateLimited('The daily application limit has been reached for this connection. Please try again tomorrow.', dailyIpLimit.retryAfterSeconds);
    }

    const turnstile = await verifyTurnstileToken(turnstileToken, ip, 'career_application');
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: turnstile.reason || 'Anti-spam verification failed.' },
        { status: turnstile.unavailable ? 503 : 400 }
      );
    }

    const applicantIdentity = anonymousKey(`${email}|${job.id}`);
    const applicantLimit = await checkRateLimit(`career:applicant:day:${applicantIdentity}`, 2, 24 * 60 * 60 * 1000);
    if (!applicantLimit.allowed) {
      return rateLimited('This role has already received multiple applications from this email address today. Please try again later.', applicantLimit.retryAfterSeconds);
    }

    if (!(resume instanceof File) || resume.size === 0) return NextResponse.json({ error: 'Please attach your resume.' }, { status: 400 });
    if (resume.size > MAX_RESUME_BYTES) return NextResponse.json({ error: 'Resume must be 3 MB or smaller.' }, { status: 400 });
    const extension = resume.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(resume.type) || !(await hasValidSignature(resume, extension))) {
      return NextResponse.json({ error: 'Resume must be a valid PDF, DOC or DOCX file.' }, { status: 400 });
    }

    const destination = process.env.CAREERS_EMAIL?.trim() || process.env.CONTACT_EMAIL?.trim() || siteConfig.email;
    const safe = {
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      currentLocation: escapeHtml(currentLocation),
      totalExperience: escapeHtml(totalExperience),
      currentCompany: escapeHtml(currentCompany || 'Not provided'),
      noticePeriod: escapeHtml(noticePeriod || 'Not provided'),
      linkedinUrl: escapeHtml(linkedinUrl || 'Not provided'),
      coverMessage: escapeHtml(coverMessage || 'No cover message').replaceAll('\n', '<br />'),
      jobTitle: escapeHtml(job.title),
      department: escapeHtml(job.department),
    };
    const attachment = Buffer.from(await resume.arrayBuffer());
    const resumeDigest = createHash('sha256').update(attachment).digest('hex');
    const duplicateIdentity = anonymousKey(`${email}|${job.id}|${resumeDigest}`);
    if (await wasRecentlySubmitted(`career:${duplicateIdentity}`)) {
      return rateLimited('This application was already submitted recently. Please do not send the same application again.', 24 * 60 * 60);
    }

    const delivery = await sendEmail({
      to: destination,
      replyTo: email,
      subject: `New job application - ${job.title} - ${fullName}`,
      attachments: [{ filename: safeFilename(resume.name), content: attachment }],
      html: renderBrandedEmail({
        eyebrow: 'Bhagyashree Ventures Careers',
        badge: 'New application',
        accentColor: '#1237a5',
        title: `Application received: ${safe.jobTitle}`,
        subtitle: `${safe.fullName} has applied for the ${safe.jobTitle} role. The resume is attached to this email and the candidate's email is set as the Reply-To address.`,
        rows: [
          { label: 'Candidate', value: safe.fullName },
          { label: 'Applied role', value: safe.jobTitle },
          { label: 'Department', value: safe.department },
          { label: 'Email', value: `<a href="mailto:${safe.email}" style="color:#1237a5;text-decoration:none">${safe.email}</a>` },
          { label: 'Phone / WhatsApp', value: `<a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color:#1237a5;text-decoration:none">${safe.phone}</a>` },
          { label: 'Current location', value: safe.currentLocation },
        ],
        secondaryRows: [
          { label: 'Total experience', value: safe.totalExperience },
          { label: 'Current company', value: safe.currentCompany },
          { label: 'Notice period', value: safe.noticePeriod },
          { label: 'LinkedIn / portfolio', value: linkedinUrl ? `<a href="${safe.linkedinUrl}" style="color:#1237a5;text-decoration:none">${safe.linkedinUrl}</a>` : safe.linkedinUrl },
          { label: 'Resume attachment', value: escapeHtml(resume.name) },
        ],
        detailTitle: 'Cover message',
        detailHtml: safe.coverMessage,
        footerNote: `Reply to this email to contact ${safe.fullName} directly. The candidate's resume is attached for review.`,
      }),
      text: [`New application: ${job.title}`, `Candidate: ${fullName}`, `Email: ${email}`, `Phone / WhatsApp: ${phone}`, `Current location: ${currentLocation}`, `Total experience: ${totalExperience}`, `Current company: ${currentCompany || 'Not provided'}`, `Notice period: ${noticePeriod || 'Not provided'}`, `LinkedIn / portfolio: ${linkedinUrl || 'Not provided'}`, '', 'Cover message:', coverMessage || 'No cover message'].join('\n'),
    });

    await rememberSubmission(`career:${duplicateIdentity}`, 24 * 60 * 60 * 1000);

    return NextResponse.json({ ok: true, mode: delivery.mode });
  } catch (error) {
    console.error('Career application failed:', error);
    const configurationError = error instanceof EmailConfigurationError;
    const protectionError = error instanceof RateLimitBackendError;
    return NextResponse.json(
      {
        error: configurationError
          ? 'Application delivery is not configured yet. Please contact the company directly.'
          : protectionError
            ? 'Submission protection is temporarily unavailable. Please try again shortly.'
            : 'We could not submit your application right now. Please try again later.',
      },
      { status: configurationError || protectionError ? 503 : 500 }
    );
  }
}
