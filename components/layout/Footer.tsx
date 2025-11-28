// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 body-font border-t border-gray-200">
      <div className="container px-5 pt-12 pb-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Columna 1: Logo y Descripción */}
          <div>
            <Link href="/" className="flex title-font font-medium items-center justify-center
              md:justify-start text-[#6366f1] mb-4">
              <span className="ml-3 text-lg font-semibold">Delicia Panadería</span>
            </Link>
            <p className="text-xs text-gray-200 px-4 md:px-0">
              En Panadería Delicia encontrarás tortas, pasteles y panes frescos, elaborados cada día con dedicación y un auténtico sabor casero.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h2 className="title-font font-medium text-[#6366f1] tracking-widest text-sm mb-3">
              Navegación
            </h2>
            <nav className="list-none mb-10">
              <li><Link href="/" className="relative left-0 hover:left-2 transition-all duration-200 text-xs hover:text-white">Inicio</Link></li>
              <li><Link href="/productos" className="relative left-0 hover:left-2 transition-all duration-200 text-xs hover:text-white">Productos</Link></li>
              <li><Link href="/nosotros" className="relative left-0 hover:left-2 transition-all duration-200 text-xs hover:text-white">Nosotros</Link></li>
              <li><Link href="/contacto" className="relative left-0 hover:left-2 transition-all duration-200 text-xs hover:text-white">Contacto</Link></li>
            </nav>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h2 className="title-font font-medium text-[#6366f1] tracking-widest text-sm mb-3">
              Contacto
            </h2>
            <nav className="list-none mb-10">
              <li><p className="text-gray-100 text-xs py-2">Av San Carlos N° 123 <br />Huancayo, CP 12001</p></li>
              <li><p className="text-gray-100 text-xs py-2">Teléfono: (123) 456-7890</p></li>
              <li><p className="text-gray-100 text-xs py-2">Email: info@deliciapanaderia.com</p></li>
            </nav>
          </div>

          {/* Columna 4: Redes Sociales y Legal */}
          <div>
            <h2 className="title-font font-medium text-[#6366f1] tracking-widest text-sm mb-3">
              Síguenos
            </h2>
            <span className="inline-flex mt-2 justify-center md:justify-start space-x-4">
              {/* Facebook */}
              <a className="text-white hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              {/* Twitter */}
              <a className="text-white hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a className="text-white hover:text-[var(--accent-gold)] transition-colors duration-300" href="#" target="_blank" rel="noopener noreferrer">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
            <div className="mt-8">
              <h2 className="title-font font-medium text-[#6366f1] tracking-widest text-sm mb-3">
                Legal
              </h2>
              <nav className="list-none">
                <li><Link href="/politica-privacidad" className="text-xs text-gray-200 hover:text-[var(--accent-gold)] transition-colors duration-300">Política de Privacidad</Link></li>
                <li><Link href="/terminos-servicio" className="text-xs text-gray-200 hover:text-[var(--accent-gold)] transition-colors duration-300">Términos de Servicio</Link></li>
              </nav>
            </div>
          </div>
        </div>
        <div className="grid place-items-center pt-20">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} Delicia Panadería. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
