import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  description?: string;
  img?: string;
  tag?: string;
  sizes?: string[];
  tags?: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      if (!Array.isArray(state.items)) state.items = [];
      // Create unique key based on product id and selected size
      const uniqueKey = `${action.payload.id}-${action.payload.selectedSize || ''}`;
      const existing = state.items.find(item => 
        `${item.id}-${item.selectedSize || ''}` === uniqueKey
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; selectedSize?: string; quantity: number }>) => {
      if (!Array.isArray(state.items)) state.items = [];
      const uniqueKey = `${action.payload.id}-${action.payload.selectedSize || ''}`;
      const existing = state.items.find(item => 
        `${item.id}-${item.selectedSize || ''}` === uniqueKey
      );
      if (existing) {
        existing.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string; selectedSize?: string }>) => {
      if (!Array.isArray(state.items)) state.items = [];
      const uniqueKey = `${action.payload.id}-${action.payload.selectedSize || ''}`;
      // mutate in-place
      for (let i = state.items.length - 1; i >= 0; i--) {
        if (`${state.items[i].id}-${state.items[i].selectedSize || ''}` === uniqueKey) {
          state.items.splice(i, 1);
        }
      }
    },
    clearCart: state => {
      if (!Array.isArray(state.items)) state.items = [];
      state.items.length = 0;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;