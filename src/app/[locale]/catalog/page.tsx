'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Catalog from "@/components/catalog/Catalog";
import { productsAPI } from '@/lib/api/products';
import { Product } from '@/types/product';

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsAPI.getProducts({
          page: 1,
          size: 50
        });
        setProducts(response.products);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.detail || err.message || t('error_loading_products'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f8fafc] to-[#eaf6fb] py-16 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-lg">
        {t('title', { default: 'Catálogo de Productos' })}
      </h1>
      
      {/* API Connection Status */}
      {!isLoading && !error && products.length > 0 && (
        <div className="mb-4 text-center">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {t('api_connected', { count: products.length })}
          </span>
        </div>
      )}
      
      <Catalog products={products} isLoading={isLoading} error={error} />
    </section>
  );
}

