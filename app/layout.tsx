import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { siteConfig } from '@/lib/site';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Bhagyashree Ventures | Barcode, Labeling, RFID & POS Solutions',
    template: '%s | Bhagyashree Ventures',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'barcode printer supplier Bengaluru',
    'barcode scanner Bengaluru',
    'RFID solutions Bengaluru',
    'label printer Bangalore',
    'thermal transfer ribbon Bengaluru',
    'POS printer Bengaluru',
    'barcode labels Bangalore',
    'automatic identification solutions Karnataka',
    'Bhagyashree Ventures',
    'BV Hardwares',
  ],
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Bhagyashree Ventures | Barcode, Labeling, RFID & POS Solutions',
    description: siteConfig.shortDescription,
    images: [
      {
        url: '/images/og-bhagyashree-ventures.png',
        width: 1200,
        height: 630,
        alt: 'Bhagyashree Ventures — barcode, labeling, RFID and POS solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhagyashree Ventures | Barcode, Labeling, RFID & POS Solutions',
    description: siteConfig.shortDescription,
    images: ['/images/og-bhagyashree-ventures.png'],
  },
  icons: {
    icon: siteConfig.icon,
    shortcut: siteConfig.icon,
    apple: siteConfig.icon,
  },
  manifest: '/manifest.webmanifest',
  category: 'business',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: siteConfig.name,
    alternateName: siteConfig.legacyName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phone.primaryE164,
    address: [siteConfig.address, siteConfig.registeredAddress].map((address) => ({
      '@type': 'PostalAddress',
      streetAddress: `${address.line1}, ${address.line2}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: 'IN',
    })),
    areaServed: 'India',
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone.primaryE164,
      email: siteConfig.email,
      contactType: 'sales and customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Kannada', 'Hindi'],
    },
    knowsAbout: [
      'Barcode printers',
      'Barcode scanners',
      'RFID solutions',
      'Labels and tags',
      'Thermal transfer ribbons',
      'Point-of-sale hardware',
      'Automatic identification and data capture',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.legacyName,
    url: siteConfig.url,
    inLanguage: 'en-IN',
  };

  return (
    <html lang="en-IN" className={outfit.variable} data-scroll-behavior="smooth" style={{ colorScheme: 'light' }}>
      <body className="flex h-dvh min-h-0 flex-col overflow-hidden bg-background text-foreground antialiased">
        <a href="#site-content" className="sr-only z-[100] rounded-[8px] bg-white px-4 py-3 font-semibold text-brand-blue shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Header />
        <div id="site-scroll-area" className="site-scroll-area min-h-0 flex-1 overflow-x-clip overflow-y-auto">
          <ScrollToTop />
          <div id="site-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
          <FloatingWhatsApp />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
