// components/layout/ProductPageHero.tsx
import React from 'react';
import Image from 'next/image';

const ProductPageHero = () => {
  return (
    <section className="relative z-0 h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-productos.jpg"
          alt="Variedad de productos de panadería y pastelería"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority
          style={{
            // Modificamos el maskImage para que los extremos sean oscuros y semitransparentes
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), black 20%, black 80%, rgba(0,0,0,0.8))',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), black 20%, black 80%, rgba(0,0,0,0.8))',
          }}
        />
        {/* Overlay con degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg tracking-tight">
          Nuestros Productos Artesanales
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-4xl drop-shadow-md font-light">
          Explora nuestra exquisita colección de panes recién horneados, pasteles delicados y dulces irresistibles, elaborados con pasión y los mejores ingredientes.
        </p>
      </div>
    </section>
  );
};

export default ProductPageHero;
