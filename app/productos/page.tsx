// app/productos/page.tsx
import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/queries';
import ProductsClientPage from './ProductsClientPage';

// Componente de Fallback para Suspense
function LoadingFallback() {
  return <p className="text-center text-lg py-10 bg-[#E2E2DD]">Cargando productos...</p>;
}

export default async function ProductosPage() {
  // 1. Obtener los datos en el servidor.
  // Estas llamadas ahora se hacen una sola vez en el servidor al cargar la página.
  const initialProducts = await getProducts();
  const categories = await getCategories();

  return (
    // 2. Usar Suspense para una mejor experiencia de carga.
    <Suspense fallback={<LoadingFallback />}>
      {/* 
        3. Renderizar el componente de cliente, pasando los datos obtenidos 
           del servidor como props. El cliente se encargará de la interactividad.
      */}
      <ProductsClientPage 
        initialProducts={initialProducts} 
        categories={categories} 
      />
    </Suspense>
  );
}