// components/shared/ContactInfoMap.tsx
import React from 'react';
import Image from 'next/image';

const ContactInfoMap = () => {
  return (
    <section className="text-[var(--foreground-dark)] body-font relative bg-[var(--background-light)]">
      <div className="container px-5 py-16 md:py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        {/* Map Placeholder */}
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <Image
            src="/images/panaderia-map.jpg" // Placeholder map image
            alt="Ubicación de Delicia Panadería en el mapa"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md z-10">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-[var(--foreground-dark)] tracking-widest text-xs">DIRECCIÓN</h2>
              <p className="mt-1 text-gray-700">123 Calle Falsa <br />Springfield, CP 12345</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-[var(--foreground-dark)] tracking-widest text-xs">EMAIL</h2>
              <a className="text-[var(--accent-gold)] leading-relaxed">info@deliciapanaderia.com</a>
              <h2 className="title-font font-semibold text-[var(--foreground-dark)] tracking-widest text-xs mt-4">TELÉFONO</h2>
              <p className="leading-relaxed text-gray-700">(123) 456-7890</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-[var(--foreground-dark)] text-lg mb-1 font-medium title-font">Información Adicional</h2>
          <p className="leading-relaxed mb-5 text-gray-700">
            Visítanos o contáctanos para cualquier consulta. ¡Estaremos encantados de atenderte!
          </p>
          <div className="relative mb-4">
            <h2 className="title-font font-semibold text-[var(--foreground-dark)] tracking-widest text-xs">HORARIO DE ATENCIÓN</h2>
            <p className="leading-relaxed text-gray-700">Lunes a Sábado: 8:00 AM - 7:00 PM</p>
            <p className="leading-relaxed text-gray-700">Domingo: 9:00 AM - 2:00 PM</p>
          </div>
          <div className="relative mb-4">
            <h2 className="title-font font-semibold text-[var(--foreground-dark)] tracking-widest text-xs">REDES SOCIALES</h2>
            <span className="inline-flex mt-2 space-x-4">
              {/* Facebook */}
              <a className="text-[var(--foreground-dark)] hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              {/* Twitter */}
              <a className="text-[var(--foreground-dark)] hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a className="text-[var(--foreground-dark)] hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoMap;
