// components/products/ProductQuickView.tsx
'use client';

import React from 'react';
import { Product } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductDetailClient from '@/app/productos/[slug]/ProductDetailClient'; // Reusing the detail client component

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Cerrar vista rápida"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
        <div className="p-6">
          {/* Reusing the ProductDetailClient component for consistency */}
          <ProductDetailClient product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
