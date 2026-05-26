import { verifyToken } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export default async function handler(req, res) {
  const token = req.cookies?.admin_token;
  if (!verifyToken(token)) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'POST') {
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ error: 'settings debe ser un array' });

    for (const { key, value } of settings) {
      const { error } = await supabaseAdmin.from('settings').upsert({ key, value }, { onConflict: 'key' });
      if (error) return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Método no permitido' });
}
