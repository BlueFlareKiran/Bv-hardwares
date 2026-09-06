'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { buttonVariants } from '@/components/ui/Button';
import { megaMenuColumns } from '@/lib/data/navigation';
import { cn } from '@/lib/utils';
import { pricingRequestHref, siteConfig } from '@/lib/site';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', mega: true },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMobileOpen(false);
      setProductsOpen(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const closeProductsSoon = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 140);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/75 bg-background/88 shadow-[0_12px_35px_-32px_rgba(7,17,38,0.65)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/82">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-brand-orange/20" />

        <div className="container-shell flex h-16 items-center justify-between gap-3 lg:h-[68px] lg:gap-5">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="group relative inline-flex shrink-0 items-center rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
          >
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-brand-blue/0 blur-xl transition-colors duration-300 group-hover:bg-brand-blue/6 dark:group-hover:bg-brand-blue-light/8" />
            <Image
              src={siteConfig.mark}
              alt="BV"
              width={559}
              height={385}
              priority
              loading="eager"
              unoptimized
              sizes="(max-width: 639px) 54px, (max-width: 1023px) 58px, 62px"
              className="relative h-auto w-[54px] object-contain transition-transform duration-300 group-hover:scale-[1.035] sm:w-[58px] lg:w-[62px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              if (item.mega) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openProducts}
                    onMouseLeave={closeProductsSoon}
                  >
                    <button
                      type="button"
                      suppressHydrationWarning
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      onClick={() => setProductsOpen((value) => !value)}
                      onFocus={openProducts}
                      className={cn(
                        'inline-flex h-10 items-center gap-1 rounded-xl px-3.5 text-sm font-semibold transition-[background-color,color,transform] duration-200',
                        active
                          ? 'bg-brand-blue/7 text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      Products
                      <ChevronDown
                        size={15}
                        className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}
                      />
                    </button>

                    <div className="absolute left-1/2 top-full mt-3 w-[860px] -translate-x-1/2">
                      <AnimatePresence>
                        {productsOpen && (
                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.988 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.992 }}
                            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden rounded-[1.35rem] border border-border/90 bg-card/98 p-5 text-card-foreground shadow-[0_28px_80px_-36px_rgba(7,17,38,0.48)] backdrop-blur-xl"
                            onMouseEnter={openProducts}
                            onMouseLeave={closeProductsSoon}
                          >
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/50 via-brand-blue/20 to-brand-orange/60" />
                            <div className="grid grid-cols-4 gap-5">
                              {megaMenuColumns.map((column) => (
                                <div key={column.heading}>
                                  <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-blue dark:text-brand-blue-light">
                                    {column.heading}
                                  </p>
                                  <ul className="space-y-1">
                                    {column.items.map((menuItem) => (
                                      <li key={menuItem.href}>
                                        <Link
                                          href={menuItem.href}
                                          className="block rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand-blue/[0.055] hover:text-foreground dark:hover:bg-brand-blue-light/[0.07]"
                                        >
                                          {menuItem.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                              <p className="text-sm text-muted-foreground">
                                Need help selecting a model? Share your use case with our team.
                              </p>
                              <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange transition-colors hover:text-brand-orange-strong">
                                View all products <ArrowRight size={15} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'inline-flex h-10 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-brand-blue/7 text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={pricingRequestHref}
              className={buttonVariants({ className: 'hidden lg:inline-flex' })}
            >
              Get Pricing
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              suppressHydrationWarning
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto border-b border-border bg-background/98 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="container-shell py-5">
                <nav className="space-y-1" aria-label="Mobile navigation">
                  <Link href="/" className="block rounded-xl px-3 py-3 font-semibold hover:bg-muted">Home</Link>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setMobileProductsOpen((value) => !value)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-semibold hover:bg-muted"
                    aria-expanded={mobileProductsOpen}
                  >
                    Products
                    <ChevronDown size={17} className={cn('transition-transform', mobileProductsOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                        className="ml-3 overflow-hidden border-l border-border pl-3"
                      >
                        <Link href="/products" className="block rounded-lg px-3 py-2 text-sm font-bold text-brand-orange">All product categories</Link>
                        {megaMenuColumns.flatMap((column) => column.items).map((item) => (
                          <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Link href="/partners" className="block rounded-xl px-3 py-3 font-semibold hover:bg-muted">Partners</Link>
                  <Link href="/about" className="block rounded-xl px-3 py-3 font-semibold hover:bg-muted">About</Link>
                  <Link href="/contact" className="block rounded-xl px-3 py-3 font-semibold hover:bg-muted">Contact Us</Link>
                </nav>

                <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  <a
                    href={`tel:${siteConfig.phone.primaryE164}`}
                    className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm font-semibold"
                  >
                    <Phone size={18} className="text-brand-orange" />
                    {siteConfig.phone.primaryDisplay}
                  </a>
                  <Link href={pricingRequestHref} className={buttonVariants({ className: 'w-full' })}>
                    Get Pricing <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
