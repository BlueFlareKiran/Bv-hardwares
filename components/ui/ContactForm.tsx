'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2, LoaderCircle, MailCheck, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  productInterest: 'Barcode / Label Printers',
  volume: '',
  message: '',
  website: '',
};

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full rounded-xl border border-input bg-background/90 px-3.5 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground/65 focus:border-brand-blue focus:bg-background focus:ring-4 focus:ring-brand-blue/10 dark:focus:border-brand-blue-light';

export default function ContactForm({ requestedProduct = '' }: { requestedProduct?: string }) {
  const reduceMotion = useReducedMotion();
  const startedAt = useRef(0);
  const [form, setForm] = useState(() => requestedProduct ? {
    ...initialForm,
    productInterest: 'Other',
    message: `I would like pricing and availability for ${requestedProduct}.`,
  } : initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (name: keyof typeof form, value: string) => {
    if (submitState !== 'sending') setSubmitState('idle');
    setFeedback('');
    setForm((current) => ({ ...current, [name]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.website || submitState === 'sending') return;

    setSubmitState('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; mode?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your enquiry.');
      }

      setSubmitState('success');
      setFeedback(result.mode === 'mock'
        ? 'Test enquiry accepted. No email was sent (mock mode).'
        : 'Thank you. Your enquiry has been sent directly to our team. We will get back to you shortly.');
      setForm(initialForm);
      startedAt.current = Date.now();
    } catch (error) {
      setSubmitState('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send your enquiry right now.');
    }
  }

  return (
    <div
      id="pricing-request"
      className="relative scroll-mt-28 overflow-hidden rounded-[1.6rem] border border-border/90 bg-card p-5 shadow-[0_26px_70px_-44px_rgba(7,17,38,0.35)] sm:p-7 lg:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/60 via-brand-blue/20 to-brand-orange/65" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-brand-blue/[0.06] blur-3xl dark:bg-brand-blue-light/[0.07]" />

      <div className="relative max-w-2xl">
        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
          <MailCheck size={21} aria-hidden="true" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">Product pricing</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
          Send your requirement to our team.
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Fill in your requirement and submit it here. The enquiry is sent securely to our team; no email app or website account is required.
        </p>
      </div>

      <form className="relative mt-7 space-y-5" onSubmit={handleSubmit}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            suppressHydrationWarning
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-foreground">
            Name <span className="text-brand-orange">*</span>
            <input suppressHydrationWarning className={`${fieldClass} mt-2`} required autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
          </label>
          <label className="text-sm font-semibold text-foreground">
            Company
            <input suppressHydrationWarning className={`${fieldClass} mt-2`} autoComplete="organization" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company name" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-foreground">
            Email <span className="text-brand-orange">*</span>
            <input suppressHydrationWarning className={`${fieldClass} mt-2`} type="email" required autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
          </label>
          <label className="text-sm font-semibold text-foreground">
            Phone / WhatsApp <span className="text-brand-orange">*</span>
            <input suppressHydrationWarning className={`${fieldClass} mt-2`} type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 ..." />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-foreground">
            Product / requirement <span className="text-brand-orange">*</span>
            <select suppressHydrationWarning className={`${fieldClass} mt-2`} value={form.productInterest} onChange={(e) => update('productInterest', e.target.value)}>
              <option>Barcode / Label Printers</option>
              <option>Barcode Scanners</option>
              <option>Labels & Tags</option>
              <option>Thermal Transfer Ribbons</option>
              <option>RFID Printers / Devices</option>
              <option>HHT / Mobile Computers</option>
              <option>POS Printers / Rolls</option>
              <option>Software / Integration</option>
              <option>Service / Maintenance</option>
              <option>HPRT Partner Products</option>
              <option>Other</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-foreground">
            Quantity / timeline
            <input suppressHydrationWarning className={`${fieldClass} mt-2`} value={form.volume} onChange={(e) => update('volume', e.target.value)} placeholder="e.g. 10 units / this month" />
          </label>
        </div>

        <label className="block text-sm font-semibold text-foreground">
          Requirement details <span className="text-brand-orange">*</span>
          <textarea suppressHydrationWarning className={`${fieldClass} mt-2 min-h-32 resize-y`} required value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Model (if known), application, label size/material, daily volume, connectivity, delivery location, or the issue you need solved..." />
        </label>

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={submitState}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
              className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
                submitState === 'success'
                  ? 'border-emerald-500/20 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300'
                  : 'border-red-500/20 bg-red-500/8 text-red-700 dark:text-red-300'
              }`}
            >
              {submitState === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={submitState === 'sending'} suppressHydrationWarning className="w-full sm:w-auto">
            {submitState === 'sending' ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={17} />}
            {submitState === 'sending' ? 'Sending enquiry...' : 'Send Enquiry'}
          </Button>
          <p className="text-xs leading-5 text-muted-foreground">
            Your details are sent to our team only for responding to this enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}
