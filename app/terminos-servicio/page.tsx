import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-8 py-12 bg-white shadow-xl rounded-lg my-10 border border-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-wide">Términos de Servicio</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Bienvenido a Delicia Panadería. Al acceder y utilizar nuestro sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Por favor, léalos detenidamente.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">1. Aceptación de los Términos</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Al acceder o utilizar cualquier parte del sitio, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con todos los términos y condiciones de este acuerdo, entonces no podrá acceder al sitio web ni utilizar ningún servicio.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">2. Uso del Sitio Web</h2>
      <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-6 space-y-2">
        <li>Usted se compromete a utilizar nuestro sitio web solo para fines lícitos y de manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sitio por parte de terceros.</li>
        <li>Está prohibido cualquier uso comercial no autorizado de nuestro sitio web o su contenido.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">3. Productos y Servicios</h2>
      <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-6 space-y-2">
        <li>Todos los productos y servicios están sujetos a disponibilidad.</li>
        <li>Nos reservamos el derecho de limitar las cantidades de cualquier producto o servicio que ofrecemos.</li>
        <li>Todas las descripciones de productos o precios de productos están sujetas a cambios en cualquier momento sin previo aviso, a nuestra entera discreción.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">4. Precios y Pagos</h2>
      <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-6 space-y-2">
        <li>Los precios de nuestros productos están sujetos a cambios sin previo aviso.</li>
        <li>Aceptamos diversas formas de pago, las cuales se detallarán en el proceso de compra.</li>
        <li>Usted se compromete a proporcionar información de compra y cuenta actual, completa y precisa para todas las compras realizadas en nuestra tienda.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">5. Propiedad Intelectual</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de Delicia Panadería o de sus proveedores de contenido y está protegido por las leyes de derechos de autor internacionales.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">6. Limitación de Responsabilidad</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Delicia Panadería no será responsable de ningún daño directo, indirecto, incidental, punitivo o consecuente que resulte del uso o la imposibilidad de usar nuestro servicio.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">7. Cambios en los Términos de Servicio</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Nos reservamos el derecho, a nuestra entera discreción, de actualizar, cambiar o reemplazar cualquier parte de estos Términos de Servicio publicando actualizaciones y cambios en nuestro sitio web. Es su responsabilidad revisar nuestro sitio web periódicamente para ver los cambios.
      </p>

      <p className="text-sm text-gray-500 mt-10 text-right">
        Última actualización: 28 de noviembre de 2025
      </p>
    </div>
  );
};

export default TermsOfServicePage;
