
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { PlusIcon, MinusIcon, XMarkIcon, ShoppingBagIcon, ArrowRightIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation'; // Importamos useRouter

// Hook para obtener el tamaño de la ventana
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

// Variantes de animación para la lista
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function CartPage() {
  const { state, isCheckingOut, updateQuantity, removeItem, checkout, clearCart } = useCart();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter(); // Inicializamos useRouter

  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDiscount = state.items.reduce((sum, item) => {
    const discount = item.product.price - (item.product.discount_price || item.product.price);
    return sum + discount * item.quantity;
  }, 0);
  const total = subtotal - totalDiscount;

  const handleCheckout = async () => {
    const result = await checkout();
    if (result?.redirect) {
      router.push(result.redirect); // Redirigir si se recibe la señal
      return;
    }
    if (result?.success) {
      toast.success("¡Pedido realizado con éxito!");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        clearCart();
      }, 6000);
    } else if (result?.error) {
      toast.error(`Error al procesar el pedido: ${result.error}`);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
      clearCart();
      toast.info('Tu carrito ha sido vaciado.');
    }
  };

  // El layout principal ahora envuelve todo para tener un fondo consistente
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.15} />}
      
      {state.items.length === 0 ? (
        // --- VISTA DE CARRITO VACÍO (CORREGIDA) ---
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 container mx-auto flex flex-col items-center min-h-[60vh] justify-center">
          <ShoppingBagIcon className="mx-auto h-24 w-24 text-gray-300" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tu carrito está vacío</h1>
          <p className="mt-4 text-lg text-gray-600">Parece que aún no has añadido nada. ¡Explora nuestros productos!</p>
          <Link href="/productos" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105">
            Ver Productos <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      ) : (
        // --- VISTA DE CARRITO LLENO ---
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="font-signature text-6xl text-[var(--accent-gold)]">Mi Carrito</h1>
            <p className="mt-2 text-xl text-gray-600">Revisa tu selección y prepárate para disfrutar.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">
            <motion.section variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tus Productos</h2>
                <button onClick={handleClearCart} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                  <TrashIcon className="h-5 w-5" />
                  Vaciar Carrito
                </button>
              </div>
              <div className="space-y-6">
                {state.items.map(item => (
                  <motion.div variants={itemVariants} key={item.id} className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <Image src={item.product.image_src} alt={item.product.name} width={100} height={100} className="rounded-lg object-cover" />
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="md:col-span-1">
                        <h3 className="font-semibold text-lg text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">S/ {(item.product.discount_price || item.product.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3 justify-start md:justify-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><MinusIcon className="h-4 w-4 text-gray-600" /></button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><PlusIcon className="h-4 w-4 text-gray-600" /></button>
                      </div>
                      <div className="font-bold text-lg text-right text-gray-800">S/ {((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}</div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-gray-400 hover:text-red-600 transition-colors"><XMarkIcon className="h-6 w-6" /></button>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <aside className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="sticky top-24 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-4 mb-4">Resumen del Pedido</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between"><span>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
                  {totalDiscount > 0 && <div className="flex justify-between text-green-600"><span>Descuentos</span><span>- S/ {totalDiscount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-100 pt-4 mt-4"><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
                </div>
                <button onClick={handleCheckout} disabled={isCheckingOut} className="mt-8 w-full rounded-lg bg-[var(--accent-gold)] px-8 py-4 font-bold text-lg text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 hover:shadow-amber-500/40 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
                  {isCheckingOut ? 'Procesando...' : 'Realizar Pedido'}
                </button>
              </motion.div>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}

