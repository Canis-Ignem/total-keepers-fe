"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeItem, clearCart, updateQuantity } from "@/store/cartSlice";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface CheckoutPageProps {
  params: {
    locale: string;
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const t = useTranslations("checkout");
  const cartItems = useSelector((state: RootState) => state.cart?.items ?? []);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only calculate these after client-side hydration
  const subtotal = isClient ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const shipping = subtotal > 50 ? 0 : 4.99; // Free shipping over €50
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, selectedSize: string | undefined, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeItem({ id, selectedSize }));
    } else {
      dispatch(updateQuantity({ id, selectedSize, quantity: newQuantity }));
    }
  };

  // Show loading state during hydration to prevent mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('empty_cart_message')}</h1>
          <p className="text-gray-600 mb-6">{t('continue_shopping')}</p>
          <a href="/catalog" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            {t('continue_shopping')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('your_cart')}</h1>
          <p className="text-gray-600 mt-2">{t('review_order')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    {cartItems.length}
                  </span>
                  {t('your_cart')}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || ''}`} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {item.img ? (
                          <Image 
                            src={item.img} 
                            alt={item.name} 
                            width={80} 
                            height={80} 
                            className="rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-sm">{t('no_image')}</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          {item.selectedSize && (
                            <span>{t('size')}: {item.selectedSize}</span>
                          )}
                          {!item.selectedSize && item.sizes && item.sizes.length > 0 && (
                            <span>{t('sizes')}: {item.sizes.join(", ")}</span>
                          )}
                          {item.tag && <span className="bg-gray-100 px-2 py-1 rounded">{item.tag}</span>}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <label className="text-sm font-medium text-gray-700">{t('quantity_label')}</label>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeItem({ id: item.id, selectedSize: item.selectedSize }))}
                            className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                          >
                            {t('remove')}
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} cada uno
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <a 
                href="/catalog" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                ← {t('continue_shopping')}
              </a>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{t('order_summary')}</h2>
              </div>
              
              <div className="p-6">
                {/* Coupon Section */}
                <div className="mb-6">
                  <button className="w-full text-left text-blue-600 font-medium mb-3 flex items-center justify-between">
                    <span>{t('add_promo_code')}</span>
                    <span>▼</span>
                  </button>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t('enter_coupon_code')}
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                      {t('apply')}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('subtotal')} ({cartItems.length} {t('checkout_items')}):</span>
                    <span>{subtotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>{t('shipping')}:</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">{t('free')}</span>
                      ) : (
                        shipping.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-gray-500">
                      {t('checkout_free_shipping_message')}
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">{t('total')}:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    dispatch(clearCart());
                    alert(t('checkout_success'));
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                >
                  🛒 {t('checkout_proceed')}
                </button>

                {/* Security Icons */}
                <div className="text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span>🔒</span>
                    <span>{t('checkout_secure')}</span>
                  </div>
                  <div className="text-xs">
                    {t('checkout_ssl')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}