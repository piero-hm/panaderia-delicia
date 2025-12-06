// app/admin/layout.tsx
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminBodyStyler from "@/components/admin/AdminBodyStyler"; // Importar el nuevo componente
import { ReactNode } from "react";

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
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Lógica de autenticación y autorización de vuelta en el layout del servidor
  const supabase = await createSupabaseServerComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      {/* Este componente de cliente se encarga de estilizar el body */}
      <AdminBodyStyler />
      <div className="flex h-screen w-full bg-gray-900">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between bg-gray-950 px-6 shadow-md">
            <h1 className="text-2xl font-semibold text-white">
              Panel de Administración
            </h1>
            {/* Aquí podrías agregar un menú de usuario o notificaciones */}
          </header>
          <main className="flex-1 overflow-y-auto p-8 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

