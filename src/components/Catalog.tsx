"use client";
import { useState, useMemo, useEffect } from "react";
import CatalogProduct from "@/components/CatalogProduct";
import CatalogFilter from "@/components/CatalogFilter";

interface Product {
  name: string;
  description: string;
  price: number;
  img: string;
  tag: string;
  sizes: string[];
  tags: string[];
}

interface CatalogProps {
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  const [filters, setFilters] = useState({
    priceRange: [minPrice, maxPrice] as [number, number],
    tag: null as string | null,
    tags: [] as string[],
    sizes: [] as string[],
  });


  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.tag && !product.tags.includes(filters.tag)) return false;
      if (filters.tags.length > 0 && !filters.tags.every(tag => product.tags.includes(tag))) return false;
      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) return false;
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
        <div className="flex flex-row flex-wrap justify-center gap-10 w-full">
          {paginatedProducts.map((product, idx) => (
            <CatalogProduct key={product.name + idx} product={product} />
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded border text-sm font-semibold transition-colors ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-100'}`}
            >
              Anterior
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
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
