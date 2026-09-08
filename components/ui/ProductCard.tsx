'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/data/products';
import { pricingRequestHref } from '@/lib/site';

interface ProductCardProps {
  product: Product;
  categoryLabel?: string;
}

export default function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-border/90 bg-card shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:border-brand-blue/20 hover:shadow-[0_28px_70px_-38px_rgba(18,55,165,0.38)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-brand-orange/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80 bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${product.imageFit === 'contain' ? 'object-contain p-3 sm:p-4' : 'object-cover'} object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {categoryLabel ? (
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">
            {categoryLabel}
          </p>
        ) : null}

        <h2 className="mt-2 text-xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-[1.35rem]">
          {product.name}
        </h2>

        <p className="mt-2.5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {product.description ?? 'Product suitability and current configuration information are available on request.'}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={pricingRequestHref}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_-12px_rgba(255,92,0,.72)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-brand-orange-strong hover:shadow-[0_14px_28px_-12px_rgba(255,92,0,.86)]"
          >
            Get pricing <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
