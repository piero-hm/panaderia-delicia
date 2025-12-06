// app/admin/products/edit/[id]/page.tsx
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/actions/adminProductActions";
import { Product } from "@/types";

interface EditProductPageProps {
  // En esta versión de Next.js, params puede ser una promesa
  params: Promise<{ id: string }>;
}

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
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string) {
          cookieStore.delete(name);
        },
      },
    }
  );
};

/**
 * Página para editar un producto específico.
 * Carga los datos del producto desde el servidor y los pasa al formulario.
 */
import { getCategories } from "@/lib/queries"; // <-- Importar getCategories

// ... createSupabaseServerComponentClient ...

export default async function EditProductPage({ params: paramsPromise }: EditProductPageProps) {
  const params = await paramsPromise;
  
  const supabase = await createSupabaseServerComponentClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  const categories = await getCategories(); // <-- Obtener categorías

  // Hacemos un "bind" del ID del producto a la server action `updateProduct`
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Editar Producto</h1>
      <div className="max-w-4xl rounded-xl border border-gray-800 bg-gray-950 p-8 shadow-lg">
        <ProductForm
          action={updateProductWithId}
          initialData={product as Product}
          categories={categories} // <-- Pasar categorías al ProductForm
        />
      </div>
    </div>
  );
}
