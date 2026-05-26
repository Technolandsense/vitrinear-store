import { verifyToken } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export default async function handler(req, res) {
  const token = req.cookies?.admin_token;
  if (!verifyToken(token)) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'POST') {
    const { id: productId, ...data } = req.body;
    if (productId) {
      const { error } = await supabaseAdmin.from('products').update(data).eq('id', productId);
      if (error) return res.status(500).json({ error: error.message });
    } else {
      const { error } = await supabaseAdmin.from('products').insert([data]);
      if (error) return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
