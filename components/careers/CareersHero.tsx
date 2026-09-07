'use client';

import Link from 'next/link';
import { BriefcaseBusiness, Building2, ChevronRight, LockKeyhole, Network, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const highlights = [
  { icon: Building2, label: 'Base', value: 'Bengaluru' },
  { icon: UsersRound, label: 'Team', value: 'Growing with purpose' },
  { icon: Network, label: 'Work', value: 'Technology & Business Operations' },
];

export default function CareersHero({ onManage }: { onManage: () => void }) {
  return (
    <section className="brand-surface relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/35 via-transparent to-brand-orange/45" />
      <div className="container-shell relative py-8 sm:py-10 lg:py-12">
        <div className="flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <span className="font-semibold text-foreground">Careers</span>
          </nav>
          <button type="button" onClick={onManage} className="inline-flex items-center gap-1.5 rounded-[7px] px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <LockKeyhole size={13} aria-hidden="true" /> Manage Careers
          </button>
        </div>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(330px,.8fr)] lg:gap-12">
          <div>
            <Badge>Careers at Bhagyashree Ventures</Badge>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-orange">
              <BriefcaseBusiness size={17} aria-hidden="true" /> Practical work. Real customer impact.
            </div>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.25rem,4.5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground">
              Build solutions that keep businesses moving.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Work across barcode, RFID, labeling, POS, automatic identification and enterprise hardware solutions used in day-to-day business operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map(({ icon: Icon, label, value }) => (
              <div key={label} className={`${label === 'Work' ? 'col-span-2 sm:col-span-1' : ''} flex items-center gap-3 rounded-[10px] border border-border/90 bg-card/80 p-4 shadow-[0_18px_45px_-38px_rgba(7,17,38,.55)] backdrop-blur`}>
                <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-brand-blue/[0.08] text-brand-blue dark:bg-brand-blue-light/[0.1] dark:text-brand-blue-light">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
