// components/admin/AdminBodyStyler.tsx
"use client";

import { useEffect } from "react";

/**
 * Este componente de cliente se encarga únicamente de aplicar un estilo
 * al <body> cuando se monta (en las rutas de admin) y limpiarlo
 * cuando se desmonta.
 */
export default function AdminBodyStyler() {
  useEffect(() => {
    // Clases para un fondo oscuro y texto claro por defecto
    const classesToAdd = ["bg-gray-900", "text-gray-200"];
    document.body.classList.add(...classesToAdd);

    // Función de limpieza para remover las clases cuando se sale de las rutas de admin
    return () => {
      document.body.classList.remove(...classesToAdd);
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar/desmontar

  return null; // Este componente no renderiza nada en el DOM
}
