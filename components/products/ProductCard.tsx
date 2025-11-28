// components/products/ProductCard.tsx
'use client';

import React from 'react';
import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} añadido al carrito!`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onQuickView(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden"> {/* Simplified image container */}
          <Image
            src={product.image_src}
            alt={product.image_alt || ''}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 90vw"
            priority={true} // Added priority for better loading
          />
          {product.discount_price && (
            <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white z-10">
              Oferta
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category_id}</h3>
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight"> {/* Reduced font size */}
            {product.name}
          </h2>
          <div className="flex flex-1 flex-col justify-end mt-auto">
            <div className="flex items-baseline mt-2">
              {product.discount_price ? (
                <>
                  <p className="text-xl font-bold text-red-600">{`S/ ${product.discount_price.toFixed(2)}`}</p>
                  <p className="text-sm text-gray-400 line-through ml-2">{`S/ ${product.price.toFixed(2)}`}</p>
                </>
              ) : (
                <p className="text-xl font-bold text-gray-800">{`S/ ${product.price.toFixed(2)}`}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* Action Buttons - Appear on hover */}
      <div className="absolute bottom-4 right-4 flex space-x-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <button
          onClick={handleQuickView}
          className="flex items-center justify-center rounded-full bg-white p-2 text-gray-600 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={`Vista rápida de ${product.name}`}
        >
          <EyeIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center rounded-full bg-amber-600 p-2 text-white shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

