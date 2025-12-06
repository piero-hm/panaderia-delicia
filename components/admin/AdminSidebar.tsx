// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "@/app/auth/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/products", label: "Productos", icon: ArchiveBoxIcon },
  // Agrega aquí más enlaces
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-950 text-gray-300 shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-delicia-small.png"
            alt="Logo Delicia Panadería"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-white tracking-wider">
            DELICIA
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-amber-500 text-gray-900 shadow-md"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-400 transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span>Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
