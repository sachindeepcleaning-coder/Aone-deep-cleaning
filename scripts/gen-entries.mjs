// Generates one minimal HTML entry shell per page in pages.config.mjs.
// Each shell carries SEO meta + a data-page / data-service attribute that
// src/bootstrap.jsx reads to mount the correct React component.
// Re-run with `npm run gen` after editing pages.config.mjs.
//
// SEO fixes (from the FINAL SEO package):
//   - lang="en-IN"
//   - <meta name="robots" noindex> when page.noindex === true
//   - og:image:alt / width / height
//   - hreflang alternates (en-IN / en)
//   - geo.region / geo.placename / geo.position / ICBM
//   - og:type="article" for blog articles
//   - hero-image preload on service pages
//   - supports nested paths (blog/... creates subdirectories)

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, SITE_URL, SITE_NAME, OG_IMAGE } from '../pages.config.mjs';
import { GTM_ID, NETLIFY_FORM_NAME, CLARITY_ID } from '../src/lib/site.js';
import { ARTICLES } from '../src/lib/blog.js';
import { getService } from '../src/lib/services.js';
import { imageDims } from '../src/lib/image-dims.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const gtm = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

const gtmNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

const clarity = `<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");
</script>
<!-- End Microsoft Clarity -->`;

// Netlify Forms: a real (static) form in the served HTML so the build
// auto-detects the lead form ("lead-quote"). Field values are copied to the
// hidden inputs before submission by src/components/QuoteForm.jsx.
const netlifyForm = `<form name="${NETLIFY_FORM_NAME}" method="POST" data-netlify="true" class="netlify-hidden" hidden aria-hidden="true">
  <input type="text" name="name" />
  <input type="tel" name="phone" />
</form>`;

// Hero image per service key for above-fold preload (LCP).
const HERO_IMAGES = {
  deep: '/images/full-home-deep-cleaning.webp',
  house: '/images/house-cleaning.webp',
  fullhome: '/images/full-home-deep-cleaning.webp',
  kitchen: '/images/kitchen-deep-cleaning.webp',
  bathroom: '/images/bathroom-deep-cleaning.webp',
  sofa: '/images/sofa-shampoo-cleaning.webp',
  carpet: '/images/carpet-shampoo-cleaning.webp',
  office: '/images/office-deep-cleaning.jpg',
  move: '/images/full-home-deep-cleaning.webp',
};

for (const p of pages) {
  const url = p.file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}.html`;
  const dataAttrs = `data-page="${p.page}" data-file="${p.file}"${p.serviceKey ? ` data-service="${p.serviceKey}"` : ''}${p.bhk ? ` data-bhk="${p.bhk}"` : ''}`;

  // Merge-stub pages: two near-identical URLs cannibalising one query resolve
  // here. GitHub Pages cannot send a real 301, so we emit a minimal
  // meta-refresh + canonical stub. Excluded from the sitemap by gen-sitemap.mjs.
  if (p.redirectTo) {
    const target = `${SITE_URL}/${p.redirectTo}.html`;
    const stub = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${target}" />
  <meta http-equiv="refresh" content="0; url=/${p.redirectTo}.html" />
  <title>${p.title}</title>
</head>
<body>
  <p>This page has moved to <a href="/${p.redirectTo}.html">${target}</a>.</p>
</body>
</html>
`;
    const stubPath = resolve(root, `${p.file}.html`);
    mkdirSync(dirname(stubPath), { recursive: true });
    writeFileSync(stubPath, stub);
    console.log('wrote (merge stub)', `${p.file}.html → ${p.redirectTo}.html`);
    continue;
  }

  const noindex = p.noindex ? '  <meta name="robots" content="noindex, nofollow" />\n' : '';
  const ogType = p.page === 'article' ? 'article' : 'website';
  const preload = p.page === 'service' && p.serviceKey && HERO_IMAGES[p.serviceKey]
    ? `  <link rel="preload" as="image" href="${HERO_IMAGES[p.serviceKey]}" fetchpriority="high" />\n`
    : '';
  // Page-specific OG image + alt + TRUE dimensions (2026-09-20 seo-images
  // audit: tags claimed 1200x630 for files as small as 390px — emit measured).
  let ogImage = OG_IMAGE;
  let ogAlt = 'Aone Deep Cleaning — professional deep cleaning services in Gurgaon';
  if (p.page === 'service' && HERO_IMAGES[p.serviceKey]) {
    ogImage = SITE_URL + HERO_IMAGES[p.serviceKey];
    try {
      const svc = getService(p.serviceKey, p.bhk);
      if (svc && svc.imageAlt) ogAlt = svc.imageAlt;
    } catch {}
  } else if (p.page === 'article') {
    const art = ARTICLES.find((a) => a.file === p.file);
    if (art && art.image) ogImage = SITE_URL + art.image;
    if (art && art.imageAlt) ogAlt = art.imageAlt;
  }
  // blog-seo-check Step 8: social cards need ≥1000px width — small heroes
  // (carpet 390px, sofa 500px…) fall back to the 1200x630 OG cover.
  let [ogW, ogH] = imageDims(ogImage.replace(SITE_URL, ''));
  if (ogW < 1000) {
    ogImage = OG_IMAGE;
    ogAlt = 'Aone Deep Cleaning — professional deep cleaning services in Gurgaon';
    [ogW, ogH] = imageDims(ogImage.replace(SITE_URL, ''));
  }

  const html = `<!DOCTYPE html>
<html lang="en-IN" data-theme="light" ${dataAttrs}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a1628" />
  <link rel="icon" type="image/x-icon" href="${SITE_URL}/favicon.ico?v=3" />
  <link rel="icon" type="image/png" sizes="32x32" href="${SITE_URL}/favicon-32x32.png?v=3" />
  <link rel="apple-touch-icon" sizes="180x180" href="${SITE_URL}/apple-touch-icon.png?v=3" />
  <title>${p.title}</title>
  <meta name="description" content="${p.description}" />
${noindex}  <meta name="geo.region" content="IN-HR" />
  <meta name="geo.placename" content="Gurgaon" />
  <meta name="geo.position" content="28.4595;77.0266" />
  <meta name="ICBM" content="28.4595, 77.0266" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <link rel="alternate" hreflang="en-IN" href="${url}" />
  <link rel="alternate" hreflang="en" href="${url}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:alt" content="${ogAlt}" />
  <meta property="og:image:width" content="${ogW}" />
  <meta property="og:image:height" content="${ogH}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.description}" />
  <meta name="twitter:image" content="${ogImage}" />
${preload}  ${gtm}
  ${clarity}
  <link rel="preload" as="font" type="font/woff2" crossorigin href="${p.file.includes('/') ? '..' : '.'}/fonts/poppins-400.woff2" />
  <link rel="preload" as="font" type="font/woff2" crossorigin href="${p.file.includes('/') ? '..' : '.'}/fonts/poppins-700.woff2" />
  <link rel="stylesheet" href="/src/styles/global.css" />
</head>
<body>
  ${gtmNoscript}
  <div id="root"></div>
  ${netlifyForm}
  <script type="module" src="/src/bootstrap.jsx"></script>
</body>
</html>
`;
  const outPath = resolve(root, `${p.file}.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log('wrote', `${p.file}.html`);
}
console.log(`\nGenerated ${pages.length} HTML entry shells.`);
