import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Load cart state from localStorage
function loadCartState() {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    // Ensure shape is always { items: [] }
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.items)) {
      return { cart: { items: [] } };
    }
    return { cart: parsed };
  } catch (err) {
    return { cart: { items: [] } };
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartState(),
});

// Subscribe to store changes and persist cart state
store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;