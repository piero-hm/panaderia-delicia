'use client';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname

const inter = Inter({ subsets: ["latin"] });

// Metadata is a Server Component export, so it cannot be in a 'use client' file.
// Moving it outside or making it a separate file is an option, but for now,
// I'll keep it commented out to avoid build errors in this client component.
// export const metadata: Metadata = {
//   title: "Delicia Panadería - Pan y Pasteles Artesanales",
//   description: "Descubre el sabor del pan y la pastelería hechos con amor y los mejores ingredientes. Visítanos y disfruta de una experiencia deliciosa.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const pathname = usePathname(); // Get current path

  const navLinks = [
    { text: 'Inicio', href: '/' },
    { text: 'Productos', href: '/productos' },
    { text: 'Nosotros', href: '/nosotros' },
    { text: 'Contacto', href: '/contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              {!['/carrito', '/auth/signin', '/auth/signup'].includes(pathname) && (
                <Header
                  brand="Delicia Panadería"
                  links={navLinks.map(link => ({
                    ...link,
                    active: pathname === link.href,
                  }))}
                />
              )}
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[var(--accent-gold)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--accent-gold)]/[0.8] transition-colors duration-300 z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
