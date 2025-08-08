import axios, { AxiosInstance } from 'axios';

export interface CartItem {
  id: number;
  product_id: string;
  size: string;
  quantity: number;
  user_id: string;
  created_at: string;
  updated_at?: string;
  product_name?: string;
  product_price?: number;
  product_img?: string;
  product_description?: string;
}

export interface CartResponse {
  items: CartItem[];
  total_amount: number;
  total_items: number;
}

export interface CartItemCreate {
  product_id: string;
  size: string;
  quantity: number;
}

export interface CartItemUpdate {
  quantity: number;
}

class CartAPI {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    this.api = axios.create({
      baseURL: `${this.baseURL}/api/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Get user's cart
  async getCart(): Promise<CartResponse> {
    const response = await this.api.get('/cart/');
    return response.data;
  }

  // Add item to cart
  async addItem(item: CartItemCreate): Promise<CartItem> {
    const response = await this.api.post('/cart/items', item);
    return response.data;
  }

  // Update cart item quantity
  async updateItem(itemId: number, update: CartItemUpdate): Promise<CartItem> {
    const response = await this.api.put(`/cart/items/${itemId}`, update);
    return response.data;
  }

  // Remove item from cart
  async removeItem(itemId: number): Promise<void> {
    await this.api.delete(`/cart/items/${itemId}`);
  }

  // Clear entire cart
  async clearCart(): Promise<void> {
    await this.api.delete('/cart/clear');
  }

  // Sync frontend cart with backend
  async syncCart(frontendItems: CartItemCreate[]): Promise<CartResponse> {
    const response = await this.api.post('/cart/sync', frontendItems);
    return response.data;
  }
}

export const cartAPI = new CartAPI();
