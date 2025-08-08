"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Product } from "@/types/product";

interface CatalogProductProps {
  product: Product;
}

const CatalogProduct: React.FC<CatalogProductProps> = ({ product }) => {
  const t = useTranslations("catalog");
  const dispatch = useDispatch();

  const [added, setAdded] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const handlePurchase = () => {
    if (!selectedSize) return; // Don't add if no size selected

    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      selectedSize: selectedSize,
      img: product.img || "/train_with_us/gloves.svg", // Fallback image
      tag: product.tag || "",
      sizes: product.available_sizes,
      tags: product.tags.map(tag => tag.name),
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const isAddToCartDisabled = !selectedSize || added || !product.is_in_stock;

  // Display tag or category as fallback
  const displayTag = product.tag || product.category;
  
  // Use fallback image if img is null
  const productImage = product.img || "/train_with_us/gloves.svg";
  
  // Use fallback description if null
  const productDescription = product.description || t('no_description', { default: 'Descripción no disponible' });

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs min-w-[260px] border border-gray-100 relative">
      {displayTag && (
        <span className="absolute left-4 top-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-white shadow uppercase">
          {displayTag}
        </span>
      )}
      <Image
        src={productImage}
        alt={product.name}
        width={220}
        height={220}
        className="mb-4 object-contain"
      />
      <div className="w-full flex flex-col items-start">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-3">{productDescription}</p>
        <span className="text-2xl font-extrabold text-gray-900">
          {product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </span>
        
        {/* Stock Status */}
        {product.is_in_stock ? (
          <div className="mt-2 text-xs text-green-600 font-medium">
            ✓ {t('in_stock', { default: 'En stock' })} ({product.total_stock} {t('units', { default: 'unidades' })})
          </div>
        ) : (
          <div className="mt-2 text-xs text-red-600 font-medium">
            ✗ {t('out_of_stock', { default: 'Sin stock' })}
          </div>
        )}
        
        {/* Size Selection */}
        {product.available_sizes.length > 0 && product.is_in_stock && (
          <div className="mt-3 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-700">{t('sizes_label', { default: 'Tallas disponibles' })}</span>
              {!selectedSize && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-200 animate-pulse">
                  👆 {t('choose_your_size', { default: 'Elige tu talla' })}
                </span>
              )}
              {selectedSize && (
                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-200 flex items-center gap-1">
                  ✓ {t('size_selected', { default: 'Talla seleccionada' })}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.available_sizes.map((size) => {
                const sizeInfo = product.sizes.find(s => s.size === size);
                const isAvailable = sizeInfo?.is_available && (sizeInfo?.stock_quantity || 0) > 0;
                
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable ? setSelectedSize(size) : null}
                    disabled={!isAvailable}
                    className={`px-3 py-1 text-sm font-semibold rounded-md border transition-all duration-200 ${
                      !isAvailable
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : selectedSize === size
                        ? 'bg-blue-700 text-white border-blue-700 shadow-md transform scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    title={isAvailable ? `${t('stock', { default: 'Stock' })}: ${sizeInfo?.stock_quantity}` : t('no_stock', { default: 'Sin stock' })}
                  >
                    {size}
                    {sizeInfo && (
                      <span className="ml-1 text-xs opacity-75">
                        ({sizeInfo.stock_quantity})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handlePurchase}
          className={`mt-4 px-4 py-2 rounded-lg font-bold transition-all duration-200 w-full ${
            isAddToCartDisabled
              ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
          disabled={isAddToCartDisabled}
        >
          {!product.is_in_stock 
            ? t('out_of_stock', { default: 'Sin stock' })
            : added 
            ? (
              <span className="flex items-center justify-center gap-2">
                ✅ {t('buy_button_added', { default: '¡Añadido!' })}
              </span>
            )
            : !selectedSize && product.available_sizes.length > 0
              ? (
                <span className="flex items-center justify-center gap-2">
                  👆 {t('select_size_first', { default: 'Selecciona tu talla primero' })}
                </span>
              )
              : (
                <span className="flex items-center justify-center gap-2">
                  🛒 {t('buy_button', { default: 'Añadir al carrito' })}
                </span>
              )
          }
        </button>
        
        {/* Tags Display */}
        {product.tags.length > 0 && (
          <div className="mt-3 w-full">
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag.id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  title={tag.description}
                >
                  {tag.name}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogProduct;
