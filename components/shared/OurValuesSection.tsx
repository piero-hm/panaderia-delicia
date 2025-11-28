// components/shared/OurValuesSection.tsx
import React from 'react';


const OurValuesSection = () => (
  <section className="bg-[var(--background-light)] body-font py-16 md:py-24">
    <div className="container px-5 mx-auto">
      <div className="text-center mb-16">
        <h1 className="sm:text-4xl text-3xl font-bold title-font text-[var(--foreground-dark)] mb-4">Nuestros Valores</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
          Creemos en la calidad, la tradición y el amor por lo que hacemos.
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-[var(--accent-gold)] inline-flex"></div>
        </div>
      </div>

      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[var(--accent-gold)] text-white mb-5 flex-shrink-0 shadow-lg">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-[var(--foreground-dark)] text-lg title-font font-medium mb-3">Ingredientes Frescos</h2>
            <p className="leading-relaxed text-base text-gray-700">Seleccionamos cuidadosamente los mejores ingredientes locales y de temporada para garantizar sabor y calidad.</p>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[var(--accent-gold)] text-white mb-5 flex-shrink-0 shadow-lg">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-[var(--foreground-dark)] text-lg title-font font-medium mb-3">Elaboración Artesanal</h2>
            <p className="leading-relaxed text-base text-gray-700">Cada producto es hecho a mano con técnicas tradicionales y el cariño de nuestros maestros panaderos.</p>
          </div>
        </div>
        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
          <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-[var(--accent-gold)] text-white mb-5 flex-shrink-0 shadow-lg">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-[var(--foreground-dark)] text-lg title-font font-medium mb-3">Comunidad y Pasión</h2>
            <p className="leading-relaxed text-base text-gray-700">Nos apasiona compartir el buen pan y ser parte de la vida diaria de nuestra comunidad.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurValuesSection;
