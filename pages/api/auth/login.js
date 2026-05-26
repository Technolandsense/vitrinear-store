import { createToken } from '../../../lib/auth';
import { STORE_SLUG, IS_MAIN } from '../../../lib/store';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { password } = req.body || {};

  if (IS_MAIN) {
    if (password !== process.env.SUPER_ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    const token = createToken({ role: 'superadmin' });
    const cookie = `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true, role: 'superadmin' });
  }

  let storePassword = process.env.ADMIN_PASSWORD;

  if (!storePassword) {
    const { data: store } = await supabaseAdmin
      .from('stores')
      .select('admin_password')
      .eq('slug', STORE_SLUG)
      .single();
    storePassword = store?.admin_password;
  }

  if (password !== storePassword) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const token = createToken({ role: 'admin', store_slug: STORE_SLUG });
  const cookie = `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true, role: 'admin', store_slug: STORE_SLUG });
}
