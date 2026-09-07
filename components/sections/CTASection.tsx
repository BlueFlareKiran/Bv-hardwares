import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { pricingRequestHref, siteConfig } from '@/lib/site';

export default function CTASection({ blendWithParent = false }: { blendWithParent?: boolean } = {}) {
  return (
    <section className={`section-space ${blendWithParent ? 'bg-transparent' : 'bg-background'}`}>
      <div className="container-shell">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#0a237c_0%,#1237a5_58%,#173fba_100%)] px-6 py-10 text-white shadow-[0_34px_90px_-48px_rgba(18,55,165,0.9)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/25 via-white/5 to-orange-300/45" />
            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-white/8 blur-2xl" />
            <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-brand-orange/22 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Need help choosing?</p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                  Tell us the workflow. We&apos;ll help narrow the options.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  Share the application, volume, label or media requirement, connectivity and operating environment. We&apos;ll respond with suitable product options and current availability.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={pricingRequestHref} className={buttonVariants()}>
                  Get Pricing <ArrowRight size={16} />
                </Link>
                <a href={`tel:${siteConfig.phone.primaryE164}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-white/20 bg-white/9 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/14">
                  <Phone size={16} /> {siteConfig.phone.primaryDisplay}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-white/20 bg-white/9 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/14">
                  <Mail size={16} /> Email us
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
