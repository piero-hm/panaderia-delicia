
import ContactPageHero from "@/components/layout/ContactPageHero";
import ContactForm from "@/components/shared/ContactForm";
import ContactInfoMap from "@/components/shared/ContactInfoMap";
import { FadeIn } from "@/components/shared/FadeIn";
import { FadeInStagger } from "@/components/shared/FadeInStagger";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <FadeIn>
        <ContactPageHero />
      </FadeIn>

      <main className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-signature text-5xl text-[var(--accent-gold)]">Ponte en Contacto</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos encantaría saber de ti</p>
              <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
                ¿Tienes una pregunta, un comentario o un pedido especial? Rellena el formulario o visítanos.
              </p>
            </div>
          </FadeIn>

          {/* Contenedor para el layout de dos columnas con animación escalonada */}
          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Columna del Formulario */}
            <FadeIn>
              <ContactForm />
            </FadeIn>

            {/* Columna del Mapa e Info */}
            <FadeIn>
              <ContactInfoMap />
            </FadeIn>
          </FadeInStagger>
        </div>
      </main>
    </div>
  );
}
