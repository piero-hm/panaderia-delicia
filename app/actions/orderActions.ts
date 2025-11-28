// app/actions/orderActions.ts
'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { CartItem } from '@/types';



export async function createOrder(items: CartItem[]): Promise<{ success: boolean; error?: string }> {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
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

    // 2. Server-side validation and total calculation
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
      const product = products.find(p => p.id === item.product.id);
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

    // 3. Create the order in the 'orders' table
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

    // 4. Add the order_id to each item and insert into 'order_items'
    const itemsToInsert = orderItemsData.map(item => ({
      ...item,
      order_id: order.id,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert);

    if (orderItemsError) {
      // Here you might want to add logic to cancel the order if items fail to insert
      throw new Error('No se pudieron guardar los artículos del pedido: ' + orderItemsError.message);
    }

    // 5. (Optional) Decrement stock. This should ideally be in a database transaction.
    // For simplicity, we do it here.
    for (const item of items) {
        const product = products.find(p => p.id === item.product.id);
        if (product) {
            const newStock = product.stock - item.quantity;
            await supabase.from('products').update({ stock: newStock }).eq('id', item.product.id);
        }
    }

    return { success: true };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
