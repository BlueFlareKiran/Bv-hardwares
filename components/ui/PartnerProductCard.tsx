import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PartnerProduct } from '@/lib/data/partners';
import { pricingRequestHref } from '@/lib/site';

interface PartnerProductCardProps {
  product: PartnerProduct;
}

export default function PartnerProductCard({ product }: PartnerProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-border/90 bg-card shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_28px_70px_-38px_rgba(18,55,165,0.38)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-brand-orange/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80 bg-white">
        <Image
          src={product.image}
          alt={`${product.name} HPRT product`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:p-4"
        />
        <span className="absolute right-3 top-3 rounded-[7px] bg-white/95 px-3 py-1.5 text-xs font-bold text-[#b85a0c] shadow-[0_8px_18px_-10px_rgba(15,23,42,.30)] backdrop-blur-sm">
          HPRT
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">
          {product.category}
        </p>

        <h3 className="mt-2 text-xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-[1.35rem]">
          {product.name}
        </h3>

        <p className="mt-2.5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {product.summary}
        </p>

        {product.specs.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.specs.slice(0, 3).map((spec) => (
              <span
                key={`${product.id}-${spec.label}`}
                className="inline-flex min-h-9 items-center rounded-[8px] bg-muted/65 px-3 py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-muted"
                title={`${spec.label}: ${spec.value}`}
              >
                {spec.value}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto pt-6">
          <Link
            href={pricingRequestHref}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-brand-orange px-4 py-2.5 text-sm font-bold text-brand-navy shadow-[0_10px_22px_-12px_rgba(214,166,58,.72)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-brand-orange-strong hover:shadow-[0_14px_28px_-12px_rgba(184,137,29,.78)]"
          >
            Get pricing <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
