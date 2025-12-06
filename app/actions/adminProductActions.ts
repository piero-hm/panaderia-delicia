// app/actions/adminProductActions.ts
"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * Crea un cliente de Supabase para usar en acciones del servidor.
 * NOTA: Esta función es una utilidad interna para este archivo.
 * @returns Un cliente de Supabase autenticado para el servidor.
 */
export async function createSupabaseServerActionClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options?: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options?: CookieOptions) {
          if (typeof (cookieStore as any).delete === 'function') {
            ;(cookieStore as any).delete(name)
          } else {
            cookieStore.set(name, '', { maxAge: 0, ...(options as any) })
          }
        },
      },
    }
  )
}

/**
 * Crea un nuevo producto en la base de datos.
 * @param _prevState - El estado anterior del formulario (no se usa aquí).
 * @param formData - Los datos del formulario para el nuevo producto.
 */
export async function createProduct(_prevState: unknown, formData: FormData) {
  const supabase = await createSupabaseServerActionClient();
  
  const rawFormData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    image_src: "/images/producto-placeholder-default.jpg", // Placeholder
    image_alt: `Imagen de ${formData.get("name") as string}`,
  };

  const { error } = await supabase.from("products").insert([rawFormData]);

  if (error) {
    console.error("Error creating product:", error);
    return { message: "Error: No se pudo crear el producto." };
  }

  revalidatePath("/admin/products");
  return { message: "Éxito: Producto creado." };
}

/**
 * Actualiza un producto existente.
 * @param id - El ID del producto a actualizar.
 * @param _prevState - El estado anterior del formulario (no se usa aquí).
 * @param formData - Los datos del formulario con la información actualizada.
 */
export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
  const supabase = await createSupabaseServerActionClient();

  const rawFormData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-').slice(0, 50),
  };

  const { error } = await supabase
    .from("products")
    .update(rawFormData)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    return { message: "Error: No se pudo actualizar el producto." };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/edit/${id}`);
  return { message: "Éxito: Producto actualizado." };
}

/**
 * Elimina un producto de la base de datos.
 * @param id - El ID del producto a eliminar.
 */
export async function deleteProduct(id: string) {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "No se pudo eliminar el producto." };
  }

  revalidatePath("/admin/products");
  return { success: true, message: "Producto eliminado exitosamente." };
}
