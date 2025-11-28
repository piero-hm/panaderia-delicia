// components/shared/TeamSection.tsx
import React from 'react';
import Image from 'next/image';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Chef Ana García',
      role: 'Maestra Panadera',
      description: 'Con más de 20 años de experiencia, Ana es el corazón de nuestra panadería, fusionando tradición y creatividad en cada receta.',
      image: '/images/equipo-chef-ana-garcia.jpg',
    },
    {
      name: 'Chef Juan Pérez',
      role: 'Especialista en Repostería',
      description: 'Juan es nuestro experto en dulces, creando postres que no solo deleitan el paladar, sino que también son obras de arte.',
      image: '/images/equipo-chef-juan-perez.jpg',
    },
    {
      name: 'María Rodríguez',
      role: 'Gerente de Operaciones',
      description: 'María asegura que cada día la panadería funcione a la perfección, desde la selección de ingredientes hasta la atención al cliente.',
      image: '/images/equipo-maria-rodriguez.jpg',
    },
  ];

  return (
    <section className="text-[var(--foreground-dark)] body-font bg-gray-50 py-16 md:py-24">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-[var(--foreground-dark)]">Conoce a Nuestro Equipo</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
            Detrás de cada delicioso producto hay un equipo apasionado y dedicado.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-[var(--accent-gold)] inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6">
                <Image
                  alt="team"
                  className="flex-shrink-0 rounded-full w-40 h-40 object-cover object-center mb-4 border-4 border-[var(--accent-gold)]"
                  src={member.image}
                  width={160}
                  height={160}
                />
                <div className="w-full">
                  <h2 className="title-font font-medium text-lg text-[var(--foreground-dark)]">{member.name}</h2>
                  <h3 className="text-gray-500 mb-3">{member.role}</h3>
                  <p className="mb-4 text-gray-700">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
