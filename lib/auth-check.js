import { verifyToken } from './auth';

export function requireAdmin(context) {
  const token = context.req.cookies?.admin_token;
  const payload = verifyToken(token);
  if (!payload) {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  return { props: {} };
}
