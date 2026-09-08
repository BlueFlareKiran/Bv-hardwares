export const siteConfig = {
  name: 'Bhagyashree Ventures',
  legacyName: 'BV Hardwares',
  domain: 'bvhardwares.in',
  url: 'https://bvhardwares.in',
  email: 'info@bvhardwares.in',
  phone: {
    primaryDisplay: '+91 99233 11090',
    primaryE164: '+919923311090',
  },
  address: {
    company: 'Bhagyashree Ventures',
    line1: 'No. 17, Ground Floor, 1st Cross',
    line2: 'Anjaneya Temple Street, Sheshadripuram',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    postalCode: '560020',
    country: 'India',
  },
  registeredAddress: {
    company: 'Bhagyashree Ventures',
    line1: 'Flat No. 35B, Street No. 12',
    line2: 'Kalpravruksha Apartment, Race Course Road, Madhavanagar',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
  },
  description:
    'Barcode, labeling, POS, RFID and automatic identification solutions for retail, logistics, healthcare, manufacturing and other business operations.',
  shortDescription:
    'Reliable barcode, labeling, POS, RFID, software and support solutions for business operations.',
  tagline: 'Identity | Automate | Grow Together',
  logo: '/images/bhagyashree-ventures-navbar.png',
  mark: '/images/bhagyashree-ventures-mark.png',
  icon: '/images/bhagyashree-ventures-icon.png',
} as const;

export const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.company}, ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.district}, ${siteConfig.address.state} ${siteConfig.address.postalCode}`
)}`;

export const registeredOfficeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.registeredAddress.company}, ${siteConfig.registeredAddress.line1}, ${siteConfig.registeredAddress.line2}, ${siteConfig.registeredAddress.city}, ${siteConfig.registeredAddress.district}, ${siteConfig.registeredAddress.state} ${siteConfig.registeredAddress.postalCode}`
)}`;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${siteConfig.phone.primaryE164.replace('+', '')}${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`;

export const pricingRequestHref = '/contact#pricing-request';
