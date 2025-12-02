
import React from 'react';
import AboutPageHero from "@/components/layout/AboutPageHero";
import TeamSection from "@/components/shared/TeamSection";
import OurValuesSection from "@/components/shared/OurValuesSection";
import GallerySection from '@/components/shared/GallerySection';
import { FadeIn } from "@/components/shared/FadeIn";

// Datos para la nueva galería. Ahora incluimos un título para el efecto hover.
const galleryImages = [
  { src: '/images/galeria-interior-panaderia.jpg', alt: 'Interior de la panadería', title: 'Nuestro Hogar' },
  { src: '/images/galeria-mostrador-panaderia.jpg', alt: 'Mostrador con productos', title: 'Delicias a la Vista' },
  { src: '/images/galeria-panes-recien-horneados.jpg', alt: 'Panes recién horneados', title: 'Calidez Matutina' },
  { src: '/images/galeria-variedad-postres.jpg', alt: 'Variedad de postres', title: 'Dulces Tentaciones' },
  { src: '/images/galeria-torta-decorada.jpg', alt: 'Torta decorada para celebración', title: 'Arte Comestible' },
  { src: '/images/galeria-pan-centeno-nueces.jpg', alt: 'Pan de centeno con nueces', title: 'Sabor Rústico' },
  { src: '/images/historia-panadero-amasando.jpg', alt: 'Panadero amasando', title: 'El Secreto está en la Masa' },
  { src: '/images/pasion-pan-artesanal.jpg', alt: 'Pasión por el pan', title: 'Hecho con Amor' },
];

export default function NosotrosPage() {
  return (
    <div>
      <FadeIn>
        <AboutPageHero />
      </FadeIn>
      
      <FadeIn>
        <OurValuesSection />
      </FadeIn>
      
      <FadeIn>
        <TeamSection />
      </FadeIn>
      
      {/* Pasamos los datos de las imágenes al componente de galería */}
      <GallerySection images={galleryImages} />
    </div>
  );
}
