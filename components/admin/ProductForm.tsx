// components/admin/ProductForm.tsx
"use client";

import { useActionState } from "react";
import { Product, Category } from "@/types";
import { SubmitButton } from "./SubmitButton";
import { useEffect, useState } from "react"; // Importar useState
import Image from "next/image"; // Importar Image de Next.js

interface ProductFormProps {
  action: (prevState: { message: string }, formData: FormData) => Promise<{ message: string }>;
  initialData?: Product | null;
  categories: Category[]; // <--- Añadido
}

const initialState = { message: "" };

/**
 * Formulario para crear o editar un producto.
 * Utiliza una Server Action para procesar los datos.
 */
export default function ProductForm({ action, initialData, categories }: ProductFormProps) { // <--- Añadido categories
  const [state, formAction] = useActionState(action, initialState);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Estado para la previsualización
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // Estado para el archivo seleccionado

  useEffect(() => {
    if (state?.message.includes("Éxito")) {
      console.log(state.message);
      // Si es un nuevo producto y se creó con éxito, limpiar la previsualización
      if (!initialData) {
        setImagePreviewUrl(null);
        setSelectedImageFile(null);
      }
    } else if (state?.message.includes("Error")) {
      console.error(state.message);
    }
  }, [state, initialData]);

  // Función para manejar el cambio de imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    }
  };


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

      {/* Selector de Categoría Añadido */}
      <div>
        <label htmlFor="categoryId" className={labelClasses}>
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={initialData?.category_id ?? ""}
          required
          className={inputClasses}
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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

      {/* Campo de Subida de Imagen */}
      <div>
        <label htmlFor="image" className={labelClasses}>
          Imagen del Producto
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100`}
          onChange={handleImageChange}
        />
        {(imagePreviewUrl || initialData?.image_src) && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-300 mb-2">Previsualización:</p>
            <Image
              src={imagePreviewUrl || initialData?.image_src || '/images/producto-placeholder-default.jpg'}
              alt="Previsualización del producto"
              width={200}
              height={200}
              className="rounded-lg object-cover border border-gray-700"
            />
          </div>
        )}
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
