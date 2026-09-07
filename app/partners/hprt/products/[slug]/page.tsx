import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronRight, FileText } from 'lucide-react';
import PartnerProductCard from '@/components/ui/PartnerProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { buttonVariants } from '@/components/ui/Button';
import { hprtProductBySlug, hprtProductSlugs, hprtProducts } from '@/lib/data/partners';
import { pricingRequestHref, siteConfig } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return hprtProductSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = hprtProductBySlug[slug];
  if (!product) return { title: 'HPRT Product Not Found' };

  return {
    title: `${product.name} | HPRT Partner Products`,
    description: product.summary,
    alternates: { canonical: `/partners/hprt/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | HPRT | Bhagyashree Ventures`,
      description: product.summary,
      images: [{ url: product.image }],
    },
  };
}

export default async function HprtProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = hprtProductBySlug[slug];
  if (!product) notFound();

  const related = hprtProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `HPRT ${product.name}`,
    brand: { '@type': 'Brand', name: 'HPRT' },
    description: product.summary,
    image: `${siteConfig.url}${product.image}`,
    url: `${siteConfig.url}/partners/hprt/products/${product.slug}`,
  };

  return (
    <>
      <main className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(245,130,32,0.11),transparent_28rem),radial-gradient(circle_at_88%_8%,rgba(18,55,165,0.08),transparent_25rem)]" />
        <div className="container-shell relative py-8 sm:py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight size={14} />
            <Link href="/partners" className="hover:text-foreground">Partners</Link>
            <ChevronRight size={14} />
            <Link href="/partners/hprt" className="hover:text-foreground">HPRT</Link>
            <ChevronRight size={14} />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <ScrollReveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-slate-50 shadow-card">
                <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[#f58220]" />
                <Image src={product.image} alt={`HPRT ${product.name}`} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-8 sm:p-10" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#d86c0e] dark:text-orange-300">HPRT · {product.category}</p>
                <h1 className="mt-3 text-[clamp(2.5rem,5.5vw,4.4rem)] font-bold leading-[1] tracking-[-0.05em] text-foreground">{product.name}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{product.summary}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {product.specs.slice(0, 4).map((spec) => (
                    <div key={spec.label} className="rounded-[8px] border border-border bg-card p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{spec.label}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={pricingRequestHref} className={buttonVariants()}>Get Pricing <ArrowRight size={16} /></Link>
                  <Link href="/partners/hprt" className={buttonVariants({ variant: 'outline' })}>Back to HPRT</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <section className="section-space border-b border-border bg-background">
        <div className="container-shell grid gap-7 lg:grid-cols-[1fr_0.8fr]">
          <ScrollReveal>
            <div className="rounded-[10px] border border-border bg-card p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-brand-blue dark:text-brand-blue-light" />
                <h2 className="text-2xl font-bold tracking-[-0.03em] text-foreground">Catalogue specifications</h2>
              </div>
              <dl className="mt-6 divide-y divide-border">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid gap-1 py-4 sm:grid-cols-[0.42fr_0.58fr] sm:gap-6">
                    <dt className="text-sm font-semibold text-muted-foreground">{spec.label}</dt>
                    <dd className="text-sm font-bold leading-6 text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {product.catalogNote && (
                <div className="mt-5 rounded-[8px] border border-[#f58220]/20 bg-[#f58220]/[0.07] p-4 text-sm leading-6 text-muted-foreground">
                  <strong className="text-foreground">Catalogue note:</strong> {product.catalogNote}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="rounded-[10px] border border-border bg-muted/35 p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-foreground">Product highlights</h2>
              {product.highlights?.length ? (
                <ul className="mt-5 space-y-3">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f58220]/12 text-[#d86c0e]">
                        <Check size={13} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  The supplied catalogue does not provide additional feature detail beyond the specifications shown for this model family.
                </p>
              )}
              <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
                Product information on this page is based on the supplied HPRT India product catalogue. Confirm final configuration and availability with the BV Hardwares team before ordering.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-space bg-muted/25">
          <div className="container-shell">
            <ScrollReveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d86c0e] dark:text-orange-300">Related HPRT products</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-foreground">More in {product.category}</h2>
                </div>
                <Link href="/partners/hprt#hprt-products" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue dark:text-brand-blue-light">
                  <ArrowLeft size={15} /> View full HPRT portfolio
                </Link>
              </div>
            </ScrollReveal>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <PartnerProductCard key={item.id} product={item} />)}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  );
}
