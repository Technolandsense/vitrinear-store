import { supabaseAdmin } from '../../lib/supabase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { customer, cart, method, total } = req.body;
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
        total: total,
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
