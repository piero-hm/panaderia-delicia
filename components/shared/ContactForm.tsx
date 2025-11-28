// components/shared/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend API
    console.log('Formulario enviado:', formData);
    toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <section className="text-[var(--foreground-dark)] body-font relative bg-gray-50 py-16 md:py-24">
      <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col md:ml-auto w-full mt-8 md:mt-0 relative z-10">
          <h2 className="text-[var(--foreground-dark)] text-lg mb-1 font-medium title-font">Envíanos un Mensaje</h2>
          <p className="leading-relaxed mb-5 text-gray-700">¿Tienes alguna pregunta o pedido especial? ¡Estamos aquí para ayudarte!</p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/[0.2] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/[0.2] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="subject" className="leading-7 text-sm text-gray-600">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/[0.2] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/[0.2] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                required
              ></textarea>
            </div>
            <button type="submit" className="text-white bg-[var(--accent-gold)] border-0 py-2 px-6 focus:outline-none hover:bg-opacity-90 rounded text-lg shadow-md transition-colors duration-300">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
