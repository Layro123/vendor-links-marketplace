export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stripePriceId: string;
  img: string;
  digitalContent: {
    title: string;
    link: string;
  };
}

export const products: Product[] = [
  {
    id: 'all-vendors-bundle',
    name: '-ALL VENDORS BUNDLE',
    price: 2499,
    originalPrice: 5000,
    stripePriceId: 'price_1T10ilQn28iWM6nd5BiXk0Tq',
    img: '/all-vendors-bundle.png',
    digitalContent: {
      title: 'All Vendors Bundle - Complete Access',
      link: 'https://docs.google.com/document/d/1QzYURpEe_YwEhHOxxxsSYhVtU0p2OkOz5LFzD16ZyWc/edit?usp=sharing',
    },
  },
  {
    id: 'cologne-vendor',
    name: '.COLOGNE VENDOR',
    price: 999,
    originalPrice: 1999,
    stripePriceId: 'price_1T10imQn28iWM6ndpIhwSKqZ',
    img: '/cologne.png',
    digitalContent: {
      title: 'Cologne Vendor Contacts',
      link: 'https://docs.google.com/document/d/1px1TVh0OAoXSYUvFDazJhHk8oZ-BdAvRVNM8Uxe6aYU/edit?usp=sharing',
    },
  },
  {
    id: 'designer-bag-supplier',
    name: 'DESIGNER BAG SUPPLIER',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1T10ioQn28iWM6ndJvdPnEJJ',
    img: '/designer-bags.png',
    digitalContent: {
      title: 'Designer Bag Supplier Contacts',
      link: 'https://docs.google.com/document/d/1x7jFVSTC5jRADE-NADy2DSicJ_Fx_NFxFKEMRcavuSA/edit?usp=sharing',
    },
  },
  {
    id: 'earphone-vendor',
    name: 'Earphone Vendor',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1T10ipQn28iWM6ndZD6oiKjb',
    img: '/earphones.png',
    digitalContent: {
      title: 'Earphone Vendor Contacts',
      link: 'https://docs.google.com/document/d/1Nucmmw77UycaHasFW0mc1hpEB3XX3NVSI4mf64x3cgk/edit?usp=sharing',
    },
  },
  {
    id: 'phone-vendor',
    name: 'PHONE VENDOR',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1T10iqQn28iWM6ndo5slUMYr',
    img: '/phone.png',
    digitalContent: {
      title: 'Phone Vendor Contacts',
      link: 'https://docs.google.com/document/d/1WWfan0GTc-0ZRCgqXmUuMcfV-zI4MoS_cm9eFijbTv4/edit?usp=sharing',
    },
  },
  {
    id: 'sneaker-vendor',
    name: 'SNEAKER VENDOR',
    price: 1499,
    originalPrice: 3000,
    stripePriceId: 'price_1T10irQn28iWM6ndGlvSd5Jj',
    img: '/sneakers.png',
    digitalContent: {
      title: 'Sneaker Vendor Contacts',
      link: 'https://docs.google.com/document/d/1RZcXjsZCJL7QYY0HB0Gqf0rY0t_7PS6FNE8MCqh5FDQ/edit?usp=sharing',
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
