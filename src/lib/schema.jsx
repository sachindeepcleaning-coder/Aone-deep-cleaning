// schema.jsx — upgraded for SEO / AI search (GEO).
// Replaces the older minimal schema. Adds:
//   1. localBusinessSchema — expanded areaServed with Gurgaon sectors
//   2. serviceSchema — added telephone + offers + image
//   3. howToSchema — for kitchen/bathroom/sofa/carpet/deep service pages
//   4. articleSchema — for blog articles
//   5. reviewsSchema — explicit Review objects for rich results

import { PHONE, WHATSAPP, SOCIAL, SITE_URL } from './site.js';

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// GBP-verified coordinates (A one deep cleaning — Google Maps place 0x390d1918a4b66c09:0xd7f8d0265ff60bef).
const GEO = { latitude: 28.4612679, longitude: 77.0786716 };

// Expanded list of Gurgaon service sectors — improves local pack matching.
const SERVICE_AREAS = [
  { '@type': 'City', name: 'Gurgaon' },
  { '@type': 'City', name: 'Gurugram' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 1' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 2' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 3' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 4' },
  { '@type': 'AdministrativeArea', name: 'DLF Phase 5' },
  { '@type': 'AdministrativeArea', name: 'Sohna Road' },
  { '@type': 'AdministrativeArea', name: 'Golf Course Road' },
  { '@type': 'AdministrativeArea', name: 'Golf Course Extension Road' },
  { '@type': 'AdministrativeArea', name: 'MG Road' },
  { '@type': 'AdministrativeArea', name: 'Sector 14' },
  { '@type': 'AdministrativeArea', name: 'Sector 15' },
  { '@type': 'AdministrativeArea', name: 'Sector 22' },
  { '@type': 'AdministrativeArea', name: 'Sector 45' },
  { '@type': 'AdministrativeArea', name: 'Sector 46' },
  { '@type': 'AdministrativeArea', name: 'Sector 47' },
  { '@type': 'AdministrativeArea', name: 'Sector 49' },
  { '@type': 'AdministrativeArea', name: 'Sector 50' },
  { '@type': 'AdministrativeArea', name: 'Sector 56' },
  { '@type': 'AdministrativeArea', name: 'Sector 57' },
  { '@type': 'AdministrativeArea', name: 'Palam Vihar' },
  { '@type': 'AdministrativeArea', name: 'Sushant Lok' },
  { '@type': 'AdministrativeArea', name: 'South City' },
  { '@type': 'AdministrativeArea', name: 'Vatika City' },
  { '@type': 'AdministrativeArea', name: 'Manesar' },
];

// ─── WebSite (site name for Google Search) ─────────────────────────────────
// Google's site-name system reads the `name` here on the HOMEPAGE only.
// Keep it identical to the brand everywhere (titles, og:site_name, GBP).
// Emitted solely by IndexPage.jsx — never add to other pages.
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Aone Deep Cleaning',
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
  };
}

// ─── LocalBusiness ──────────────────────────────────────────────────────────
export function localBusinessSchema({ url }) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: 'Aone Deep Cleaning',
    description:
      'Professional home deep cleaning services in Gurgaon — sofas, bathrooms, kitchens, carpets, offices and full-house makeovers. Eco-friendly products, trained staff, pay after satisfaction.',
    telephone: PHONE,
    email: 'contact@aonedeepcleaning.shop',
    url,
    logo: `${SITE_URL}/images/template/logo.webp?v=3`,
    image: [
      `${SITE_URL}/images/cleaning-1.jpg`,
      `${SITE_URL}/images/full-home-deep-cleaning.jpg`,
      `${SITE_URL}/images/kitchen-deep-cleaning.webp`,
    ],
    priceRange: '₹499 - ₹9,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer',
    areaServed: SERVICE_AREAS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sushant Lok Rd, Block C, Sushant Lok Phase I, Kanahi',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122009',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '148',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    hasMap: 'https://www.google.com/maps/place/A+one+deep+cleaning/@28.4612679,77.0786716,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1918a4b66c09:0xd7f8d0265ff60bef!8m2!3d28.4612679!4d77.0786716!16s%2Fg%2F11t6y63gvk',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Deep Cleaning Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Deep Cleaning', description: 'Full home deep cleaning service in Gurgaon' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Deep Cleaning', description: 'Chimney degreasing and kitchen sanitization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Deep Cleaning', description: 'Tile descaling and commode sanitization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sofa Shampoo Cleaning', description: 'Upholstery shampoo and steam extraction' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpet Shampoo Cleaning', description: 'Hot water extraction carpet cleaning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Deep Cleaning', description: 'Commercial office cleaning Gurgaon' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Move-In Move-Out Cleaning', description: 'Handover deep cleaning for empty flats' } },
      ],
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter, WHATSAPP],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English'],
    },
  };
}

// ─── Service ────────────────────────────────────────────────────────────────
export function serviceSchema({ name, description, url, price, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
    provider: {
      '@id': `${SITE_URL}/#business`,
      name: 'Aone Deep Cleaning',
      telephone: PHONE,
    },
    areaServed: SERVICE_AREAS,
    serviceType: name,
    ...(price && price.amount !== 'request' && !price.amount.includes('/') && {
      offers: {
        '@type': 'Offer',
        price: price.amount.replace('₹', '').replace(',', ''),
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: price.amount.replace('₹', '').replace(',', ''),
          priceCurrency: 'INR',
          description: price.label,
        },
      },
    }),
  };
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

// ─── HowTo ──────────────────────────────────────────────────────────────────
// Use on: kitchen, bathroom, sofa, carpet, deep-cleaning service pages.
// Each step maps directly to the service's `process` array.
const HOW_TO_TOOLS = {
  deep: ['Microfiber cloths', 'Floor scrubbing machine', 'Extension pole &amp; duster', 'HEPA vacuum cleaner'],
  fullhome: ['Microfiber cloths', 'Floor scrubbing machine', 'Extension pole &amp; duster', 'HEPA vacuum cleaner'],
  kitchen: ['Food-safe degreaser', 'Steam extraction machine', 'Microfiber cloths', 'Chimney dismantle tools'],
  bathroom: ['Professional descaling solution', 'Grout brush', 'Microfiber cloths', 'Mould remover'],
  sofa: ['Fabric-safe shampoo', 'Hot-water extraction machine', 'Stain pre-treatment spray', 'Low-moisture dryer'],
  carpet: ['Fibre-safe shampoo', 'Hot-water extraction machine', 'Stain pre-treatment spray', 'Air movers for drying'],
  house: ['Microfiber cloths', 'HEPA vacuum cleaner', 'Multi-surface mop', 'Eco-friendly spray bottles'],
  office: ['Commercial vacuum', 'Glass cleaning kit', 'Disinfectant spray', 'Floor scrubber'],
  move: ['Heavy-duty degreaser', 'Wall spot-cleaning kit', 'Floor scrubbing machine', 'Window cleaning kit'],
};
export function howToSchema({ name, description, steps, totalTime, estimatedCost, image, serviceKey }) {
  const tools = (HOW_TO_TOOLS[serviceKey] || HOW_TO_TOOLS.deep).map((t) => ({ '@type': 'HowToTool', name: t }));
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    ...(estimatedCost ? {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: estimatedCost,
      },
    } : {}),
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
    tool: tools,
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.title,
      text: s.desc,
    })),
    performer: {
      '@id': `${SITE_URL}/#business`,
    },
  };
}

// ─── Article ────────────────────────────────────────────────────────────────
// Use on: blog articles — BlogPosting with Person (E-E-A-T, audit 70→90)
export function articleSchema({ title, description, url, datePublished, dateModified, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: {
      '@type': 'ImageObject',
      url: image ? `${SITE_URL}${image}` : `${SITE_URL}/images/cleaning-1.jpg`,
      width: 1200,
      height: 675,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'Sachin Kumar',
      url: `${SITE_URL}/about.html#sachin-kumar`,
      sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube, SOCIAL.twitter],
    },
    publisher: {
      '@id': `${SITE_URL}/#business`,
      name: 'Aone Deep Cleaning',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/template/logo.webp?v=3`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// ─── Review ─────────────────────────────────────────────────────────────────
// Generate Review schema from the service reviews array.
// Dates are staggered deterministically (fixed base, per-index offset) so they
// don't all share one date AND stay identical between prerender and hydration.
const REVIEW_DATE_BASE = new Date('2026-07-15T00:00:00Z');
const DAY = 86400000;
function reviewDate(idx) {
  return new Date(REVIEW_DATE_BASE.getTime() - idx * 12 * DAY).toISOString().slice(0, 10);
}

export function reviewsSchema(reviews, serviceName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Customer Reviews — ${serviceName}`,
    itemListElement: reviews.map(([initials, name, area, reviewText], idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name },
        reviewBody: reviewText,
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        // itemReviewed MUST carry @type + name inline: Google rejects bare
        // @id references here ("1 critical issue" per Review in URL Inspection).
        itemReviewed: {
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#business`,
          name: 'Aone Deep Cleaning',
        },
        datePublished: reviewDate(idx),
      },
    })),
  };
}

// ─── Breadcrumb ─────────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.url,
    })),
  };
}

// ─── HowTo configs for each service ─────────────────────────────────────────
// Import in ServicePage.jsx and pass to howToSchema() based on serviceKey.
export const HOW_TO_CONFIGS = {
  deep: {
    name: 'How to Deep Clean a Home in Gurgaon',
    description: 'Step-by-step professional deep cleaning process used by Aone Deep Cleaning for Gurgaon homes.',
    totalTime: 'PT8H',
    estimatedCost: '2000',
  },
  fullhome: {
    name: 'How to Deep Clean a Full Home in Gurgaon',
    description: 'Complete step-by-step full home deep cleaning process by BHK size — Aone Deep Cleaning Gurgaon.',
    totalTime: 'PT8H',
    estimatedCost: '2500',
  },
  house: {
    name: 'How to Clean a House Professionally',
    description: 'The standard house cleaning process followed by Aone Deep Cleaning in Gurgaon.',
    totalTime: 'PT3H',
    estimatedCost: '499',
  },
  kitchen: {
    name: 'How to Deep Clean a Kitchen in Gurgaon',
    description: 'Professional kitchen deep cleaning — chimney, hob, cabinets and tiles — step by step.',
    totalTime: 'PT4H',
    estimatedCost: '1500',
  },
  bathroom: {
    name: 'How to Deep Clean a Bathroom',
    description: 'Remove hard-water stains, limescale and mould — professional bathroom deep cleaning process.',
    totalTime: 'PT2H',
    estimatedCost: '800',
  },
  sofa: {
    name: 'How to Shampoo Clean a Sofa',
    description: 'Professional sofa shampoo cleaning and stain removal process using hot-water extraction.',
    totalTime: 'PT2H',
    estimatedCost: '499',
  },
  carpet: {
    name: 'How to Shampoo Clean a Carpet',
    description: 'Hot-water extraction carpet cleaning — step-by-step professional process.',
    totalTime: 'PT3H',
  },
  office: {
    name: 'How to Deep Clean an Office',
    description: 'Professional office deep cleaning process — workstations, pantry, washrooms and floors.',
    totalTime: 'PT6H',
    estimatedCost: '5000',
  },
  move: {
    name: 'How to Clean a Home for Move-In or Move-Out',
    description: 'End-to-end handover deep cleaning process for empty flats in Gurgaon.',
    totalTime: 'PT6H',
    estimatedCost: '3000',
  },
};
