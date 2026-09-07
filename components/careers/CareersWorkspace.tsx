'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, BriefcaseBusiness, Mail, SearchX } from 'lucide-react';
import CareersHero from '@/components/careers/CareersHero';
import JobFilters from '@/components/careers/JobFilters';
import JobCard from '@/components/careers/JobCard';
import AdminToolbar from '@/components/careers/AdminToolbar';
import AdminLoginDialog from '@/components/careers/AdminLoginDialog';
import AdminJobEditor from '@/components/careers/AdminJobEditor';
import ConfirmDeleteDialog from '@/components/careers/ConfirmDeleteDialog';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import type { CareerJob } from '@/lib/careers/types';
import { siteConfig } from '@/lib/site';

interface Props {
  initialJobs: CareerJob[];
  isAdmin: boolean;
  adminUsername?: string;
  adminConfigured: boolean;
}

export default function CareersWorkspace({ initialJobs, isAdmin, adminUsername = 'admin', adminConfigured }: Props) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [location, setLocation] = useState('all');
  const [loginOpen, setLoginOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<CareerJob | null>(null);
  const [deleting, setDeleting] = useState<CareerJob | null>(null);
  const [busyId, setBusyId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const departments = useMemo(() => [...new Set(jobs.map((job) => job.department))].sort(), [jobs]);
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))].sort(), [jobs]);
  const visibleJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (!isAdmin && !job.published) return false;
      if (department !== 'all' && job.department !== department) return false;
      if (location !== 'all' && job.location !== location) return false;
      if (!query) return true;
      return [job.title, job.department, job.location, job.summary].some((value) => value.toLowerCase().includes(query));
    });
  }, [department, isAdmin, jobs, location, search]);
  const openCount = jobs.filter((job) => job.published).length;

  function openNewJob() {
    setEditing(null);
    setEditorOpen(true);
  }

  function openEdit(job: CareerJob) {
    setEditing(job);
    setEditorOpen(true);
  }

  function jobSaved(job: CareerJob, created: boolean) {
    setJobs((current) => created ? [job, ...current] : current.map((item) => item.id === job.id ? job : item));
    setEditorOpen(false);
    setEditing(null);
    setFeedback(created ? 'Job opening added.' : 'Job opening updated.');
  }

  async function togglePublished(job: CareerJob) {
    setBusyId(job.id);
    setFeedback('');
    try {
      const response = await fetch(`/api/careers/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !job.published }),
      });
      const result = (await response.json().catch(() => ({}))) as { job?: CareerJob; error?: string };
      if (!response.ok || !result.job) throw new Error(result.error || 'Could not update this role.');
      setJobs((current) => current.map((item) => item.id === job.id ? result.job! : item));
      setFeedback(result.job.published ? 'Job published.' : 'Job moved to drafts.');
    } catch (reason) {
      setFeedback(reason instanceof Error ? reason.message : 'Could not update this role.');
    } finally {
      setBusyId('');
    }
  }

  async function confirmDelete() {
    if (!deleting) return;
    setBusyId(deleting.id);
    setFeedback('');
    try {
      const response = await fetch(`/api/careers/admin/jobs/${deleting.id}`, { method: 'DELETE' });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Could not delete this role.');
      setJobs((current) => current.filter((item) => item.id !== deleting.id));
      setDeleting(null);
      setFeedback('Job opening deleted.');
    } catch (reason) {
      setFeedback(reason instanceof Error ? reason.message : 'Could not delete this role.');
    } finally {
      setBusyId('');
    }
  }

  async function logout() {
    setLoggingOut(true);
    await fetch('/api/careers/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <>
      <CareersHero onManage={() => isAdmin ? document.getElementById('current-opportunities')?.scrollIntoView({ behavior: 'smooth' }) : setLoginOpen(true)} />

      <section id="current-opportunities" className="scroll-mt-24 border-b border-border bg-background py-10 sm:py-12 lg:py-14">
        <div className="container-shell">
          {isAdmin && <AdminToolbar username={adminUsername} onAdd={openNewJob} onLogout={logout} loggingOut={loggingOut} />}

          {feedback && (
            <div role="status" className="mb-5 rounded-[8px] border border-brand-blue/15 bg-brand-blue/[0.05] px-4 py-3 text-sm text-foreground dark:border-brand-blue-light/20 dark:bg-brand-blue-light/[0.06]">{feedback}</div>
          )}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge>{openCount} {openCount === 1 ? 'open role' : 'open roles'}</Badge>
              <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.25rem)] font-semibold tracking-[-0.04em] text-foreground">Current Opportunities</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">Find a role where practical thinking, dependable service and customer outcomes matter.</p>
            </div>
            {isAdmin && <Button onClick={openNewJob} className="self-start lg:self-auto">Add a new role</Button>}
          </div>

          <div className="mt-7">
            <JobFilters search={search} department={department} location={location} departments={departments} locations={locations} onSearch={setSearch} onDepartment={setDepartment} onLocation={setLocation} />
          </div>

          {visibleJobs.length ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {visibleJobs.map((job) => (
                <JobCard key={job.id} job={job} admin={isAdmin} busy={busyId === job.id} onEdit={() => openEdit(job)} onTogglePublished={() => togglePublished(job)} onDelete={() => setDeleting(job)} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[10px] border border-dashed border-border bg-muted/25 px-6 py-12 text-center">
              {jobs.length ? <SearchX size={30} className="mx-auto text-muted-foreground" /> : <BriefcaseBusiness size={30} className="mx-auto text-muted-foreground" />}
              <h3 className="mt-3 text-lg font-semibold text-foreground">{jobs.length ? 'No matching roles' : 'No roles are open right now'}</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{jobs.length ? 'Try a different search or clear one of the filters.' : 'Check back soon or send your profile to our team for future opportunities.'}</p>
              {jobs.length && <button type="button" onClick={() => { setSearch(''); setDepartment('all'); setLocation('all'); }} className="mt-4 text-sm font-semibold text-brand-blue dark:text-brand-blue-light">Clear filters</button>}
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/25 py-10 sm:py-12">
        <div className="container-shell">
          <div className="flex flex-col gap-6 rounded-[10px] border border-border bg-card p-6 shadow-card sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-2xl items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-brand-orange/10 text-brand-orange"><Mail size={20} /></span>
              <div><h2 className="text-xl font-semibold text-foreground sm:text-2xl">Don’t see the right role?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">Send your profile and a short note about the work you are looking for. We’ll keep it in mind for relevant opportunities.</p></div>
            </div>
            <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Career enquiry — Bhagyashree Ventures')}`} className={buttonVariants({ variant: 'outline', className: 'shrink-0' })}>Email your profile <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <AdminLoginDialog open={loginOpen} configured={adminConfigured} onClose={() => setLoginOpen(false)} onSuccess={() => { setLoginOpen(false); router.refresh(); }} />
      {editorOpen && <AdminJobEditor key={editing?.id ?? 'new-job'} job={editing} onClose={() => { setEditorOpen(false); setEditing(null); }} onSaved={jobSaved} />}
      <ConfirmDeleteDialog job={deleting} deleting={Boolean(deleting && busyId === deleting.id)} onCancel={() => !busyId && setDeleting(null)} onConfirm={confirmDelete} />
    </>
  );
}
