'use client';

import Image from 'next/image';
import { FadeIn } from './FadeIn';
import { FadeInStagger } from './FadeInStagger';

// Definimos el tipo para cada imagen de la galería
interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

const GallerySection = ({ images }: GallerySectionProps) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-signature text-5xl text-[var(--accent-gold)]">Nuestra Galería</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Momentos Horneados a la Perfección</p>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
            Un vistazo a nuestro mundo, desde el interior de nuestra cocina hasta las sonrisas de nuestros clientes.
          </p>
        </div>

        {/* Usamos el contenedor de animación escalonada */}
        <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            // Cada imagen es un hijo que se anima individualmente
            <FadeIn key={image.src}>
              <div className="group relative h-72 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Capa de superposición */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Texto que aparece al hacer hover */}
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="text-white w-full transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-lg font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </div>
  );
};

export default GallerySection;

