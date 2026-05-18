import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

export async function createPreference(items, backUrls) {
  const preference = new Preference(client);
  return preference.create({
    body: {
      items: items.map(item => ({
        title: item.name,
        quantity: item.qty,
        unit_price: item.price,
        currency_id: 'ARS'
      })),
      back_urls: {
        success: backUrls.success,
        failure: backUrls.failure,
        pending: backUrls.pending
      },
      auto_return: 'approved'
    }
  });
}
