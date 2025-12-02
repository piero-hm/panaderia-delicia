'use client';

import React from 'react';
import ProductFilters from './ProductFilters';
import ProductSort, { SortOption } from './ProductSort';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ProductSidebarProps {
  categories: { label: string; value: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortOption: SortOption; // Añadido para controlar el estado del select
  onSortChange: (sort: SortOption) => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
  onResetFilters,
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="sticky top-24 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Buscar</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Nombre del producto..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Sort Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Ordenar por</h3>
          <ProductSort value={sortOption} onSortChange={onSortChange} />
        </div>

        {/* Category Filter Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Categorías</h3>
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        {/* Reset Filters Button */}
        <div className="border-t pt-6">
          <button
            onClick={onResetFilters}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md transition-colors"
          >
            <XCircleIcon className="h-5 w-5" />
            Limpiar Filtros
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
