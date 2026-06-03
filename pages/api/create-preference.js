import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { cart, customer, orderNum } = req.body;
  if (!cart?.length || !orderNum) return res.status(400).json({ error: 'Faltan datos' });

  try {
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const body = {
      items: cart.map(item => ({
        id: String(item.id),
        title: item.name,
        quantity: item.qty,
        unit_price: Number(item.price),
        currency_id: 'ARS',
      })),
      payer: { email: customer?.email },
      external_reference: orderNum,
      auto_return: 'approved',
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vitrinear.vercel.app'}/?mp_success=1`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vitrinear.vercel.app'}/?mp_failure=1`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vitrinear.vercel.app'}/?mp_pending=1`,
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vitrinear.vercel.app'}/api/mercadopago`,
    };

    const preference = await new Preference(client).create({ body });
    res.status(200).json({ init_point: preference.init_point });
  } catch (err) {
    console.error('MP create preference error:', err);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
}
