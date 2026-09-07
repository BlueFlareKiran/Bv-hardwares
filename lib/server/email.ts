import 'server-only';
import nodemailer from 'nodemailer';

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  attachments?: { filename: string; content: Buffer }[];
}

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailConfigurationError';
  }
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function getEmailMode(): 'mock' | 'gmail' {
  // A deployed site must explicitly choose a mode; never silently discard enquiries.
  const mode = process.env.EMAIL_MODE?.trim().toLowerCase() ||
    (process.env.NODE_ENV === 'production' ? '' : 'mock');
  if (mode !== 'mock' && mode !== 'gmail') {
    throw new EmailConfigurationError('EMAIL_MODE must be mock or gmail.');
  }
  return mode;
}

const emailPattern = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

export async function sendEmail(input: SendEmailInput) {
  const mode = getEmailMode();
  if (!emailPattern.test(input.to)) {
    throw new EmailConfigurationError('Configure a valid destination email address.');
  }
  if (!emailPattern.test(input.replyTo)) throw new Error('Invalid Reply-To email address.');

  if (mode === 'mock') {
    // Do not log applicant details, message bodies, credentials or resume contents.
    console.info('Mock website email accepted; no email sent.', {
      attachmentCount: input.attachments?.length ?? 0,
    });
    return { mode };
  }

  const user = process.env.GMAIL_USER?.trim() || '';
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '') || '';
  if (!emailPattern.test(user) || !pass) {
    throw new EmailConfigurationError('GMAIL_USER and GMAIL_APP_PASSWORD are required.');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const result = await transporter.sendMail({
    from: { name: 'Bhagyashree Ventures', address: user },
    to: { address: input.to, name: '' },
    replyTo: { address: input.replyTo, name: '' },
    subject: input.subject.replace(/[\r\n\0]/g, ' '),
    html: input.html,
    text: input.text,
    attachments: input.attachments,
  });
  if (!result.accepted.length || result.rejected.length) {
    throw new Error('Gmail did not accept the message recipient.');
  }
  return { mode };
}
