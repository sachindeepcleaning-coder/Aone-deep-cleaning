// Central site + analytics config for Aone Deep Cleaning.
// Single source of truth shared across all React components.

export const SITE_URL = 'https://balajicleaningservice.shop';
export const SITE_NAME = 'Aone Deep Cleaning';

// Canonical URL for a page. The homepage is served from the root path.
export function pageUrl(file = 'index') {
  return file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${file}.html`;
}

// Depth-aware URLs: the same build serves a custom domain (site root) and
// the GitHub Pages project subpath, and pages live at root and under blog/.
// Prefix every site-relative asset/link with the current page's depth so
// both contexts resolve. `file` comes from App (SSR and client agree).
export function relBase(file) {
  return file && file.includes('/') ? '..' : '.';
}
export function asset(file, p) {
  if (!p || !p.startsWith('/')) return p;
  return relBase(file) + p;
}
export function pageLink(file, href) {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return href;
  return relBase(file) + href;
}

export const PHONE = '+91 92679-05943';
export const PHONE_TEL = 'tel:+919267905943';
export const WHATSAPP_NUMBER = '919267905943';
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;

// Pre-filled WhatsApp links for the template CTAs.
export const WA_BOOK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi I want to book deep cleaning service in Gurgaon.')}`;
export function waMsg(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Analytics — Google Tag Manager only (GA4 removed; old project had GTM only).
export const GTM_ID = 'GTM-WK78FVFS';

// Microsoft Clarity (Aone project) — heatmaps + session recordings.
export const CLARITY_ID = 'ys36vx3fo7';

// Netlify Forms handles lead capture (works when deployed to Netlify).
export const NETLIFY_FORM_NAME = 'lead-quote';

// Core business claims (from the high-converting landing page).
// Legacy Formspree (kept for older pages accepting leads until migrated).
export const FORMSPREE_ID = 'mjyknzgy';

export const STARTING_PRICE = '₹2,000';
export const PHONE_HREF = PHONE_TEL;
export const ADDRESS = 'Serving all areas of Gurgaon, Haryana';
export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61577737535478',
  instagram: 'https://www.instagram.com/cleaning_service_in_gurgaon',
  youtube: 'https://www.youtube.com/@Cleaning_service_in_Gurgaon',
  twitter: 'https://x.com/sachindeepclean',
  whatsapp: WHATSAPP,
};

export const AREAS = [
  'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Cyber City', 'MG Road',
  'Palam Vihar', 'Sector 14 - 57', 'Vatika City', 'South City',
  'Nirvana Country', 'Ardee City', 'New Colony', 'Huda Sectors', 'Manesar',
];