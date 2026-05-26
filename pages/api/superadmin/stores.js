import { verifyToken } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

function requireSuperAdmin(req, res) {
  const payload = verifyToken(req.cookies?.admin_token);
  if (!payload || payload.role !== 'superadmin') {
    res.status(401).json({ error: 'No autorizado' });
    return null;
  }
  return payload;
}

export default async function handler(req, res) {
  const admin = requireSuperAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data } = await supabaseAdmin.from('stores').select('*').order('id');
    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const { name, slug, admin_password } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'Nombre y slug requeridos' });

    const { error } = await supabaseAdmin.from('stores').insert([
      { name, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''), admin_password: admin_password || 'admin123' }
    ]);

    if (error) {
      if (error.code === '23505') return res.status(400).json({ error: 'El slug ya existe' });
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID requerido' });

    // Get slug to filter content
    const { data: store } = await supabaseAdmin.from('stores').select('slug').eq('id', id).single();
    if (!store) return res.status(404).json({ error: 'Tienda no encontrada' });
    if (store.slug === '__main__') return res.status(400).json({ error: 'No se puede eliminar la tienda principal' });

    const slug = store.slug;
    await supabaseAdmin.from('products').delete().eq('store_slug', slug);
    await supabaseAdmin.from('categories').delete().eq('store_slug', slug);
    await supabaseAdmin.from('orders').delete().eq('store_slug', slug);
    await supabaseAdmin.from('settings').delete().eq('store_slug', slug);
    await supabaseAdmin.from('stores').delete().eq('id', id);

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
