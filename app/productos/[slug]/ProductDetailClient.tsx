'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${quantity} x ${product.name} añadido(s) al carrito!`);

    }
  };

  return (
    <section className="text-gray-800 body-font overflow-hidden bg-white mt-21">
      <div className="container px-5 py-8 mx-auto"> {/* Reduced vertical padding */}
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Product Image */}
          <div className="lg:w-1/2 w-full lg:h-auto h-80 relative rounded-lg shadow-lg overflow-hidden"> {/* Adjusted image height */}
            <Image
              alt={product.image_alt || product.name}
              className="object-cover object-center"
              src={product.image_src}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mb-1">
              {product.categories ? product.categories.name : 'Sin Categoría'}
            </h2>
            <h1 className="text-gray-900 text-4xl title-font font-bold mb-3">{product.name}</h1> {/* Adjusted margin */}

            {/* Price */}
            <div className="flex items-baseline mb-4">
              {product.discount_price ? (
                <>
                  <span className="title-font font-bold text-3xl text-red-600">S/ {product.discount_price.toFixed(2)}</span>
                  <span className="text-xl text-gray-400 line-through ml-3">S/ {product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="title-font font-bold text-3xl text-amber-600">S/ {product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="leading-relaxed text-gray-600 mb-5 text-base">{product.description}</p> {/* Ensured text-base */}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-gray-800 text-lg font-semibold mb-3">Ingredientes</h3> {/* Adjusted margin */}
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full"> {/* Adjusted padding */}
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center pt-5 border-t-2 border-gray-100 mt-5">
              {/* Quantity Selector */}
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="mr-3 font-medium text-gray-800 text-base">Cantidad</span> {/* Ensured text-base */}
                <div className="relative flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-9 w-9 rounded-l cursor-pointer outline-none flex items-center justify-center" /* Adjusted size */
                  >
                    <MinusIcon className="w-5 h-5" /> {/* Adjusted icon size */}
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none text-center w-14 bg-gray-100 font-semibold text-lg hover:text-black focus:text-black h-9" /* Adjusted size and text size */
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-9 w-9 rounded-r cursor-pointer flex items-center justify-center" /* Adjusted size */
                  >
                    <PlusIcon className="w-5 h-5" /> {/* Adjusted icon size */}
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex sm:ml-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center text-white bg-amber-600 border-0 py-2.5 px-4 focus:outline-none hover:bg-amber-700 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105 text-lg" /* Adjusted padding and text size */
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Stock disponible: {product.stock}</p> {/* Ensured text-sm */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailClient;

