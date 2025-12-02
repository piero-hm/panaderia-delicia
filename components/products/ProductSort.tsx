// components/products/ProductSort.tsx
'use client';

import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'default';

interface ProductSortProps {
  value: SortOption; // Prop 'value' añadida
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Recomendados', value: 'default' },
  { label: 'Nombre: A-Z', value: 'name-asc' },
  { label: 'Nombre: Z-A', value: 'name-desc' },
  { label: 'Precio: Menor a Mayor', value: 'price-asc' },
  { label: 'Precio: Mayor a Menor', value: 'price-desc' },
];

const ProductSort: React.FC<ProductSortProps> = ({ value, onSortChange }) => {
  return (
    <div className="relative inline-block text-left">
      <select
        value={value} // Usamos 'value' en lugar de 'defaultValue'
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
};

export default ProductSort;
