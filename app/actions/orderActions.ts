'use server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { CartItem } from '@/types';

interface ProductFromSupabase {
  id: string;
  price: number;
  discount_price: number | null;
  stock: number;
}

export async function createOrder(
  items: CartItem[]
): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', options)
        },
      },
    }
  );

  try {
    // 1. Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Debes iniciar sesión para crear un pedido.');
    }

    // ... el resto de tu lógica se mantiene igual ...
    const productIds = items.map(item => item.product.id);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, price, discount_price, stock')
      .in('id', productIds);

    if (productsError) {
      throw new Error('No se pudieron verificar los productos: ' + productsError.message);
    }

    let totalAmount = 0;
    const orderItemsData = items.map(item => {
      const product = (products as ProductFromSupabase[]).find(p => p.id === item.product.id);
      if (!product) {
        throw new Error(`El producto "${item.product.name}" ya no está disponible.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`No hay suficiente stock para "${item.product.name}". Disponible: ${product.stock}.`);
      }
      const priceAtPurchase = product.discount_price ?? product.price;
      totalAmount += priceAtPurchase * item.quantity;
      return {
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_purchase: priceAtPurchase,
      };
    });

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: totalAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      throw new Error('No se pudo crear el pedido: ' + orderError.message);
    }

    const itemsToInsert = orderItemsData.map(item => ({
      ...item,
      order_id: order.id,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert);

    if (orderItemsError) {
      throw new Error('No se pudieron guardar los artículos del pedido: ' + orderItemsError.message);
    }

    for (const item of items) {
      const product = (products as ProductFromSupabase[]).find(p => p.id === item.product.id);
      if (product) {
        const newStock = product.stock - item.quantity;
        await supabase.from('products').update({ stock: newStock }).eq('id', item.product.id);
      }
    }

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}
