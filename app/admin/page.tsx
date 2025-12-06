// app/admin/page.tsx
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Panel de Administración
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Bienvenido al panel de control de Delicia Panadería.
        </p>
      </div>
      <div className="rounded-xl border border-gray-800 bg-gray-950 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Guía Rápida</h2>
        <p className="mt-4 text-gray-300">
          Usa la barra de navegación a la izquierda para gestionar las diferentes
          secciones de tu tienda:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-gray-300">
          <li>
            <strong className="font-semibold text-amber-400">Productos:</strong> Crea, edita, y elimina productos de tu
            catálogo.
          </li>
          <li>
            <strong className="font-semibold text-amber-400">Pedidos (Próximamente):</strong> Visualiza y gestiona los
            pedidos de los clientes.
          </li>
          <li>
            <strong className="font-semibold text-amber-400">Usuarios (Próximamente):</strong> Administra los usuarios
            registrados en el sistema.
          </li>
        </ul>
        <p className="mt-6 text-gray-400">
          Para agregar nuevas secciones (como Pedidos o Usuarios), puedes seguir
          el patrón de código utilizado para la sección de Productos.
        </p>
      </div>
    </div>
  );
}
