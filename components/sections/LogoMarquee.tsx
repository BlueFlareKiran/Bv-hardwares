import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { brandLogos } from '@/lib/data/brands';

export default function LogoMarquee() {
  return (
    <section className="section-space border-b border-border bg-muted/30">
      <div className="container-shell">
        <ScrollReveal>
          <div className="text-center">
            <Badge>Brands in the portfolio</Badge>
            <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(1.9rem,3.5vw,3rem)] font-bold tracking-[-0.035em] text-foreground">
              Established technology and media brands across our catalog.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Brand and model availability can vary. We confirm the current configuration, stock and warranty terms at the time of quotation.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brandLogos.map((brand, index) => {
            const isPremiumPartner = brand.name === 'HPRT';

            return (
              <ScrollReveal key={brand.name} delay={index * 0.025}>
                <div
                  className={`group relative flex min-h-24 h-full items-center justify-center rounded-[10px] border bg-white p-4 shadow-[0_16px_36px_-30px_rgba(7,17,38,0.42)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_-30px_rgba(18,55,165,0.32)] ${
                    isPremiumPartner
                      ? 'border-brand-orange/35 ring-1 ring-brand-orange/10 hover:border-brand-orange/55'
                      : 'border-border/90 hover:border-brand-blue/20'
                  }`}
                >
                  {isPremiumPartner ? (
                    <span className="absolute right-2.5 top-2.5 rounded-[7px] border border-brand-orange/20 bg-brand-orange/[0.08] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-brand-orange">
                      Exclusive
                    </span>
                  ) : null}
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={180}
                    height={70}
                    className="max-h-12 w-auto max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.035]"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        <p className="mt-5 text-center text-[11px] leading-5 text-muted-foreground">
          Brand names and logos are trademarks of their respective owners. Except where a partnership status is explicitly stated, their appearance identifies products represented in the catalog and does not by itself imply a specific authorization status.
        </p>
      </div>
    </section>
  );
}
