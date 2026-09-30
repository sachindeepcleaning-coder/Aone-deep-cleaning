/**
 * Google Indexing API submitter for balajicleaningservice.shop.
 *
 * Reads URLs from public/sitemap.xml, skips URLs already submitted
 * (tracked in indexing-progress.json at the repo root), submits the rest
 * as URL_UPDATED (200/day quota), then updates the progress file.
 *
 * Key: uses the shared service-account key via INDEXING_KEY_FILE env,
 * defaulting to the existing bot key in /home/vegeta/Pictures/code3.
 * The service account must be added as Owner on the Search Console
 * property https://balajicleaningservice.shop/ or Google returns 403.
 *
 * Usage:
 *   node scripts/submit-indexing.cjs            # submit all pending (cap 200)
 *   node scripts/submit-indexing.cjs --test     # submit exactly 1 URL (wiring check)
 *   node scripts/submit-indexing.cjs --limit N  # override cap
 *   node scripts/submit-indexing.cjs --reset    # clear progress and start over
 *   node scripts/submit-indexing.cjs --url <u> [--url <u> ...]
 *                                               # submit specific URLs only
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

let google;
try {
  ({ google } = require('googleapis'));
} catch (_) {
  // Fall back to the shared install next to the bot key.
  ({ google } = require('/home/vegeta/Pictures/code3/node_modules/googleapis'));
}

const ROOT = path.resolve(__dirname, '..');
const KEY_FILE =
  process.env.INDEXING_KEY_FILE || '/home/vegeta/Pictures/code3/google index bot key.json';
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const PROGRESS_FILE = path.join(ROOT, 'indexing-progress.json');
const SCOPE = 'https://www.googleapis.com/auth/indexing';
const DELAY_MS = 400;

const args = process.argv.slice(2);
const TEST_MODE = args.includes('--test');
const RESET = args.includes('--reset');
const limitIdx = args.indexOf('--limit');
const DAILY_CAP = TEST_MODE ? 1 : limitIdx !== -1 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : 200;
// --url <u> (repeatable): submit only these URLs, bypassing pending.
const ONLY_URLS = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--url' && args[i + 1] && !args[i + 1].startsWith('--')) ONLY_URLS.push(args[i + 1]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseSitemap() {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

function loadProgress() {
  if (RESET) return { submitted: [], failed: [], lastRun: null };
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch (_) {
    return { submitted: [], failed: [], lastRun: null };
  }
}

// Skip URLs that don't currently return 200 so quota isn't wasted.
function headOk(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 15000 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`Key file not found: ${KEY_FILE}`);
    process.exit(1);
  }
  const allUrls = parseSitemap();
  console.log(`Sitemap: ${allUrls.length} URLs`);

  const progress = loadProgress();
  const done = new Set([...progress.submitted, ...progress.failed]);
  let pending = allUrls.filter((u) => !done.has(u));
  if (ONLY_URLS.length > 0) {
    const known = new Set(allUrls);
    pending = ONLY_URLS.filter((u) => known.has(u));
    const unknown = ONLY_URLS.filter((u) => !known.has(u));
    for (const u of unknown) console.error(`  SKIP (not in sitemap): ${u}`);
  }
  console.log(`Already submitted: ${progress.submitted.length}, pending: ${pending.length}`);
  if (pending.length === 0) {
    console.log('Nothing to submit.');
    return;
  }

  console.log('Checking live status (HEAD) before spending quota…');
  const live = [];
  for (const u of pending) {
    const ok = await headOk(u);
    console.log(`  ${ok ? 'OK  ' : 'SKIP'} ${u}`);
    if (ok) live.push(u);
  }
  pending = live;
  if (pending.length === 0) {
    console.log('No live URLs to submit.');
    return;
  }

  const auth = new google.auth.GoogleAuth({ keyFile: KEY_FILE, scopes: [SCOPE] });
  const indexing = google.indexing({ version: 'v3', auth });

  const batch = pending.slice(0, DAILY_CAP);
  console.log(`Submitting up to ${batch.length} URL(s)…`);
  let success = 0;
  let failed = 0;
  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({ requestBody: { url, type: 'URL_UPDATED' } });
      progress.submitted.push(url);
      success++;
      console.log(`  OK ${url}`);
    } catch (err) {
      const msg = (err && err.errors && err.errors[0] && err.errors[0].message) || (err && err.message) || String(err);
      const code = (err && (err.code || (err.response && err.response.status))) || '';
      const permanent = String(code).includes('400') || /invalid/i.test(msg);
      if (permanent) progress.failed.push(url);
      failed++;
      console.error(`  FAIL ${url} [${code}] ${msg}${permanent ? ' (permanent)' : ' (will retry)'}`);
    }
    await sleep(DELAY_MS);
  }

  progress.lastRun = new Date().toISOString();
  progress.submitted = [...new Set(progress.submitted)];
  progress.failed = [...new Set(progress.failed)];
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  console.log(`\nDone: ${success} submitted, ${failed} failed. Total: ${progress.submitted.length}/${allUrls.length}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
