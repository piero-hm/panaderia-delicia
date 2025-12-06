// app/admin/products/page.tsx
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import ProductList from "@/components/admin/ProductList";
import { Product } from "@/types";

/**
 * Crea un cliente de Supabase para usar en Componentes de Servidor.
 */
const createSupabaseServerComponentClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options?: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options?: CookieOptions) {
          if (typeof (cookieStore as any).delete === 'function') {
            (cookieStore as any).delete(name);
          } else {
            cookieStore.set(name, '', { maxAge: 0, ...(options as any) });
          }
        },
      },
    }
  );
};

/**
 * Página principal para la gestión de productos en el panel de admin.
 * Carga la lista de productos desde el servidor.
 */
export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerComponentClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg bg-red-900/20 p-4 text-center text-red-400">
        <p>Error al cargar los productos: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Gestionar Productos
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Crear Producto
        </Link>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-950 shadow-lg">
        {products && products.length > 0 ? (
          <ProductList products={products as Product[]} />
        ) : (
          <div className="p-8 text-center text-gray-400">
            <p>No hay productos para mostrar. ¡Crea el primero!</p>
          </div>
        )}
      </div>
    </div>
  );
}
