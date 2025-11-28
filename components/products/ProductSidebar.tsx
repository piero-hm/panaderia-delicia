// components/products/ProductSidebar.tsx
'use client';

import React from 'react';
import ProductFilters from './ProductFilters';
import ProductSort, { SortOption } from './ProductSort';

interface ProductSidebarProps {
  categories: { label: string; value: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onSortChange,
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="sticky top-24 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Sort Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Ordenar por</h3>
          <ProductSort onSortChange={onSortChange} />
        </div>

        {/* Category Filter Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Categorías</h3>
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
