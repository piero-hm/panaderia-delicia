// lib/queries.ts
import { createClient } from "@supabase/supabase-js"; // Importar createClient de supabase-js
import type { Product, Category } from '@/types';
import { createSupabaseServerActionClient } from '@/app/actions/adminProductActions';

// Función para crear un cliente de Supabase para operaciones en tiempo de compilación (build time)
// No usa cookies, ya que no hay request scope en build time.
export function createSupabaseBuildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// La función createSupabaseServerActionClient ya no es necesaria aquí,
// usaremos createSupabaseServerActionClient directamente.

/**
 * Obtiene todas las categorías de la base de datos.
 */
export const getCategories = async (): Promise<Category[]> => {
  const supabase = await createSupabaseServerActionClient(); // Usar el cliente que funciona
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
};

type SortBy = 'name' | 'price' | 'created_at';

/**
 * Obtiene todos los productos de la base de datos, con filtros y ordenación.
 */
export const getProducts = async (categorySlug?: string, sortBy: SortBy = 'created_at'): Promise<Product[]> => {
  const supabase = await createSupabaseServerActionClient(); // Usar el cliente que funciona
  // La sintaxis correcta para el join es 'foreignTable(columns)'
  let query = supabase.from('products').select('*, categories(name, slug)');

  // Filtrar por categoría si se proporciona
  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }

  // Ordenar
  const sortOptions = {
    'name': { column: 'name', ascending: true },
    'price': { column: 'price', ascending: true },
    'created_at': { column: 'created_at', ascending: false },
  };
  const sort = sortOptions[sortBy];
  query = query.order(sort.column, { ascending: sort.ascending });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  // El tipo 'Product' es compatible con la respuesta de Supabase
  return data as Product[];
};

/**
 * Obtiene productos destacados.
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const supabase = await createSupabaseServerActionClient(); // Usar el cliente que funciona
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('isFeatured', true)
    .limit(10);

  if (error) {
    console.error('Error fetching featured products:', error.message || error);
    return [];
  }
  return data;
};

/**
 * Obtiene un producto por su ID.
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const supabase = await createSupabaseServerActionClient(); // Usar el cliente que funciona
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product by id ${id}:`, error);
    return null;
  }
  return data;
};

/**
 * Obtiene un producto por su slug.
 */
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const supabase = await createSupabaseServerActionClient(); // Usar el cliente que funciona
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)') // Sintaxis de Join corregida
    .eq('slug', slug)
    .single();

  if (error) {
    // Es normal no encontrar un producto, no siempre es un error.
    // console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
  return data as Product | null;
};