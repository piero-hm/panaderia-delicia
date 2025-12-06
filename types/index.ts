// types/index.ts

// Corresponds to the 'public.categories' table
export interface Category {
  id: string; // UUID
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

// Corresponds to the 'public.products' table
export interface Product {
  id: string; // UUID
  name: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  image_src: string;
  image_alt: string | null;
  category_id: string | null; // UUID
  categories?: { // Añadido para el join con categorías
    name: string;
    slug: string;
  };
  stock: number;
  slug: string;
  isFeatured?: boolean; // Add isFeatured property
  created_at?: string;
  updated_at?: string;
}

// Corresponds to the 'public.users' table (profile)
export interface UserProfile {
  id: string; // UUID from auth.users
  email: string;
  name: string | null;
  created_at?: string;
  updated_at?: string;
}

// Corresponds to the 'public.orders' table
export interface Order {
  id: string; // UUID
  user_id: string; // UUID
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

// Corresponds to the 'public.order_items' table
export interface OrderItem {
  id: string; // UUID
  order_id: string; // UUID
  product_id: string; // UUID
  quantity: number;
  price_at_purchase: number;
  created_at?: string;
}

// Represents an item in the shopping cart in the client
export interface CartItem {
  id: string; // This can be a temporary client-side ID
  product: Product;
  quantity: number;
}