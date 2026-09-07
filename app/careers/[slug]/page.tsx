import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { getJobBySlug } from '@/lib/server/careers-store';
import { siteConfig } from '@/lib/site';
import { buttonVariants } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: 'Career Opportunity Not Found' };
  return {
    title: `${job.title} | Careers`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

function employmentTypeSchema(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes('part')) return 'PART_TIME';
  if (normalized.includes('contract')) return 'CONTRACTOR';
  if (normalized.includes('intern')) return 'INTERN';
  return 'FULL_TIME';
}

function ListSection({ title, items, orange = false }: { title: string; items: string[]; orange?: boolean }) {
  if (!items.length) return null;
  return (
    <section className="border-t border-border pt-7">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
            <CheckCircle2 size={18} className={`mt-1 shrink-0 ${orange ? 'text-brand-orange' : 'text-brand-blue dark:text-brand-blue-light'}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CareerJobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const jobSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    employmentType: employmentTypeSchema(job.employmentType),
    hiringOrganization: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: siteConfig.address.city, addressRegion: siteConfig.address.state, addressCountry: 'IN' },
    },
  };

  return (
    <>
      <section className="brand-surface relative overflow-hidden border-b border-border">
        <div className="container-shell relative py-8 sm:py-10 lg:py-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/careers" className="hover:text-foreground">Careers</Link><ChevronRight size={14} /><span className="font-semibold text-foreground">{job.title}</span>
          </nav>
          <div className="mt-7 max-w-4xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange"><BriefcaseBusiness size={16} /> {job.department}</p>
            <h1 className="mt-3 text-[clamp(2.35rem,4.5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.05em] text-foreground">{job.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{job.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2"><MapPin size={15} /> {job.location}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2"><Clock3 size={15} /> {job.employmentType}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2"><BriefcaseBusiness size={15} /> {job.experience}</span>
            </div>
            <Link href={`/careers/${job.slug}/apply`} className={buttonVariants({ className: 'mt-6 w-full sm:w-auto lg:hidden' })}>Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-muted/25 py-10 sm:py-12 lg:py-14">
        <div className="container-shell grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <article className="space-y-7 rounded-[1.5rem] border border-border bg-card p-6 shadow-card sm:p-8">
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">About the role</h2>
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-muted-foreground">{job.description}</p>
            </section>
            <ListSection title="Responsibilities" items={job.responsibilities} />
            <ListSection title="Requirements" items={job.requirements} orange />
            <ListSection title="Nice to have" items={job.niceToHave} />
          </article>

          <aside className="rounded-[1.5rem] border border-brand-blue/15 bg-card p-6 shadow-card lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">Interested in this role?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">Apply to join our team.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Your application is tied to this role automatically. Have your resume ready in PDF, DOC or DOCX format.</p>
            <Link href={`/careers/${job.slug}/apply`} className={buttonVariants({ className: 'mt-6 w-full' })}>Apply Now <ArrowRight size={16} /></Link>
            <Link href="/careers" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"><ArrowLeft size={15} /> Back to all jobs</Link>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
    </>
  );
}
