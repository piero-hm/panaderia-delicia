// components/products/ProductFilters.tsx
'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: { label: string; value: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ProductFilters: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={`w-full text-left px-4 py-2 rounded-md font-medium text-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50
            ${
              selectedCategory === category.value
                ? 'bg-amber-100 text-amber-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;
