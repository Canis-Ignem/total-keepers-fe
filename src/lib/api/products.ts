import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ProductsResponse, ProductFilters } from '@/types/product';

class ProductsAPI {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.api.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  }

  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.category) params.append('category', filters.category);
      if (filters.tag) params.append('tag', filters.tag);
      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach(tag => params.append('tags', tag));
      }
      if (filters.min_price !== undefined) params.append('min_price', filters.min_price.toString());
      if (filters.max_price !== undefined) params.append('max_price', filters.max_price.toString());
      if (filters.sizes && filters.sizes.length > 0) {
        filters.sizes.forEach(size => params.append('sizes', size));
      }
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.size) params.append('size', filters.size.toString());
    }

    const queryString = params.toString();
    const url = `/api/v1/products${queryString ? `?${queryString}` : ''}`;
    
    const response: AxiosResponse<ProductsResponse> = await this.api.get(url);
    return response.data;
  }

  async getProductById(productId: string) {
    const response = await this.api.get(`/api/v1/products/${productId}`);
    return response.data;
  }
}

export const productsAPI = new ProductsAPI();
