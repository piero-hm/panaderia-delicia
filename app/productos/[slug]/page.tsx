import React from 'react';
import { getProductBySlug, getProducts } from '@/lib/queries';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | Delicia Panadería`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: [
        {
          url: product.image_src,
          width: 800,
          height: 600,
          alt: product.image_alt || product.name,
        },
      ],
    },
  };
}

// Generate static paths at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// The page component
const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
};

export default ProductDetailPage;
