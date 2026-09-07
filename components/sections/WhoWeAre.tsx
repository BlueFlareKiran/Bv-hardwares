import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Boxes, LifeBuoy, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

const strengths = [
  {
    icon: Boxes,
    title: 'Complete portfolio',
    copy: 'Hardware, consumables, software and service options planned together.',
  },
  {
    icon: Workflow,
    title: 'Workflow-first selection',
    copy: 'Recommendations based on print, scan, media, connectivity and operating needs.',
  },
  {
    icon: LifeBuoy,
    title: 'Ongoing support',
    copy: 'Assistance with product selection, setup, consumables and service enquiries.',
  },
];

export default function WhoWeAre() {
  return (
    <section className="section-space border-b border-border bg-background">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal direction="right">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border/90 bg-muted shadow-[0_30px_80px_-50px_rgba(7,17,38,0.42)]">
              <Image
                src="/images/home/about-business-solutions.webp"
                alt="Industrial printer, barcode scanner, POS and RFID solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071126]/68 via-[#071126]/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[10px] border border-white/15 bg-[#071126]/82 p-4 text-white shadow-xl backdrop-blur-md sm:p-5">
                <p className="text-sm font-bold">Bhagyashree Ventures</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Barcode, labeling, POS, RFID, software and support solutions from Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.06}>
          <div>
            <Badge className="mb-4">About the business</Badge>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground">
              One partner for identification and labeling workflows.
            </h2>
            <p className="prose-copy mt-5">
              We provide barcode, labeling, POS and automation solutions that help businesses improve accuracy, efficiency and operational control. Our portfolio includes barcode printers, scanners, labels, ribbons, RFID devices, mobile computers, POS hardware and label-design software.
            </p>
            <p className="prose-copy mt-4">
              The focus is practical integration: choosing compatible hardware and media, fitting the solution to the workflow, and supporting the business after deployment.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {strengths.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="rounded-[10px] border border-border/90 bg-muted/45 p-4 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:bg-brand-blue/[0.035] dark:hover:border-brand-blue-light/20 dark:hover:bg-brand-blue-light/[0.04]">
                  <Icon size={19} className="text-brand-orange" />
                  <h3 className="mt-3 text-sm font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/about" className={buttonVariants({ variant: 'outline' })}>
                More about Bhagyashree Ventures <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
