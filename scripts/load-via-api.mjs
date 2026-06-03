import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3000';
const ADMIN_PASSWORD = 'vitrineAR777**admin';

const products = JSON.parse(readFileSync(join(__dirname, '..', 'productos-scraped.json'), 'utf-8'));

async function login() {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: ADMIN_PASSWORD }),
    redirect: 'manual',
  });
  const cookies = res.headers.getSetCookie?.() || [];
  const tokenCookie = cookies.find(c => c.startsWith('admin_token='));
  const token = tokenCookie?.split(';')[0]?.split('=')[1];
  if (!token) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Login failed: ${data.error || res.status}`);
  }
  return token;
}

async function insertProduct(token, product) {
  const res = await fetch(`${BASE}/api/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `admin_token=${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.status);
  return data;
}

(async () => {
  console.log('Iniciando sesión...');
  const token = await login();
  console.log('Sesión iniciada. Cargando productos...\n');

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    try {
      await insertProduct(token, {
        name: p.name,
        category: p.category,
        price: p.price,
        old_price: p.old_price,
        image: p.image,
        tag: p.tag,
        description: p.description,
        image_urls: p.image_urls,
        image_url: p.image_url,
        active: true,
      });
      console.log(`[${i + 1}/${products.length}] ✓ ${p.name}`);
    } catch (e) {
      console.error(`[${i + 1}/${products.length}] ✗ ${p.name}: ${e.message}`);
    }
    // Small delay to avoid overwhelming
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\n¡Carga completada!');
})();
