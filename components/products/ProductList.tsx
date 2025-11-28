// components/products/ProductList.tsx
'use client';

import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';
import FeaturedProductCarousel from './FeaturedProductCarousel'; // Import the carousel component

interface ProductListProps {
  products: Product[];
  isCarousel?: boolean; // Add isCarousel prop
  onQuickView?: (product: Product) => void; // New prop, now optional
}

const ProductList: React.FC<ProductListProps> = ({ products, isCarousel = false, onQuickView }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-600 py-10">No se encontraron productos.</p>;
  }

  if (isCarousel) {
    return <FeaturedProductCarousel products={products} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
};

export default ProductList;
