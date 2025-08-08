"use client";
import React from "react";

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
}

export default function QuantityControl({ quantity, onQuantityChange, min = 1 }: QuantityControlProps) {
  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    onQuantityChange(newQuantity);
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center border-2 border-gray-400 rounded bg-white">
      <button
        onClick={handleDecrease}
        className="px-3 py-1 text-black font-bold hover:bg-gray-100 rounded-l transition-colors"
        style={{ color: '#000000' }}
      >
        −
      </button>
      <span 
        className="px-4 py-1 bg-white border-x border-gray-300 min-w-[40px] text-center font-bold"
        style={{ color: '#000000' }}
      >
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        className="px-3 py-1 text-black font-bold hover:bg-gray-100 rounded-r transition-colors"
        style={{ color: '#000000' }}
      >
        +
      </button>
    </div>
  );
}
