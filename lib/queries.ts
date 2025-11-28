// lib/queries.ts
import type { Product } from '@/types';
import { products } from './data'; // Import products from data.ts

type SortBy = 'name' | 'price' | 'category_id';

export const getProducts = async (category?: string, sortBy?: SortBy): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  let filteredProducts = [...products]; // Use imported products

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category_id === category);
  }

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'category_id') {
        if (a.category_id === null && b.category_id === null) return 0;
        if (a.category_id === null) return 1;
        if (b.category_id === null) return -1;
        return a.category_id.localeCompare(b.category_id);
      }
      return 0;
    });
  }

  return filteredProducts;
};

export const getFeaturedProducts = async (category?: string, sortBy?: SortBy): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  let featuredProducts = products.filter(p => p.isFeatured); // Use imported products

  if (category) {
    featuredProducts = featuredProducts.filter(product => product.category_id === category);
  }

  if (sortBy) {
    featuredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'category_id') {
        if (a.category_id === null && b.category_id === null) return 0;
        if (a.category_id === null) return 1;
        if (b.category_id === null) return -1;
        return a.category_id.localeCompare(b.category_id);
      }
      return 0;
    });
  }

  return featuredProducts;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const foundProduct = products.find(p => p.id === id.toString());
  return Promise.resolve(foundProduct);
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const foundProduct = products.find(p => p.slug === slug);
  return Promise.resolve(foundProduct);
};
