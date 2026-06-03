import { supabaseAdmin } from '../../lib/supabase-admin';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { type, data } = req.body;

  if (type === 'payment' && data?.id) {
    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
      const payment = await new Payment(client).get({ id: data.id });
      const { external_reference, status } = payment;

      if (external_reference && status === 'approved') {
        const { error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'paid', payment_id: String(data.id) })
          .eq('order_number', external_reference);

        if (error) console.error('Error actualizando orden:', error);
      }
    } catch (err) {
      console.error('Error procesando pago MP:', err);
    }
  }

  res.status(200).json({ received: true });
}
