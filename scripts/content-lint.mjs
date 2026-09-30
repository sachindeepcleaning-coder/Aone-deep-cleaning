// Content quality gate for blog articles and their meta titles/descriptions.
//
// Why this exists: the Sep-2026 blog batches were published with internal SEO
// planning language ("imp", "clicks", "this pillar", competitor names) visible
// on the page, and two clusters were built from one shared skeleton. Both make
// 73 articles read as a single template. This script fails the build when that
// happens again, and warns when a new article looks like a clone.
//
// Usage:
//   node scripts/content-lint.mjs            → hard errors only (used by build)
//   node scripts/content-lint.mjs --strict   → warnings also fail
//   node scripts/content-lint.mjs --verbose  → print every detail

import { ARTICLES } from '../src/lib/blog.js';
import { pages } from '../pages.config.mjs';
import { IMAGE_DIMS } from '../src/lib/image-dims.js';
import { getService } from '../src/lib/services.js';
import { existsSync } from 'node:fs';

const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose');

// ── Hard errors ───────────────────────────────────────────────────────────────

// Words and phrases that belong in an SEO spreadsheet, never on a customer page.
const BANNED = [
  [/\bimps?\b|\bimp,/i, 'search-impression shorthand ("imp")'],
  [/\b0 clicks\b|clicks on your site|\bGSC\b|Google Search Console/i, 'GSC / click data'],
  [/\bpillar\b/i, 'internal "pillar" jargon'],
  [/\bthin\b(?!\s+(rug|rugs|cotton|mattress|layer|film|coat|coating|grout|line|lines))/i, '"thin competitor" framing'],
  [/\(not thin\)|\bnot thin\b/i, '"not thin" framing'],
  [/\bSERP\b|ranks? #\d|ranking #\d|outranks?\b|\brank #\d/i, 'ranking-position framing'],
  [/\bbeats? the (generic|thin|bare|topical|guide|pillar|competition|competitor|Urban|Zoopgo|ProsAdda|marketplace)\b/i, '"beats the competitor" framing'],
  [/exact-match|exact match/i, '"exact-match" jargon'],
  [/You (searched|typed)\b/i, '"you searched" framing aimed at the owner'],
  [/your (Instagram|site) gets|on your site/i, "references to the owner's own channels"],
  [/godaddy/i, 'competitor platform put-down'],
];

// Competitor brands are only acceptable on the dedicated -vs- / best- pages,
// where the brand IS the subject. Everywhere else they are a template smell.
const COMPETITOR_BRANDS = [
  'ProsAdda', 'SKKS', 'AKS Facilities', 'BusyBucket', 'Kleanhomz', 'DustBusters',
  'TechSquad', 'Zoopgo', 'Tumbledry', 'SPFM', 'Favorz', 'MaidsinGurgaon',
  'Aone', 'A One Deep Cleaning', 'Smart City Care',
];
const isComparatorPage = (slug) => /-vs-|best-|versus|compare/.test(slug);

// Competitor phone numbers must never be published.
const FOREIGN_PHONES = ['7303133245', '9115550011'];

// Editorial floors. Hard errors are "must fix before shipping"; warnings are the
// quality target. Measured Sep-2026 baseline: the thinnest pages were 362-624
// words in total, so the gate sits at a level those pages fail.
const MIN_BODY_WORDS = 350;    // article body text, excluding FAQs
const MIN_TOTAL_WORDS = 700;   // body + FAQs (what a reader actually sees)
const TARGET_BODY_WORDS = 700; // below this → warning
const MIN_H2 = 3;
const MIN_FAQS = 4;
const DUPLICATE_LIMIT = 0.2;   // shared 6-grams, area names masked → hard error
const DUPLICATE_WARN = 0.12;   // → warning
// ── Helpers ───────────────────────────────────────────────────────────────────

const textOf = (a) => {
  const faqText = [];
  for (const f of a.faqs || []) faqText.push(`${f.q} ${f.a}`);
  const body = [];
  for (const b of a.blocks || []) {
    if (b.x) body.push(b.x);
    if (b.items) body.push(...b.items);
    if (b.head) body.push(...b.head);
    if (b.rows) body.push(...b.rows.flat());
  }
  return {
    faqText,
    body,
    all: [a.title, a.description, a.lead || '', ...body, ...faqText].join(' '),
  };
};

// Area names are masked so that two pages about different localities which only
// differ by the place name are correctly reported as duplicates.
const AREAS = [
  'Sushant Lok 1', 'Sushant Lok 2', 'Sushant Lok 3', 'Sushant Lok',
  'DLF City Phase 4', 'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5',
  'Sector 65', 'Sector 66', 'Sector 67',
  'Sohna Road', 'Golf Course Road', 'Udyog Vihar', 'Gurugram', 'Gurgaon',
];

const normalise = (t) => {
  let s = String(t);
  for (const a of AREAS) s = s.split(a).join(' AREA ');
  return s
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, ' ')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\b\d+\b/g, 'N')
    .replace(/\s+/g, ' ')
    .trim();
};

const shingles = (t, n = 6) => {
  const w = normalise(t).split(' ').filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(' '));
  return set;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
};

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

const CONCRETE = /\u20b9|\d+\s*(mg\/L|mins?|hrs?|hours?|sq ?ft)|Sector|Phase \d|DLF|Sushant|Sohna|Golf Course|Udyog|Palam Vihar|Vatika|Palam|Manesar/i;

const IMG_LIMIT = 12; // same hero image allowed on at most N articles

// ── Per-article checks ────────────────────────────────────────────────────────

const errors = [];
const warnings = [];

for (const a of ARTICLES) {
  const t = textOf(a);
  const where = `blog/${a.slug}.html`;

  for (const [re, label] of BANNED) {
    const m = t.all.match(re);
    if (m) errors.push(`${where} — ${label}: "${m[0]}"`);
  }

  if (!isComparatorPage(a.slug)) {
    for (const brand of COMPETITOR_BRANDS) {
      if (t.all.includes(brand)) {
        errors.push(`${where} — names competitor "${brand}" on a non-comparison page`);
      }
    }
  }

  for (const phone of FOREIGN_PHONES) {
    if (t.all.includes(phone)) errors.push(`${where} — publishes foreign phone number ${phone}`);
  }

  // Thin content: words and heading structure.
  const bodyWords = words(t.body.join(' '));
  const faqWords = words(t.faqText.join(' '));
  const totalWords = bodyWords + faqWords;
  if (bodyWords < MIN_BODY_WORDS) {
    errors.push(`${where} — thin body: ${bodyWords} words (min ${MIN_BODY_WORDS})`);
  } else if (bodyWords < TARGET_BODY_WORDS) {
    warnings.push(`${where} — short body: ${bodyWords} words (target ${TARGET_BODY_WORDS})`);
  }
  if (totalWords < MIN_TOTAL_WORDS) {
    errors.push(`${where} — thin page: ${totalWords} words total (min ${MIN_TOTAL_WORDS})`);
  }
  const h2 = (a.blocks || []).filter((b) => b.t === 'h2').length;
  if (h2 < MIN_H2) errors.push(`${where} — only ${h2} <h2> section(s) (min ${MIN_H2})`);

  // FAQs must carry at least one concrete detail and must not all be one angle.
  const faqs = a.faqs || [];
  if (faqs.length < MIN_FAQS) warnings.push(`${where} — only ${faqs.length} FAQ(s)`);
  if (faqs.length && !faqs.some((f) => CONCRETE.test(`${f.q} ${f.a}`))) {
    errors.push(`${where} — no FAQ contains a concrete local/price detail`);
  }
  const priceAngle = faqs.filter((f) => /^(what is|how much).*(price|cost)/i.test(f.q.trim())).length;
  if (faqs.length >= 5 && priceAngle / faqs.length > 0.6) {
    warnings.push(`${where} — ${priceAngle}/${faqs.length} FAQs share the "what is the price" angle`);
  }

  // A "Updated" stamp identical to the publish date is not a real update signal.
  if (a.datePublished === a.dateModified) {
    warnings.push(`${where} — dateModified equals datePublished (no genuine update signal)`);
  }
  // Schema validity: dateModified must never precede datePublished (2026-09-20 audit: 47 inverted).
  if (a.dateModified < a.datePublished) {
    errors.push(`${where} — dateModified ${a.dateModified} precedes datePublished ${a.datePublished}`);
  }
  // Templating bug guard (2026-09-20 audit): the last content section must not
  // repeat the previous H2 verbatim — 63 articles shipped a duplicated tail.
  const h2texts = (a.blocks || []).filter((b) => b.t === 'h2').map((b) => String(b.x).trim().toLowerCase());
  if (h2texts.length >= 2 && h2texts[h2texts.length - 1] === h2texts[h2texts.length - 2]) {
    errors.push(`${where} — trailing duplicate <h2> section: "${h2texts[h2texts.length - 1].slice(0, 60)}"`);
  }
  if (a.image2 && !a.image2Alt) {
    errors.push(`${where} — image2 without image2Alt`);
  }
}

// ── Cross-article duplication ─────────────────────────────────────────────────

const shingleSets = new Map();
for (const a of ARTICLES) shingleSets.set(a.slug, shingles(textOf(a).body.join(' ')));

const pairs = [];
for (let i = 0; i < ARTICLES.length; i++) {
  for (let j = i + 1; j < ARTICLES.length; j++) {
    const s1 = ARTICLES[i].slug;
    const s2 = ARTICLES[j].slug;
    const sim = jaccard(shingleSets.get(s1), shingleSets.get(s2));
    if (sim >= DUPLICATE_WARN) pairs.push([sim, s1, s2]);
  }
}
pairs.sort((x, y) => y[0] - x[0]);

for (const [sim, s1, s2] of pairs) {
  const pct = (sim * 100).toFixed(1);
  const msg = `near-duplicate (${pct}% shared 6-grams, areas masked): blog/${s1}.html <-> blog/${s2}.html`;
  if (sim >= DUPLICATE_LIMIT) errors.push(msg);
  else warnings.push(msg);
}

// Hero image reuse.
const imgCount = new Map();
for (const a of ARTICLES) imgCount.set(a.image, (imgCount.get(a.image) || 0) + 1);
for (const [img, n] of [...imgCount.entries()].sort((a, b) => b[1] - a[1])) {
  if (n > IMG_LIMIT) warnings.push(`hero image reused by ${n} articles: ${img}`);
}

// Image asset integrity (2026-09-20 seo-images audit): every rendered hero
// needs measured dims (no 1200x675 fiction) and real 400w/800w variants,
// otherwise srcset descriptors lie and browsers fetch wrong resources.
const usedImages = new Set(ARTICLES.map((a) => a.image));
for (const p of pages) {
  if (p.page === 'service') {
    try {
      const svc = getService(p.serviceKey, p.bhk);
      if (svc && svc.image) usedImages.add(svc.image);
    } catch {}
  }
}
for (const img of [...usedImages].sort()) {
  if (!IMAGE_DIMS[img]) {
    errors.push(`image ${img} missing from src/lib/image-dims.js (dims + srcset fall back to fiction)`);
    continue;
  }
  for (const v of [`${img.replace(/\.(jpg|webp)$/, '-400w.webp')}`, `${img.replace(/\.(jpg|webp)$/, '-800w.webp')}`]) {
    if (!existsSync(new URL(`../public${v}`, import.meta.url))) {
      errors.push(`missing responsive variant public${v} (referenced by srcset for ${img})`);
    }
  }
}

// ── Metadata checks (pages.config.mjs = the real <title>/<meta description>) ──

const articlePages = pages.filter((p) => p.page === 'article');
for (const p of articlePages) {
  const m = `${p.title} ${p.description}`;
  for (const [re, label] of BANNED) {
    const hit = m.match(re);
    if (hit) errors.push(`pages.config.mjs ${p.file} — ${label}: "${hit[0]}"`);
  }
  for (const brand of COMPETITOR_BRANDS) {
    if (m.includes(brand) && !isComparatorPage(p.file)) {
      errors.push(`pages.config.mjs ${p.file} — names competitor "${brand}" in metadata`);
    }
  }
}

const emDashTitles = articlePages.filter((p) => /\u2014/.test(p.title)).length;
if (articlePages.length && emDashTitles / articlePages.length > 0.85) {
  warnings.push(`${emDashTitles}/${articlePages.length} article titles use the same "X — Y" formula`);
}
const datedDesc = articlePages.filter((p) =>
  /Updated (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20\d\d\.?$/.test(p.description)
).length;
if (articlePages.length && datedDesc / articlePages.length > 0.6) {
  warnings.push(`${datedDesc}/${articlePages.length} meta descriptions end with the same date stamp`);
}

// ── Report ────────────────────────────────────────────────────────────────────

const show = (list, head) => {
  if (!list.length) return;
  console.log(`\n${head} (${list.length})`);
  const limit = VERBOSE ? list.length : 25;
  for (const l of list.slice(0, limit)) console.log(`  ${l}`);
  if (list.length > limit) console.log(`  … ${list.length - limit} more (run with --verbose)`);
};

console.log(`content-lint: ${ARTICLES.length} articles, ${articlePages.length} article pages`);
show(errors, 'ERRORS');
show(warnings, 'WARNINGS');

if (VERBOSE && pairs.length) {
  console.log('\nmost-similar article pairs:');
  for (const [sim, s1, s2] of pairs.slice(0, 15)) {
    console.log(`  ${(sim * 100).toFixed(1)}%  ${s1} <-> ${s2}`);
  }
}

if (errors.length) {
  console.log(`\ncontent-lint FAILED — ${errors.length} error(s).`);
  process.exit(1);
}
if (STRICT && warnings.length) {
  console.log(`\ncontent-lint FAILED (--strict) — ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`\ncontent-lint passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
