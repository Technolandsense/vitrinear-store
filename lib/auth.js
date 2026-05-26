import { createHmac } from 'crypto';

const SECRET = process.env.JWT_SECRET || 'vitrinear-dev-secret-change-in-production';

export function createToken() {
  const payload = JSON.stringify({ role: 'admin', iat: Date.now(), exp: Date.now() + 86400000 });
  const data = Buffer.from(payload).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const expected = createHmac('sha256', SECRET).update(data).digest('hex');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
