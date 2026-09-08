import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Boxes, CalendarDays, Crown, Handshake, Headphones, MapPin, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PartnersHeroVisual from '@/components/sections/PartnersHeroVisual';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { epsonPartner, hprtPartner, hprtProducts } from '@/lib/data/partners';
import { siteConfig } from '@/lib/site';

const partnershipBenefits = [
  { label: 'Premium brand relationships', icon: BadgeCheck },
  { label: 'Dedicated local guidance', icon: Headphones },
  { label: 'Long-term support', icon: Handshake },
];

export const metadata: Metadata = {
  title: 'Technology Partners',
  description:
    'Explore Bhagyashree Ventures technology relationships, including the premium exclusive HPRT portfolio and recognition as an Epson System Integrator.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Technology Partners | Bhagyashree Ventures',
    description:
      'Premium HPRT printing and AIDC solutions alongside Bhagyashree Ventures’ recognition as an Epson System Integrator.',
    url: '/partners',
  },
};

export default function PartnersPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Technology Partners', item: `${siteConfig.url}/partners` },
    ],
  };

  return (
    <>
      <main className="brand-surface relative overflow-hidden border-b border-border">
        <div className="container-shell relative py-9 sm:py-11 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 xl:gap-12">
            <ScrollReveal>
              <div className="max-w-[620px]">
                <Badge className="mb-4">Technology partnerships</Badge>
                <h1 className="text-[clamp(2.5rem,4.35vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-foreground">
                  Global technology.
                  <span className="block brand-gradient-text">Local support.</span>
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-7">
                  We work with technology brands whose printing and AIDC products complement the solutions we support locally, helping customers move from product selection to deployment with clearer guidance.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {partnershipBenefits.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Icon size={17} strokeWidth={2.15} className="text-brand-orange" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <Link href="#partner-portfolio" className={buttonVariants({ className: 'min-w-[180px]' })}>
                    Meet Our Partners <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.05}>
              <PartnersHeroVisual />
            </ScrollReveal>
          </div>
        </div>
      </main>

      <section id="partner-portfolio" className="section-space scroll-mt-24 border-b border-border bg-background">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-8 max-w-3xl">
              <Badge>Premium Exclusive Partner</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-bold tracking-[-0.04em] text-foreground">HPRT, our premium exclusive technology partner.</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">A dedicated HPRT portfolio with priority product guidance, local pricing support and assistance across barcode printers, industrial/RFID printers and scanners.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid overflow-hidden rounded-[10px] border border-border/90 bg-card shadow-card lg:grid-cols-[.78fr_1.22fr]">
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-border/80 bg-[radial-gradient(circle_at_30%_20%,rgba(245,130,32,.14),transparent_42%),linear-gradient(145deg,#fff,#f5f7fb)] p-10 dark:bg-slate-50 lg:border-b-0 lg:border-r">
                <Image src={hprtPartner.logo} alt="HPRT" width={454} height={98} className="h-auto w-[225px] -translate-y-5 object-contain sm:w-[270px] lg:-translate-y-7" />
              </div>

              <div className="p-7 sm:p-9 lg:p-11">
                <div className="flex justify-end">
                  <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#f58220]/20 bg-[#f58220]/[0.08] px-3 py-1.5 text-xs font-bold text-[#c96512] dark:text-orange-300">
                    <Crown size={15} /> Premium Exclusive Partner
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">
                  <Sparkles size={14} /> Bhagyashree Ventures × HPRT
                </div>
                <h3 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-foreground">{hprtPartner.name}</h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{hprtPartner.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[10px] border border-border bg-muted/40 p-4"><Boxes size={20} className="text-brand-blue" /><p className="mt-2 text-lg font-bold text-foreground">{hprtProducts.length}</p><p className="text-xs text-muted-foreground">catalogued product families</p></div>
                  <div className="rounded-[10px] border border-border bg-muted/40 p-4"><ShieldCheck size={20} className="text-[#f58220]" /><p className="mt-2 font-bold text-foreground">India portfolio</p><p className="text-xs text-muted-foreground">premium exclusive partner portfolio</p></div>
                  <div className="rounded-[10px] border border-border bg-muted/40 p-4"><Headphones size={20} className="text-brand-blue" /><p className="mt-2 font-bold text-foreground">Local enquiry</p><p className="text-xs text-muted-foreground">pricing and product guidance</p></div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/partners/hprt" className={buttonVariants({ variant: 'secondary' })}>Explore HPRT <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space border-b border-border bg-muted/30">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-8 max-w-3xl">
              <Badge>Certified Technology Partner</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-foreground">
                Epson System Integrator
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                A distinct system-integration recognition supporting Epson-based printing and point-of-sale solutions for business workflows.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.04}>
            <article className="grid overflow-hidden rounded-[10px] border border-blue-200/80 bg-white shadow-[0_26px_70px_-44px_rgba(18,55,165,.4)] lg:grid-cols-[.72fr_1.28fr]">
              <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden border-b border-blue-100 bg-[linear-gradient(145deg,#eef4ff,#ffffff)] p-8 lg:min-h-[320px] lg:border-b-0 lg:border-r">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-blue-400 to-transparent" />
                <Image
                  src={epsonPartner.logo}
                  alt="Epson"
                  width={240}
                  height={112}
                  className="h-auto w-[180px] object-contain sm:w-[210px]"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-[7px] border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-brand-blue">
                  <BadgeCheck size={15} aria-hidden="true" /> {epsonPartner.relationshipLabel}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">
                  <Printer size={15} aria-hidden="true" /> Bhagyashree Ventures × Epson
                </div>
                <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.65rem)] font-bold tracking-[-0.035em] text-foreground">
                  Recognized Epson System Integrator
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{epsonPartner.description}</p>

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[10px] border border-border bg-muted/35 p-4">
                    <BadgeCheck size={19} className="text-brand-blue" aria-hidden="true" />
                    <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Status</dt>
                    <dd className="mt-1 font-semibold text-foreground">System Integrator</dd>
                  </div>
                  <div className="rounded-[10px] border border-border bg-muted/35 p-4">
                    <MapPin size={19} className="text-brand-blue" aria-hidden="true" />
                    <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Location</dt>
                    <dd className="mt-1 font-semibold text-foreground">{epsonPartner.location}</dd>
                  </div>
                  <div className="rounded-[10px] border border-border bg-muted/35 p-4">
                    <CalendarDays size={19} className="text-brand-blue" aria-hidden="true" />
                    <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Valid period</dt>
                    <dd className="mt-1 font-semibold text-foreground">{epsonPartner.validPeriod}</dd>
                  </div>
                </dl>

                <div className="mt-7">
                  <Link href="/about#epson-system-integrator" className={buttonVariants({ variant: 'outline' })}>
                    View recognition <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
