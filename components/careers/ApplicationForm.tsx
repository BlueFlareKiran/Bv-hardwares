'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, LoaderCircle, Send, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  jobId: string;
  jobTitle: string;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';
const MAX_RESUME_BYTES = 3 * 1024 * 1024;
const allowedExtensions = new Set(['pdf', 'doc', 'docx']);
const fieldClass = 'mt-2 w-full rounded-[8px] border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 dark:focus:border-brand-blue-light';

export default function ApplicationForm({ jobId, jobTitle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [state, setState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');
  const [filename, setFilename] = useState('');
  const [mockDelivery, setMockDelivery] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function selectResume(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFeedback('');
    setState('idle');
    if (!file) return setFilename('');
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.has(extension)) {
      event.target.value = '';
      setFilename('');
      setState('error');
      return setFeedback('Resume must be a PDF, DOC or DOCX file.');
    }
    if (file.size > MAX_RESUME_BYTES) {
      event.target.value = '';
      setFilename('');
      setState('error');
      return setFeedback('Resume must be 3 MB or smaller.');
    }
    setFilename(file.name);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const data = new FormData(event.currentTarget);
    data.set('jobId', jobId);
    data.set('startedAt', String(startedAt.current));
    setState('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/careers/apply', { method: 'POST', body: data });
      const result = (await response.json().catch(() => ({}))) as { error?: string; mode?: string };
      if (!response.ok) throw new Error(result.error || 'Unable to submit your application.');
      setMockDelivery(result.mode === 'mock');
      setState('success');
      setFilename('');
      formRef.current?.reset();
      startedAt.current = Date.now();
    } catch (reason) {
      setState('error');
      setFeedback(reason instanceof Error ? reason.message : 'Unable to submit your application right now.');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-[10px] border border-emerald-500/20 bg-emerald-500/[0.06] p-6 sm:p-8" role="status">
        <span className="grid size-12 place-items-center rounded-[10px] bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={23} /></span>
        <h2 className="mt-5 text-2xl font-semibold text-foreground">{mockDelivery ? 'Test application accepted.' : 'Application received.'}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{mockDelivery ? 'No email was sent (mock mode). Your form passed validation.' : `Thank you for your interest in Bhagyashree Ventures. Our team will review your application for ${jobTitle} and contact you if your profile matches the role.`}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="jobId" value={jobId} />
      <div className="hidden" aria-hidden="true"><label htmlFor="career-website">Website</label><input id="career-website" name="website" tabIndex={-1} autoComplete="off" /></div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Full Name *<input className={fieldClass} name="fullName" required autoComplete="name" placeholder="Your full name" /></label>
        <label className="text-sm font-semibold text-foreground">Email *<input className={fieldClass} name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Phone / WhatsApp *<input className={fieldClass} name="phone" type="tel" required autoComplete="tel" placeholder="+91 ..." /></label>
        <label className="text-sm font-semibold text-foreground">Current Location *<input className={fieldClass} name="currentLocation" required autoComplete="address-level2" placeholder="City, State" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Total Experience *<input className={fieldClass} name="totalExperience" required placeholder="e.g. 3 years" /></label>
        <label className="text-sm font-semibold text-foreground">Current Company<input className={fieldClass} name="currentCompany" autoComplete="organization" placeholder="Optional" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Notice Period<input className={fieldClass} name="noticePeriod" placeholder="e.g. 30 days" /></label>
        <label className="text-sm font-semibold text-foreground">LinkedIn / Portfolio URL<input className={fieldClass} name="linkedinUrl" type="url" placeholder="https://..." /></label>
      </div>
      <label className="block text-sm font-semibold text-foreground">Cover Message<textarea className={`${fieldClass} min-h-32 resize-y`} name="coverMessage" placeholder="Tell us briefly why this role interests you and what you would bring to the team." /></label>

      <label className="block text-sm font-semibold text-foreground">
        Resume *
        <div className="mt-2 rounded-[8px] border border-dashed border-brand-blue/25 bg-brand-blue/[0.035] p-4 dark:border-brand-blue-light/25 dark:bg-brand-blue-light/[0.05]">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-brand-blue/[0.08] text-brand-blue dark:text-brand-blue-light"><UploadCloud size={19} /></span>
            <div className="min-w-0 flex-1">
              <input name="resume" type="file" required onChange={selectResume} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-[7px] file:border-0 file:bg-brand-blue/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-blue hover:file:bg-brand-blue/15 dark:file:text-brand-blue-light" />
              <p className="mt-2 text-xs text-muted-foreground">PDF, DOC or DOCX. Maximum size: 3 MB.</p>
              {filename && <p className="mt-2 flex min-w-0 items-center gap-1.5 text-sm font-medium text-foreground"><FileText size={15} className="shrink-0" /><span className="truncate">{filename}</span></p>}
            </div>
          </div>
        </div>
      </label>

      {feedback && <div role="alert" className="flex items-start gap-2.5 rounded-[8px] border border-red-500/20 bg-red-500/8 p-4 text-sm text-red-700 dark:text-red-300"><AlertCircle size={18} className="mt-0.5 shrink-0" />{feedback}</div>}

      <Button type="submit" size="lg" disabled={state === 'sending'} className="w-full sm:w-auto">{state === 'sending' ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={17} />}{state === 'sending' ? 'Submitting…' : 'Submit Application'}</Button>
      <p className="text-xs leading-5 text-muted-foreground">Your details and resume are sent only to the Bhagyashree Ventures hiring team for recruitment review.</p>
    </form>
  );
}
