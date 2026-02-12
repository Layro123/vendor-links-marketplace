export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stripePriceId: string;
  img: string;
  digitalContent: {
    title: string;
    contacts: Array<{
      platform: string;
      contact: string;
      notes?: string;
    }>;
    additionalInfo?: string;
  };
}

export const products: Product[] = [
  {
    id: 'all-vendors-bundle',
    name: '-ALL VENDORS BUNDLE',
    price: 2499,
    originalPrice: 5000,
    stripePriceId: 'price_1SzuXaD9nz8MARc2PX9BZ3Dh',
    img: '/all-vendors-bundle.png',
    digitalContent: {
      title: 'All Vendors Bundle - Complete Access',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Main supplier contact' },
        { platform: 'WeChat', contact: 'vendor_id_here', notes: 'Alternative contact' },
        { platform: 'Email', contact: 'supplier@example.com' },
      ],
      additionalInfo: 'This bundle includes access to all vendor categories. Contact suppliers directly via the provided channels.',
    },
  },
  {
    id: 'cologne-vendor',
    name: '.COLOGNE VENDOR',
    price: 999,
    originalPrice: 1999,
    stripePriceId: 'price_1SzuXkD9nz8MARc2ajhfQrpU',
    img: '/cologne.png',
    digitalContent: {
      title: 'Cologne Vendor Contacts',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Cologne supplier' },
        { platform: 'Email', contact: 'cologne@example.com' },
      ],
      additionalInfo: 'Premium cologne suppliers with competitive wholesale pricing.',
    },
  },
  {
    id: 'designer-bag-supplier',
    name: 'DESIGNER BAG SUPPLIER',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1SzuXvD9nz8MARc27ffnrkOD',
    img: '/designer-bags.png',
    digitalContent: {
      title: 'Designer Bag Supplier Contacts',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Bag supplier' },
        { platform: 'WeChat', contact: 'bags_vendor', notes: 'Primary contact' },
      ],
      additionalInfo: 'High-quality designer bag suppliers.',
    },
  },
  {
    id: 'earphone-vendor',
    name: 'Earphone Vendor',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1SzuY9D9nz8MARc2jtYOJHM0',
    img: '/earphones.png',
    digitalContent: {
      title: 'Earphone Vendor Contacts',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Earphone supplier' },
        { platform: 'Email', contact: 'earphones@example.com' },
      ],
      additionalInfo: 'Premium earphone and audio accessory suppliers.',
    },
  },
  {
    id: 'phone-vendor',
    name: 'PHONE VENDOR',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1SzuYKD9nz8MARc2VWHqkHMP',
    img: '/phone.png',
    digitalContent: {
      title: 'Phone Vendor Contacts',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Phone supplier' },
        { platform: 'WeChat', contact: 'phone_vendor' },
      ],
      additionalInfo: 'Mobile phone and accessories suppliers.',
    },
  },
  {
    id: 'sneaker-vendor',
    name: 'SNEAKER VENDOR',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1SzuYXD9nz8MARc2XON7E1wM',
    img: '/sneakers.png',
    digitalContent: {
      title: 'Sneaker Vendor Contacts',
      contacts: [
        { platform: 'WhatsApp', contact: '+1 XXX XXX XXXX', notes: 'Sneaker supplier' },
        { platform: 'WeChat', contact: 'sneakers_vendor' },
      ],
      additionalInfo: 'Premium sneaker suppliers with latest releases.',
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
