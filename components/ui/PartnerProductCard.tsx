import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PartnerProduct } from '@/lib/data/partners';
import { pricingRequestHref } from '@/lib/site';

interface PartnerProductCardProps {
  product: PartnerProduct;
}

export default function PartnerProductCard({ product }: PartnerProductCardProps) {
  const detailHref = `/partners/hprt/products/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-[26px] bg-card p-3.5 shadow-[0_10px_34px_-28px_rgba(15,23,42,.30)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_62px_-32px_rgba(15,40,105,.30)] sm:p-4">
      <Link
        href={detailHref}
        aria-label={`View details for ${product.name}`}
        className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220] focus-visible:ring-offset-2"
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_58%,#f1f5f9_100%)] dark:bg-[linear-gradient(145deg,#111827_0%,#0f172a_58%,#111827_100%)]">
        <Image
          src={product.image}
          alt={`${product.name} HPRT product`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.045] sm:p-6"
        />
        <span className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1.5 text-xs font-extrabold text-[#d86c0e] shadow-[0_8px_18px_-10px_rgba(15,23,42,.30)] backdrop-blur-sm dark:text-orange-300">
          HPRT
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5 sm:px-1.5">
        <h3 className="text-xl font-extrabold leading-tight tracking-[-0.035em] text-foreground sm:text-[1.4rem]">
          {product.name}
        </h3>

        <p className="mt-2.5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {product.summary}
        </p>

        {product.specs.length > 0 ? (
          <div className="relative z-20 mt-4 flex flex-wrap gap-2">
            {product.specs.slice(0, 3).map((spec) => (
              <span
                key={`${product.id}-${spec.label}`}
                className="inline-flex min-h-9 items-center rounded-xl bg-muted/65 px-3 py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-muted"
                title={`${spec.label}: ${spec.value}`}
              >
                {spec.value}
              </span>
            ))}
          </div>
        ) : null}

        <div className="relative z-20 mt-auto flex items-center gap-3 pt-6">
          <Link
            href={pricingRequestHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_-12px_rgba(255,92,0,.72)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-brand-orange-strong hover:shadow-[0_14px_28px_-12px_rgba(255,92,0,.86)]"
          >
            Get pricing <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <Link
            href={detailHref}
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm font-bold text-[#d86c0e] transition-colors hover:bg-[#f58220]/8 hover:text-[#bb5709] dark:text-orange-300"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
