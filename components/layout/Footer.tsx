import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { googleMapsSearchUrl, siteConfig } from '@/lib/site';

const productLinks = [
  { label: 'Barcode & Label Printers', href: '/products/label-printer' },
  { label: 'Barcode Scanners', href: '/products/wired-scanner' },
  { label: 'RFID Printers & Devices', href: '/products/rfid-printer' },
  { label: 'Labels & Tags', href: '/products/labels' },
  { label: 'Thermal Transfer Ribbons', href: '/products/ribbon' },
  { label: 'POS Systems', href: '/products/pos-printer' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030712] text-slate-300">
      <div className="container-shell py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block rounded-xl bg-white p-2.5">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={1576}
                height={419}
                unoptimized
                className="h-auto w-[250px] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              {siteConfig.shortDescription} We help businesses choose suitable hardware, consumables and software for practical day-to-day workflows.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              The website may still be known by its legacy domain and name, {siteConfig.legacyName}. The current brand identity is {siteConfig.name}.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-white">Products</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-400">
              <a href={googleMapsSearchUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-white">
                <MapPin size={18} className="mt-0.5 shrink-0 text-orange-400" />
                <span>
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.city} – {siteConfig.address.postalCode}, {siteConfig.address.state}
                </span>
              </a>
              <a href={`tel:${siteConfig.phone.primaryE164}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone size={18} className="shrink-0 text-orange-400" />
                {siteConfig.phone.primaryDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail size={18} className="shrink-0 text-orange-400" />
                {siteConfig.email}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-1.5 font-semibold text-orange-300 hover:text-orange-200">
                Contact the team <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/partners" className="hover:text-slate-300">Partners</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Use</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
