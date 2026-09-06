export interface Industry {
  title: string;
  description: string;
  image: string;
  tag?: string;
  // Kept optional for compatibility with legacy card components; current homepage does not publish unverified metrics.
  stats?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  highlight?: string;
}

export const heroSlides = [
  {
    id: 'main',
    tag: 'Barcode · Labeling · RFID · POS',
    headline: 'Smart Labeling.',
    headline2: 'Seamless Operations.',
    subtext:
      'Reliable hardware, software, consumables and support for barcode printing, data capture, RFID and point-of-sale workflows.',
    cta1: { label: 'Explore Products', href: '/products' },
    cta2: { label: 'Get Pricing', href: '/contact#pricing-request' },
    image: '/images/banner.jpg',
  },
];

// Deliberately avoid unverified vanity counters. These entries describe capabilities only.
export const stats = [
  { value: 0, suffix: '', label: 'Barcode & Labeling', sublabel: 'Printers, scanners, labels and ribbons' },
  { value: 0, suffix: '', label: 'RFID & Mobility', sublabel: 'Readers, printers and handheld devices' },
  { value: 0, suffix: '', label: 'POS & Software', sublabel: 'Receipt printing and label design software' },
  { value: 0, suffix: '', label: 'Support', sublabel: 'Product selection, setup and maintenance assistance' },
];

export const productHighlights = [
  {
    title: 'Barcode / RFID Printers',
    description:
      'Desktop, industrial and RFID-capable printing options for barcode labels, tags and operational workflows.',
    image: '/images/barcode-rfid-printers-v3.png',
    href: '/products/label-printer',
    category: 'Printers',
  },
  {
    title: 'Barcode Scanners',
    description:
      'Wired, cordless and presentation scanners for retail counters, inventory, warehousing and general data-capture applications.',
    image: '/images/barcode-scanners-v3.png',
    href: '/products/wired-scanner',
    category: 'Scanners',
  },
  {
    title: 'Labels & Tags',
    description:
      'Direct thermal, thermal-transfer and application-specific label materials with custom sizing options for business requirements.',
    image: '/images/Labels-Tags-products1.jpg',
    href: '/products/labels',
    category: 'Consumables',
  },
  {
    title: 'Thermal Ribbons',
    description:
      'Wax, wax-resin and resin ribbon options selected for the label material, print durability and application environment.',
    image: '/images/thermal-ribbons.jpg',
    href: '/products/ribbon',
    category: 'Consumables',
  },
  {
    title: 'POS Systems',
    description:
      'Receipt printers and related point-of-sale hardware for retail, hospitality and billing environments.',
    image: '/images/pos-systems-v3.png',
    href: '/products/pos-printer',
    category: 'Point of Sale',
  },
  {
    title: 'RFID Consumables',
    description:
      'RFID labels, inlays and tags for inventory tracking, garment identification, asset management and automated data capture.',
    image: '/images/RFID-TAG-AND-LABELS-FOR-GARMENT.jpg',
    href: '/products/labels/rfid-tags',
    category: 'RFID Consumables',
  },
];

export const industries: Industry[] = [
  {
    title: 'Retail & Supermarkets',
    description:
      'Barcode scanning, receipt printing, shelf labels and product identification for store and back-office operations.',
    image: '/images/industries/retail-supermarkets-v4.webp',
    tag: 'Retail',
  },
  {
    title: 'Logistics & Warehousing',
    description:
      'Shipping labels, mobile data capture, barcode scanning and identification solutions for inventory and dispatch workflows.',
    image: '/images/industries/logistics-warehousing-v4.webp',
    tag: 'Logistics',
  },
  {
    title: 'Pharma & Chemicals',
    description:
      'Durable identification, compliant labeling and traceability support for pharmaceutical packaging, chemical containers and controlled workflows.',
    image: '/images/industries/pharma-chemicals-v4.webp',
    tag: 'Pharma',
  },
  {
    title: 'Aviation & Transport',
    description:
      'Printing, scanning and identification hardware for baggage, ticketing, asset tracking and transport-related operational workflows.',
    image: '/images/industries/aviation-transport-v4.webp',
    tag: 'Transport',
  },
  {
    title: 'Jewellery & Precious Items',
    description:
      'Barcode labeling, tag printing, inventory tracking and product identification solutions for jewellery retail, precious item management and secure stock control.',
    image: '/images/industries/jewellery-precious-items-v1.webp',
    tag: 'Jewellery',
  },
];

export const differentiators = [
  {
    title: 'Solution-Focused Guidance',
    description:
      'We start with the workflow, print volume, media and connectivity needs before recommending hardware or consumables.',
    iconName: 'Waypoints',
  },
  {
    title: 'End-to-End Product Range',
    description:
      'Printers, scanners, labels, ribbons, RFID devices, POS hardware, software and service support can be planned together.',
    iconName: 'Boxes',
  },
  {
    title: 'Business Support',
    description:
      'Our team can assist with product selection, setup requirements, consumable matching and service enquiries.',
    iconName: 'Headset',
  },
  {
    title: 'Multi-Industry Experience',
    description:
      'Our product portfolio supports common identification workflows across retail, logistics, manufacturing and other sectors.',
    iconName: 'Building2',
  },
];

// Testimonials are intentionally not rendered until the business confirms approved, attributable references.
export const testimonials: Testimonial[] = [];
