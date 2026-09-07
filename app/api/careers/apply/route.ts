import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';
import { getJobs } from '@/lib/server/careers-store';
import { allowRequest, getClientIp } from '@/lib/server/rate-limit';
import { EmailConfigurationError, escapeHtml, sendEmail } from '@/lib/server/email';

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

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!allowRequest(`career-apply:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many applications were submitted. Please try again later.' }, { status: 429 });
  }

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
    const resume = formData.get('resume');

    if (!jobId || !fullName || !email || !phone || !currentLocation || !totalExperience) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!emailPattern.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (!validUrl(linkedinUrl)) return NextResponse.json({ error: 'Enter a valid LinkedIn or portfolio URL.' }, { status: 400 });

    const job = (await getJobs()).find((item) => item.id === jobId && item.published);
    if (!job) return NextResponse.json({ error: 'This job is no longer available.' }, { status: 404 });

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

    const delivery = await sendEmail({
      to: destination,
      replyTo: email,
      subject: `New job application - ${job.title} - ${fullName}`,
      attachments: [{ filename: safeFilename(resume.name), content: attachment }],
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#172033;line-height:1.6"><div style="border-bottom:3px solid #1237a5;padding-bottom:16px;margin-bottom:22px"><div style="font-size:12px;font-weight:700;letter-spacing:.08em;color:#f35b0a;text-transform:uppercase">Bhagyashree Ventures Careers</div><h1 style="font-size:24px;margin:6px 0 0">New application: ${safe.jobTitle}</h1></div><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:8px 0;font-weight:700;width:180px">Candidate</td><td>${safe.fullName}</td></tr><tr><td style="padding:8px 0;font-weight:700">Email</td><td>${safe.email}</td></tr><tr><td style="padding:8px 0;font-weight:700">Phone / WhatsApp</td><td>${safe.phone}</td></tr><tr><td style="padding:8px 0;font-weight:700">Current location</td><td>${safe.currentLocation}</td></tr><tr><td style="padding:8px 0;font-weight:700">Total experience</td><td>${safe.totalExperience}</td></tr><tr><td style="padding:8px 0;font-weight:700">Current company</td><td>${safe.currentCompany}</td></tr><tr><td style="padding:8px 0;font-weight:700">Notice period</td><td>${safe.noticePeriod}</td></tr><tr><td style="padding:8px 0;font-weight:700">LinkedIn / portfolio</td><td>${safe.linkedinUrl}</td></tr><tr><td style="padding:8px 0;font-weight:700">Department</td><td>${safe.department}</td></tr></table><div style="margin-top:22px;padding:18px;border-radius:12px;background:#f5f7fb"><div style="font-size:13px;font-weight:700;margin-bottom:8px">Cover message</div><div style="font-size:14px">${safe.coverMessage}</div></div><p style="font-size:12px;color:#667085;margin-top:20px">The resume is attached. Reply to this email to contact ${safe.fullName} directly.</p></div>`,
      text: [`New application: ${job.title}`, `Candidate: ${fullName}`, `Email: ${email}`, `Phone / WhatsApp: ${phone}`, `Current location: ${currentLocation}`, `Total experience: ${totalExperience}`, `Current company: ${currentCompany || 'Not provided'}`, `Notice period: ${noticePeriod || 'Not provided'}`, `LinkedIn / portfolio: ${linkedinUrl || 'Not provided'}`, '', 'Cover message:', coverMessage || 'No cover message'].join('\n'),
    });

    return NextResponse.json({ ok: true, mode: delivery.mode });
  } catch (error) {
    console.error('Career application failed:', error);
    const configurationError = error instanceof EmailConfigurationError;
    return NextResponse.json({ error: configurationError ? 'Application delivery is not configured yet. Please contact the company directly.' : 'We could not submit your application right now. Please try again later.' }, { status: configurationError ? 503 : 500 });
  }
}
