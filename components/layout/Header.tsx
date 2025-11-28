'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';

interface NavLink {
  text: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  brand: string;
  links: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ brand, links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const { state } = useCart();
  const { user, signOut } = useAuth();
  const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  // Effect for hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsNavbarHidden(true);
        setIsProfileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsNavbarHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for closing profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        id="main-nav"
        className={`main-nav fixed left-1/2 top-6 z-40 -translate-x-1/2 w-[92%] max-w-6xl rounded-3xl bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-md border border-slate-700/30 shadow-2xl transition-all duration-500 ease-in-out will-change-transform ${isNavbarHidden ? 'navbar-hidden' : ''
          }`}
        role="navigation"
      >
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 no-underline focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-md"
            >
              <Image
                src="/images/logo-delicia-small.png"
                alt="Logo de la marca"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <span className="font-semibold text-base text-slate-50 tracking-tight">{brand}</span>
            </Link>
          </div>

          {/* Desktop menu & Cart */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <div id="nav-links" className="flex items-center space-x-6 relative">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm transition-all duration-200 outline-none ${link.active ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  data-index={i}
                  aria-current={link.active ? 'page' : undefined}
                >
                  <span className="inline-block py-1 px-2">{link.text}</span>
                  <span className="absolute left-0 -bottom-1 h-[2px] bg-emerald-400 rounded transition-all duration-200 w-0 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Auth Button for Desktop */}
            <div className="relative" ref={profileMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="relative p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white rounded-full"
                  >
                    <span className="sr-only">Abrir menú de usuario</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-700">Sesión iniciada como</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth/signin" className="relative p-2 text-slate-300 hover:text-white">
                  <span className="sr-only">Iniciar Sesión</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Cart Button */}
            <Link
              href="/carrito"
              className="relative p-2 text-slate-300 hover:text-white"
            >
              <span className="sr-only">Ir al carrito</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 2.14 1.724 3.867 3.867 3.867h1.138c-.112.317-.188.656-.188 1.012a2.25 2.25 0 104.5 0c0-.356-.076-.695-.188-1.012h2.25c-.112.317-.188.656-.188 1.012a2.25 2.25 0 104.5 0c0-.356-.076-.695-.188-1.012h.944a2.25 2.25 0 100-4.5h-13.07a.75.75 0 01-.729-.568l-1.06-3.976A.75.75 0 013.45 8.25H19.5a.75.75 0 000-1.5H3.45l.438-1.641a.75.75 0 00-.729-.568H2.25z" />
              </svg>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link
              href="/carrito"
              className="relative p-2 mr-2 text-slate-300 hover:text-white"
            >
              <span className="sr-only">Ir al carrito</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 2.14 1.724 3.867 3.867 3.867h1.138c-.112.317-.188.656-.188 1.012a2.25 2.25 0 104.5 0c0-.356-.076-.695-.188-1.012h2.25c-.112.317-.188.656-.188 1.012a2.25 2.25 0 104.5 0c0-.356-.076-.695-.188-1.012h.944a2.25 2.25 0 100-4.5h-13.07a.75.75 0 01-.729-.568l-1.06-3.976A.75.75 0 013.45 8.25H19.5a.75.75 0 000-1.5H3.45l.438-1.641a.75.75 0 00-.729-.568H2.25z" />
              </svg>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
            <button
              id="navbar-toggle"
              type="button"
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              <div id="hamburger-icon" className={`w-6 h-6 relative ${isMobileMenuOpen ? 'open' : ''}`}>
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
                <span className="hamburger-line line-3"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu, show/hide based on menu state. */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${link.active ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                aria-current={link.active ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-slate-700/50 pt-4 mt-4">
                <div className="flex items-center px-3">
                  <div className="ml-3">
                    <p className="text-base font-medium text-white">{user.email?.split('@')[0]}</p>
                    <p className="text-sm font-medium text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

// CSS for hamburger icon and navbar hide/show
const styles = `
  .hamburger-line {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #cbd5e1;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
    left: 0;
  }
  .line-1 { top: 4px; }
  .line-2 { top: 11px; }
  .line-3 { top: 18px; }
  .open .line-1 { transform: rotate(45deg) translate(5px, 5px); }
  .open .line-2 { opacity: 0; }
  .open .line-3 { transform: rotate(-45deg) translate(5px, -5px); }
  .navbar-hidden {
    transform: translate(-50%, -150%);
  }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
