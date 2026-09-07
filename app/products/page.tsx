import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Layers3 } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { productCategories } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Products | Barcode, RFID, POS, Labels & Ribbons',
  description:
    'Browse Bhagyashree Ventures product categories including barcode printers, scanners, RFID devices, labels, ribbons, POS hardware, mobile computers, software and service.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  const categories = Object.values(productCategories);

  return (
    <>
      <div className="product-catalog-surface">
        <PageHero
          eyebrow="Product catalog"
          title="Barcode, labeling, RFID and POS product categories."
          subtitle="Choose a category to view the models and products represented in our catalog, then contact us for current configuration, availability and pricing."
          breadcrumbs={[{ label: 'Products' }]}
          blendWithParent
        />

        <section className="section-space border-b border-border/70 bg-transparent">
          <div className="container-shell">
            <ScrollReveal>
              <div className="max-w-2xl">
                <Badge>{categories.length} product categories</Badge>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-foreground">
                  Browse by requirement.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  From labels and ribbons to printers, scanners, RFID devices, software and technical service.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <ScrollReveal key={category.slug} delay={index * 0.035}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="group relative block h-full overflow-hidden rounded-[10px] border border-border/90 bg-white/88 shadow-card backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-brand-blue/20 hover:shadow-[0_28px_70px_-38px_rgba(18,55,165,0.38)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-brand-orange/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80 bg-white">
                      <Image
                        src={category.coverImage}
                        alt={category.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-brand-blue">
                          <Layers3 size={14} /> {category.products.length} items
                        </div>
                        <ArrowRight size={18} className="text-brand-orange transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-foreground">{category.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.subtitle}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <CTASection blendWithParent />
      </div>
    </>
  );
}
