import { GTM_ID, WHATSAPP_NUMBER, waMsg, AREAS } from './site.js';

// ---- Analytics: single gtag wrapper that no-ops safely ----
export function gtag(...args) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
    if (typeof window.gtag === 'function') window.gtag(...args);
  } catch (_) { /* no-op */ }
}

export function track(event, params = {}) {
  gtag('event', event, params);
}

// Phone click → GA4 "phone_call_click" event (matches GTM trigger).
export function phoneCallClick() {
  track('phone_call_click', {
    phone_number: '+91 9267905943',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

// WhatsApp click → GA4 "whatsapp_click" event (matches GTM trigger).
export function whatsappClick() {
  track('whatsapp_click', {
    phone_number: '+919267905943',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export const ANALYTICS = { GTM_ID };

// ---- WhatsApp nudge ----
export function waNudgeLink(name, phone) {
  return waMsg(
    `Hi! 👋 My name is ${name} (+91${phone}). I just submitted a quote on your website. Please share pricing for deep cleaning. Thanks!`
  );
}

// ---- Landing content data (from deep-cleaning2.html) ----

export const SERVICES = [
  {
    icon: '🏠',
    name: 'Full Home Deep Cleaning',
    desc: 'Expert cleaning of every room, every corner. Bedrooms, living area, kitchen, bathrooms, halls, floors, walls, windows & more.',
    price: 'Starting ₹2,000',
  },
];

export const CHECKLIST = [
  ['Bedrooms', 'Dusting, vacuuming, bed cleaning, wardrobe organization, wall & floor cleaning'],
  ['Kitchen', 'Chimney cleaning, stove deep clean, cabinet interior, tiles, exhaust fan, floor grease removal'],
  ['Bathrooms', 'Tiles, grout cleaning, toilet sanitization, mirror polish, exhaust fan, anti-bacterial treatment'],
  ['Living Areas', 'Sofa cleaning, carpet shampooing, window washing, wall wiping, floor polishing'],
  ['Hallways & Passages', 'Thorough sweeping, mopping, wall cleaning, corner dust removal'],
  ['Final Inspection', "100% satisfaction check. Pay only when you're completely happy with the work"],
];

export const HOW_IT_WORKS = [
  ['1', 'Choose your service', 'Pick from 8 deep cleaning services — full home, kitchen, bathroom, sofa, carpet and more.'],
  ['2', 'Confirm your slot', 'Share your name, number and preferred date. Price is locked in before booking is confirmed.'],
  ['3', 'Get a verified pro', 'Matched with a police-verified, skill-assessed professional near you.'],
  ['4', "Pay after service", 'UPI, cards or wallets — pay only after the job is complete to your satisfaction.'],
];

export const REVIEWS = [
  ['PM', 'Priya Mehta', 'DLF Phase 3, Gurgaon', "Called them at 9 AM for same-day service. They arrived by 1 PM sharp and the house looked brand new. Kitchen deep clean was absolutely incredible — grease I thought was permanent is completely gone!"],
  ['AK', 'Amit Kumar', 'Sector 45, Gurgaon', "Outstanding service! The team was professional, punctual and thorough. They cleaned every corner I didn't even know existed. The 'pay after cleaning' policy gave me complete peace of mind."],
  ['SG', 'Shivani Gupta', 'Golf Course Road, Gurgaon', 'Booked for post-renovation cleaning. The amount of dust and debris they removed was mind-blowing. House was move-in ready in 4 hours. Highly recommend for anyone who wants genuine deep cleaning.'],
  ['RG', 'Rohit Gupta', 'Sohna Road, Gurgaon', "Best value for money I've found in Gurgaon. Transparent pricing, no hidden charges. The sofa shampoo service made my 3-year-old sofas look new. Will definitely book again every quarter."],
  ['NT', 'Neha Trivedi', 'Palam Vihar, Gurgaon', "5-star experience from start to finish. The team called before arriving, worked efficiently, and asked for feedback after each room. Customer service is genuinely the best I've seen in this category."],
  ['VS', 'Vikram Sharma', 'MG Road, Gurgaon', "We've tried 3 other cleaning services before. None come close to Aone Deep Cleaning. Professional, uses quality products, and the bathroom tiles look like they did when we first moved in. Just brilliant."],
];

export const WHY_US = [
  ['👮', 'Police-Verified Team', 'Every cleaner is background-checked, ID-verified and professionally trained before entering your home.'],
  ['💰', 'Pay After Cleaning Only', 'Zero advance. You inspect the results and pay only when completely satisfied. No risk whatsoever.'],
  ['⚡', 'Same-Day Service', 'Book before noon and get same-day service. Emergency bookings also available at no extra cost.'],
  ['🌿', 'Safe Eco-Friendly Products', 'ISO-certified, non-toxic cleaning agents. Safe for children, elderly, and pets. No harsh chemical smell.'],
  ['🔄', 'Free Re-Clean Guarantee', "If any area doesn't meet your expectations, we come back within 24 hours and re-clean it absolutely free."],
  ['📋', 'Transparent Pricing', 'Quoted upfront on call. What we say is what you pay. No hidden charges, no surprise additions.'],
];

export const PRICING = [
  {
    size: '1 BHK Deep Clean',
    price: '2,500',
    items: ['Kitchen + 1 Bathroom', 'All rooms & living area', 'Fans, switches & doors', 'Floor mopping', '~5-6 hours · 3 cleaners'],
    pop: false,
  },
  {
    size: '2 BHK Deep Clean',
    price: '4,500',
    items: ['Kitchen + 2 Bathrooms', 'All rooms & living areas', 'Balcony cleaning', 'Fans, switches & doors', '~7-8 hours · 4 cleaners'],
    pop: true,
  },
  {
    size: '3 BHK Deep Clean',
    price: '5,500',
    items: ['Kitchen + 2-3 Bathrooms', 'All rooms, study & balcony', 'Sofa vacuum included', 'Fans, switches & doors', '~9-10 hours · 5 cleaners'],
    pop: false,
  },
];

export const FAQS = [
  ['How long does a full home deep clean take?', 'Typically 5–10 hours depending on home size. 1BHK: ~5-6 hrs, 2BHK: ~7-8 hrs, 3BHK: ~9-10 hrs. We\u2019ll give you an accurate estimate on the confirmation call.'],
  ['Do I need to arrange equipment or cleaning supplies?', 'No — we bring everything. Professional machines, high-grade tools, and eco-friendly cleaning products are all included in the price. You don\u2019t need to arrange anything.'],
  ['Do I really pay only after the cleaning?', 'Absolutely. We confirm the booking on call, arrive at your scheduled time, complete the cleaning, and you pay only after inspecting the results to your satisfaction. Zero advance payment — ever.'],
  ['Can I book same-day service?', 'Yes! We offer same-day service based on slot availability. Call or fill the form now and we\u2019ll confirm a same-day slot if available. Book before noon for best availability.'],
  ['Is the cleaning team background-verified?', 'Yes. Every member of our team is police-verified, identity-checked, and professionally trained. We take your home\u2019s security as seriously as the quality of cleaning.'],
  ["What if I'm not happy with the cleaning?", "You're protected by our 100% satisfaction guarantee. If any area isn't up to your expectation, inform us within 24 hours — we'll send the team back to re-clean it for free. Simple as that."],
];

export const AREAS_SERVED = AREAS;

export const SOCIAL_PROOF_BOOKINGS = [
  ['P', 'Priya M.', 'Booked full home deep clean', 'DLF Phase 3'],
  ['A', 'Amit K.', 'Booked kitchen deep clean', 'Sector 45'],
  ['S', 'Sunita A.', 'Booked post-renovation clean', 'Golf Course Rd'],
  ['R', 'Rohit G.', 'Booked sofa & carpet clean', 'Sohna Road'],
  ['N', 'Neha T.', 'Booked 2BHK deep clean', 'Palam Vihar'],
  ['V', 'Vikram S.', 'Booked 3BHK deep clean', 'MG Road'],
  ['D', 'Deepa R.', 'Booked bathroom deep clean', 'Sector 56'],
];

export const TIME_AGO = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '18 minutes ago', '24 minutes ago'];

// Hourly scarcity map (from template). Deterministic fake scarcity.
export function slotsLeft() {
  const h = new Date().getHours();
  const slotMap = [8, 7, 6, 5, 7, 6, 5, 4, 6, 5, 4, 3, 5, 4, 3, 5, 6, 7, 5, 4, 6, 7, 6, 7];
  return slotMap[h] || 5;
}

export function randomCallbackTime() {
  const times = ['under 3 min', '2 min 45 sec', '3 min 10 sec', 'under 5 min', '3 min 30 sec'];
  return times[Math.floor(Math.random() * times.length)];
}

export { WHATSAPP_NUMBER };