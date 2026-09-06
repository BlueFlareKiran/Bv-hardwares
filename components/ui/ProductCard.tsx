'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Grid3X3, Printer, Usb } from 'lucide-react';
import type { Product } from '@/lib/data/products';
import { productDetails } from '@/lib/data/product-details';
import { pricingRequestHref } from '@/lib/site';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

type SpecChip = {
  label: string;
  icon: typeof Grid3X3;
};

const HARDWARE_CATEGORIES = new Set([
  'label-printer',
  'pos-printer',
  'rfid-printer',
  'bluetooth-printer',
  'wired-scanner',
  'wireless-scanner',
  'tabletop-scanner',
  'hht-mobile',
  'rfid-device',
]);

function compactModelName(name: string) {
  const cleaned = name
    .replace(/^(TSC|ZEBRA|Zebra|Citizen|CITIZEN|ARGOX|Argox|HPRT|EPSON|Epson|Honeywell|Newland|Bluebird|Urovo)\s+/i, '')
    .trim();

  if (cleaned.length <= 18) return cleaned;
  return undefined;
}

function compactResolution(value: string) {
  return value.split('(')[0].trim().replace(/dpi/gi, 'DPI');
}

function compactConnectivity(value: string) {
  const found: string[] = [];
  if (/USB/i.test(value)) found.push('USB');
  if (/Ethernet|LAN/i.test(value)) found.push('Ethernet');
  if (/Wi-?Fi/i.test(value)) found.push('Wi-Fi');
  if (/Bluetooth/i.test(value)) found.push('Bluetooth');
  if (/Serial|RS-232/i.test(value)) found.push('Serial');
  return found.slice(0, 2).join(' + ') || value.split(';')[0].trim();
}

function compactPrintMethod(value: string) {
  const direct = /direct thermal/i.test(value);
  const transfer = /thermal transfer/i.test(value);
  if (direct && transfer) return 'TT + Direct Thermal';
  if (transfer) return 'Thermal Transfer';
  if (direct) return 'Direct Thermal';
  return value;
}

function getSpecChips(productId: string): SpecChip[] {
  const details = productDetails[productId];
  if (!details) return [];

  const resolution = details.specifications.find((spec) => /resolution/i.test(spec.label));
  const connectivity = details.specifications.find((spec) => /connectivity|interface/i.test(spec.label));
  const printMethod = details.specifications.find((spec) => /print method/i.test(spec.label));

  const chips: SpecChip[] = [];
  if (resolution) chips.push({ label: compactResolution(resolution.value), icon: Grid3X3 });
  if (connectivity) chips.push({ label: compactConnectivity(connectivity.value), icon: Usb });
  if (printMethod) chips.push({ label: compactPrintMethod(printMethod.value), icon: Printer });

  return chips.slice(0, 3);
}

export default function ProductCard({ product, categorySlug }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const detailsHref = `/products/${categorySlug}/${product.id}`;
  const modelName = HARDWARE_CATEGORIES.has(categorySlug) ? compactModelName(product.name) : undefined;
  const specChips = getSpecChips(product.id);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="group relative flex h-full flex-col rounded-[26px] bg-card p-3.5 shadow-[0_10px_34px_-28px_rgba(15,23,42,.30)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_26px_62px_-32px_rgba(15,40,105,.30)] sm:p-4"
    >
      <Link
        href={detailsHref}
        aria-label={`View details for ${product.name}`}
        className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_58%,#f1f5f9_100%)] dark:bg-[linear-gradient(145deg,#111827_0%,#0f172a_58%,#111827_100%)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.045] sm:p-6"
        />

        {modelName ? (
          <span className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold tracking-[-0.01em] text-foreground shadow-[0_8px_18px_-10px_rgba(15,23,42,.30)] backdrop-blur-sm">
            {modelName}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5 sm:px-1.5">
        <h2 className="text-xl font-bold leading-tight tracking-[-0.035em] text-foreground sm:text-[1.4rem]">
          {product.name}
        </h2>

        <p className="mt-2.5 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {product.description ?? 'Product details and suitability information are available on request.'}
        </p>

        {specChips.length ? (
          <div className="relative z-20 mt-4 flex flex-wrap gap-2">
            {specChips.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex min-h-9 items-center gap-2 rounded-xl bg-muted/65 px-3 py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-muted"
              >
                <Icon size={14} strokeWidth={2.1} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        ) : null}

        <div className="relative z-20 mt-auto flex items-center gap-3 pt-6">
          <Link
            href={pricingRequestHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_-12px_rgba(255,92,0,.72)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-brand-orange-strong hover:shadow-[0_14px_28px_-12px_rgba(255,92,0,.86)]"
          >
            Get pricing <ArrowRight size={16} />
          </Link>

          <Link
            href={detailsHref}
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-orange/5 hover:text-brand-orange-strong"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
