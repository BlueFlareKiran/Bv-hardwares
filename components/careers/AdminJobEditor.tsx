'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CareerJob, CareerJobInput } from '@/lib/careers/types';
import { slugifyJobTitle } from '@/lib/careers/slug';

interface Props {
  job: CareerJob | null;
  onClose: () => void;
  onSaved: (job: CareerJob, created: boolean) => void;
}

const fieldClass = 'mt-2 w-full rounded-[8px] border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 dark:focus:border-brand-blue-light';

function blankJob(): CareerJobInput {
  return {
    slug: '',
    title: '',
    department: '',
    location: 'Bengaluru, Karnataka',
    employmentType: 'Full-time',
    experience: '',
    summary: '',
    description: '',
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    published: false,
  };
}

function inputFromJob(job: CareerJob | null): CareerJobInput {
  return job ? {
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    experience: job.experience,
    summary: job.summary,
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    niceToHave: job.niceToHave,
    published: job.published,
  } : blankJob();
}

export default function AdminJobEditor({ job, onClose, onSaved }: Props) {
  const initial = inputFromJob(job);
  const [form, setForm] = useState<CareerJobInput>(initial);
  const [responsibilities, setResponsibilities] = useState(initial.responsibilities.join('\n'));
  const [requirements, setRequirements] = useState(initial.requirements.join('\n'));
  const [niceToHave, setNiceToHave] = useState(initial.niceToHave.join('\n'));
  const [slugEdited, setSlugEdited] = useState(Boolean(job));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const update = <K extends keyof CareerJobInput>(key: K, value: CareerJobInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  function updateTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugEdited ? current.slug : slugifyJobTitle(value),
    }));
  }

  const lines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    const payload: CareerJobInput = {
      ...form,
      slug: slugifyJobTitle(form.slug || form.title),
      responsibilities: lines(responsibilities),
      requirements: lines(requirements),
      niceToHave: lines(niceToHave),
    };
    try {
      const response = await fetch(job ? `/api/careers/admin/jobs/${job.id}` : '/api/careers/admin/jobs', {
        method: job ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { job?: CareerJob; error?: string };
      if (!response.ok || !result.job) throw new Error(result.error || 'Could not save this job.');
      onSaved(result.job, !job);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save this job.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[92] overflow-y-auto bg-brand-navy/55 p-3 backdrop-blur-sm sm:p-6">
      <div role="dialog" aria-modal="true" aria-labelledby="job-editor-title" className="mx-auto my-2 w-full max-w-5xl overflow-hidden rounded-[10px] border border-border bg-card shadow-2xl sm:my-4">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">Careers Admin</p>
            <h2 id="job-editor-title" className="mt-1 text-xl font-semibold text-foreground">{job ? 'Edit job opening' : 'Add job opening'}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-[8px] border border-border text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close editor"><X size={18} /></button>
        </div>

        <form onSubmit={submit} className="space-y-6 p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-foreground">Job Title *<input required value={form.title} onChange={(event) => updateTitle(event.target.value)} className={fieldClass} placeholder="Sales Executive" /></label>
            <label className="text-sm font-semibold text-foreground">Slug *<input required value={form.slug} onChange={(event) => { setSlugEdited(true); update('slug', slugifyJobTitle(event.target.value)); }} className={fieldClass} placeholder="sales-executive" /></label>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-semibold text-foreground">Department *<input required value={form.department} onChange={(event) => update('department', event.target.value)} className={fieldClass} /></label>
            <label className="text-sm font-semibold text-foreground">Location *<input required value={form.location} onChange={(event) => update('location', event.target.value)} className={fieldClass} /></label>
            <label className="text-sm font-semibold text-foreground">Employment Type *<select value={form.employmentType} onChange={(event) => update('employmentType', event.target.value)} className={fieldClass}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label>
            <label className="text-sm font-semibold text-foreground">Experience *<input required value={form.experience} onChange={(event) => update('experience', event.target.value)} className={fieldClass} placeholder="1–3 Years" /></label>
          </div>
          <label className="block text-sm font-semibold text-foreground">Short Summary *<textarea required value={form.summary} onChange={(event) => update('summary', event.target.value)} className={`${fieldClass} min-h-24 resize-y`} placeholder="A concise overview shown on the job card." /></label>
          <label className="block text-sm font-semibold text-foreground">Full Description *<textarea required value={form.description} onChange={(event) => update('description', event.target.value)} className={`${fieldClass} min-h-36 resize-y`} placeholder="Explain the role, team and customer impact." /></label>
          <div className="grid gap-5 lg:grid-cols-3">
            <label className="text-sm font-semibold text-foreground">Responsibilities *<textarea required value={responsibilities} onChange={(event) => setResponsibilities(event.target.value)} className={`${fieldClass} min-h-48 resize-y`} placeholder={'One responsibility per line'} /><span className="mt-1.5 block text-xs font-normal text-muted-foreground">One item per line.</span></label>
            <label className="text-sm font-semibold text-foreground">Requirements *<textarea required value={requirements} onChange={(event) => setRequirements(event.target.value)} className={`${fieldClass} min-h-48 resize-y`} placeholder={'One requirement per line'} /><span className="mt-1.5 block text-xs font-normal text-muted-foreground">One item per line.</span></label>
            <label className="text-sm font-semibold text-foreground">Nice to Have<textarea value={niceToHave} onChange={(event) => setNiceToHave(event.target.value)} className={`${fieldClass} min-h-48 resize-y`} placeholder={'One optional qualification per line'} /><span className="mt-1.5 block text-xs font-normal text-muted-foreground">One item per line.</span></label>
          </div>
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="text-sm font-semibold text-foreground">Visibility<select value={form.published ? 'published' : 'draft'} onChange={(event) => update('published', event.target.value === 'published')} className={fieldClass}><option value="draft">Draft — admin only</option><option value="published">Published — visible to candidates</option></select></label>
            <div className="flex flex-wrap justify-end gap-2.5"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}{saving ? 'Saving…' : job ? 'Save Changes' : 'Save Job'}</Button></div>
          </div>
          {error && <div role="alert" className="flex gap-2.5 rounded-[8px] border border-red-500/20 bg-red-500/8 p-4 text-sm text-red-700 dark:text-red-300"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
        </form>
      </div>
    </div>
  );
}
