import { verifyToken } from './auth';
import { STORE_SLUG } from './store';

export function requireAdmin(context) {
  const token = context.req.cookies?.admin_token;
  const payload = verifyToken(token);
  if (!payload) {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  if (STORE_SLUG && payload.store_slug !== STORE_SLUG) {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  if (!STORE_SLUG && payload.role !== 'superadmin') {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  return { props: { storeSlug: payload.store_slug || null } };
}

export function requireSuperAdmin(context) {
  const token = context.req.cookies?.admin_token;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'superadmin') {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  return { props: {} };
}
