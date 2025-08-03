// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  img?: string;
  sizes: string[];
  tag?: string;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  text: string;
  author?: string;
}

// Locale types
export type Locale = 'en' | 'es';

// Navigation types
export interface NavItem {
  href: string;
  labelKey: string;
}
