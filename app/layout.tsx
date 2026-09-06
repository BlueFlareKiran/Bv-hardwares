import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import ThemeProvider from '@/components/theme/ThemeProvider';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090f1d' },
  ],
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
};

const themeBootstrapScript = `
(() => {
  try {
    const saved = localStorage.getItem('bv-theme');
    const useDark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', useDark);
    document.documentElement.style.colorScheme = useDark ? 'dark' : 'light';
  } catch (_) {}
})();`;

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
  };

  return (
    <html lang="en-IN" className={outfit.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
