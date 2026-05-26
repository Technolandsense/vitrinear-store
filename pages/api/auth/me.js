import { verifyToken } from '../../../lib/auth';

export default function handler(req, res) {
  const token = req.cookies?.admin_token;
  const payload = verifyToken(token);

  if (!payload) return res.status(200).json({ authenticated: false });

  res.status(200).json({ authenticated: true, role: payload.role });
}
