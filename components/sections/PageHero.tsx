import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: { label: string; href?: string }[];
  aside?: ReactNode;
  blendWithParent?: boolean;
}

export default function PageHero({ title, subtitle, eyebrow, breadcrumbs, aside, blendWithParent = false }: PageHeroProps) {
  const crumbs = [
    { label: 'Home', href: '/' },
    ...(breadcrumbs ?? [{ label: title }]),
  ];

  return (
    <section className={`${blendWithParent ? 'bg-transparent' : 'brand-surface'} relative overflow-hidden border-b border-border/80`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/35 via-transparent to-brand-orange/45" />
      <div className={`container-shell relative ${aside ? 'py-10 sm:py-12 lg:py-14' : 'py-12 sm:py-14 lg:py-16'}`}>
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={13} className="text-muted-foreground/60" />}
              {crumb.href && index < crumbs.length - 1 ? (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">{crumb.label}</Link>
              ) : (
                <span className={index === crumbs.length - 1 ? 'font-semibold text-foreground' : ''}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className={aside ? 'grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.92fr)] lg:gap-12' : undefined}>
          <ScrollReveal>
            <div>
              {eyebrow && <Badge className="mb-4">{eyebrow}</Badge>}
              <h1 className={`${aside ? 'max-w-3xl text-[clamp(2.3rem,4.25vw,4.15rem)]' : 'max-w-4xl text-[clamp(2.3rem,5vw,4.6rem)]'} font-bold leading-[1.02] tracking-[-0.045em] text-foreground`}>
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {subtitle}
                </p>
              )}
            </div>
          </ScrollReveal>

          {aside && (
            <ScrollReveal direction="left" delay={0.08}>
              {aside}
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
