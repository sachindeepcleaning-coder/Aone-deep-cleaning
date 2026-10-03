# Aone Deep Cleaning — Website

A modern, mobile-friendly marketing site for **Aone Deep Cleaning**, a home deep cleaning service in Gurgaon, Haryana. Built with **Vite + React 18 (MPA)**. Template-style look (sky-blue + lime, Poppins).

- **Live URL:** [https://balajicleaningservice.shop](https://balajicleaningservice.shop) (custom domain via CNAME)
- **Repo:** `sachindeepcleaning-coder/Balaji-Deep-Cleaning` (GitHub)
- **Hosting:** GitHub Pages (deploys from the **`gh-pages`** branch)
- **Branch sync rule:** **`main` and `gh-pages` MUST be kept in sync** — `gh-pages` is a snapshot of the latest `main` build, not a separate working branch. After every `main` push, redeploy to `gh-pages` (see below). The script in `scripts/sync-gh-pages.sh` automates the full sequence.

---

## 🚀 DEPLOY TO GITHUB PAGES — READ THIS FIRST

### How the site deploys (IMPORTANT)

- This is a **Vite + React 18 MPA**. Source code lives on the **`main`** branch.
- GitHub Pages is configured to serve from the **`gh-pages` branch** (built output), **NOT** `main`.
- **Pushing to `main` alone does NOT update the live site.** You must build and push the fresh `dist/` to `gh-pages`.
- **`main` and `gh-pages` must stay in sync.** Never commit source changes to `gh-pages`, never commit built artefacts to `main`. The script enforces this.
- There is **no GitHub Actions workflow**. Do not re-add one unless the token has `workflow` scope, and remember to switch the Pages source back to `workflow` in that case.
- The `gh-pages` branch contains only build output + deploy files (`CNAME`, `robots.txt`, `.nojekyll`, `dist/` contents).
- First-ever deploy: the script clones `gh-pages`, which fails on a fresh repo — create the branch once manually from `dist/` (`git init -b gh-pages` in a scratch dir, copy `dist/*`, `touch .nojekyll`, push). After that the script works normally.

### One-command deploy (recommended)

Use the bundled script — it runs `gen` → `build` → fresh-clone `gh-pages` → copy `dist` → restore `.nojekyll` → force-push to the real remote. Always run this from `main` and **only when `main` is the head you want live**.

```bash
./scripts/sync-gh-pages.sh
```

The script:

1. Verifies you are on `main` (refuses to deploy from any other branch).
2. Runs `npm run gen` (regenerates HTML entry shells if `pages.config.mjs` changed).
3. Runs `npm run build` (sitemap → vite build → prerender → `dist/`).
4. Clones the **remote** `gh-pages` branch fresh into `/tmp/opencode/ghp` (no stale local-branch reuse).
5. Wipes the clone, restores `.nojekyll`, copies `dist/*` over.
6. Commits and `git push --force origin gh-pages` (force is safe — `gh-pages` is a deploy branch).
7. Prints the new `gh-pages` HEAD commit so you can confirm what went live.

### Manual deploy (if the script is unavailable)

```bash
# 1. Build (regenerate entry shells first if pages.config.mjs changed)
git checkout main
git pull origin main
npm run gen
npm run build                     # = sitemap gen + vite build + prerender → dist/

# 2. Clone the REMOTE gh-pages branch into a scratch dir (no stale local branch)
rm -rf /tmp/opencode/ghp
git clone -b gh-pages --single-branch https://github.com/sachindeepcleaning-coder/Balaji-Deep-Cleaning.git /tmp/opencode/ghp

# 3. Replace contents with the fresh build
cd /tmp/opencode/ghp
rm -rf ./*
touch .nojekyll
cp -r "/home/vegeta/Music/website 3rd copy/dist/"* .

# 4. Restore deploy-only files that vite does NOT emit (.nojekyll only — CNAME & robots.txt are now in public/ and copied by vite)
git checkout origin/gh-pages -- .nojekyll

# 5. Commit + push to the REAL remote (clone's origin already points to GitHub, no fix needed)
git add -A
git config user.name "vegeta" && git config user.email "vegeta@localhost"   # if not inherited
git commit -m "Deploy fresh build"
git push --force origin gh-pages     # force push is fine: gh-pages is a deploy branch
```

### Gotchas

- **`main` and `gh-pages` desync = live regressions.** If you fix something in `main` and forget to run the script, live keeps showing the old build. Add a post-commit hook or CI reminder if you ship often.
- The local `gh-pages` branch may lag behind `origin/gh-pages`. Always clone fresh (the script does this) instead of reusing the local branch.
- If the push is rejected with "tip behind", you cloned from a stale local branch → `git push --force` after confirming the working tree has the full build (all `*.html`, `assets/`, `videos/`, `sitemap.xml`, `CNAME`, `robots.txt`, `.nojekyll`).
- Verify live: `curl -sI https://balajicleaningservice.shop/<page>.html` → expect `HTTP/2 200`. The new `Last-Modified` header should reflect the time of your deploy.
- If `git fetch` shows odd SHAs right after a push, re-run `git ls-remote origin` — local tracking refs can lag; `ls-remote` is truth.
- **Source-only push (no deploy):** `git add -A && git commit -m "message" && git push origin main`. This updates `main` only — the live site is unchanged until you also deploy to `gh-pages`.

### Sync verification

After every deploy, run:

```bash
git fetch origin gh-pages main --prune
git ls-remote origin   # truth: main + gh-pages SHAs
# gh-pages should always contain a built dist/ tree (not source).
```

---

## 🧱 Tech Stack & Structure

| File/Dir | Purpose |
|----------|---------|
| `pages.config.mjs` | Single source of truth for every MPA page (file, page type, title, description, `noindex`) |
| `scripts/gen-entries.mjs` | Generates HTML entry shells from `pages.config.mjs` (run `npm run gen` after editing it; also emits font preloads) |
| `scripts/gen-sitemap.mjs` | Regenerates `public/sitemap.xml` with fresh `lastmod` (runs automatically on `npm run build`; skips `noindex` pages) |
| `scripts/prerender.mjs` | Renders every page to static HTML with `ReactDOMServer` and injects it into `dist/` (SEO: Google/Bing see content + JSON-LD without JS) |
| `src/app.jsx` | Shared app tree (route-split via `React.lazy` + `Suspense`; passes `page` to `Layout` for chrome variants) |
| `src/prerender-entry.jsx` | SSR entry (`renderToPipeableStream`, required for lazy pages) for `scripts/prerender.mjs` |
| `src/bootstrap.jsx` | Hydrates the pre-rendered HTML (or renders normally in dev) based on `data-page` |
| `src/pages/*.jsx` | Page components (ServicePage, PpcPage, ResidentialPage, PartnersPage, BookingPage, ContactPage, ...) |
| `src/components/*.jsx` | Nav, Footer, Hero, QuoteForm, FaqSection, ReviewsSection, LocalReel, YtShortsSection, ... |
| `src/lib/services.js` | Service data (name, tagline, includes, process, faqs, price) |
| `src/lib/site.js` | Phone, WhatsApp, social links, URLs (SITE_URL, SITE_NAME, SOCIAL) |
| `src/lib/schema.jsx` | JSON-LD builders (localBusiness, service, faq, breadcrumb, reviews, how-to) |
| `scripts/submit-indexing.cjs` | Google Indexing API submitter (sitemap → skip submitted → publish; `--test`, `--limit N`, `--reset`, `--url <u>`) |
| `indexing-progress.json` | Submitted/failed URL state for the submitter (commit after each run) |
| `src/styles/tokens.css` | Design tokens (template palette: sky-blue `#00a8f0` + lime `#90c714`, Poppins) |
| `src/styles/global.css` | All component styles (template look; every `className` used in `src/` must be defined here) |
| `public/sitemap.xml` | SEO sitemap (auto-generated; never hand-edit — add pages via `pages.config.mjs`) |
| `public/robots.txt` | Crawler rules (must be restored in gh-pages deploy) |
| `public/CNAME` | Custom domain `balajicleaningservice.shop` (must be restored in gh-pages deploy) |
| `public/images/template/` | Template imagery (12MB: banners, service photos, logo) — same-domain only |
| `public/videos/` | Topic-named local clips (`sofa-1.mp4`, `kitchen-1.mp4`, …) + `cleaning-2.mp4` — verified-clean footage only (see 🎬 rule below) |
| `public/fonts/` | Self-hosted Poppins 400/600/700/800, preloaded — no Google Fonts requests |

## 🔧 Development

```bash
npm install
npm run dev        # local dev server http://localhost:5173
npm run build      # production build → dist/ (lint → sitemap → vite → prerender)
npm run gen        # regenerate HTML entry shells after editing pages.config.mjs
# preview a build locally:
python3 -m http.server 8322 --directory dist   # → http://localhost:8322/
```

## ⚙️ Config

- **Build:** `npm run build` (vite). No Tailwind, no Bootstrap, no jQuery — template look is hand-ported CSS.
- **Leads:** Netlify Forms (`lead-quote`) + `FORMSPREE_ID = 'moevgqwr'` fallback via `QuoteForm.jsx`; redirect to `thank-you.html`. Aone-only inbox — Sachin keeps the old `xdaqkbwa` endpoint on its own repo. Never swap these.
- **Tracking (Aone-only — never replace with Sachin's):** `GTM-WK78FVFS` via `src/lib/site.js`. Sachin keeps `GTM-P4KVBGRK` on its own repo. Do NOT bring in other GTM/GA/Ads IDs (the static template carried its own — intentionally left out). If any future change reintroduces `GTM-P4KVBGRK` or `xdaqkbwa` here, treat it as a brand-contamination bug and revert.
- **Videos:** `LocalReel.jsx` phone-style player (autoplay muted on scroll into view, tap to pause). YouTube Shorts render as click-to-play facades (nothing loads until tapped). No IG embeds anywhere.
- **Fonts:** self-hosted Poppins in `public/fonts`, preloaded in entry shells — no Google Fonts requests.
- **Media:** `public/images` (responsive `-400w`/`-800w` webp + `template/` folder) + `public/videos` (topic-named mp4s).

## 📊 Site State (2026-09-30)

- **110 entry shells** (`npm run gen`) → **110 prerendered pages** in `dist/`
- **Sitemap:** 106 URLs (excludes `thank-you`, `404`, and the 2 noindex PPC pages) · **Indexing API: reset for the new domain** (`indexing-progress.json` starts empty)
- **Blog:** 85 articles + booking landing page + society page · titles/descs/H1s unique
- **PPC pages (noindex, ads-only):** `book-deep-cleaning-services-in-gurgaon.html` + `book-house-deep-cleaning-services-in-gurgaon.html` — 40% OFF offer, exact-keyword H1s, hidden from search + sitemap so they never cannibalize SEO money pages
- **Performance:** route-split JS; videos `preload="none"` (nothing downloads until played)
- **Hydration rule:** SSR output must equal first client render — never mutate another component's DOM; keep effects out of render output.

## 📝 Content System (how pages get built)

- **Service pages** are data-driven: `src/lib/services.js` keyed by `serviceKey` (`deep/house/kitchen/bathroom/sofa/carpet/office/move/fullhome` + `bhk` 1–5), rendered by `ServicePage.jsx` with Service + FAQ + Reviews + Breadcrumb JSON-LD, pricing tables, before/after sliders (deep/fullhome), related guides + services.
- **Blog articles** live in `src/lib/blog.js` (`ARTICLES[]`: slug/file/title/description/dates/image/lead/faqs/cta/blocks). Block types: `p, lead, h2, h3, table{head,rows}, ul, ol, tip`; `**bold**` inline supported. Rendered by `BlogArticlePage.jsx` with Article + FAQ + Breadcrumb JSON-LD.
- **Custom pages** (`index/residential/partners/landing/ppc/about/blog/allpages/contact/thank-you/404`) are hand-built components with own schema; new page types need an `app.jsx` lazy mapping + `pages.config.mjs` entry (see `PpcPage.jsx` + `page:'ppc'` precedent — content keyed by `file` prop so no prop plumbing is needed).
- **PPC pages** (`page:'ppc'`, `noindex:true`): conversion-focused (urgency bar variant, exact-keyword hero + QuoteForm, countdown, strikethrough pricing, keyword FAQs). Never link them internally; never add to sitemap. Verify `tel:`/`wa.me` links after every change (all must be `+919267905943`).
- **Content bars (enforced):** titles <60 chars, descriptions 120–160, exactly 1 H1, primary keyword in title/H1/lead + body multiples, Hinglish FAQ on local-intent pages, CTA → money page, `since 2015` business history, prices from the live rate card only. 40% OFF strike-through MRPs must be prices genuinely quoted, or Ads may flag misleading pricing.
- **Comparison pages** (Mr/UC/NoBroker/Safaiwale/Best-office): verifiable public facts only, “Not publicly listed” where unknown, affiliation disclosed in lead + tip, figures dated (Sep 2026).
- **Internal linking:** `RelatedGuides.jsx` (serviceKey → guides), `RelatedServices.jsx` (service mesh), blog CTA footer (3 money links), footer keyword columns, `llms.txt` mirror for AI discovery.

## 🎬 Video Rules (mandatory — read before touching any footage)

- **Only verified-clean clips may ship.** Every clip added to `public/videos/` must be checked frame-by-frame (1fps timeline) for burned-in brands, phone numbers, watermarks, and competitor uniforms.
- **Known-tainted (NEVER re-add):** old `cleaning-1/3/4.mp4` ("A ONE" shirts, numbers `9267905943`/`9367905943`), and REEL-folder clips v08, v13, v32, v33, v38, v45, v46, v50 (B.B.TULE / metroclap / deepcleaningwala branding or wrong numbers).
- **Naming:** topic-based (`sofa-1.mp4`, `kitchen-1.mp4`, …) so service pages can map playlists by topic.
- **Player:** `LocalReel.jsx` (local-only, no external links — safe for PPC). YouTube Shorts = facades only, never autoplay embeds. No Instagram embeds anywhere.

## 🔍 SEO Operations

- **Keyword → page map:** `KEYWORD_TARGETING.md` (spend plan + coverage tables).
- **Audit log:** `SEO-AUDIT.md` (dated sections per change).
- **Backlinks:** `BACKLINKS.md` (NAP block, copy kit, tiered targets). Rule: never buy/automate links.
- **Indexing discipline:** `scripts/submit-indexing.cjs` ONLY for newly written or materially changed URLs (`--url …`); never mass `--reset` except after site-wide rebuilds (200/day project quota).
- **Pre-flight before every deploy:** `npm run build` must pass `content-lint`; internal links resolve; JSON-LD parses; noindex only on thank-you/404 + PPC pages; zero third-party fetch hosts in initial HTML (GTM + schema.org + sameAs socials excepted); Playwright console audit clean (repeat runs — hydration races are flaky).
- **Founder stays Sachin Kumar** (`about.html#sachin-kumar`, Person schema) while the brand is Aone Deep Cleaning. Socials stay on the original handles (`x.com/sachindeepclean`). Contact email follows the domain (`contact@balajicleaningservice.shop`).
- **Docs policy:** `.md` files are local-only (`*.md` gitignored) except `README.md`, which stays on GitHub. Secrets safety net in `.gitignore` (`*key.json`, `.env*`); the Indexing API key lives outside any git repo and is referenced by path only.

## 📞 Business Details

- **Company:** Aone Deep Cleaning
- **Phone / WhatsApp:** +91 9267905943
- **Location:** Gurgaon, Haryana
- **Facebook:** [Aone Deep Cleaning](https://www.facebook.com/profile.php?id=61577737535478)
- **Instagram:** [@cleaning_service_in_gurgaon](https://www.instagram.com/cleaning_service_in_gurgaon)
- **YouTube:** [@Cleaning_service_in_Gurgaon](https://www.youtube.com/@Cleaning_service_in_Gurgaon)
- **X:** [@sachindeepclean](https://x.com/sachindeepclean)
- **WhatsApp:** https://wa.me/919267905943

---

© Aone Deep Cleaning. All rights reserved.
