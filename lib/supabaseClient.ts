import { createClient } from '@supabase/supabase-js';

// Leer las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén presentes
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Your project's URL and Key are required to create a Supabase client!");
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Este es un cliente para usar en el lado del cliente (client components).
// Para operaciones en el servidor (server components, actions, route handlers),
// se debe usar `createServerClient` de `@supabase/ssr` como se muestra en la documentación de Next.js.
