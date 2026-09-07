import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Crown,
  Code2,
  MonitorCog,
  Printer,
  ScanLine,
  Tags,
} from 'lucide-react';
import PartnerProductCard from '@/components/ui/PartnerProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { buttonVariants } from '@/components/ui/Button';
import {
  hprtProductCategories,
  hprtProducts,
  partners,
  type PartnerProductCategory,
} from '@/lib/data/partners';
import { pricingRequestHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'HPRT Partner Products',
  description:
    'Explore HPRT desktop barcode printers, industrial and RFID printers, scanners and software support through Bhagyashree Ventures, presented as a premium exclusive partner portfolio.',
  alternates: { canonical: '/partners/hprt' },
};

const categoryMeta: Record<PartnerProductCategory, { description: string; icon: typeof Printer }> = {
  'Desktop Barcode Printers': {
    description: 'Desktop direct-thermal and thermal-transfer printers for labels, barcodes and day-to-day business printing.',
    icon: Printer,
  },
  'Industrial & RFID Printers': {
    description: 'Industrial barcode and RFID printing platforms for higher-duty manufacturing, logistics and warehouse environments.',
    icon: Tags,
  },
  Scanners: {
    description: 'Handheld, rugged and stationary 1D/2D scanners for retail, logistics, healthcare and industrial workflows.',
    icon: ScanLine,
  },
};

export default function HprtPartnerPage() {
  const hprt = partners.find((partner) => partner.slug === 'hprt')!;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(245,130,32,0.13),transparent_30rem),radial-gradient(circle_at_86%_10%,rgba(18,55,165,0.09),transparent_25rem)]" />
        <div className="container-shell relative py-9 sm:py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/partners" className="transition-colors hover:text-foreground">Partners</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-foreground">HPRT</span>
          </nav>

          <div className="mt-8 grid items-center gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-[7px] border border-[#f58220]/25 bg-[#f58220]/[0.08] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#c96512] dark:text-orange-300">
                  <Crown size={15} /> Premium Exclusive Partner
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <Image src={hprt.logo} alt="HPRT" width={454} height={98} className="h-auto w-[170px] sm:w-[210px]" />
                </div>
                <h1 className="mt-6 max-w-4xl text-[clamp(2.45rem,6vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.055em] text-foreground">
                  Printing and AIDC products for modern business workflows.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  As Bhagyashree Ventures’ premium exclusive partner portfolio, HPRT spans desktop barcode printers, industrial and RFID printers, handheld scanners and stationary scanners for retail, hospitality, healthcare, logistics, warehousing and manufacturing.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#hprt-products" className={buttonVariants({ variant: 'secondary' })}>
                    View HPRT Products <ArrowRight size={16} />
                  </a>
                  <Link href={pricingRequestHref} className={buttonVariants()}>
                    Get Pricing <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="relative mx-auto w-full max-w-[480px] rounded-[10px] border border-border/90 bg-card p-5 shadow-[0_30px_90px_-52px_rgba(7,17,38,0.55)] sm:p-7">
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-[10px] bg-[#f58220]" />
                <div className="grid grid-cols-2 gap-3">
                  {hprtProducts.slice(0, 4).map((product) => (
                    <div key={product.id} className="relative aspect-square overflow-hidden rounded-[8px] border border-border bg-slate-50 p-2">
                      <Image src={product.image} alt={product.name} fill sizes="220px" className="object-contain p-3" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{hprtProducts.length}</p>
                    <p className="text-xs text-muted-foreground">product families in this catalogue view</p>
                  </div>
                  <div className="rounded-[8px] bg-[#f58220]/10 p-3 text-[#d86c0e]">
                    <Printer size={24} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="hprt-products" className="section-space scroll-mt-24 border-b border-border bg-background">
        <div className="container-shell">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d86c0e] dark:text-orange-300">HPRT product portfolio</p>
              <h2 className="mt-3 text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold tracking-[-0.045em] text-foreground">
                Browse by product family.
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Product names, specifications and positioning below are taken from the supplied HPRT India product catalogue. Where the catalogue does not provide a dedicated specification sheet, the page clearly avoids inventing extra technical details.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 space-y-14">
            {hprtProductCategories.map((category) => {
              const products = hprtProducts.filter((product) => product.category === category);
              const meta = categoryMeta[category];
              const Icon = meta.icon;

              return (
                <section key={category} aria-labelledby={`hprt-${category.replace(/\W+/g, '-').toLowerCase()}`}>
                  <ScrollReveal>
                    <div className="mb-5 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex size-9 items-center justify-center rounded-[8px] bg-[#f58220]/10 text-[#d86c0e] dark:text-orange-300">
                            <Icon size={19} />
                          </span>
                          <h3 id={`hprt-${category.replace(/\W+/g, '-').toLowerCase()}`} className="text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
                            {category}
                          </h3>
                        </div>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{meta.description}</p>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{products.length} product families</span>
                    </div>
                  </ScrollReveal>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <PartnerProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-muted/25">
        <div className="container-shell">
          <ScrollReveal>
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d86c0e] dark:text-orange-300">Software & integration</p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.1rem)] font-bold tracking-[-0.04em] text-foreground">
                  More than hardware.
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                  The supplied HPRT catalogue also documents cross-platform SDK support, drivers for multiple operating systems and HereLabel label-design software.
                </p>
                <div className="mt-7 space-y-3">
                  <div className="flex gap-3 rounded-[8px] border border-border bg-card p-4">
                    <Code2 className="mt-0.5 shrink-0 text-brand-blue dark:text-brand-blue-light" size={20} />
                    <div>
                      <h3 className="font-bold text-foreground">Multi-platform SDK support</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">Android, iOS, PC, web, UNIAPP and WeChat applet development are shown in the catalogue.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-[8px] border border-border bg-card p-4">
                    <MonitorCog className="mt-0.5 shrink-0 text-brand-blue dark:text-brand-blue-light" size={20} />
                    <div>
                      <h3 className="font-bold text-foreground">Drivers & customization</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">Windows, Linux and macOS driver support plus OEM driver customization are listed.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[10px] border border-border bg-card shadow-card">
                <div className="relative min-h-[310px] bg-slate-50 sm:min-h-[390px]">
                  <Image src="/images/partners/hprt/herelabel.png" alt="HPRT HereLabel label design software" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-contain p-6 sm:p-8" />
                </div>
                <div className="border-t border-border p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-foreground">HereLabel label design software</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">The catalogue describes HereLabel as HPRT label-design software with free database access.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-background py-10 sm:py-12">
        <div className="container-shell">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[10px] border border-[#f58220]/25 bg-card p-6 shadow-card sm:p-8">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#f58220]/[0.08] to-transparent" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-foreground">Need help selecting an HPRT model?</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Share the application, print volume or scanning environment and we can narrow the relevant product family.</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link href={pricingRequestHref} className={buttonVariants()}>Get Pricing <ArrowRight size={16} /></Link>
                  <Link href="/contact" className={buttonVariants({ variant: 'outline' })}>Contact Us</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
