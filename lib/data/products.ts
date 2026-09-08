export interface Product {
  id: string;
  name: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  description?: string;
  group?: string;
}

export interface ProductCategory {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  products: Product[];
}

const product = (
  id: string,
  name: string,
  image: string,
  options: Pick<Product, 'description' | 'group' | 'imageFit'> = {}
): Product => ({ id, name, image, ...options });

export const productCategories: Record<string, ProductCategory> = {
  labels: {
    slug: 'labels',
    title: 'Labels & Tags',
    subtitle: 'Label and tag solutions for identification, inventory, retail, logistics and specialized applications.',
    description:
      'Paper, synthetic, security, RFID and application-specific labels and tags for product identification, inventory management and branding.',
    coverImage: '/images/barcode-labels-cover.jpg',
    products: [
      product('paper-board-synthetic-tags', 'Paper Board and Synthetic / Non Tearable Tags', '/images/labels/paper-board-synthetic-non-tear-tags.png', { description: 'Paper and synthetic non-tearable tags for product identification, inventory management and branding.' }),
      product('jewellery-labels', 'Jewellery Labels', '/images/labels/jewellery-labels.png', { description: 'Labels for jewellery identification, pricing and retail tagging applications.' }),
      product('chemical-drum-labels', 'Chemical Industries / Drums Labels', '/images/labels/chemical-industry-drum-labels.png', { description: 'Durable labels for chemical-industry containers and drums.' }),
      product('temperature-resistant-labels', 'Temperature Resistant Labels', '/images/labels/temperature-resistant-labels.png', { description: 'Labels for temperature-resistant and industrial-use applications.' }),
      product('void-labels', 'Void Labels / Temper Evident Labels', '/images/labels/tamper-evident-void-labels.png', { description: 'Tamper-evident security labels for applications where removal or interference needs to be visible.' }),
      product('polyester-labels', 'Polyester Labels', '/images/labels/polyester-labels.png', { description: 'Synthetic polyester labels for durable product identification and industrial use.' }),
      product('direct-thermal-ecommerce', 'Direct Thermal Labels', '/images/labels/direct-thermal-labels.png', { description: 'Direct thermal labels for ecommerce, shipping and inventory workflows.' }),
      product('airline-baggage-labels', 'Airline Baggage DT Labels & Boarding Pass', '/images/labels/airline-baggage-tags-boarding-passes.png', { description: 'Direct thermal baggage labels and boarding-pass media for aviation workflows.' }),
      product('multi-colour-labels', 'Multi Colour Labels', '/images/labels/multicolor-label-rolls.png', { description: 'Multi-colour labels for product identification, presentation and branding.' }),
      product('wash-care-labels', 'Wash Care Satin and Taffeta', '/images/labels/wash-care-satin-taffeta-labels.png', { description: 'Satin and taffeta wash-care labels for garment and textile applications.' }),
      product('transparent-labels', 'Transparent Labels', '/images/labels/transparent-labels.png', { description: 'Transparent labels for clean product identification and branding applications.' }),
      product('rfid-tags', 'RFID Tag and Labels', '/images/RFID-TAG-AND-LABELS-FOR-GARMENT.jpg', { description: 'RFID-enabled tags and labels for inventory, garment and asset-tracking workflows.' }),
      product('hologram-labels', 'Hologram Labels', '/images/labels/holographic-security-labels.png', { description: 'Hologram labels for security-focused product identification and tamper-resistant applications.' }),
      product('high-gum-labels', 'High Gum Labels / Tyre Labels', '/images/labels/high-gloss-tyre-labels.png', { description: 'High-adhesion labels for tyre and other demanding surface applications.' }),
      product('removable-labels', 'Removable Labels / Size Sticker', '/images/labels/removable-labels-stickers.png', { description: 'Removable labels and size stickers for garment and retail applications.' }),
    ],
  },
  'pos-rolls': {
    slug: 'pos-rolls',
    title: 'POS Rolls',
    subtitle: 'Plain and pre-printed rolls for receipt printers and point-of-sale counters.',
    description: 'POS receipt rolls for billing and transaction printing in retail and other point-of-sale environments.',
    coverImage: '/images/pos-rolls.jpg',
    products: [
      product('pos-plain-preprinted-rolls', 'POS Plain and Pre Printed Rolls', '/images/POS-ROLLS-PLAIN-AND-PRE-PRINTED.jpg', { description: 'Thermal or regular POS paper rolls for cash registers and receipt printers, available plain or pre-printed.' }),
    ],
  },
  ribbon: {
    slug: 'ribbon',
    title: 'Ribbon',
    subtitle: 'Wax, wax-resin, resin, wash-care and colour ribbons for thermal transfer printing.',
    description: 'Thermal transfer ribbons for barcode labels, tags and application-specific printing requirements.',
    coverImage: '/images/ribbon-products.jpg',
    products: [
      product('wax', 'WAX', '/images/WAX.jpg', { description: 'Wax thermal-transfer ribbon for clear barcode, label and tag printing.' }),
      product('wax-resin', 'WAX RESIN', '/images/WAX-RESIN.jpg', { description: 'Wax-resin thermal-transfer ribbon for durable printing across a range of label materials.' }),
      product('resin', 'RESIN', '/images/RESIN.jpg', { description: 'Resin thermal-transfer ribbon for durable barcode and label printing on demanding materials.' }),
      product('wash-care-resin', 'WASH CARE RESIN', '/images/WASH-CARE-RESIN.jpg', { description: 'Resin ribbon for durable wash-care and garment-tag printing.' }),
      product('colour-ribbon', 'COLOUR RIBBION', '/images/COLOUR-RIBBION.jpg', { description: 'Colour thermal-transfer ribbon for application-specific label and tag printing.' }),
    ],
  },
  'packaging-material': {
    slug: 'packaging-material',
    title: 'Packaging Materials',
    subtitle: 'Tapes, bags, stretch film and bubble rolls for packing, protection and dispatch.',
    description: 'Packaging materials for sealing, protection, shipping and product handling requirements.',
    coverImage: '/images/Packaging-Materials.jpg',
    products: [
      product('tapes', 'Tapes', '/images/tapes.jpg', { description: 'BOPP, plain and pre-printed, void and Kraft tape options.' }),
      product('paper-bags', 'PAPER BAGS', '/images/paper-bags.jpg', { description: 'Paper bags for retail, food items and general product packaging.' }),
      product('courier-bags', 'COURIER BAGS', '/images/courrier-bags.jpg', { description: 'Moisture-resistant courier bags for secure shipment and delivery packaging.' }),
      product('stretch-film', 'STRETCH FILM', '/images/streach-films.jpg', { description: 'Stretch film for holding products firmly together and protecting loads during transit.' }),
      product('bubble-rolls', 'BUBBLE ROLLS', '/images/bubble-rolls.jpg', { description: 'Bubble rolls for cushioning fragile products against shock and impact during transport.' }),
    ],
  },
  'label-printer': {
    slug: 'label-printer',
    title: 'Label Printer',
    subtitle: 'Desktop, mid-range and industrial label printers for barcode and tag printing workflows.',
    description: 'Label printers for inventory, shipping, retail and industrial printing requirements across different print volumes.',
    coverImage: '/images/label-printer.jpg',
    products: [
      product('tsc-da310', 'TSC DA310', '/images/TSC-DA310.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('tsc-te244', 'TSC TE244', '/images/TSC-TE244.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('tsc-tl240', 'TSC TL240', '/images/TSC-TL240.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('tsc-ml240', 'TSC ML240', '/images/TSC-ML240.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('cp2140', 'CP2140', '/images/CP2140.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('zebra-zd230', 'Zebra ZD230', '/images/Zebra-ZD230.jpg', { description: 'Thermal Transfer or Direct Label Printer', group: 'Entry / Basic level' }),
      product('ht800-ht830', 'HT800/HT830', '/images/ht-printer.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('zebra-421', 'ZEBRA 421', '/images/ZEBRA-421.jpg', { description: 'Entry-level label printer for barcode and tag printing in inventory, shipping and retail workflows.', group: 'Entry / Basic level' }),
      product('citizen-cl631', 'CITIZEN CL631', '/images/CITIZEN-CL631.jpg', { description: 'Mid-range label printer for higher-volume barcode and tag printing workflows.', group: 'Mid Range' }),
      product('zebra-zt411', 'ZEBRA ZT411', '/images/ZEBRA-ZT411.jpg', { description: 'Mid-range label printer for durable, higher-volume barcode and tag printing workflows.', group: 'Mid Range' }),
      product('tsc-mb241t', 'TSC MB241T', '/images/TSC-MB241T.jpg', { description: 'Mid-range label printer for barcode and tag printing across business and operational workflows.', group: 'Mid Range' }),
      product('mh241-341-641', 'MH241 / 341 / 641', '/images/MH241-341-641.jpg', { description: 'Industrial label-printer series for high-volume barcode and tag printing requirements.', group: 'High Range / Industrial' }),
      product('tsc-mx241p', 'TSC MX241P', '/images/TSC-MX241P.jpg', { description: 'Industrial label printer for durable, high-speed barcode and tag printing applications.', group: 'High Range / Industrial' }),
      product('tsc-mh261t', 'TSC MH261T', '/images/TSC-MH261T.jpg', { description: 'Industrial label printer for demanding barcode and tag printing environments.', group: 'High Range / Industrial' }),
      product('tsc-ttp-286mt', 'TSC TTP-286MT', '/images/TSC-TTP-286MT.jpg', { description: 'Industrial label printer for high-volume barcode and tag printing requirements.', group: 'High Range / Industrial' }),
      product('citizn-cl700', 'CITIZN CL700', '/images/CITIZN-CL700.jpg', { description: 'Industrial label printer for demanding barcode, label and tag printing workflows.', group: 'High Range / Industrial' }),
    ],
  },
  'pos-printer': {
    slug: 'pos-printer',
    title: 'POS Printer',
    subtitle: 'Thermal receipt printers for retail, billing and point-of-sale environments.',
    description: 'Compact receipt printers for transaction slips and day-to-day billing at retail and service counters.',
    coverImage: '/images/pos-printer.jpg',
    products: [
      product('epson-tm-m30iii', 'Epson TM-m30III', '/images/Epson-TM-m30III.jpg', { description: 'Compact thermal receipt printer for transaction slips and day-to-day retail or service-counter billing.' }),
      product('epson-tm-t83iii-561', 'Epson TM-T83III-561', '/images/Epson-TM-T83III-561.jpg', { description: 'Thermal POS receipt printer for daily transaction printing at retail and service counters.' }),
      product('restol-rtp-82ue', 'RESTOL RTP-82UE', '/images/RESTOL-RTP-82UE.jpg', { description: 'Thermal POS receipt printer for fast, cost-effective transaction-slip printing.' }),
      product('citizen-s-4000', 'CITIZEN S 4000', '/images/CITIZEN-S-4000.jpg', { description: 'Thermal POS receipt printer for retail, billing and other transaction-printing environments.' }),
      product('rtp-81', 'RTP-81', '/images/RTP-81.jpg', { description: '3-inch thermal receipt printer' }),
    ],
  },
  'rfid-printer': {
    slug: 'rfid-printer',
    title: 'RFID Printer',
    subtitle: 'RFID-capable printers for encoding and printing RFID tags and labels.',
    description: 'RFID printers for inventory, logistics, garment and asset-management workflows that require tag encoding and printing.',
    coverImage: '/images/rfid-printer.jpg',
    products: [
      product('t6000e-series', 'T6000e Series', '/images/T6000e-Series.jpg', { description: '4-Inch Enterprise Industrial Printers' }),
      product('t4000-series', 'T4000 Series', '/images/T4000-Series.jpg', { description: '4-Inch Enterprise Industrial Printers' }),
      product('t800-series', 'T800 Series', '/images/T800-Series.jpg', { description: '4-Inch Enterprise Desktop Printers' }),
      product('zebra-zd621r', 'ZEBRA ZD621R', '/images/ZEBRA-ZD621R.jpg', { description: 'RFID label printer for encoding and printing RFID tags used in tracking and inventory workflows.' }),
    ],
  },
  'bluetooth-printer': {
    slug: 'bluetooth-printer',
    title: 'Bluetooth Printer',
    subtitle: 'Portable wireless printers for mobile printing and field workflows.',
    description: 'Battery-powered Bluetooth printers for mobile printing in logistics, retail, delivery and field applications.',
    coverImage: '/images/bluetooth-printer.jpg',
    products: [
      product('tsc-alpha-30r', 'TSC ALPHA-30R', '/images/TSC-ALPHA-30R.jpg', { description: 'Portable, battery-powered Bluetooth printer for cord-free mobile label printing in field workflows.' }),
      product('tsc-alpha-40l', 'TSC ALPHA-40L', '/images/TSC-ALPHA-40L.jpg', { description: 'Portable, battery-powered Bluetooth printer for mobile printing in logistics, sales and retail environments.' }),
      product('decode-bluetooth-printer', 'Decode Bluetooth Printer', '/images/decode-bluetooth-printer.png', { description: 'Compact Bluetooth printer for portable label and receipt printing in mobile business workflows.', imageFit: 'contain' }),
    ],
  },
  accessories: {
    slug: 'accessories',
    title: 'Printer Accessories',
    subtitle: 'Printer spares, cleaning supplies, stands and rewinders for day-to-day equipment support.',
    description: 'Printer accessories and spares that support maintenance, media handling and reliable printer operation.',
    coverImage: '/images/accessories-cover.jpg',
    products: [
      product('printer-header-spares', 'PRINTER HEADER / SPARES', '/images/PRINTER-HEADER-SPARES.jpg', { description: 'Printer heads and spare parts for maintaining reliable printing performance and reducing downtime.' }),
      product('cleanhead', 'Cleanhead', '/images/Cleanhead-99-Pure-Isopropyl-Rubbing-Alcohol-for-Printhead-Cleaning.jpg', { description: '99% Pure Isopropyl (Rubbing) Alcohol for Printhead Cleaning' }),
      product('external-stand', 'EXTERNAL STAND', '/images/EXTERNAL-STAND.jpg', { description: 'External media stand for supporting label and media handling around printer workflows.' }),
      product('rewinder-motor', 'REWINDER MOTOR', '/images/REWINDER-MOTOR.jpg', { description: 'Rewinder motor accessory for automated label-media handling and continuous printer operation.' }),
    ],
  },
  'wired-scanner': {
    slug: 'wired-scanner',
    title: 'Wired Scanner',
    subtitle: 'Wired barcode scanners for retail counters, warehouses and fixed workstations.',
    description: 'Wired barcode scanners for dependable data capture in checkout, inventory and logistics workflows.',
    coverImage: '/images/bar-code-scanner-cover.jpg',
    products: [
      product('ds2208', 'DS2208', '/images/DS2208.jpg', { description: 'Wired barcode scanner for reliable, accurate data capture at retail counters and fixed workstations.' }),
      product('ls2208', 'LS2208', '/images/LS2208.jpg', { description: 'Wired barcode scanner for dependable everyday scanning in retail, inventory and logistics workflows.' }),
      product('datalogic-qw2120', 'DATALOGIC QW2120', '/images/DATALOGIC-QW2120.jpg', { description: 'Wired barcode scanner for consistent data capture in checkout, warehouse and stationary setups.' }),
      product('datalogic-qw2500', 'DATALOGIC QW2500', '/images/DATALOGIC-QW2500.png', { description: 'QuickScan wired barcode scanner for fast and dependable point-of-sale, inventory and front-desk scanning workflows.', imageFit: 'contain' }),
      product('restol-ls450', 'RESTOL LS450', '/images/RESTOL-LS450.jpg', { description: 'Wired barcode scanner for everyday retail, inventory and logistics data-capture tasks.' }),
      product('honeywell-5145', 'HONEYWELL 5145', '/images/HONEYWELL-5145.jpg', { description: 'Wired barcode scanner for reliable scanning at retail counters and other fixed workstations.' }),
    ],
  },
  'wireless-scanner': {
    slug: 'wireless-scanner',
    title: 'Wireless Scanner and Bluetooth Scanner',
    subtitle: 'Cordless barcode scanners for mobile scanning across stores, warehouses and operational work areas.',
    description: 'Wireless and Bluetooth barcode scanners for flexible data capture without a fixed cable connection.',
    coverImage: '/images/blueetooth-scanner-1.jpg',
    products: [
      product('zebra-li4278', 'ZEBRA LI4278', '/images/ZEBRA-LI4278.jpg', { description: 'Wireless barcode scanner for flexible mobile scanning across retail, inventory and shipping workflows.' }),
      product('zebra-ds6878-sr', 'Zebra DS6878-SR', '/images/Zebra-DS6878-SR-Symbol-Handheld-Wireless.jpg', { description: 'Symbol Handheld Wireless' }),
      product('honeywell-1472g', 'Honeywell 1472g', '/images/Honeywell-1472g-2D-Wireless-Barcode-Scanner-Bluetooth-USB.jpg', { description: '2D Wireless Barcode Scanner | Bluetooth, USB' }),
      product('datalogic-qbt2131-bt', 'Datalogic QBT2131 BT', '/images/Datalogic-QBT2131-BT-2D-Wireless-Scanner.jpg', { description: '2D Wireless Scanner' }),
      product('datalogic-gryphon-gm4500-hc', 'Datalogic Gryphon Gm4500 HC', '/images/Datalogic-Gryphon-Gm4500-HC-Barcode-Scanner-2D-Wireless-Scanner.jpg', { description: 'Barcode Scanner | 2D Wireless Scanner' }),
    ],
  },
  'tabletop-scanner': {
    slug: 'tabletop-scanner',
    title: 'Tabletop Scanner',
    subtitle: 'Hands-free presentation scanners for fast barcode reading at counters and fixed stations.',
    description: 'Tabletop barcode scanners for high-throughput hands-free scanning in retail and operational environments.',
    coverImage: '/images/Tabletop-Scanner.jpg',
    products: [
      product('orbit', 'ORBIT', '/images/ORBIT.jpg', { description: 'Hands-free tabletop barcode scanner for fast scanning at checkout counters and fixed stations.' }),
      product('dataloginc', 'DATALOGINC', '/images/DATALOGINC.jpg', { description: 'Tabletop barcode scanner for high-speed, hands-free data capture in retail and warehouse workflows.' }),
      product('honeywell-orbit-hf680', 'Honeywell Orbit HF680', '/images/Honeywell-Orbit-HF680-2D-Wired-Hands-Free-Area-Imaging-Barcode-Scanner-USBRS232.jpg', { description: '2D Wired Hands-Free Area-Imaging Barcode Scanner | USB/RS232' }),
    ],
  },
  'hht-mobile': {
    slug: 'hht-mobile',
    title: 'HHT / Mobile Device',
    subtitle: 'Handheld computers for barcode scanning, mobile data entry and connected business workflows.',
    description: 'Mobile computers and handheld terminals for inventory, logistics, retail and other data-capture workflows.',
    coverImage: '/images/hht-mobile-device.jpg',
    products: [
      product('urovo-dt50s', 'Urovo DT50S', '/images/Urovo-DT50S.jpg', {
        description: 'Rugged handheld terminal for barcode scanning, mobile data entry and wireless communication.',
      }),
      product('newland-mt90', 'Newland MT90', '/images/Newland-MT90.jpg', {
        description: 'Rugged handheld terminal for barcode scanning, mobile data entry and wireless communication.',
      }),
      product('bluebird-s10-s20', 'Bluebird S10 / S20', '/images/Bluebird-S10-S20.jpg', {
        description: 'Rugged handheld terminal for barcode scanning, mobile data entry and wireless communication.',
      }),
      product('zebra-tc21', 'Zebra TC21', '/images/Zebra-TC21.jpg', {
        description: 'Rugged handheld terminal for barcode scanning, mobile data entry and wireless communication.',
      }),
    ],
  },
  'rfid-device': {
    slug: 'rfid-device',
    title: 'RFID Device',
    subtitle: 'RFID readers, antennas and mobile devices for tag capture and tracking workflows.',
    description: 'RFID readers, antennas and mobile accessories for inventory, asset management and automated data capture.',
    coverImage: '/images/rfid-device.jpg',
    products: [
      product('chainway-c66', 'Chainway C66 Mobile Computer', '/images/Chainway-C66-Mobile-Computer-Android-11-13.jpg', { description: 'Android 11/13' }),
      product('bluebird-rfr901', 'Bluebird The RFR901 for S50', '/images/Bluebird-The-RFR901-for-S50.jpg', { description: 'RFID reader accessory for mobile tag capture in inventory and asset-management workflows.' }),
      product('rfid-antenna-ans960', 'RFID Antenna ANS960', '/images/RFID-Antenna-ANS960.jpg', { description: 'RFID antenna for reader-based tag capture and automated inventory or asset-tracking workflows.' }),
      product('chainway-sr160', 'CHAINWAY SR160', '/images/CHAINWAY-SR160-UHF-RFID-1D-2D-Scanner.jpg', { description: 'UHF RFID + 1D/2D Scanner' }),
      product('ura4-fixed-rfid-reader', 'URA4 Fixed RFID Reader', '/images/URA4-Fixed-RFID-Reader-Android-9.jpg', { description: 'Android 9' }),
    ],
  },
  software: {
    slug: 'software',
    title: 'Software & Mobile Applications',
    subtitle: 'Barcode software and customized mobile applications for printing, scanning and workflow integration.',
    description: 'Barcode software and mobile applications for label printing, data capture and workflow automation.',
    coverImage: '/images/software-and-apps-cover.jpg',
    products: [
      product('bartender', 'Bartender', '/images/Bartender-Professional-Barcode-Software.jpg', { description: 'Professional Barcode Software' }),
      product('customise-apk-mobile-solutions', 'CUSTOMISE APK MOBILE SOLUTIONS', '/images/CUSTOMISE-APK-MOBILE-SOLUTIONS.jpg', { description: 'Customized mobile applications for printing, scanning, inventory and workflow automation.' }),
      product('bluetooth-enable-printer-applications', 'BLUETOOTH ENABLE PRINTER APPLICATIONS', '/images/BLUETOOTH-ENABLE-PRINTER-APPLICATIONS.jpg', { description: 'Bluetooth-enabled printer applications for mobile, cord-free printing workflows.' }),
    ],
  },
  service: {
    slug: 'service',
    title: 'Service & Maintenance',
    subtitle: 'Facility management and technical service support for barcode, printing and RFID equipment.',
    description: 'Facility management, installation, repair, preventive maintenance and technical support for printing and scanning operations.',
    coverImage: '/images/maintenance-cover.jpg',
    products: [
      product('facility-management-services', 'Facility Management Services', '/images/facility-management-services-v3.png', { description: 'Managed barcode printing support, manpower and workflow assistance.' }),
      product('technical-service', 'Technical Service', '/images/technical-service-preventive-maintenance-v2.png', { description: 'Maintenance, repair, preventive maintenance and troubleshooting support for barcode and RFID equipment.' }),
    ],
  },
};

export const allCategorySlugs = Object.keys(productCategories);
