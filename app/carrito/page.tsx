
'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart, checkout, isCheckingOut } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { items } = state;

  const handleCheckout = () => {
    if (!user) {
      toast.info('Debes iniciar sesión para realizar la compra.');
      router.push('/auth/signin');
    } else {
      checkout();
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const priceToUse = item.product.discount_price || item.product.price;
      return total + priceToUse * item.quantity;
    }, 0);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 text-center bg-[var(--background-light)] min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-[var(--foreground-dark)]">Tu Carrito Está Vacío</h1>
        <p className="text-lg text-gray-700 mb-8">Parece que aún no has añadido nada a tu carrito. ¡Explora nuestras delicias!</p>
        <Link href="/productos" className="inline-flex text-white bg-[var(--accent-gold)] border-0 py-3 px-8 focus:outline-none hover:bg-opacity-90 rounded-full text-lg transition-colors duration-300 shadow-lg">
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-[var(--background-light)]">
      <h1 className="text-4xl font-bold text-center mb-10 text-[var(--foreground-dark)]">Tu Carrito de Compras</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center border-b border-gray-200 last:border-b-0 py-4">
                <div className="w-full sm:w-1/4 flex-shrink-0 mb-4 sm:mb-0">
                  <Image
                    src={item.product.image_src || '/images/producto-placeholder-default.jpg'}
                    alt={item.product.image_alt || item.product.name}
                    width={120}
                    height={120}
                    className="rounded-lg shadow-md w-full h-auto sm:w-24 sm:h-24 object-cover"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left sm:ml-4">
                  <h2 className="text-xl font-semibold text-[var(--foreground-dark)] mb-1">{item.product.name}</h2>
                  <div className="flex items-center justify-center sm:justify-start mb-2">
                    {item.product.discount_price ? (
                      <>
                        <p className="text-lg font-bold text-red-600 mr-2">S/ {item.product.discount_price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 line-through">S/ {item.product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-[var(--foreground-dark)]">S/ {item.product.price.toFixed(2)}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  <p className="text-lg font-bold text-[var(--accent-gold)] mt-1">
                    Subtotal: S/ {((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center sm:justify-end mt-4 sm:mt-0 sm:w-1/4">
                  <div className="flex items-center border border-gray-300 rounded-md mb-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1 || isCheckingOut}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-[var(--foreground-dark)]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock || isCheckingOut}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={isCheckingOut}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-md disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-[var(--foreground-dark)] mb-4">Resumen del Pedido</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold text-[var(--foreground-dark)]">S/ {calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 border-t border-gray-200 pt-4 mt-4">
              <span className="text-xl font-bold text-[var(--foreground-dark)]">Total:</span>
              <span className="text-xl font-bold text-[var(--accent-gold)]">S/ {calculateSubtotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[var(--accent-gold)] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isCheckingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                'Proceder al Pago'
              )}
            </button>
            <button
              onClick={clearCart}
              disabled={isCheckingOut}
              className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
