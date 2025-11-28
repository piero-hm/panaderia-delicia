// app/productos/page.tsx
'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import type { Product } from '@/types';
import { getProducts } from '@/lib/queries';
import ProductPageHero from '@/components/products/ProductPageHero';
import ProductSidebar from '@/components/products/ProductSidebar';
import { SortOption } from '@/components/products/ProductSort';
import ProductList from '@/components/products/ProductList';
import ProductQuickView from '@/components/products/ProductQuickView';

const ProductsPageContent = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Panadería', value: 'panaderia' },
    { label: 'Tortas', value: 'tortas' },
    { label: 'Pastelería', value: 'pasteleria' },
    { label: 'Postres', value: 'postres' },
  ];

  const processedProducts = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? [...initialProducts]
      : initialProducts.filter(p => p.category_id === selectedCategory);

    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        break;
      case 'default':
      default:
        // Re-apply initial order or a default sort (e.g., by isFeatured then name)
        filtered = selectedCategory === 'all'
          ? [...initialProducts]
          : initialProducts.filter(p => p.category_id === selectedCategory);
        // Example of a more complex default sort: featured first, then by name
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }
    
    return filtered;
  }, [selectedCategory, sortOption, initialProducts]);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <>
      <ProductPageHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar for Filters and Sort */}
        <ProductSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSortChange={setSortOption}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Nuestra Selección</h2>
            <p className="text-gray-600">Hechos a mano, todos los días. Descubre tus favoritos.</p>
          </div>
          
          {processedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800">No se encontraron productos</h3>
              <p className="text-gray-500 mt-2">Intenta seleccionar otra categoría o revisa más tarde.</p>
            </div>
          ) : (
            <ProductList products={processedProducts} onQuickView={handleQuickView} />
          )}
        </main>
      </div>

      <ProductQuickView product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <Suspense fallback={<p className="text-center text-lg py-10">Cargando productos...</p>}>
      {loading ? (
        <p className="text-center text-lg py-10">Cargando productos...</p>
      ) : (
        <ProductsPageContent initialProducts={products} />
      )}
    </Suspense>
  );
};

export default ProductsPage;
