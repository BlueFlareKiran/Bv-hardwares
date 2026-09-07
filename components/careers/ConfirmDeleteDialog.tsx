'use client';

import { LoaderCircle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CareerJob } from '@/lib/careers/types';

interface Props {
  job: CareerJob | null;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteDialog({ job, deleting, onCancel, onConfirm }: Props) {
  if (!job) return null;
  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-brand-navy/55 p-4 backdrop-blur-sm">
      <div role="alertdialog" aria-modal="true" aria-labelledby="delete-job-title" className="w-full max-w-md rounded-[1.5rem] border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-300"><Trash2 size={20} /></span>
          <button type="button" onClick={onCancel} disabled={deleting} className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted" aria-label="Cancel deletion"><X size={16} /></button>
        </div>
        <h2 id="delete-job-title" className="mt-5 text-xl font-semibold text-foreground">Delete {job.title}?</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">This removes the role from the careers data. This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2.5">
          <Button variant="outline" onClick={onCancel} disabled={deleting}>Cancel</Button>
          <button type="button" onClick={onConfirm} disabled={deleting} className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50">
            {deleting ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}{deleting ? 'Deleting…' : 'Delete Job'}
          </button>
        </div>
      </div>
    </div>
  );
}
