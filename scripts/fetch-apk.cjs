const https = require('https');
const fs = require('fs');
const path = require('path');

const OWNER = process.env.GITHUB_OWNER || 'Technolandsense';
const REPO = process.env.GITHUB_REPO || 'vitrinear-store';
const OUT_DIR = path.join(__dirname, '..', 'public', 'apk');

async function fetchLatest() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;
  const res = await new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'vitrinear-build' } }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
  const asset = res.assets?.[0];
  if (!asset) throw new Error('No assets found in latest release');
  console.log(`Downloading ${asset.name} from ${asset.browser_download_url}`);
  const filePath = path.join(OUT_DIR, `vitrinear.apk`);
  const file = fs.createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    https.get(asset.browser_download_url, { headers: { 'User-Agent': 'vitrinear-build' } }, (r) => {
      if (r.statusCode === 302 || r.statusCode === 301) {
        https.get(r.headers.location, { headers: { 'User-Agent': 'vitrinear-build' } }, (r2) => {
          r2.pipe(file);
          r2.on('end', resolve);
        });
      } else {
        r.pipe(file);
        r.on('end', resolve);
      }
    }).on('error', reject);
  });
  console.log(`Saved to ${filePath}`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fetchLatest().catch(e => {
  console.error('Failed to fetch APK:', e.message);
  process.exit(0); // Don't fail the build if download fails
});
