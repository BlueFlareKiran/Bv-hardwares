import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ChevronRight,
  Handshake,
  HeartHandshake,
  LifeBuoy,
  Lightbulb,
  MapPin,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import LogoMarquee from '@/components/sections/LogoMarquee';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { buttonVariants } from '@/components/ui/Button';
import { mission, values, vision } from '@/lib/data/about';
import { googleMapsSearchUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Bhagyashree Ventures',
  description:
    'Learn how Bhagyashree Ventures supports barcode, labeling, RFID, POS and automatic-identification requirements from Bengaluru.',
  alternates: { canonical: '/about' },
};

const valueIcons = {
  BadgeCheck,
  Handshake,
  HeartHandshake,
  LifeBuoy,
  Lightbulb,
  ShieldCheck,
};

const approach = [
  {
    icon: Workflow,
    title: 'Understand the workflow',
    copy: 'We start with what needs to be printed, scanned, tagged or tracked, and where the equipment will operate.',
  },
  {
    icon: PackageSearch,
    title: 'Narrow the product options',
    copy: 'We compare suitable product categories, media types, connectivity and software requirements before quotation.',
  },
  {
    icon: LifeBuoy,
    title: 'Support the deployment',
    copy: 'We can assist with setup requirements, consumable matching, software enquiries and service needs after purchase.',
  },
];

const certification = {
  number: '09115323A',
  standard: 'ISO 9001:2015',
  initialRegistration: '01 September 2026',
  recertificationDue: '31 August 2029',
  scope: 'Trading and supply of self-adhesive labels, thermal transfer ribbon, printer and scanner.',
  pdf: '/certificates/bhagyashree-ventures-iso-9001-2015.pdf',
  preview: '/images/certificates/bhagyashree-ventures-iso-9001-2015.webp',
};

export default function AboutPage() {
  return (
    <>
      <main className="brand-surface relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/40 via-transparent to-brand-orange/45" />
        <div className="container-shell relative py-10 sm:py-14 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-foreground">About</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14">
            <ScrollReveal>
              <div>
                <Badge className="mb-4">About Bhagyashree Ventures</Badge>
                <h1 className="max-w-3xl text-[clamp(2.55rem,5vw,4.75rem)] font-bold leading-[1.01] tracking-[-0.05em] text-foreground">
                  Your trusted partner in
                  <span className="block brand-gradient-text">barcode, labeling & POS.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  We help businesses improve accuracy, efficiency and control with barcode printers, scanners, labels, ribbons, RFID, POS hardware, software and practical support.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-foreground/80">
                  <span>Hardware</span>
                  <span className="text-brand-orange">•</span>
                  <span>Consumables</span>
                  <span className="text-brand-orange">•</span>
                  <span>Software</span>
                  <span className="text-brand-orange">•</span>
                  <span>Support</span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/products" className={buttonVariants({ size: 'lg' })}>
                    Explore Products <ArrowRight size={17} />
                  </Link>
                  <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.06}>
              <div className="relative overflow-hidden rounded-[10px] border border-border/90 bg-card p-6 shadow-[0_35px_90px_-54px_rgba(7,17,38,.46)] sm:p-7 lg:p-8">
                <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-brand-orange/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 size-72 rounded-full bg-brand-blue/8 blur-3xl dark:bg-brand-blue-light/7" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Why businesses choose BV Hardwares</p>
                  <h2 className="mt-3 max-w-xl text-[clamp(1.65rem,3vw,2.45rem)] font-bold leading-[1.08] tracking-[-0.035em] text-foreground">
                    Practical solutions with quality, guidance and support built in.
                  </h2>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[10px] border border-border bg-background/75 p-4">
                      <Boxes size={20} className="text-brand-blue dark:text-brand-blue-light" />
                      <p className="mt-3 text-sm font-bold text-foreground">Complete portfolio</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Hardware, consumables and software planned together.</p>
                    </div>
                    <div className="rounded-[10px] border border-border bg-background/75 p-4">
                      <Sparkles size={20} className="text-brand-orange" />
                      <p className="mt-3 text-sm font-bold text-foreground">Practical integration</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Solutions matched to real operating workflows.</p>
                    </div>
                    <div className="rounded-[10px] border border-border bg-background/75 p-4">
                      <LifeBuoy size={20} className="text-brand-blue dark:text-brand-blue-light" />
                      <p className="mt-3 text-sm font-bold text-foreground">Ongoing support</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Selection, setup, consumables and service assistance.</p>
                    </div>
                    <div className="rounded-[10px] border border-border bg-background/75 p-4">
                      <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400" />
                      <p className="mt-3 text-sm font-bold text-foreground">Certified quality</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Quality Management System certified to {certification.standard}.</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-[8px] bg-muted/45 px-4 py-3">
                      <MapPin size={18} className="shrink-0 text-brand-blue dark:text-brand-blue-light" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Location</p>
                        <p className="mt-0.5 text-sm font-bold text-foreground">Bengaluru, India</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-[8px] bg-muted/45 px-4 py-3">
                      <BadgeCheck size={18} className="shrink-0 text-brand-orange" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Quality standard</p>
                        <p className="mt-0.5 text-sm font-bold text-foreground">{certification.standard}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <section className="section-space border-b border-border bg-background">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <ScrollReveal>
            <div>
              <Badge>Who we are</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.45rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground">
                Technology is useful only when the complete workflow works.
              </h2>
              <p className="prose-copy mt-5">
                Bhagyashree Ventures provides barcode, labeling, POS and automation solutions designed to improve operational accuracy, efficiency and control. The portfolio spans printers, scanners, labels, ribbons, RFID devices, mobile computers, POS hardware and label-design software.
              </p>
              <p className="prose-copy mt-4">
                Our focus is on bringing hardware, media and software together for the application, then supporting customers with product selection, setup requirements, consumables and service needs after deployment.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={googleMapsSearchUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
                  <MapPin size={16} /> Bengaluru office
                </a>
                <Link href="/contact" className={buttonVariants({ variant: 'ghost' })}>
                  Contact us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-muted shadow-soft">
              <Image
                src="/images/about-workflow-solutions.webp"
                alt="Industrial barcode printer, scanner, POS terminal and RFID solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,#f6f8ff_0%,#ffffff_52%,#fff8f3_100%)] py-16 text-foreground sm:py-20 lg:py-24 dark:border-white/10 dark:bg-[linear-gradient(180deg,#071126_0%,#050b18_100%)] dark:text-white">
        <div className="pointer-events-none absolute -left-24 top-16 size-80 rounded-full bg-brand-blue/10 blur-3xl dark:bg-brand-blue/20" />
        <div className="pointer-events-none absolute -right-20 bottom-12 size-72 rounded-full bg-brand-orange/10 blur-3xl dark:bg-brand-orange/15" />

        <div className="container-shell relative">
          <ScrollReveal>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <div className="max-w-4xl">
                <Badge>Mission · Vision · Values</Badge>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.55rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground dark:text-white">
                  Built around reliability, service and <span className="brand-gradient-text">long-term partnerships.</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground dark:text-slate-300">
                Three principles guide how we select technology, support operations and build dependable customer relationships.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <ScrollReveal delay={0.02} className="lg:col-span-5">
              <Card className="group relative isolate h-full min-h-[500px] overflow-hidden border-orange-200/80 bg-white p-0 text-foreground shadow-[0_28px_70px_-44px_rgba(249,115,22,.34)] dark:border-orange-300/15 dark:bg-[#071126] dark:text-white dark:shadow-[0_30px_80px_-46px_rgba(249,115,22,.42)]">
                <Image
                  src="/images/about-mission-v2.webp"
                  alt="Team collaborating around operational plans"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="-z-20 object-cover object-center brightness-[0.9] saturate-[0.96] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,.2)_0%,rgba(255,255,255,.58)_44%,rgba(255,255,255,.985)_100%)] dark:bg-[linear-gradient(180deg,rgba(5,11,24,.82)_0%,rgba(5,11,24,.52)_42%,rgba(5,11,24,.92)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-orange-300 to-transparent" />
                <div className="flex min-h-[500px] flex-col p-7 sm:p-8">
                  <div className="inline-flex size-12 items-center justify-center rounded-[10px] border border-orange-200 bg-orange-50/90 text-brand-orange shadow-sm backdrop-blur-md dark:border-orange-200/25 dark:bg-orange-400/15 dark:text-orange-200">
                    <Sparkles size={22} />
                  </div>
                  <div className="mt-auto max-w-md rounded-[10px] border border-white/85 bg-white/90 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,.34)] backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-[#050b18]/70 dark:shadow-none">
                    <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-orange dark:text-orange-300">Mission</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-[1.7rem] dark:text-white">Improve accuracy and simplify workflows.</h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground dark:text-slate-200">{mission}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.06} className="lg:col-span-7">
              <Card className="group relative isolate h-full min-h-[500px] overflow-hidden border-blue-200/80 bg-white p-0 text-foreground shadow-[0_28px_70px_-44px_rgba(37,99,235,.32)] dark:border-blue-300/15 dark:bg-[#071126] dark:text-white dark:shadow-[0_30px_80px_-46px_rgba(59,130,246,.48)]">
                <Image
                  src="/images/about-vision-v2.webp"
                  alt="Business leader looking toward future growth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="-z-20 object-cover object-center brightness-[0.8] saturate-[0.94] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(255,255,255,.95)_0%,rgba(255,255,255,.84)_44%,rgba(226,232,240,.34)_100%)] dark:bg-[linear-gradient(100deg,rgba(5,11,24,.94)_0%,rgba(5,11,24,.76)_48%,rgba(7,35,83,.28)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue-light via-cyan-300 to-transparent" />
                <div className="flex min-h-[500px] flex-col p-7 sm:p-8">
                  <div className="inline-flex size-12 items-center justify-center rounded-[10px] border border-blue-200 bg-blue-50/90 text-brand-blue shadow-sm backdrop-blur-md dark:border-blue-200/25 dark:bg-blue-400/15 dark:text-blue-200">
                    <BadgeCheck size={22} />
                  </div>
                  <div className="mt-auto max-w-xl rounded-[10px] border border-white/85 bg-white/90 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,.34)] backdrop-blur-md sm:p-6 dark:border-white/10 dark:bg-[#050b18]/70 dark:shadow-none">
                    <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-blue dark:text-blue-200">Vision</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-[1.7rem] dark:text-white">Be the trusted operating partner.</h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground dark:text-slate-200">{vision}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:col-span-12">
              <Card className="group relative isolate min-h-[540px] overflow-hidden border-emerald-200/80 bg-white p-0 text-foreground shadow-[0_28px_70px_-44px_rgba(16,185,129,.28)] dark:border-emerald-300/15 dark:bg-[#071126] dark:text-white dark:shadow-[0_30px_80px_-46px_rgba(16,185,129,.38)]">
                <Image
                  src="/images/about-values-v2.webp"
                  alt="Business partners completing a trusted agreement"
                  fill
                  sizes="100vw"
                  className="-z-20 object-cover object-center brightness-[0.74] saturate-[0.9] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,.975)_0%,rgba(255,255,255,.92)_50%,rgba(226,232,240,.26)_100%)] dark:bg-[linear-gradient(90deg,rgba(5,11,24,.97)_0%,rgba(5,11,24,.88)_48%,rgba(5,11,24,.44)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-brand-orange" />
                <div className="p-7 sm:p-8 lg:p-10">
                  <div className="max-w-4xl">
                    <div className="inline-flex size-12 items-center justify-center rounded-[10px] border border-emerald-200 bg-emerald-50/90 text-emerald-700 shadow-sm backdrop-blur-md dark:border-emerald-200/25 dark:bg-emerald-400/15 dark:text-emerald-200">
                      <Handshake size={22} />
                    </div>
                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.13em] text-emerald-700 dark:text-emerald-200">Values</p>
                    <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-foreground dark:text-white">Trust that lasts beyond the sale.</h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {values.map((value) => {
                        const Icon = valueIcons[value.iconName as keyof typeof valueIcons] ?? ShieldCheck;
                        return (
                          <div key={value.title} className="flex gap-3 rounded-[10px] border border-slate-200/85 bg-white/88 p-4 shadow-[0_14px_36px_-30px_rgba(15,23,42,.38)] backdrop-blur-md dark:border-white/10 dark:bg-[#050b18]/68 dark:shadow-none">
                            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-brand-blue dark:bg-white/10 dark:text-cyan-200">
                              <Icon size={17} />
                            </span>
                            <div>
                              <p className="text-base font-bold text-foreground dark:text-white">{value.title}</p>
                              <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-slate-300">{value.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-space border-b border-border bg-background">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <ScrollReveal direction="right">
            <a
              href={certification.pdf}
              target="_blank"
              rel="noreferrer"
              className="group relative mx-auto block w-full max-w-[520px] overflow-hidden rounded-[10px] border border-border bg-white p-3 shadow-[0_28px_80px_-45px_rgba(7,17,38,.45)]"
              aria-label="Open Bhagyashree Ventures ISO 9001:2015 certificate"
            >
              <div className="relative aspect-[17/22] overflow-hidden rounded-[10px] bg-slate-50">
                <Image
                  src={certification.preview}
                  alt="Bhagyashree Ventures ISO 9001:2015 certificate preview"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.018]"
                />
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.05}>
            <div>
              <Badge>Quality & certification</Badge>
              <h2 className="mt-4 text-[clamp(2.15rem,4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.045em] text-foreground">
                {certification.standard} <span className="brand-gradient-text">Certified.</span>
              </h2>
              <p className="prose-copy mt-5 max-w-2xl">
                Bhagyashree Ventures operates under a certified Quality Management System covering the trading and supply of self-adhesive labels, thermal transfer ribbon, printers and scanners.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[10px] border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Certificate No.</p>
                  <p className="mt-1 font-bold text-foreground">{certification.number}</p>
                </div>
                <div className="rounded-[10px] border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Initial registration</p>
                  <p className="mt-1 font-bold text-foreground">{certification.initialRegistration}</p>
                </div>
                <div className="rounded-[10px] border border-border bg-muted/40 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Certified scope</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-foreground">{certification.scope}</p>
                </div>
                <div className="rounded-[10px] border border-border bg-muted/40 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Recertification due</p>
                  <p className="mt-1 font-bold text-foreground">{certification.recertificationDue}</p>
                </div>
              </div>

              <div className="mt-7">
                <a href={certification.pdf} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}>
                  View certificate <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space border-b border-border bg-muted/30">
        <div className="container-shell">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Badge>Our approach</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-foreground">
                Start with the application, not the model number.
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {approach.map(({ icon: Icon, title, copy }, index) => (
              <ScrollReveal key={title} delay={index * 0.04}>
                <Card className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex size-11 items-center justify-center rounded-[8px] bg-brand-blue/8 text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light">
                      <Icon size={21} />
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/20">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee />
      <CTASection />
    </>
  );
}
