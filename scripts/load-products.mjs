import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  'https://cfgpwnphqtpdyethzdvr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3B3bnBocXRwZHlldGh6ZHZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTA4Njc0NCwiZXhwIjoyMDk0NjYyNzQ0fQ.noWSXs1oyJy9W9KHVrVgc9fR9gE7NFZmXFKrJVzXlQE'
);

const products = JSON.parse(readFileSync(join(__dirname, '..', 'productos-scraped.json'), 'utf-8'));
const batchSize = 5;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  console.log(`Cargando ${products.length} productos en batches de ${batchSize}...\n`);

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const { error } = await supabase.from('products').insert(batch);
    if (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} error: ${error.message}`);
      // retry one by one
      for (const p of batch) {
        const { error: e2 } = await supabase.from('products').insert(p);
        if (e2) console.error(`  ${p.name}: ${e2.message}`);
        else console.log(`  ✓ ${p.name}`);
        await sleep(500);
      }
    } else {
      console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${batch.map(p => '✓')} (${batch.length} products)`);
    }
    await sleep(1000);
  }

  console.log('\n¡Carga completada!');
})();
