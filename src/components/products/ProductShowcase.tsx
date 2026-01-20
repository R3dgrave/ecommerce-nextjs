"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "../../types/index";
import { CategoryFilters } from "./CategoryFilters";
import { FeaturedProducts } from "./FeaturedProducts";
import { SearchBar } from "./SearchBar";

interface Props {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductShowcase({ initialProducts, categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory = selectedCategoryId 
        ? (product.categoryId === selectedCategoryId)
        : true;
      
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery, initialProducts]);

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <CategoryFilters 
          categories={categories} 
          selectedId={selectedCategoryId} 
          onSelect={(id) => {
            setSelectedCategoryId(id);
          }} 
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredProducts.length > 0 ? (
        <FeaturedProducts products={filteredProducts} error={null} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg font-medium">No se encontraron productos que coincidan con tu búsqueda.</p>
          <button 
            onClick={() => {setSearchQuery(""); setSelectedCategoryId(null);}}
            className="mt-4 text-blue-600 font-bold hover:underline"
          >
            Limpiar todos los filtros
          </button>
        </div>
      )}
    </section>
  );
}