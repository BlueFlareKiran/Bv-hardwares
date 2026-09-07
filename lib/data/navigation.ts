export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Labels', href: '/products/labels' },
      { label: 'POS Rolls', href: '/products/pos-rolls' },
      { label: 'Ribbon', href: '/products/ribbon' },
      { label: 'Packaging Material', href: '/products/packaging-material' },
      {
        label: 'Printers',
        href: '/products/label-printer',
        children: [
          { label: 'Label Printer', href: '/products/label-printer' },
          { label: 'POS Printer', href: '/products/pos-printer' },
          { label: 'RFID Printer', href: '/products/rfid-printer' },
          { label: 'Bluetooth Printer', href: '/products/bluetooth-printer' },
          { label: 'Printer Accessories', href: '/products/accessories' },
        ],
      },
      {
        label: 'Scanners',
        href: '/products/wired-scanner',
        children: [
          { label: 'Wired Scanner', href: '/products/wired-scanner' },
          { label: 'Wireless and Bluetooth Scanner', href: '/products/wireless-scanner' },
          { label: 'Tabletop Scanner', href: '/products/tabletop-scanner' },
        ],
      },
      {
        label: 'Devices',
        href: '/products/hht-mobile',
        children: [
          { label: 'HHT / Mobile Device', href: '/products/hht-mobile' },
          { label: 'RFID Device', href: '/products/rfid-device' },
        ],
      },
      { label: 'Software', href: '/products/software' },
      { label: 'Service', href: '/products/service' },
    ],
  },
  {
    label: 'Partners',
    href: '/partners',
    children: [{ label: 'HPRT', href: '/partners/hprt' }],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

export const megaMenuColumns = [
  {
    heading: 'Consumables',
    items: [
      { label: 'Labels', href: '/products/labels' },
      { label: 'POS Rolls', href: '/products/pos-rolls' },
      { label: 'Ribbon', href: '/products/ribbon' },
      { label: 'Packaging Material', href: '/products/packaging-material' },
    ],
  },
  {
    heading: 'Printers',
    items: [
      { label: 'Label Printer', href: '/products/label-printer' },
      { label: 'POS Printer', href: '/products/pos-printer' },
      { label: 'RFID Printer', href: '/products/rfid-printer' },
      { label: 'Bluetooth Printer', href: '/products/bluetooth-printer' },
      { label: 'Printer Accessories', href: '/products/accessories' },
    ],
  },
  {
    heading: 'Scanners',
    items: [
      { label: 'Wired Scanner', href: '/products/wired-scanner' },
      { label: 'Wireless and Bluetooth Scanner', href: '/products/wireless-scanner' },
      { label: 'Tabletop Scanner', href: '/products/tabletop-scanner' },
    ],
  },
  {
    heading: 'Devices & Software',
    items: [
      { label: 'HHT / Mobile Device', href: '/products/hht-mobile' },
      { label: 'RFID Device', href: '/products/rfid-device' },
      { label: 'Software', href: '/products/software' },
      { label: 'Service', href: '/products/service' },
    ],
  },
];
