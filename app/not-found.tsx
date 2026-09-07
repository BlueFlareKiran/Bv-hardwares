import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-background px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-[10px] bg-brand-blue/10 text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light">
          <Search size={24} aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">This page could not be found.</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          The link may have changed during the website update. Use the product catalog or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants()}><ArrowLeft size={16} /> Back home</Link>
          <Link href="/products" className={buttonVariants({ variant: 'outline' })}>Browse products</Link>
        </div>
      </div>
    </section>
  );
}
