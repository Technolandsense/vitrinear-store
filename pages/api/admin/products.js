import { verifyToken } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

function getStore(req) {
  const payload = verifyToken(req.cookies?.admin_token);
  if (!payload) return null;
  return { role: payload.role, store_slug: payload.store_slug || null };
}

export default async function handler(req, res) {
  const store = getStore(req);
  if (!store) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'POST') {
    const { id: productId, ...data } = req.body;
    if (store.store_slug) data.store_slug = store.store_slug;

    if (productId) {
      let query = supabaseAdmin.from('products').update(data).eq('id', productId);
      if (store.store_slug) query = query.eq('store_slug', store.store_slug);
      const { error } = await query;
      if (error) return res.status(500).json({ error: error.message });
    } else {
      const { error } = await supabaseAdmin.from('products').insert([data]);
      if (error) return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    let query = supabaseAdmin.from('products').delete().eq('id', id);
    if (store.store_slug) query = query.eq('store_slug', store.store_slug);
    const { error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
