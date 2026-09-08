import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Barcode, CheckCircle2, Monitor, Radio, Tags } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { pricingRequestHref, siteConfig } from '@/lib/site';

const capabilityItems = [
  'Barcode printers & scanners',
  'Labels, tags & thermal ribbons',
  'RFID, mobile devices & POS',
  'Software, service & maintenance',
];

const solutionNodes = [
  {
    label: 'Barcode',
    detail: 'Printers & Scanners',
    icon: Barcode,
    tone: 'blue',
    position: 'left-[17%] top-[6%]',
    delay: '-0.8s',
  },
  {
    label: 'RFID',
    detail: 'Tags & Readers',
    icon: Radio,
    tone: 'orange',
    position: 'right-[10%] top-[12%]',
    delay: '-2.1s',
  },
  {
    label: 'Labeling',
    detail: 'Labels & Ribbons',
    icon: Tags,
    tone: 'orange',
    position: 'left-[2%] top-[33%]',
    delay: '-3.2s',
  },
  {
    label: 'POS',
    detail: 'Hardware & Software',
    icon: Monitor,
    tone: 'blue',
    position: 'right-0 top-[34%]',
    delay: '-1.5s',
  },
] as const;

export default function Hero() {
  return (
    <section className="brand-surface relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/35 via-transparent to-brand-orange/45" />

      <div className="container-shell relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:py-16 xl:gap-10 xl:py-20">
        <div className="max-w-3xl">
          <ScrollReveal delay={0.02}>
            <Badge>Barcode · Labeling · RFID · POS</Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.055}>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue/75 sm:text-[11px]">
              {siteConfig.tagline.split(' | ').map((part, index) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {index > 0 && <span className="text-brand-orange" aria-hidden="true">|</span>}
                  <span>{part}</span>
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.09}>
            <h1 className="max-w-3xl text-[clamp(2.55rem,5vw,4.95rem)] font-bold leading-[1.01] tracking-[-0.05em] text-foreground">
              Smart labeling.
              <span className="block brand-gradient-text">Seamless operations.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Bhagyashree Ventures helps businesses source and implement barcode, labeling, RFID and POS solutions with the hardware, consumables, software and support needed for practical operations.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.23}>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {capabilityItems.map((item, index) => (
                <div
                  key={item}
                  className="hero-capability flex items-center gap-2.5 text-sm font-medium text-foreground/85"
                  style={{ animationDelay: `${0.3 + index * 0.07}s` }}
                >
                  <CheckCircle2 size={17} className="shrink-0 text-brand-orange" />
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.34}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className={buttonVariants({ size: 'lg', className: 'group hero-cta w-full sm:w-auto' })}>
                Explore Products
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={pricingRequestHref} className={buttonVariants({ variant: 'outline', size: 'lg', className: 'hero-cta w-full sm:w-auto' })}>
                Get Pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={0.12}>
          <div className="relative mx-auto w-full max-w-[720px] overflow-hidden px-1 sm:overflow-visible sm:px-0 lg:mx-0 lg:ml-auto lg:-mr-4 xl:-mr-8">
            <div className="hero-glow-blue pointer-events-none absolute left-[9%] top-[8%] h-[72%] w-[78%] rounded-full bg-brand-blue/10 blur-[82px] dark:bg-brand-blue-light/8" />
            <div className="hero-glow-orange pointer-events-none absolute bottom-[8%] right-[3%] h-[38%] w-[40%] rounded-full bg-brand-orange/10 blur-[72px]" />

            <div className="relative aspect-[1.08/1] min-h-[290px] sm:aspect-[4/3] sm:min-h-[430px]">
              <div aria-hidden="true" className="hero-orbit hero-orbit-one hidden sm:block">
                <span className="hero-orbit-runner hero-orbit-runner-blue">
                  <span className="hero-orbit-dot hero-orbit-dot-blue" />
                </span>
                <span className="hero-orbit-runner hero-orbit-runner-blue hero-orbit-runner-offset">
                  <span className="hero-orbit-dot hero-orbit-dot-blue hero-orbit-dot-small" />
                </span>
              </div>

              <div aria-hidden="true" className="hero-orbit hero-orbit-two hidden sm:block">
                <span className="hero-orbit-runner hero-orbit-runner-orange">
                  <span className="hero-orbit-dot hero-orbit-dot-orange" />
                </span>
                <span className="hero-orbit-runner hero-orbit-runner-orange hero-orbit-runner-offset-alt">
                  <span className="hero-orbit-dot hero-orbit-dot-orange hero-orbit-dot-small" />
                </span>
              </div>

              <div className="hero-visual-float absolute inset-[4%_0_2%_0] z-10 sm:inset-[16%_3%_0_7%]">
                <Image
                  src="/images/home/hero-hardware-stack-v8.webp"
                  alt="Barcode printer, scanner, labels, POS terminal and RFID hardware"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-contain object-center drop-shadow-[0_28px_30px_rgba(7,17,38,0.16)]"
                />
              </div>

              {solutionNodes.map((node, index) => {
                const Icon = node.icon;
                const isOrange = node.tone === 'orange';

                return (
                  <div
                    key={node.label}
                    className={`hero-solution-node absolute z-20 hidden sm:block ${node.position}`}
                    style={{ animationDelay: node.delay }}
                  >
                    <div className="hero-solution-node-card flex min-w-[150px] items-center gap-2.5 rounded-[10px] border border-white/75 bg-white/90 px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-md sm:min-w-[178px] sm:px-3.5 sm:py-3">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-[8px] sm:h-11 sm:w-11 ${
                          isOrange
                            ? 'bg-brand-orange/10 text-brand-orange'
                            : 'bg-brand-blue/10 text-brand-blue dark:text-brand-blue-light'
                        }`}
                      >
                        <Icon size={21} strokeWidth={2.2} />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[13px] font-bold text-foreground sm:text-sm">{node.label}</span>
                        <span className="mt-0.5 hidden text-[10px] font-medium text-muted-foreground sm:block sm:text-[11px]">{node.detail}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 px-1 sm:hidden">
              {solutionNodes.map((node) => {
                const Icon = node.icon;
                const isOrange = node.tone === 'orange';
                return (
                  <div key={`mobile-${node.label}`} className="flex min-w-0 items-center gap-2 rounded-[8px] border border-border/90 bg-white/92 px-2.5 py-2 shadow-sm">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-[7px] ${isOrange ? 'bg-brand-orange/10 text-brand-orange-strong' : 'bg-brand-blue/8 text-brand-blue'}`}>
                      <Icon size={17} strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-foreground">{node.label}</span>
                      <span className="block truncate text-[9px] text-muted-foreground">{node.detail}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
