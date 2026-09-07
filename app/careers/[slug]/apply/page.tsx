import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BriefcaseBusiness, ChevronRight, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import ApplicationForm from '@/components/careers/ApplicationForm';
import { getJobBySlug } from '@/lib/server/careers-store';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  return {
    title: job ? `Apply for ${job.title}` : 'Application Not Found',
    description: job ? `Submit your application for ${job.title} at Bhagyashree Ventures.` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function CareerApplicationPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <section className="brand-surface border-b border-border">
        <div className="container-shell py-7 sm:py-9">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/careers" className="hover:text-foreground">Careers</Link><ChevronRight size={14} /><Link href={`/careers/${job.slug}`} className="hover:text-foreground">{job.title}</Link><ChevronRight size={14} /><span className="font-semibold text-foreground">Apply</span>
          </nav>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-brand-orange">Application</p>
              <h1 className="mt-2 text-[clamp(2.15rem,4vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground">Apply for {job.title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">The selected role is already attached to this form. Complete your details and upload your resume.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-[7px] border border-border bg-card px-3 py-2"><MapPin size={14} /> {job.location}</span>
              <span className="inline-flex items-center gap-1.5 rounded-[7px] border border-border bg-card px-3 py-2"><Clock3 size={14} /> {job.employmentType}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/25 py-10 sm:py-12 lg:py-14">
        <div className="container-shell grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="rounded-[10px] border border-border bg-card p-5 shadow-card sm:p-8">
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-[10px] border border-border bg-card p-5 shadow-card">
              <span className="grid size-10 place-items-center rounded-[8px] bg-brand-blue/[0.08] text-brand-blue dark:text-brand-blue-light"><BriefcaseBusiness size={18} /></span>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{job.title}</h2>
              <p className="mt-1 text-sm font-medium text-brand-orange">{job.department}</p>
              <dl className="mt-4 space-y-3 text-sm"><div><dt className="text-muted-foreground">Experience</dt><dd className="mt-0.5 font-semibold text-foreground">{job.experience}</dd></div><div><dt className="text-muted-foreground">Employment</dt><dd className="mt-0.5 font-semibold text-foreground">{job.employmentType}</dd></div></dl>
            </div>
            <div className="rounded-[10px] border border-brand-blue/15 bg-brand-blue/[0.045] p-5 dark:border-brand-blue-light/15 dark:bg-brand-blue-light/[0.06]">
              <div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-blue dark:text-brand-blue-light" /><p className="text-sm leading-6 text-muted-foreground">Your information is used only to review your application and contact you about this role.</p></div>
            </div>
            <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Back to role details</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
