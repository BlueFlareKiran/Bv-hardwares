import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { industries } from '@/lib/data/home';

export default function IndustriesServed() {
  return (
    <section className="section-space border-b border-border bg-background">
      <div className="container-shell">
        <ScrollReveal>
          <div className="max-w-3xl">
            <Badge>Industries</Badge>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground">
              Solutions that fit real operating environments.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Barcode, labeling and data-capture requirements differ by workflow. We help match the product category to the actual environment and process.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {industries.map((industry, index) => {
            const isUnpairedLast = industries.length % 2 === 1 && index === industries.length - 1;

            return (
            <ScrollReveal
              key={industry.title}
              delay={index * 0.05}
              className={isUnpairedLast ? 'md:col-span-2 md:w-[calc(50%_-_0.625rem)] md:justify-self-center' : undefined}
            >
              <article className="group relative min-h-[340px] overflow-hidden rounded-[1.55rem] border border-border/90 bg-card shadow-card">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071126] via-[#071126]/58 to-[#071126]/3" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                    {industry.tag}
                    <ArrowUpRight size={13} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-[-0.025em]">{industry.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{industry.description}</p>
                </div>
              </article>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
