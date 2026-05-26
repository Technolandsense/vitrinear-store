import { createToken } from '../../../lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== expected) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = createToken();
  const cookie = `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true });
}
