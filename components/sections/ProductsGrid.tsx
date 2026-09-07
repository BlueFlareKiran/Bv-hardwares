import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { productHighlights } from '@/lib/data/home';

const fullBleedProductHrefs = new Set([
  '/products/label-printer',
  '/products/wired-scanner',
  '/products/labels',
  '/products/pos-printer',
  '/products/labels/rfid-tags',
]);

export default function ProductsGrid() {
  return (
    <section className="section-space border-b border-border bg-muted/30">
      <div className="container-shell">
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge>Product portfolio</Badge>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.04em] text-foreground">
                Hardware and consumables built around your workflow.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Browse the core categories we support. Send us your requirement to confirm the right configuration, current availability and pricing.
              </p>
            </div>
            <Link href="/products" className={buttonVariants({ variant: 'outline' })}>
              View full catalog <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productHighlights.map((product, index) => {
            const usesFullBleedImage = fullBleedProductHrefs.has(product.href);

            return (
              <ScrollReveal key={product.title} delay={index * 0.045}>
                <Link
                  href={product.href}
                  className="group relative block h-full overflow-hidden rounded-[10px] border border-border/90 bg-card shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-brand-blue/20 hover:shadow-[0_28px_70px_-38px_rgba(18,55,165,0.38)] dark:hover:border-brand-blue-light/25"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-brand-orange/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80 bg-[linear-gradient(145deg,#fff_0%,#f7f9fd_100%)] dark:bg-slate-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={
                        usesFullBleedImage
                          ? 'object-cover object-center transition-[filter] duration-300 group-hover:brightness-[1.015]'
                          : 'object-contain object-center transition-[filter] duration-300 group-hover:brightness-[1.015]'
                      }
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue dark:text-brand-blue-light">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-foreground">{product.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange">
                      Explore category <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
