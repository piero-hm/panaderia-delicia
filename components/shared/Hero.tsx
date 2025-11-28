// components/shared/Hero.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

const Hero = () => {
  return (
    <section className="relative h-[70vh] text-white flex items-center justify-center"> {/* Increased height and centered content */}
      <Image
        src="/images/panaderia-banner-large.jpg"
        alt="Banner de la panadería mostrando una variedad de panes"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4"> {/* Added gradient overlay */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-center leading-tight drop-shadow-xl"> {/* Larger, bolder text with stronger shadow */}
          El Sabor de la Tradición
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-center max-w-3xl drop-shadow-lg"> {/* Larger text with stronger shadow */}
          Hecho a mano, horneado a diario. Descubre la diferencia en cada bocado.
        </p>
        <Link href="/productos" className="mt-8 px-10 py-4 bg-[var(--accent-gold)] text-white text-xl font-semibold rounded-full shadow-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"> {/* Larger CTA Button with better hover */}
          Explorar Productos
        </Link>
      </div>
    </section>
  );
};

export default Hero;
