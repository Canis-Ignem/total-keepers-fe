import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";

interface Product {
  name: string;
  description: string;
  price: number;
  img: string;
  tag: string;
  sizes: string[];
  tags: string[];
}

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
      id: product.name,
      name: product.name,
      price: product.price,
      quantity: 1,
      selectedSize: selectedSize,
      img: product.img,
      tag: product.tag,
      sizes: product.sizes,
      tags: product.tags,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const isAddToCartDisabled = !selectedSize || added;

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs min-w-[260px] border border-gray-100 relative">
      <span className="absolute left-4 top-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-white shadow">{product.tag}</span>
      <Image
        src={product.img}
        alt={product.name}
        width={220}
        height={220}
        className="mb-4 object-contain"
      />
      <div className="w-full flex flex-col items-start">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <span className="text-2xl font-extrabold text-gray-900">{product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
        
        {/* Size Selection */}
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
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm font-semibold rounded-md border transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-blue-700 text-white border-blue-700 shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePurchase}
          className={`mt-4 px-4 py-2 rounded-lg font-bold transition-all duration-200 w-full ${
            isAddToCartDisabled
              ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
          disabled={isAddToCartDisabled}
        >
          {added 
            ? (
              <span className="flex items-center justify-center gap-2">
                ✅ {t('buy_button_added', { default: '¡Añadido!' })}
              </span>
            )
            : !selectedSize 
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
      </div>
    </div>
  );
};

export default CatalogProduct;
