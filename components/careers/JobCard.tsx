'use client';

import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CalendarDays, Clock3, Eye, EyeOff, MapPin, Pencil, Trash2 } from 'lucide-react';
import type { CareerJob } from '@/lib/careers/types';

interface Props {
  job: CareerJob;
  admin?: boolean;
  busy?: boolean;
  onEdit?: () => void;
  onTogglePublished?: () => void;
  onDelete?: () => void;
}

const postedFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function JobCard({ job, admin, busy, onEdit, onTogglePublished, onDelete }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-border/90 bg-card p-5 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_26px_60px_-38px_rgba(7,17,38,.5)] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/55 via-brand-blue/15 to-brand-orange/55" />
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-blue/[0.08] text-brand-blue dark:bg-brand-blue-light/[0.1] dark:text-brand-blue-light">
          <BriefcaseBusiness size={20} aria-hidden="true" />
        </span>
        <div className="flex items-center gap-2">
          {admin && (
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${job.published ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-muted text-muted-foreground'}`}>
              {job.published ? 'Published' : 'Draft'}
            </span>
          )}
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-orange">{job.department}</span>
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">
        {job.published ? (
          <Link href={`/careers/${job.slug}`} className="transition-colors hover:text-brand-blue dark:hover:text-brand-blue-light">{job.title}</Link>
        ) : job.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground sm:text-base">{job.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" /> {job.location}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" /> {job.employmentType}</span>
        <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={15} aria-hidden="true" /> {job.experience}</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" /> Posted {postedFormatter.format(new Date(job.createdAt))}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        {job.published ? (
          <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-orange dark:text-brand-blue-light">
            View Role <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">Draft — not visible publicly</span>
        )}
        {admin && (
          <div className="flex flex-wrap gap-1.5">
            <button type="button" disabled={busy} onClick={onEdit} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-50">
              <Pencil size={14} aria-hidden="true" /> Edit
            </button>
            <button type="button" disabled={busy} onClick={onTogglePublished} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-50">
              {job.published ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
              {job.published ? 'Unpublish' : 'Publish'}
            </button>
            <button type="button" disabled={busy} onClick={onDelete} className="inline-flex size-9 items-center justify-center rounded-lg border border-red-500/20 text-red-600 transition hover:bg-red-500/5 disabled:opacity-50 dark:text-red-300" aria-label={`Delete ${job.title}`}>
              <Trash2 size={14} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
