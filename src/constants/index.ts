// App configuration
export const APP_CONFIG = {
  CART_STORAGE_KEY: 'total-keepers-cart',
  FREE_SHIPPING_THRESHOLD: 50,
  TESTIMONIAL_ROTATION_INTERVAL: 15000, // 15 seconds
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/campus-de-verano-bilbao', labelKey: 'campus' },
  { href: '/catalog', labelKey: 'gloves' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/photos', labelKey: 'photos' },
] as const;

// Supported locales
export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'es' as const;

// Product sizes
export const GLOVE_SIZES = ['6', '7', '8', '9', '10', '11'] as const;
