"use client";
import React from "react";
import { useTranslations } from "next-intl";
import QuantityControl from "./QuantityControl";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  img?: string;
  sizes?: string[];
  description?: string;
  tag?: string;
}

interface CartItemComponentProps {
  item: CartItem;
  onQuantityChange: (id: string, selectedSize: string | undefined, quantity: number) => void;
  onRemove: (id: string, selectedSize: string | undefined) => void;
}

export default function CartItemComponent({ item, onQuantityChange, onRemove }: CartItemComponentProps) {
  const t = useTranslations("catalog");

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      onRemove(item.id, item.selectedSize);
    } else {
      onQuantityChange(item.id, item.selectedSize, newQuantity);
    }
  };

  return (
    <li className="flex items-center gap-4 mb-6 bg-white rounded-xl shadow p-4">
      <img src={item.img || ''} alt={item.name} width={60} height={60} className="rounded" />
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-900">{item.name}</div>
        <div className="text-sm text-gray-600">
          {item.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </div>
        <div className="text-xs text-gray-500">
          {item.selectedSize ? `${t('size_label', { default: 'Talla' })}: ${item.selectedSize}` : `${t('sizes_label')} ${item.sizes?.join(', ') || 'N/A'}`}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">{t('checkout_quantity', { defaultValue: 'Cantidad:' })}</label>
        <QuantityControl
          quantity={item.quantity}
          onQuantityChange={handleQuantityChange}
          min={1}
        />
      </div>

      <button
        className="text-red-600 font-bold px-2 hover:text-red-800 transition-colors"
        onClick={() => onRemove(item.id, item.selectedSize)}
      >
        {t('remove_button', { defaultValue: 'Eliminar' })}
      </button>
    </li>
  );
}
