// components/admin/ProductList.tsx
"use client";

import { Product } from "@/types";
import Link from "next/link";
import { useTransition } from "react";
import { deleteProduct } from "@/app/actions/adminProductActions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ProductListProps {
  products: Product[];
}

/**
 * Muestra una tabla de productos con opciones para editar y eliminar.
 * La eliminación se maneja a través de una Server Action.
 */
export default function ProductList({ products }: ProductListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      startTransition(async () => {
        const result = await deleteProduct(id);
        if (!result.success) {
          alert(result.message); // Muestra un error si la eliminación falla
        }
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              Precio
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              Stock
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-950">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-900">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-white">
                  {product.name}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-300">S/ {product.price.toFixed(2)}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold leading-5 ${
                    product.stock > 0
                      ? "bg-green-900/50 text-green-300"
                      : "bg-red-900/50 text-red-300"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="flex items-center gap-1 text-amber-500 transition-colors hover:text-amber-400"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 text-red-500 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:text-gray-600"
                  >
                    {isPending ? (
                      "Eliminando..."
                    ) : (
                      <>
                        <TrashIcon className="h-4 w-4" />
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
