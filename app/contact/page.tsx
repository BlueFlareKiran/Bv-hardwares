import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/ui/ContactForm';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { googleMapsSearchUrl, registeredOfficeMapsUrl, siteConfig, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Barcode, RFID & POS Solutions Team in Bengaluru',
  description:
    'Contact Bhagyashree Ventures in Bengaluru for barcode printers, scanners, RFID, POS, labels, ribbons, software and service enquiries.',
  alternates: { canonical: '/contact' },
};

const contactChannels = [
  {
    icon: Phone,
    title: 'Call us',
    value: siteConfig.phone.primaryDisplay,
    detail: 'For product pricing and support enquiries',
    href: `tel:${siteConfig.phone.primaryE164}`,
    action: 'Call sales desk',
  },
  {
    icon: Mail,
    title: 'Email',
    value: siteConfig.email,
    detail: 'Website enquiries are delivered to this mailbox',
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent('BV Hardwares Enquiry')}`,
    action: 'Send an email',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: siteConfig.phone.primaryDisplay,
    detail: 'Share your model, application or requirement',
    href: whatsappUrl('Hello Bhagyashree Ventures, I would like help with a product requirement.'),
    action: 'Start a conversation',
  },
  {
    icon: MapPin,
    title: 'Bengaluru office',
    value: 'Sheshadripuram',
    detail: 'Bengaluru – 560020, Karnataka',
    href: googleMapsSearchUrl,
    action: 'Open in Google Maps',
  },
];

const locations = [
  { label: 'Office address', address: siteConfig.address, href: googleMapsSearchUrl },
  { label: 'Registered office', address: siteConfig.registeredAddress, href: registeredOfficeMapsUrl },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const query = await searchParams;
  const requestedProduct = Array.isArray(query.product) ? query.product[0] : query.product;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what needs to be printed, scanned, tagged or tracked."
        subtitle="Use the enquiry form to prepare a complete email to our team, or contact us directly by phone, WhatsApp or email for product requirements."
        breadcrumbs={[{ label: 'Contact' }]}
        aside={
          <div className="group relative isolate min-h-[320px] overflow-hidden rounded-[10px] border border-brand-blue/15 bg-brand-navy shadow-[0_28px_70px_-42px_rgba(7,17,38,0.7)] sm:min-h-[360px]">
            <Image
              src="/images/contact-us.webp"
              alt="Direct phone, email and mobile support options"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="-z-20 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,17,38,0.05)_8%,rgba(7,17,38,0.38)_48%,rgba(7,17,38,0.94)_100%)]" />
            <div className="flex min-h-[320px] flex-col justify-end p-5 sm:min-h-[360px] sm:p-6">
              <div className="max-w-md rounded-[10px] border border-white/15 bg-brand-navy/75 p-5 text-white shadow-xl backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-300">
                  Direct assistance
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  Talk to the right team.
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Share your product, volume and application details. We’ll help narrow down the right setup.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={`tel:${siteConfig.phone.primaryE164}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-brand-navy transition hover:bg-orange-50"
                  >
                    <Phone size={16} aria-hidden="true" /> Call us
                  </a>
                  <a
                    href={whatsappUrl('Hello Bhagyashree Ventures, I would like help with a product requirement.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="border-b border-border bg-background py-10 sm:py-12 lg:py-14">
        <div className="container-shell">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactChannels.map((channel, index) => {
              const Icon = channel.icon;
              const external = channel.href.startsWith('http');
              return (
                <ScrollReveal key={channel.title} delay={index * 0.045}>
                  <Card className="group relative flex h-full flex-col overflow-hidden p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_24px_56px_-38px_rgba(18,55,165,0.34)] sm:p-6 dark:hover:border-brand-blue-light/20">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-blue/45 to-brand-orange/45 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="grid size-11 place-items-center rounded-[8px] bg-brand-blue/10 text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-sm font-semibold text-muted-foreground">{channel.title}</p>
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="mt-1 break-words text-lg font-bold tracking-[-0.02em] text-foreground transition-colors hover:text-brand-blue dark:hover:text-brand-blue-light"
                    >
                      {channel.value}
                    </a>
                    <p className="mt-2 min-h-10 text-sm leading-6 text-muted-foreground">{channel.detail}</p>
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-orange dark:text-brand-blue-light"
                    >
                      {channel.action} <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:gap-10">
            <ScrollReveal>
              <ContactForm requestedProduct={requestedProduct?.slice(0, 180)} />
            </ScrollReveal>

            <div className="space-y-5">
              <ScrollReveal delay={0.06}>
                <Card className="p-6 sm:p-7">
                  <Badge>Company addresses</Badge>
                  <div className="mt-5 space-y-6">
                    {locations.map((location, index) => (
                      <div key={location.label} className={index ? 'border-t border-border pt-6' : undefined}>
                        <div className="flex gap-3">
                          <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[8px] bg-brand-orange/10 text-brand-orange">
                            <Building2 size={19} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue dark:text-brand-blue-light">
                              {location.label}
                            </p>
                            <h2 className="mt-1 text-lg font-bold tracking-[-0.025em] text-foreground">{location.address.company}</h2>
                            <address className="mt-2 not-italic text-sm leading-7 text-muted-foreground">
                              {location.address.line1}<br />
                              {location.address.line2}<br />
                              {location.address.city}, {location.address.district} – {location.address.postalCode}<br />
                              {location.address.state}, {location.address.country}
                            </address>
                          </div>
                        </div>
                        <a
                          href={location.href}
                          target="_blank"
                          rel="noreferrer"
                          className={buttonVariants({ variant: 'outline', className: 'mt-4 w-full' })}
                        >
                          <MapPin size={16} aria-hidden="true" /> Open in Google Maps
                        </a>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card className="border-brand-blue/15 bg-brand-blue/[0.045] p-6 sm:p-7 dark:border-brand-blue-light/15 dark:bg-brand-blue-light/[0.055]">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 shrink-0 text-brand-blue dark:text-brand-blue-light" size={21} aria-hidden="true" />
                    <div>
                      <h2 className="font-bold text-foreground">Help us price the right setup.</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Include the model if you know it. Otherwise tell us the application, expected print or scan volume, label or ribbon type, connectivity and any software requirement.
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>

              <p className="px-1 text-xs leading-5 text-muted-foreground">
                By submitting the form you agree that we may use the information you provide to respond to your enquiry. See our{' '}
                <Link href="/privacy" className="font-semibold text-foreground underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
