"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeItem, updateQuantity, clearCart } from "@/store/cartSlice";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CartItemComponent from "@/components/CartItemComponent";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart?.items ?? []);
  const dispatch = useDispatch();
  const t = useTranslations("catalog");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only calculate total after client-side hydration
  const total = isClient ? cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) : 0;

  const handleUpdateQuantity = (id: string, selectedSize: string | undefined, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string, selectedSize: string | undefined) => {
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  // Show loading state during hydration
  if (!isClient) {
    return (
      <section className="max-w-2xl mx-auto py-12 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">{t('cart_title', { defaultValue: 'Tu carrito' })}</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">{t('cart_empty', { defaultValue: 'Tu carrito está vacío.' })}</p>
      ) : (
        <>
          <ul className="mb-8">
            {cartItems.map((item: any) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onQuantityChange={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </ul>
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-gray-900">{t('cart_total', { defaultValue: 'Total:' })} {total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
            <button
              className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={handleClearCart}
            >
              {t('clear_cart_button', { defaultValue: 'Vaciar carrito' })}
            </button>
          </div>
          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-lg"
            onClick={() => alert('Checkout!')}
          >
            {t('checkout_button', { defaultValue: 'Finalizar compra' })}
          </button>
        </>
      )}
    </section>
  );
}
