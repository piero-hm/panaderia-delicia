// components/admin/ProductForm.tsx
"use client";

import { useActionState } from "react";
import { Product } from "@/types";
import { SubmitButton } from "./SubmitButton";
import { useEffect } from "react";

interface ProductFormProps {
  action: (prevState: { message: string }, formData: FormData) => Promise<{ message: string }>;
  initialData?: Product | null;
}

const initialState = { message: "" };

/**
 * Formulario para crear o editar un producto.
 * Utiliza una Server Action para procesar los datos.
 */
export default function ProductForm({ action, initialData }: ProductFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state?.message.includes("Éxito")) {
      // Podrías mostrar un toast o una notificación aquí
      console.log(state.message);
    } else if (state?.message.includes("Error")) {
      // Podrías mostrar un toast de error
      console.error(state.message);
    }
  }, [state]);


  const inputClasses = "mt-2 block w-full rounded-lg border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50";
  const labelClasses = "block text-sm font-medium text-gray-300";

  return (
    <form action={formAction} className="space-y-8">
      {state?.message && (
        <div
          className={`rounded-lg p-4 text-sm font-medium text-white ${
            state.message.includes("Éxito") ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}
      <div>
        <label htmlFor="name" className={labelClasses}>
          Nombre del Producto
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData?.name}
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialData?.description ?? ""}
          className={inputClasses}
        ></textarea>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className={labelClasses}>
            Precio (S/)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            defaultValue={initialData?.price}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="stock" className={labelClasses}>
            Cantidad en Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            defaultValue={initialData?.stock}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton label="Guardar Producto" pendingLabel="Guardando..." />
      </div>
    </form>
  );
}
