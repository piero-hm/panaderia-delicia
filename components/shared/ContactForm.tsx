'use client';

import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Formulario enviado (simulación). ¡Gracias por contactarnos!');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 h-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            placeholder="tu@correo.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            placeholder="¿En qué podemos ayudarte?"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-md bg-[var(--accent-gold)] px-8 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-[var(--accent-gold)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-gold)]"
            aria-label="Enviar formulario de contacto"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

