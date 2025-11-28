import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-8 py-12 bg-white shadow-xl rounded-lg my-10 border border-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-wide">Política de Privacidad</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        En Delicia Panadería, valoramos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos su información cuando visita o realiza una compra en nuestro sitio web.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Información que Recopilamos</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, dirección de envío, número de teléfono y detalles de pago, cuando realiza un pedido o se registra en nuestro sitio. También podemos recopilar información no personal, como datos de navegación y preferencias de uso, para mejorar su experiencia en nuestro sitio.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Uso de su Información</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Utilizamos la información recopilada para:
      </p>
      <ul className="list-disc list-inside text-base text-gray-600 mb-6 ml-6 space-y-2">
        <li>Procesar y gestionar sus pedidos.</li>
        <li>Comunicarnos con usted sobre su pedido, productos y ofertas.</li>
        <li>Mejorar nuestros productos, servicios y la experiencia del usuario en nuestro sitio web.</li>
        <li>Personalizar su experiencia de compra.</li>
        <li>Cumplir con nuestras obligaciones legales.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Compartir su Información</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        No vendemos, alquilamos ni comercializamos su información personal con terceros. Podemos compartir su información con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio (por ejemplo, procesadores de pagos, empresas de envío), siempre bajo estrictos acuerdos de confidencialidad. También podemos divulgar información si así lo exige la ley.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Seguridad de Datos</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Sus Derechos</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Usted tiene derecho a acceder, corregir o eliminar su información personal. Si desea ejercer estos derechos, por favor contáctenos a través de los canales indicados en nuestro sitio web.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b pb-2">Cambios a esta Política</h2>
      <p className="text-base text-gray-600 mb-4 leading-relaxed">
        Podemos actualizar nuestra Política de Privacidad ocasionalmente. Publicaremos cualquier cambio en esta página y le recomendamos revisarla periódicamente.
      </p>

      <p className="text-sm text-gray-500 mt-10 text-right">
        Última actualización: 28 de noviembre de 2025
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
