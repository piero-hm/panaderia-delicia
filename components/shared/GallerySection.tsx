// components/shared/GallerySection.tsx
import React from 'react';
import Image from 'next/image';

const GallerySection = () => {
  const galleryImages = [
    { src: '/images/panaderia-banner-small.jpg', alt: 'Interior de la panadería' },
    { src: '/images/pan1.jpg', alt: 'Panes recién horneados' },
    { src: '/images/postre1.jpg', alt: 'Variedad de postres' },
    { src: '/images/torta1.jpg', alt: 'Torta decorada' },
    { src: '/images/panaderia-banner-medium.jpg', alt: 'Mostrador de la panadería' },
    { src: '/images/pan-centeno-nueces.jpg', alt: 'Pan de centeno y nueces' },
  ];

  return (
    <section className="text-[var(--foreground-dark)] body-font bg-[var(--background-light)] py-16 md:py-24">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-[var(--foreground-dark)]">Nuestra Galería</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
            Un vistazo a nuestro mundo, donde la pasión por la panadería cobra vida.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-[var(--accent-gold)] inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-1 md:-m-2">
          {galleryImages.map((img, index) => (
            <div key={index} className="flex flex-wrap w-1/2 md:w-1/3 p-1 md:p-2">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  alt={img.alt}
                  className="block object-cover object-center w-full h-full transform hover:scale-105 transition-transform duration-300"
                  src={img.src}
                  width={500} // Adjust width and height as needed for Image component
                  height={500}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
