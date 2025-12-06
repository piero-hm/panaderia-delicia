// app/actions/adminProductActions.ts
"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres de archivo únicos

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
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string) {
          cookieStore.delete(name);
        },
      },
    }
  )
}

/**
 * Sube una imagen a Supabase Storage y devuelve su URL pública.
 * @param file - El archivo de imagen a subir.
 * @param bucketName - El nombre del bucket de Supabase Storage.
 * @returns La URL pública de la imagen o null si hay un error.
 */
async function uploadImageToSupabase(file: File, bucketName: string): Promise<string | null> {
  const supabase = await createSupabaseServerActionClient();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`; // Nombre de archivo único
  const filePath = `product_images/${fileName}`; // Ruta dentro del bucket

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false, // No sobrescribir si ya existe
    });

  if (error) {
    console.error('Error uploading image to Supabase Storage:', error);
    return null;
  }

  // Obtener la URL pública
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (publicUrlData) {
    return publicUrlData.publicUrl;
  }

  return null;
}

/**
 * Crea un nuevo producto en la base de datos.
 * @param _prevState - El estado anterior del formulario (no se usa aquí).
 * @param formData - Los datos del formulario para el nuevo producto.
 */
export async function createProduct(_prevState: unknown, formData: FormData) {
  const supabase = await createSupabaseServerActionClient();
  
  const imageFile = formData.get("image") as File;
  let image_src = "/images/producto-placeholder-default.jpg"; // Default placeholder

  if (imageFile && imageFile.size > 0) {
    const uploadedImageUrl = await uploadImageToSupabase(imageFile, 'product-images'); // Usar el bucket 'product-images'
    if (uploadedImageUrl) {
      image_src = uploadedImageUrl;
    }
  }

  const rawFormData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    category_id: formData.get("categoryId") as string,
    image_src: image_src,
    image_alt: `Imagen de ${formData.get("name") as string}`,
  };

  const { error } = await supabase.from("products").insert([rawFormData]);

  if (error) {
    console.error("Error creating product:", error);
    return { message: "Error: No se pudo crear el producto." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/productos"); // <-- Añadido para la página pública
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

  const imageFile = formData.get("image") as File;
  let image_src: string | undefined; // Puede ser undefined si no se actualiza

  if (imageFile && imageFile.size > 0) {
    const uploadedImageUrl = await uploadImageToSupabase(imageFile, 'product-images');
    if (uploadedImageUrl) {
      image_src = uploadedImageUrl;
    }
  }

  const rawFormData: { [key: string]: any } = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    category_id: formData.get("categoryId") as string,
  };

  if (image_src) {
    rawFormData.image_src = image_src;
    rawFormData.image_alt = `Imagen de ${formData.get("name") as string}`;
  }

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
  revalidatePath("/productos"); // <-- Añadido
  revalidatePath(`/productos/${rawFormData.slug}`); // <-- Añadido para la página de detalle
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
