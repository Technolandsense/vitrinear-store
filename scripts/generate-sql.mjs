import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(readFileSync(join(__dirname, '..', 'productos-scraped.json'), 'utf-8'));

const CATEGORY_EMOJI = {
  'Hogar y Herramientas': '🔧',
  'Juegos y Consolas': '🎮',
  'Auriculares': '🎧',
  'Belleza': '💄',
  'Niños': '🧸',
  'Mascotas': '🐾',
  'Bazar': '🏠',
  'Parlantes': '🔊',
  'Varios': '📎',
  'Cargadores y cables': '🔌',
  'Iluminación & Filmaking': '💡',
  'Informática': '💻',
  'Smartwatch': '⌚',
};

function fixUrl(url) {
  if (!url) return '';
  if (url.startsWith('//')) return 'https:' + url;
  return url;
}

function escape(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function toJsonbArray(arr) {
  if (!arr || arr.length === 0) return `'[]'::jsonb`;
  const urls = arr.map(a => JSON.stringify(fixUrl(a))).join(', ');
  return `'[${urls}]'::jsonb`;
}

const CATEGORIES = [
  'Hogar y Herramientas', 'Juegos y Consolas', 'Auriculares', 'Belleza',
  'Niños', 'Mascotas', 'Bazar', 'Parlantes', 'Varios',
  'Cargadores y cables', 'Iluminación & Filmaking', 'Informática', 'Smartwatch'
];

let sql = `-- Productos scrapeados de tiendadebarrio.com.ar
-- ${products.length} productos en ${CATEGORIES.length} categorías
-- Generado el ${new Date().toISOString().split('T')[0]}
-- Ejecutar en: https://supabase.com/dashboard/project/cfgpwnphqtpdyethzdvr/sql/new

BEGIN;

-- Insertar categorías
${CATEGORIES.map((c, i) =>
  `INSERT INTO categories (name, sort_order, store_slug) VALUES (${escape(c)}, ${i}, '__main__') ON CONFLICT DO NOTHING;`
).join('\n')}

-- Insertar productos
`;

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const tag = p.tag ? escape(p.tag) : 'NULL';
  const oldPrice = p.old_price || 'NULL';
  const emoji = CATEGORY_EMOJI[p.category] || '📦';
  const imgUrl = fixUrl(p.image_url || '');
  const imgUrls = (p.image_urls || []).map(fixUrl);

  sql += `INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  ${escape(p.name)},
  ${escape(p.category)},
  ${p.price},
  ${oldPrice},
  ${escape(emoji)},
  ${tag},
  ${escape(p.description || '')},
  ${toJsonbArray(imgUrls)},
  ${escape(imgUrl)},
  true,
  '__main__'
);
`;
}

sql += `COMMIT;\n`;

const outPath = join(__dirname, '..', 'productos-insert.sql');
writeFileSync(outPath, sql);

console.log(`✅ SQL generado: productos-insert.sql`);
console.log(`📦 ${products.length} productos en ${CATEGORIES.length} categorías`);
console.log();
console.log('📋 Para importar:');
console.log('   1. Abrí https://supabase.com/dashboard/project/cfgpwnphqtpdyethzdvr/sql/new');
console.log('   2. Copiá TODO el contenido de productos-insert.sql');
console.log('   3. Ejecutalo (Ctrl+Enter)');
