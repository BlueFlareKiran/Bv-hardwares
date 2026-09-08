import { epsonPartner, hprtPartner } from '@/lib/data/partners';

export interface BrandItem {
  name: string;
  image: string;
  category?: string;
}

export const brandLogos: BrandItem[] = [
  { name: hprtPartner.name, image: hprtPartner.logo, category: hprtPartner.relationshipLabel },
  { name: epsonPartner.name, image: epsonPartner.logo, category: epsonPartner.relationshipLabel },
  { name: 'TSC Auto ID', image: '/images/tsc-logo.svg', category: 'Product brand' },
  { name: 'Bluebird', image: '/images/bluebird-logo.svg', category: 'Product brand' },
  { name: 'Zebra Technologies', image: '/images/zebra.png', category: 'Product brand' },
  { name: 'Honeywell', image: '/images/honeywell.png', category: 'Product brand' },
  { name: 'SATO', image: '/images/sato-logo.png', category: 'Product brand' },
  { name: 'TVS Electronics', image: '/images/tvs-logo.png', category: 'Product brand' },
  { name: 'Urovo', image: '/images/urovo.png', category: 'Product brand' },
  { name: 'Seuic Auto-ID', image: '/images/seuic-logo.png', category: 'Product brand' },
  { name: 'SMI Coated Products', image: '/images/smi-logo.png', category: 'Media brand' },
  { name: 'Zenpert', image: '/images/zenpert.png', category: 'Product brand' },
  { name: 'UPM Raflatac', image: '/images/upm.png', category: 'Media brand' },
  { name: 'Hansol Paper', image: '/images/client1.png', category: 'Media brand' },
  { name: 'Avery Dennison', image: '/images/client2.png', category: 'Media brand' },
  { name: 'Mitsubishi HiTec Paper', image: '/images/client3.png', category: 'Media brand' },
];

// Kept for compatibility with older components. Customer logos are intentionally not published
// until the business confirms permission and relationship details.
export const clientLogos: BrandItem[] = [];
