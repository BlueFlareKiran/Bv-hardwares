'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle, LockKeyhole, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const fieldClass = 'mt-2 w-full rounded-[8px] border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 dark:focus:border-brand-blue-light';

interface Props {
  open: boolean;
  configured: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginDialog({ open, configured, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || !configured) return;
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/careers/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Unable to sign in.');
      onSuccess();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-brand-navy/55 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="careers-login-title" className="relative w-full max-w-md overflow-hidden rounded-[10px] border border-border bg-card p-6 shadow-2xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/60 via-transparent to-brand-orange/60" />
        <button type="button" onClick={onClose} className="absolute right-4 top-4 grid size-10 place-items-center rounded-[8px] border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Close login">
          <X size={18} />
        </button>
        <span className="grid size-11 place-items-center rounded-[8px] bg-brand-blue/[0.08] text-brand-blue dark:text-brand-blue-light"><LockKeyhole size={20} /></span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">Private access</p>
        <h2 id="careers-login-title" className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">Manage Careers</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to add, edit, publish or remove job openings on this page.</p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <label className="block text-sm font-semibold text-foreground">Username<input name="username" autoComplete="username" required disabled={!configured} className={fieldClass} /></label>
          <label className="block text-sm font-semibold text-foreground">Password<input name="password" type="password" autoComplete="current-password" required disabled={!configured} className={fieldClass} /></label>
          {!configured && <div className="flex gap-2.5 rounded-[8px] border border-amber-500/25 bg-amber-500/8 p-4 text-sm text-amber-800 dark:text-amber-200"><AlertCircle size={18} className="mt-0.5 shrink-0" />Admin credentials are not configured on this environment.</div>}
          {error && <div role="alert" className="flex gap-2.5 rounded-[8px] border border-red-500/20 bg-red-500/8 p-4 text-sm text-red-700 dark:text-red-300"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
          <Button type="submit" size="lg" disabled={loading || !configured} className="w-full">{loading && <LoaderCircle size={17} className="animate-spin" />}{loading ? 'Signing in…' : 'Sign In'}</Button>
        </form>
      </div>
    </div>
  );
}
