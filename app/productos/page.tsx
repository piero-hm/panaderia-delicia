// app/productos/page.tsx
'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import type { Product } from '@/types';
import { getProducts } from '@/lib/queries';
import ProductPageHero from '@/components/layout/ProductPageHero';
import ProductSidebar from '@/components/products/ProductSidebar';
import { SortOption } from '@/components/products/ProductSort';
import ProductList from '@/components/products/ProductList';
import ProductQuickView from '@/components/products/ProductQuickView';

const ProductsPageContent = ({ initialProducts }: { initialProducts: Product[] }) => {
  // --- ESTADO ---
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para la búsqueda
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Panadería', value: 'panaderia' },
    { label: 'Tortas', value: 'tortas' },
    { label: 'Pastelería', value: 'pasteleria' },
    { label: 'Postres', value: 'postres' },
  ];

  // --- LÓGICA DE FILTRADO Y BÚSQUEDA ---
  const processedProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // 1. Filtrado por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    // 2. Filtrado por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Ordenamiento
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
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return filtered;
  }, [selectedCategory, sortOption, searchTerm, initialProducts]);

  // --- MANEJADORES DE EVENTOS ---
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSortOption('default');
    setSearchTerm('');
  };

  return (
    <div className="bg-[#E2E2DD]">
      <ProductPageHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar con las nuevas props */}
        <ProductSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onResetFilters={handleResetFilters}
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
              <p className="text-gray-500 mt-2">
                {searchTerm ? `Intenta con otra búsqueda.` : `Intenta seleccionar otra categoría.`}
              </p>
            </div>
          ) : (
            <ProductList products={processedProducts} onQuickView={handleQuickView} />
          )}
        </main>
      </div>

      <ProductQuickView product={quickViewProduct} isOpen={isQuickViewOpen} onClose={closeQuickView} />
    </div>
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
