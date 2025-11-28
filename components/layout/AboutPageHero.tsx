// components/layout/AboutPageHero.tsx
import React from 'react';
import Image from 'next/image';

const AboutPageHero = () => {
  return (
    <section className="relative z-0 h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-sobre-nosotros.jpg"
          alt="Interior de una panadería artesanal con panes frescos"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg tracking-tight">
          Nuestra Historia y Pasión
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-4xl drop-shadow-md font-light">
          Descubre el corazón de Delicia Panadería: una tradición de sabor, calidad y amor por el arte de la panadería artesanal.
        </p>
      </div>
    </section>
  );
};

export default AboutPageHero;
