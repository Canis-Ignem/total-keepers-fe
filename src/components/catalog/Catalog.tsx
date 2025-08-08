"use client";
import { useState, useMemo, useEffect } from "react";
import { useTranslations } from 'next-intl';
import CatalogProduct from "./CatalogProduct";
import CatalogFilter from "./CatalogFilter";
import { Product } from "@/types/product";

interface CatalogProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
}

const Catalog: React.FC<CatalogProps> = ({ products, isLoading, error }) => {
  const t = useTranslations("catalog");
  
  // Extract unique tags and sizes from API products
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tagSet.add(tag.name));
    });
    return Array.from(tagSet);
  }, [products]);

  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    products.forEach(product => {
      product.available_sizes.forEach(size => sizeSet.add(size));
    });
    return Array.from(sizeSet).sort((a, b) => parseInt(a) - parseInt(b));
  }, [products]);

  const minPrice = useMemo(() => 
    products.length > 0 ? Math.min(...products.map(p => p.price)) : 0
  , [products]);
  
  const maxPrice = useMemo(() => 
    products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000
  , [products]);

  const [filters, setFilters] = useState({
    priceRange: [minPrice, maxPrice] as [number, number],
    tag: null as string | null,
    tags: [] as string[],
    sizes: [] as string[],
  });

  // Update filter range when products change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice]
    }));
  }, [minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      
      // Tag filter (single tag)
      if (filters.tag && !product.tags.some(tag => tag.name === filters.tag)) return false;
      
      // Tags filter (multiple tags - all must match)
      if (filters.tags.length > 0 && !filters.tags.every(filterTag => 
        product.tags.some(productTag => productTag.name === filterTag)
      )) return false;
      
      // Sizes filter (any size must match)
      if (filters.sizes.length > 0 && !filters.sizes.some(size => 
        product.available_sizes.includes(size)
      )) return false;
      
      // Only show active products that are in stock
      if (!product.is_active) return false;
      
      return true;
    });
  }, [filters, products]);

  // Pagination logic
  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="w-full flex flex-row gap-10 max-w-7xl mx-auto">
      <div className="hidden md:block min-w-[260px] max-w-xs w-full">
        <CatalogFilter
          tags={allTags}
          sizes={allSizes}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={setFilters}
        />
      </div>
      <div className="flex-1 flex flex-col items-center">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">{t('loading_products')}</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>{t('error_label')}</strong> {error}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <>
            {/* Products Count */}
            <div className="w-full mb-4 text-center">
              <span className="text-gray-600">
                {t('showing_products', { 
                  showing: paginatedProducts.length, 
                  filtered: filteredProducts.length 
                })}
                {products.length !== filteredProducts.length && t('total_in_parentheses', { total: products.length })}
              </span>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-10 w-full">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <CatalogProduct key={product.id} product={product} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('no_products_found')}</p>
                  <button 
                    onClick={() => setFilters({
                      priceRange: [minPrice, maxPrice],
                      tag: null,
                      tags: [],
                      sizes: [],
                    })}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t('clear_filters')}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Pagination Controls */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex items-center gap-2 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded border text-sm font-semibold transition-colors ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
            >
              {t('previous')}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-2 py-1 rounded text-sm font-semibold border transition-colors ${page === i + 1 ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded border text-sm font-semibold transition-colors ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
