export interface ProductSize {
  size: string;
  stock_quantity: number;
  is_available: boolean;
  id: number;
  product_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProductTag {
  name: string;
  description: string;
  id: number;
  created_at: string;
}

export interface Product {
  name: string;
  description: string | null;
  price: number;
  img: string | null;
  category: string;
  tag: string | null;
  is_active: boolean;
  id: string;
  created_at: string;
  updated_at: string | null;
  sizes: ProductSize[];
  tags: ProductTag[];
  available_sizes: string[];
  total_stock: number;
  is_in_stock: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ProductFilters {
  category?: string;
  tag?: string;
  tags?: string[];
  min_price?: number;
  max_price?: number;
  sizes?: string[];
  page?: number;
  size?: number;
}

// Legacy Product interface for compatibility
export interface LegacyProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  img: string;
  tag: string;
  sizes: string[];
  tags: string[];
}
