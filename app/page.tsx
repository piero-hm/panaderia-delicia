// app/page.tsx
import Hero from "@/components/shared/Hero";
import ProductList from "@/components/products/ProductList";
import OurValuesSection from "@/components/shared/OurValuesSection"; // Import OurValuesSection
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { getFeaturedProducts } from "@/lib/queries"; // Import getFeaturedProducts

// --- Componentes para la nueva página de inicio ---

const PassionSection = () => (
  <section className="bg-[var(--background-light)] body-font py-16 md:py-24">
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <Image 
          className="object-cover object-center rounded-xl shadow-xl" 
          alt="Pan artesanal" 
          src="/images/pasion-pan-artesanal.jpg"
          width={720}
          height={600}
        />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-[var(--foreground-dark)] leading-tight">
          Nuestra Pasión,
          <br className="hidden lg:inline-block" />Tu Delicia Diaria
        </h1>
        <p className="mb-8 leading-relaxed text-gray-700 text-lg">
          En Delicia Panadería, cada pan es una obra de arte. Usamos recetas tradicionales y los ingredientes más puros para traerte un sabor que alimenta el alma. Desde la masa madre hasta el último grano, ponemos nuestro corazón en cada horneado.
        </p>
        <div className="flex justify-center">
          <Link href="/nosotros" className="inline-flex text-white bg-[var(--accent-gold)] border-0 py-3 px-8 focus:outline-none hover:bg-opacity-90 rounded-full text-lg transition-colors duration-300 shadow-lg">
            Conoce nuestra historia
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Ana Sofía', avatar: '/images/testimonio-ana-sofia.jpg', text: '¡Los mejores croissants que he probado en la ciudad! Siempre frescos y deliciosos. Se nota el amor que le ponen.' },
    { name: 'Juan Pérez', avatar: '/images/testimonio-juan-perez.jpg', text: 'El pan de centeno es espectacular. Perfecto para mis desayunos. La calidad es insuperable.' },
    { name: 'María García', avatar: '/images/testimonio-maria-garcia.jpg', text: 'Me encantan los postres, especialmente la torta de chocolate. ¡Mi familia y yo somos clientes fieles!' },
  ];

  return (
    <section className="text-[var(--foreground-dark)] body-font bg-gray-50 py-16 md:py-24">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-[var(--foreground-dark)]">Lo que dicen nuestros clientes</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">Sus palabras son nuestro mayor orgullo y nuestra mejor carta de presentación.</p>
        </div>
        <div className="flex flex-wrap -m-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center bg-white shadow-lg rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
                <Image
                  alt="testimonial"
                  className="w-24 h-24 mb-6 object-cover object-center rounded-full inline-block border-4 border-[var(--accent-gold)] bg-gray-100 shadow-md"
                  src={testimonial.avatar}
                  width={96}
                  height={96}
                />
                <p className="leading-relaxed text-gray-700 text-base italic mb-4">{testimonial.text}</p>
                <span className="inline-block h-1 w-10 rounded bg-[var(--accent-gold)] mt-4 mb-4"></span>
                <h2 className="text-[var(--foreground-dark)] font-semibold title-font tracking-wider text-sm uppercase">{testimonial.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Página de Inicio Reconstruida ---

export default async function HomePage() { // Make HomePage async
  const featuredProducts = await getFeaturedProducts(); // Fetch featured products

  return (
    <>
      <Hero />
      <PassionSection />
      
      {/* Sección de Productos Mejorada */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h1 className="sm:text-4xl text-3xl font-bold title-font text-[var(--foreground-dark)] mb-4">Nuestros Productos Destacados</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-700">
              Una selección de nuestros panes y dulces más queridos, horneados frescos cada día. ¡No te los puedes perder!
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-[var(--accent-gold)] inline-flex"></div>
            </div>
          </div>
          
          <Suspense fallback={<p className="text-center text-[var(--foreground-dark)]">Cargando productos...</p>}>
            <ProductList products={featuredProducts} isCarousel={true} /> {/* Pass isCarousel prop */}
          </Suspense>

          <div className="text-center mt-12">
            <Link href="/productos" className="inline-flex text-white bg-[var(--accent-gold)] border-0 py-3 px-8 focus:outline-none hover:bg-opacity-90 rounded-full text-lg transition-colors duration-300 shadow-lg">
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      <OurValuesSection /> {/* Added new section */}
      <TestimonialsSection />
    </>
  );
}
