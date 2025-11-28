// components/products/ProductPageHero.tsx
import React from 'react';
import Image from 'next/image';

const ProductPageHero = () => {
  return (
    <section className="relative h-[40vh] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/images/panaderia-banner-medium.jpg" // Using a medium banner image
        alt="Variedad de productos de panadería y pastelería"
        fill
        className="z-0 object-cover"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-50 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight drop-shadow-lg">
          Nuestros Productos
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center max-w-2xl drop-shadow-md">
          Explora nuestra deliciosa selección de panes artesanales, pasteles y dulces.
        </p>
      </div>
    </section>
  );
};

export default ProductPageHero;
