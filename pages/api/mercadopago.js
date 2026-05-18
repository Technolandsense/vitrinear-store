import { supabaseAdmin } from '../../lib/supabase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { type, data } = req.body;

  if (type === 'payment') {
    const { id: payment_id } = data;
    const { error } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid', payment_id })
      .eq('payment_id', payment_id);
    
    if (error) console.error(error);
  }

  res.status(200).json({ received: true });
}
