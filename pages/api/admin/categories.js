import { verifyToken } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export default async function handler(req, res) {
  const token = req.cookies?.admin_token;
  if (!verifyToken(token)) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'POST') {
    const { id, name, sort_order } = req.body;
    if (id) {
      const { error } = await supabaseAdmin.from('categories').update({ name, sort_order }).eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
    } else {
      const { error } = await supabaseAdmin.from('categories').insert([{ name, sort_order }]);
      if (error) return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const { error } = await supabaseAdmin.from('categories').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
