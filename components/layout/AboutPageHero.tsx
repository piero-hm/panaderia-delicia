// components/layout/AboutPageHero.tsx
import React from 'react';
import Image from 'next/image';

const AboutPageHero = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/images/panaderia-banner-large.jpg" // Reusing the large banner image
        alt="Interior de una panadería artesanal con panes frescos"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-60 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight drop-shadow-lg">
          Sobre Nosotros
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center max-w-3xl drop-shadow-md">
          Nuestra historia, nuestra pasión, nuestro compromiso con la calidad.
        </p>
      </div>
    </section>
  );
};

export default AboutPageHero;
