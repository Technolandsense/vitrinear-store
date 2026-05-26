import { supabaseAdmin } from '../../lib/supabase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { customer, cart, method, store_slug } = req.body;

  if (!customer || !cart || !method) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  if (!customer.nombre || !customer.email || !customer.tel || !customer.dir) {
    return res.status(400).json({ error: 'Faltan datos del cliente' });
  }

  const productIds = cart.map(item => item.id);
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('id, price')
    .in('id', productIds);

  const priceMap = {};
  (products || []).forEach(p => { priceMap[p.id] = Number(p.price); });

  let calculatedTotal = 0;
  for (const item of cart) {
    const price = priceMap[item.id];
    if (!price) {
      return res.status(400).json({ error: `Producto con id ${item.id} no encontrado` });
    }
    calculatedTotal += price * (item.qty || 1);
  }

  const orderNum = `VIT-${Math.floor(Math.random() * 90000) + 10000}`;

  try {
    const { data, error } = await supabaseAdmin.from('orders').insert([
      {
        order_number: orderNum,
        customer_name: customer.nombre,
        customer_email: customer.email,
        customer_phone: customer.tel,
        customer_address: customer.dir,
        cart: cart,
        payment_method: method,
        total: calculatedTotal,
        store_slug: store_slug || '__main__',
        status: method === 'transfer' ? 'pending_transfer' : 'pending_payment',
        created_at: new Date().toISOString()
      }
    ]).select();

    if (error) throw error;

    res.status(200).json({ success: true, orderNum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar pedido' });
  }
}
