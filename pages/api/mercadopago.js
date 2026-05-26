import { supabaseAdmin } from '../../lib/supabase-admin';
import { createHmac } from 'crypto';

function verifySignature(req) {
  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  if (!signature || !requestId) return false;

  const parts = signature.split(',');
  const ts = parts.find(p => p.startsWith('ts='))?.split('=')[1];
  const hash = parts.find(p => p.startsWith('v1='))?.split('=')[1];
  if (!ts || !hash) return false;

  const secret = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';
  const manifest = `id:${req.body?.data?.id};request-id:${requestId};ts:${ts};`;
  const expected = createHmac('sha256', secret).update(manifest).digest('hex');
  return hash === expected;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  if (!verifySignature(req)) {
    return res.status(401).json({ error: 'Firma inválida' });
  }

  const { type, data } = req.body;

  if (type === 'payment') {
    const { id: payment_id } = data;

    try {
      const mercadopago = require('mercadopago');
      mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);
      const payment = await mercadopago.payment.findById(payment_id);
      const { external_reference, status } = payment.body;

      if (external_reference && status === 'approved') {
        const { error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'paid', payment_id })
          .eq('order_number', external_reference);

        if (error) console.error('Error actualizando orden:', error);
      }
    } catch (err) {
      console.error('Error procesando pago MP:', err);
    }
  }

  res.status(200).json({ received: true });
}
