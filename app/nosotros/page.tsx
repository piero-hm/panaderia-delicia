
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AboutPageHero from '@/components/layout/AboutPageHero';
import OurValuesSection from '@/components/shared/OurValuesSection';
import TeamSection from '@/components/shared/TeamSection';
import GallerySection from '@/components/shared/GallerySection';

const AboutPage = () => {
  return (
    <>
      <AboutPageHero />

      {/* Sección Nuestra Historia */}
      <section className="bg-[var(--background-light)] body-font py-16 md:py-24">
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image 
              className="object-cover object-center rounded-xl shadow-xl" 
              alt="Panadero amasando masa" 
              src="/images/panaderia-map.jpg" // Using an existing image as placeholder
              width={720}
              height={600}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-[var(--foreground-dark)] leading-tight">
              Nuestra Historia
              <br className="hidden lg:inline-block" />De la Tradición a Tu Mesa
            </h1>
            <p className="mb-8 leading-relaxed text-gray-700 text-lg">
              Delicia Panadería nació de un sueño familiar hace más de dos décadas, con la visión de traer el auténtico sabor del pan artesanal a nuestra comunidad. Comenzamos con recetas heredadas de generación en generación, un horno de leña y una pasión inquebrantable por la calidad.
            </p>
            <p className="mb-8 leading-relaxed text-gray-700 text-lg">
              Cada día, nos esforzamos por mantener viva esa tradición, combinando técnicas ancestrales con la innovación para ofrecer productos frescos, deliciosos y hechos con amor. Creemos que el buen pan es más que alimento; es una experiencia, un recuerdo y un motivo para compartir.
            </p>
            <div className="flex justify-center">
              <Link href="/productos" className="inline-flex text-white bg-[var(--accent-gold)] border-0 py-3 px-8 focus:outline-none hover:bg-opacity-90 rounded-full text-lg transition-colors duration-300 shadow-lg">
                Explora Nuestros Productos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OurValuesSection />
      <TeamSection />
      <GallerySection />
    </>
  );
};

export default AboutPage;
