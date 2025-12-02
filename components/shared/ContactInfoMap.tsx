'use client';

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const contactDetails = [
  {
    icon: MapPinIcon,
    title: 'Nuestra Dirección',
    text: 'Av. Primavera 123, Surco, Lima - Perú',
  },
  {
    icon: PhoneIcon,
    title: 'Llámanos',
    text: '(+51) 987 654 321',
  },
  {
    icon: EnvelopeIcon,
    title: 'Escríbenos',
    text: 'hola@deliciapanaderia.com',
  },
];

const ContactInfoMap = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 h-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Encuéntranos</h2>
      
      {/* Mapa Interactivo de Google Maps */}
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-6 border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.888254146112!2d-77.028779685186!3d-12.119144191421472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f7a0b8e5b3%3A0x4b3e1b3b3b3b3b3b!2sParque%20Kennedy%2C%20Miraflores%2015074!5e0!3m2!1ses-419!2spe!4v1678886400000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Delicia Panadería"
        ></iframe>
      </div>

      {/* Detalles de Contacto */}
      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <item.icon className="h-6 w-6 text-[var(--accent-gold)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoMap;

