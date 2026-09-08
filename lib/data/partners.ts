export type PartnerProductCategory =
  | 'Desktop Barcode Printers'
  | 'Industrial & RFID Printers'
  | 'Scanners';

export interface PartnerProductSpec {
  label: string;
  value: string;
}

export interface PartnerProduct {
  id: string;
  slug: string;
  name: string;
  category: PartnerProductCategory;
  image: string;
  summary: string;
  specs: PartnerProductSpec[];
  highlights?: string[];
  sourcePages: number[];
  catalogNote?: string;
}

export interface PartnerBrand {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  sectors: string[];
  accent: string;
  relationshipLabel: string;
  location?: string;
  validPeriod?: string;
  certificate?: string;
}

export const hprtPartner: PartnerBrand = {
  slug: 'hprt',
  name: 'HPRT',
  logo: '/images/partners/hprt/hprt-logo.png',
  tagline: 'Premium exclusive printing and AIDC partner portfolio.',
  description:
    'HPRT is Bhagyashree Ventures’ premium exclusive technology partner portfolio for barcode printing, RFID printing and scanning solutions across retail, hospitality, healthcare, logistics, warehousing and manufacturing applications.',
  sectors: ['Retail', 'Hospitality', 'Healthcare', 'Logistics', 'Warehousing', 'Manufacturing'],
  accent: '#f58220',
  relationshipLabel: 'Premium Exclusive Partner',
};

export const epsonPartner: PartnerBrand = {
  slug: 'epson',
  name: 'Epson',
  logo: '/images/partners/epson/epson-logo.jpg',
  tagline: 'Recognized Epson System Integrator.',
  description:
    'Bhagyashree Ventures is recognized as an Epson System Integrator, supporting Epson-based printing and point-of-sale solutions for business workflows.',
  sectors: ['Business printing', 'Point of sale', 'System integration'],
  accent: '#0b2f9f',
  relationshipLabel: 'Epson System Integrator',
  location: 'Bangalore',
  validPeriod: 'April 2026 – March 2027',
  certificate: '/images/certifications/epson-system-integrator-certificate.png',
};

export const partners: PartnerBrand[] = [hprtPartner, epsonPartner];

export const hprtProducts: PartnerProduct[] = [
  {
    id: 'hprt-ht600-ht630',
    slug: 'ht600-ht630',
    name: 'HT600 / HT630',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/ht600-ht630.png',
    summary: '4-inch thermal-transfer desktop barcode printer family for everyday label printing.',
    specs: [
      { label: 'Print class', value: '4-inch thermal transfer' },
      { label: 'Ribbon', value: '100 m' },
      { label: 'Print speed', value: 'Up to 6 ips' },
    ],
    sourcePages: [3, 6],
  },
  {
    id: 'hprt-ht800-ht830',
    slug: 'ht800-ht830',
    name: 'HT800 / HT830',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/ht800-ht830.png',
    summary: '4-inch thermal-transfer desktop label printers with a 300 m ribbon capacity.',
    specs: [
      { label: 'Resolution', value: '203 dpi / 300 dpi' },
      { label: 'Print speed', value: '6 ips / 4 ips' },
      { label: 'Ribbon', value: '300 m' },
      { label: 'Interfaces', value: 'USB, Ethernet, Serial' },
    ],
    highlights: ['Optional Bluetooth or Wi-Fi', 'Cutter and peeler options'],
    sourcePages: [11, 13],
  },
  {
    id: 'hprt-ht300-ht330',
    slug: 'ht300-ht330',
    name: 'HT300 / HT330',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/ht300-ht330.png',
    summary: '4-inch thermal-transfer desktop label printer series with wired connectivity and optional Bluetooth.',
    specs: [
      { label: 'Media width', value: '25.4–118 mm' },
      { label: 'Print speed', value: 'Up to 5 ips' },
      { label: 'Interfaces', value: 'USB, LAN, Serial' },
      { label: 'Memory', value: '32 MB RAM / 16 MB Flash' },
    ],
    highlights: ['Transmissive / reflective sensor', 'Cutter and peeler module support'],
    sourcePages: [7, 8],
  },
  {
    id: 'hprt-ht100-ht130',
    slug: 'ht100-ht130',
    name: 'HT100 / HT130',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/ht100-ht130.png',
    summary: 'Economical 4-inch thermal-transfer desktop label printer series for multi-industry use.',
    specs: [
      { label: 'Media width', value: '20–118 mm' },
      { label: 'Ribbon', value: '100 m' },
      { label: 'Print speed', value: 'HT100 5 ips / HT130 4 ips' },
      { label: 'Interfaces', value: 'USB 2.0-B, Serial, Ethernet' },
    ],
    highlights: ['Designed to reduce label jams', 'Optional cutter and peeler'],
    sourcePages: [9],
  },
  {
    id: 'hprt-ht700',
    slug: 'ht700',
    name: 'HT700',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/ht700.png',
    summary: '4-inch thermal-transfer desktop barcode printer with a 300 m ribbon and flexible connectivity options.',
    specs: [
      { label: 'Media width', value: '20–118 mm' },
      { label: 'Ribbon', value: '300 m' },
      { label: 'Print speed', value: '6 ips (203 dpi) / 4 ips (300 dpi)' },
      { label: 'Interfaces', value: 'USB 2.0-B, Ethernet' },
    ],
    highlights: ['Optional Bluetooth / Wi-Fi', 'Cutter, rotary cutter and peeler options'],
    sourcePages: [15, 16, 17],
  },
  {
    id: 'hprt-hd600',
    slug: 'hd600-hd600-plus',
    name: 'HD600 / HD600 Plus',
    category: 'Desktop Barcode Printers',
    image: '/images/partners/hprt/hd600-hd600-plus.png',
    summary: '4-inch direct-thermal desktop barcode printer family designed for fast, straightforward label printing.',
    specs: [
      { label: 'Resolution', value: '203 dpi' },
      { label: 'Print width', value: '108 mm' },
      { label: 'Print speed', value: '6 ips / 8 ips Plus' },
      { label: 'Interfaces', value: 'USB, LAN' },
    ],
    highlights: ['Optional Bluetooth', 'ZPL-II, TSPL, DPL and EPL2 emulation'],
    sourcePages: [18, 19, 20],
  },
  {
    id: 'hprt-bravo-l',
    slug: 'bravo-l-ix4l',
    name: 'iX4L / Bravo-L',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/bravo-l-ix4l.png',
    summary: '4-inch thermal-transfer industrial barcode printer for demanding label workflows.',
    specs: [
      { label: 'Resolution', value: '203 dpi / 300 dpi' },
      { label: 'Print speed', value: 'Up to 6 ips' },
      { label: 'Ribbon', value: '450 m, optional 600 m' },
      { label: 'Interfaces', value: 'USB, USB Host, LAN, Serial' },
    ],
    highlights: ['Metal structure', '3.5-inch non-touch screen', 'Optional Wi-Fi'],
    sourcePages: [21, 22, 23, 25],
  },
  {
    id: 'hprt-bingo',
    slug: 'bingo-ix4p',
    name: 'iX4P / Bingo',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/bingo-ix4p.png',
    summary: 'High-end 4-inch industrial barcode printer family with high-resolution and high-speed configurations.',
    specs: [
      { label: 'Resolution', value: '203 / 300 / 600 dpi' },
      { label: 'Print speed', value: '14 / 8 / 4 ips' },
      { label: 'Ribbon', value: '450 m, optional 600 m' },
      { label: 'Memory', value: '512 MB RAM / 256 MB Flash' },
    ],
    highlights: ['3.5-inch touch screen', 'Optional Wi-Fi, Bluetooth, GPIO or RFID'],
    sourcePages: [21, 24, 26],
  },
  {
    id: 'hprt-ix4r',
    slug: 'ix4r',
    name: 'iX4R',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/ix4r.png',
    summary: 'RFID-enabled 4-inch thermal-transfer industrial barcode printer based on the Bingo platform.',
    specs: [
      { label: 'Resolution', value: '203 dpi / 300 dpi' },
      { label: 'Print speed', value: '8 ips / 6 ips' },
      { label: 'Ribbon', value: '450 m' },
      { label: 'RFID protocol', value: 'GS1 EPC Gen2 v2 / ISO 18000-6C' },
    ],
    highlights: ['Supports standard and on-metal tags', '3.5-inch touch screen'],
    sourcePages: [27, 28],
  },
  {
    id: 'hprt-iq4',
    slug: 'iq4',
    name: 'iQ4',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/iq4.png',
    summary: 'Mid-level model in HPRT’s industrial barcode printer portfolio.',
    specs: [{ label: 'Portfolio position', value: 'Mid-level industrial printer' }],
    sourcePages: [4],
    catalogNote: 'The supplied catalogue identifies iQ4 as a mid-level industrial model but does not include a dedicated specification page.',
  },
  {
    id: 'hprt-ix6p',
    slug: 'ix6p',
    name: 'iX6P',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/ix6p.png',
    summary: '6-inch model in HPRT’s industrial barcode printer range.',
    specs: [{ label: 'Print class', value: '6-inch industrial printer' }],
    sourcePages: [4],
    catalogNote: 'The supplied catalogue shows iX6P in the industrial line as the 6-inch option; no dedicated specification page is included.',
  },
  {
    id: 'hprt-grand',
    slug: 'grand-grand-r',
    name: 'Grand / Grand-R',
    category: 'Industrial & RFID Printers',
    image: '/images/partners/hprt/grand-grand-r.png',
    summary: 'Premium model family positioned at the top of HPRT’s industrial printer portfolio.',
    specs: [{ label: 'Portfolio position', value: 'Premium industrial printer family' }],
    sourcePages: [4],
    catalogNote: 'The supplied catalogue positions Grand / Grand-R as the premium industrial family but does not provide a dedicated specification sheet.',
  },
  {
    id: 'hprt-n80',
    slug: 'n80-n80bt',
    name: 'N80 / N80BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n80-n80bt.png',
    summary: 'Entry-level 1D/2D handheld barcode scanner available in wired and Bluetooth versions.',
    specs: [
      { label: 'Decoding', value: '1D, 2D' },
      { label: 'Sensor', value: '640 × 480' },
      { label: 'Drop rating', value: '1.2 m' },
      { label: 'Bluetooth', value: 'Up to 30 m open-area range (N80BT)' },
    ],
    highlights: ['Bluetooth offline storage on N80BT', 'More than 5 million button presses'],
    sourcePages: [5, 30, 31],
  },
  {
    id: 'hprt-n101',
    slug: 'n101-n101bt',
    name: 'N101 / N101-H / N101BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n101-n101bt.png',
    summary: 'Mid-end 1D/2D handheld scanner family with retail and healthcare variants.',
    specs: [
      { label: 'Decoding', value: '1D, 2D' },
      { label: 'Sensor', value: '640 × 480' },
      { label: 'Drop rating', value: '1.5 m' },
      { label: 'Bluetooth', value: 'Up to 30 m open-area range (BT version)' },
    ],
    highlights: ['N101-H for hospital, healthcare and pharmacy use', 'Bluetooth offline storage on BT version'],
    sourcePages: [5, 32, 33],
  },
  {
    id: 'hprt-n130',
    slug: 'n130-n130bt',
    name: 'N130 / N130BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n130-n130bt.png',
    summary: 'General-use 1D/2D handheld scanner family offered in wired or wireless configurations.',
    specs: [
      { label: 'Sensor', value: '640 × 480' },
      { label: 'Precision', value: '≥ 3 mil' },
      { label: 'Drop rating', value: '1.5 m' },
      { label: 'Connectivity', value: 'Wired or wireless' },
    ],
    sourcePages: [5, 6],
  },
  {
    id: 'hprt-n150',
    slug: 'n150-n150bt',
    name: 'N150 / N150BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n150-n150bt.png',
    summary: 'Mid-end 1D/2D handheld scanner for industrial, logistics, manufacturing and warehouse workflows.',
    specs: [
      { label: 'Decoding', value: '1D, 2D' },
      { label: 'Aiming / illumination', value: 'Green spot / white' },
      { label: 'Bluetooth', value: 'Up to 100 m open-area range (N150BT)' },
      { label: 'Button lifespan', value: '> 5 million presses' },
    ],
    highlights: ['Manual and automatic identification modes', 'Charging stand on Bluetooth version'],
    sourcePages: [38],
  },
  {
    id: 'hprt-n160',
    slug: 'n160-n160bt',
    name: 'N160 / N160BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n160-n160bt.png',
    summary: 'Rugged 1D/2D scanner family with a megapixel-class sensor for demanding scanning work.',
    specs: [
      { label: 'Sensor', value: '1280 × 1080' },
      { label: 'Precision', value: '≥ 3 mil' },
      { label: 'Drop rating', value: '1.5 m' },
      { label: 'Connectivity', value: 'Wired or wireless' },
    ],
    sourcePages: [5],
  },
  {
    id: 'hprt-n170',
    slug: 'n170-n170bt',
    name: 'N170 / N170BT',
    category: 'Scanners',
    image: '/images/partners/hprt/n170-n170bt.png',
    summary: 'Rugged 1D/2D scanner family with a 1280 × 1080 sensor and extended drop protection.',
    specs: [
      { label: 'Sensor', value: '1280 × 1080' },
      { label: 'Precision', value: '≥ 3 mil' },
      { label: 'Drop rating', value: '1.8 m' },
      { label: 'Connectivity', value: 'Wired or wireless' },
    ],
    sourcePages: [5, 39],
    catalogNote: 'The supplied catalogue page titled N170/N170BT contains an internal model-label inconsistency in its table; the overview table on page 5 is used for the specifications shown here.',
  },
  {
    id: 'hprt-n180',
    slug: 'n180',
    name: 'N180',
    category: 'Scanners',
    image: '/images/partners/hprt/n180.png',
    summary: 'Industrial 1D/2D handheld scanner designed for manufacturing, logistics and warehouse environments.',
    specs: [
      { label: 'Sensor', value: '1280 × 1080' },
      { label: 'Protection', value: 'IP65' },
      { label: 'Drop protection', value: '2.4 m' },
      { label: 'Illumination', value: 'White, red and blue' },
    ],
    highlights: ['DPM barcode decoding algorithm', 'Laser cross-mark aiming'],
    sourcePages: [40, 41],
  },
  {
    id: 'hprt-p200',
    slug: 'p200-p210',
    name: 'P200 / P210',
    category: 'Scanners',
    image: '/images/partners/hprt/p200-p210.png',
    summary: 'Stationary 1D/2D scanner family for retail, logistics, healthcare and warehouse applications.',
    specs: [
      { label: 'P200 sensor', value: '640 × 480' },
      { label: 'P210 sensor', value: '1280 × 1080' },
      { label: 'Aiming', value: 'Red light' },
      { label: 'Drop rating', value: '1.2 m' },
    ],
    highlights: ['Extra-wide scan angle', 'Optional megapixel P210 version'],
    sourcePages: [5, 37],
  },
  {
    id: 'hprt-p300',
    slug: 'p300',
    name: 'P300',
    category: 'Scanners',
    image: '/images/partners/hprt/p300.png',
    summary: 'Stationary 1D/2D barcode scanner for fixed-counter and desktop scanning workflows.',
    specs: [
      { label: 'Sensor', value: '640 × 480' },
      { label: 'Precision', value: '≥ 4 mil' },
      { label: 'Drop rating', value: '1.2 m' },
      { label: 'Connectivity', value: 'Wired' },
    ],
    sourcePages: [5],
  },
];

export const hprtProductCategories: PartnerProductCategory[] = [
  'Desktop Barcode Printers',
  'Industrial & RFID Printers',
  'Scanners',
];

export const hprtProductBySlug = Object.fromEntries(
  hprtProducts.map((product) => [product.slug, product])
) as Record<string, PartnerProduct>;

export const hprtProductSlugs = hprtProducts.map((product) => product.slug);
