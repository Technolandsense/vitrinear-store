import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://cfgpwnphqtpdyethzdvr.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3B3bnBocXRwZHlldGh6ZHZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTA4Njc0NCwiZXhwIjoyMDk0NjYyNzQ0fQ.noWSXs1oyJy9W9KHVrVgc9fR9gE7NFZmXFKrJVzXlQE';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const CATEGORIES = [
  { name: 'Hogar y Herramientas', url: 'https://tiendadebarrio.com.ar/hogar-y-herramientas/' },
  { name: 'Juegos y Consolas', url: 'https://tiendadebarrio.com.ar/juegos-y-consolas/' },
  { name: 'Auriculares', url: 'https://tiendadebarrio.com.ar/tecnologia-audio-y-video/' },
  { name: 'Belleza', url: 'https://tiendadebarrio.com.ar/estetica-y-belleza/' },
  { name: 'Niños', url: 'https://tiendadebarrio.com.ar/ninos/' },
  { name: 'Mascotas', url: 'https://tiendadebarrio.com.ar/animales/' },
  { name: 'Bazar', url: 'https://tiendadebarrio.com.ar/bazar/' },
  { name: 'Parlantes', url: 'https://tiendadebarrio.com.ar/movilidad/' },
  { name: 'Varios', url: 'https://tiendadebarrio.com.ar/varios/' },
  { name: 'Cargadores y cables', url: 'https://tiendadebarrio.com.ar/cargadores-y-cables/' },
  { name: 'Iluminación & Filmaking', url: 'https://tiendadebarrio.com.ar/hogar-y-herramientas-bazar/' },
  { name: 'Informática', url: 'https://tiendadebarrio.com.ar/tecnologia-audio-y-video1/' },
  { name: 'Smartwatch', url: 'https://tiendadebarrio.com.ar/smartwatch/' },
];

const SEEN = new Set();
const PRODUCTS = [];

function extractJsonLdBlocks(html) {
  const blocks = [];
  let idx = 0;
  while ((idx = html.indexOf('<script type="application/ld+json"', idx)) !== -1) {
    const startBrace = html.indexOf('{', idx);
    const endScript = html.indexOf('</script>', startBrace);
    if (startBrace === -1 || endScript === -1) { idx++; continue; }
    const jsonStr = html.substring(startBrace, endScript).trim();
    try {
      const json = JSON.parse(jsonStr);
      blocks.push(json);
    } catch {}
    idx = endScript + 9;
  }
  return blocks;
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[áäàâ]/g, 'a').replace(/[éëèê]/g, 'e').replace(/[íïìî]/g, 'i')
    .replace(/[óöòô]/g, 'o').replace(/[úüùû]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(15000),
    });
    return await res.text();
  } catch (e) {
    console.error(`  Error fetching ${url}: ${e.message}`);
    return '';
  }
}

async function scrapeCategory(cat) {
  console.log(`\n=== ${cat.name} ===`);
  const html = await fetchPage(cat.url);
  if (!html) return;

  const jsonBlocks = extractJsonLdBlocks(html);

  let count = 0;
  for (const block of jsonBlocks) {
    const type = block['@type'];
    const product = type === 'Product' ? block : (block.mainEntity?.['@type'] === 'Product' ? block.mainEntity : null);
    if (!product || !product.name || SEEN.has(product.name)) continue;
    SEEN.add(product.name);
    count++;

    const price = parseFloat(product.offers?.price) || 0;
    const oldPrice = null;
    const imageUrl = (product.image || '').replace(/-\d+-\d+\.webp/, '-640-0.webp');
    const productUrl = product.mainEntityOfPage?.['@id'] || product.offers?.url || '';

    let images = imageUrl ? [imageUrl] : [];

    // Try to get more images from product page
    if (productUrl) {
      const prodHtml = await fetchPage(productUrl);
      if (prodHtml) {
        const imgs = [...prodHtml.matchAll(/src="([^"]*?dcdn-us\.mitiendanube\.com[^"]*?products[^"]*?-\d+-\d+\.webp)"/g)];
        const urls = [...new Set(imgs.map(m => m[1]))]
          .filter(u => !u.includes('empty-placeholder') && !u.includes('-50-0.'))
          .map(u => u.replace(/-\d+-\d+\.webp/, '-640-0.webp'));
        if (urls.length > 0) images = [...new Set(urls)];
      }
    }

    const tag = price < 10000 && price > 0 ? 'Oferta' : null;

    PRODUCTS.push({
      name: product.name,
      category: cat.name,
      price,
      old_price: oldPrice,
      image: '📦',
      tag,
      description: product.description || '',
      image_urls: images.slice(0, 3),
      image_url: images[0] || '',
      active: true,
      store_slug: '__main__',
    });
    console.log(`  ${count}. ${product.name} — $${price}`);
  }
  console.log(`  → ${count} productos encontrados`);
}

async function loadToSupabase() {
  console.log(`\n=== Cargando ${PRODUCTS.length} productos a Supabase ===`);

  for (const cat of CATEGORIES) {
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('name', cat.name)
      .eq('store_slug', '__main__')
      .maybeSingle();
    if (!existing) {
      await supabase.from('categories').insert({
        name: cat.name,
        sort_order: CATEGORIES.indexOf(cat),
        store_slug: '__main__',
      });
      console.log(`  Categoría creada: ${cat.name}`);
    }
  }

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const { error } = await supabase.from('products').insert({
      name: p.name,
      category: p.category,
      price: p.price,
      old_price: p.old_price,
      image: p.image,
      tag: p.tag,
      description: p.description,
      image_urls: p.image_urls,
      image_url: p.image_url,
      active: p.active,
      store_slug: p.store_slug,
    });
    if (error) {
      console.error(`  Error: "${p.name}" → ${error.message}`);
    } else {
      console.log(`  [${i + 1}/${PRODUCTS.length}] ✓ ${p.name}`);
    }
  }
}

(async () => {
  console.log('=== Scraping tiendadebarrio.com.ar ===\n');

  for (const cat of CATEGORIES) {
    await scrapeCategory(cat);
  }

  console.log(`\n=== Total: ${PRODUCTS.length} productos ===`);

  const outPath = join(__dirname, '..', 'productos-scraped.json');
  writeFileSync(outPath, JSON.stringify(PRODUCTS, null, 2));
  console.log(`JSON guardado: ${outPath}`);

  await loadToSupabase();
  console.log('\n=== ¡Completado! ===');
})();
