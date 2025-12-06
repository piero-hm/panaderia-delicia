// app/admin/products/new/page.tsx
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/app/actions/adminProductActions";
import { getCategories } from "@/lib/queries";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        Crear Nuevo Producto
      </h1>
      <div className="max-w-4xl rounded-xl border border-gray-800 bg-gray-950 p-8 shadow-lg">
        <ProductForm 
          action={createProduct}
          categories={categories}
        />
      </div>
    </div>
  );
}
