// Single source of truth for all pages (MPA entries).
// `page` tells src/bootstrap.jsx which React component to mount.
// `serviceKey` (for page === 'service') maps to content in src/lib/services.js.
// `noindex` pages get <meta name="robots" content="noindex, nofollow">.
//
// Based on the FINAL SEO package (pages-config-updates.mjs) with the fixes:
//   1. INDEX title differentiated from the deep-cleaning page (was identical)
//   2. Titles under 60 characters, descriptions enriched with prices
//   3. Blog article entries + a blog index page
//   4. thank-you flagged noindex

export const SITE_URL = 'https://aonedeepcleaning.shop';
export const SITE_NAME = 'Aone Deep Cleaning';
export const OG_IMAGE = 'https://aonedeepcleaning.shop/images/og-cover.jpg';

export const pages = [
  {
    file: 'index', page: 'index',
    title: 'Full Home Deep Cleaning Gurgaon | From ₹2,500',
    description: 'Trusted deep cleaning in Gurgaon since 2015. Full-home from ₹2,500, kitchen, bathroom, sofa & carpet. Pay after satisfaction. Book on WhatsApp: +91 9267905943.',
  },
  {
    file: 'contact', page: 'contact',
    title: 'Book a Deep Clean in Gurgaon | Aone Deep Cleaning',
    description: 'Get a free quote for home deep cleaning in Gurgaon. Call or WhatsApp +91 9267905943. All sectors served. Same-day slots available.',
  },
  {
    file: 'thank-you', page: 'thank-you',
    title: 'Booking Confirmed — Aone Deep Cleaning',
    description: 'Thank you for booking Aone Deep Cleaning in Gurgaon. We will call you back within 30 minutes to confirm your slot and fixed price.',
    noindex: true,
  },
  {
    file: '404', page: 'notfound',
    title: 'Page Not Found — Aone Deep Cleaning Gurgaon',
    description: 'This page moved or never existed. Find deep cleaning services in Gurgaon — fixed prices, same-day slots, pay after satisfaction.',
    noindex: true,
  },
  {
    file: 'about', page: 'about',
    title: 'About Aone Deep Cleaning | Trusted Team in Gurgaon',
    description: 'Meet the police-verified deep cleaning team in Gurgaon since 2015. Eco-friendly, pay after satisfaction, same-day across DLF & Sohna Road.',
  },

  // ── Service pages ─────────────────────────────────────────────────────────
  {
    file: 'deep-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'deep',
    title: 'Deep Cleaning Services in Gurgaon — Prices & Process',
    description: 'Top-to-bottom deep cleaning in Gurgaon from ₹2,000. Floors, walls, fixtures & furniture. Trained team, eco-friendly products. Book via WhatsApp.',
  },
  {
    file: 'house-cleaning-services-in-gurgaon', page: 'service', serviceKey: 'house',
    title: 'House Cleaning Services in Gurgaon | From ₹499',
    description: 'Regular & one-time house cleaning in Gurgaon from ₹499. Weekly, bi-weekly or monthly plans. Police-verified team, eco-friendly products. Book now.',
  },
  {
    file: 'full-home-deep-cleaning-1bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 1,
    title: '1 BHK Deep Cleaning Gurgaon | Aone Deep Cleaning',
    description: '1 BHK full home deep cleaning in Gurgaon. Every room floor to ceiling — kitchen, bathroom, bedroom. Transparent pricing. Book on WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-2bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 2,
    title: '2 BHK Deep Cleaning Gurgaon | Price & Booking',
    description: '2 BHK full home deep cleaning in Gurgaon. Both bedrooms, kitchen, 2 bathrooms & living area. Trained cleaners, eco-friendly. Book via WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-3bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 3,
    title: '3 BHK Deep Cleaning Gurgaon | Aone Deep Cleaning',
    description: '3 BHK full home deep cleaning in Gurgaon. Thorough, room-by-room service. Eco-friendly products, pay after satisfaction. Get a free quote today.',
  },
  {
    file: 'full-home-deep-cleaning-4bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 4,
    title: '4 BHK Deep Cleaning Gurgaon | Aone Deep Cleaning',
    description: '4 BHK full home deep cleaning in Gurgaon. Large homes, spotless results. Full team deployed, satisfaction guaranteed. Book on WhatsApp.',
  },
  {
    file: 'full-home-deep-cleaning-5bhk-gurgaon', page: 'service', serviceKey: 'fullhome', bhk: 5,
    title: '5 BHK Deep Cleaning Gurgaon | Premium Full-Home',
    description: '5 BHK full home deep cleaning in Gurgaon. Comprehensive luxury home service. Full professional team. Book on WhatsApp or call +91 9267905943.',
  },
  {
    file: 'kitchen-deep-cleaning-gurgaon', page: 'service', serviceKey: 'kitchen',
    title: 'Kitchen Deep Cleaning Gurgaon | Chimney & Hob',
    description: 'Kitchen deep cleaning in Gurgaon — chimney filter degreasing, hob scrub, cabinets & tiles. Food-safe products. Takes 3–4 hrs. Book via WhatsApp.',
  },
  {
    file: 'bathroom-deep-cleaning-gurgaon', page: 'service', serviceKey: 'bathroom',
    title: 'Bathroom Deep Cleaning Gurgaon | Descaling & Tiles',
    description: 'Remove hard-water stains in Gurgaon bathrooms. Tile descaling, commode sanitization, limescale removal. 1.5–2 hrs per bathroom. Book now.',
  },
  {
    file: 'sofa-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'sofa',
    title: 'Sofa Shampoo Cleaning Gurgaon | ₹499/seat',
    description: 'Sofa shampoo cleaning in Gurgaon from ₹499 per seat. Stain removal, dust-mite extraction, odor neutralization. Fabric-safe. Book via WhatsApp.',
  },
  {
    file: 'carpet-shampoo-cleaning-gurgaon', page: 'service', serviceKey: 'carpet',
    title: 'Carpet Cleaning Gurgaon | ₹15/sq ft Shampoo',
    description: 'Carpet shampoo cleaning in Gurgaon from ₹15/sq ft. Hot-water extraction, stain removal, allergen treatment. Wall-to-wall & rugs. Book now.',
  },
  {
    file: 'office-deep-cleaning-gurgaon', page: 'service', serviceKey: 'office',
    title: 'Office Deep Cleaning Gurgaon | Commercial Cleaning',
    description: 'Office deep cleaning in Gurgaon — workstations, pantries, washrooms, carpets & glass. Scheduled around business hours. Book a free site visit.',
  },
  {
    file: 'move-in-move-out-cleaning-gurgaon', page: 'service', serviceKey: 'move',
    title: 'Move-In Move-Out Cleaning Gurgaon | Empty Flat',
    description: 'Move-in & move-out deep cleaning in Gurgaon. Leave your old flat spotless or enter a fresh one. End-to-end handover cleaning. Book via WhatsApp.',
  },
  {
    file: 'residential-cleaners-near-me', page: 'residential',
    title: 'Residential Cleaners Near Me — Gurgaon | Same-Day',
    description: 'Local residential cleaners in Gurgaon. Police-verified, same-day slots, pay after job is done. Serving DLF, Sohna Rd, Golf Course Rd & all sectors.',
  },
  {
    file: 'society-cleaning-services-gurgaon', page: 'partners',
    title: 'Society Cleaning Services in Gurgaon — RWA & Bulk',
    description: 'Society & apartment cleaning in Gurgaon — RWA cluster days, villa & PG turnover, GST invoice, pay after walkthrough. Serving since 2015.',
  },
  {
    file: 'all-pages', page: 'allpages',
    title: 'All Services — Aone Deep Cleaning Gurgaon',
    description: 'Browse all deep cleaning services in Gurgaon: full home, kitchen, bathroom, sofa, carpet, office and move-in/out cleaning by Aone Deep Cleaning.',
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    file: 'blog', page: 'blog',
    title: 'Blog — Cleaning Guides & Tips | Aone Deep Cleaning',
    description: 'Deep cleaning guides for Gurgaon homes: costs by BHK, cleaning frequency, kitchen chimney care, hard water removal and sofa maintenance. Expert tips.',
  },
  {
    file: 'blog/deep-cleaning-cost-gurgaon-2026', page: 'article',
    title: "Deep Cleaning Cost in Gurgaon (2026): BHK-Wise Rates",
    description: "Deep cleaning in Gurgaon costs ₹2,500 for a 1BHK up to ₹9,000 for a villa. Full 2026 rate card, inclusions and extras worth paying for.",
  },
  {
    file: 'blog/how-often-deep-clean-home-india', page: 'article',
    title: "How Often Should You Deep Clean Your Home in India?",
    description: "A season-by-season deep cleaning schedule for Indian homes — when to book, why monsoon and pre-Diwali matter most, and the signs that say book now.",
  },
  {
    file: 'blog/kitchen-chimney-cleaning-guide', page: 'article',
    title: "Kitchen Chimney Cleaning: DIY Maintenance vs Professional",
    description: "When a chimney filter needs a professional degrease instead of a DIY wash, what a deep clean costs and why Gurgaon kitchens need it more often than you think.",
  },
  {
    file: 'blog/hard-water-bathroom-stains-gurgaon', page: 'article',
    title: "Removing Hard Water Stains from Gurgaon Bathrooms",
    description: "Gurgaon water leaves white scale on tiles, taps and glass within weeks. What actually removes it, what damages chrome, and when to call a descaling crew.",
  },
  {
    file: 'blog/sofa-cleaning-gurgaon-guide', page: 'article',
    title: "Sofa Shampoo Cleaning in Gurgaon — ₹499/Seat & Drying",
    description: "Sofa shampooing in Gurgaon costs ₹499 per seat. How hot-water extraction works, the 4–6 hour drying window, fabric cautions and upkeep between cleans.",
  },
  {
    file: 'blog/kitchen-vs-regular-cleaning', page: 'article',
    title: "Kitchen Deep Cleaning vs Regular Cleaning: the Real Gap",
    description: "Daily wiping keeps a kitchen tidy; it never touches the degrease a hob, chimney and tiles need. What a deep clean adds and when it is worth ₹1,500.",
  },
  {
    file: 'blog/move-in-move-out-cleaning-checklist-gurgaon', page: 'article',
    title: "Move-In & Move-Out Cleaning Checklist for Gurgaon Flats",
    description: "Room-by-room handover checklist landlords and societies inspect — chimney degrease, descaling, floors — plus pro-clean costs.",
  },
  {
    file: 'blog/full-home-deep-cleaning-gurgaon-guide', page: 'article',
    title: "Full Home Deep Cleaning in Gurgaon: Cost & Checklist",
    description: "Full home deep cleaning in Gurgaon from ₹2,500 (1BHK) to ₹9,000 (villa): the room-by-room checklist, how long it takes and the walkthrough before you pay.",
  },
  {
    file: 'blog/house-cleaning-services-gurgaon-guide', page: 'article',
    title: "House Cleaning Services in Gurgaon from ₹499 a Visit",
    description: "Weekly, fortnightly and one-time house cleaning in Gurgaon from ₹499 a visit — what each plan covers, how it differs from deep cleaning and how to book.",
  },
  {
    file: 'blog/deep-cleaning-near-me-gurgaon', page: 'article',
    title: "Deep Cleaning Near Me in Gurgaon: Every Area Covered",
    description: "Verified deep cleaning crews across DLF Phases, Sushant Lok, Sohna Road, Golf Course Road, Palam Vihar and all 100+ sectors — same-day slots, fixed prices.",
  },
  {
    file: 'blog/kitchen-deep-cleaning-cost-gurgaon', page: 'article',
    title: "What Kitchen Deep Cleaning Costs in Gurgaon (₹1,500+)",
    description: "Kitchen deep cleaning in Gurgaon runs ₹1,500–₹2,500 by size: chimney dismantling, hob detailing, cabinets in and out, degreasing and descaling included.",
  },
  {
    file: 'blog/office-deep-cleaning-gurgaon-guide', page: 'article',
    title: "Office Deep Cleaning in Gurgaon from ₹3 per Sq Ft",
    description: "Office deep cleaning in Gurgaon from ₹3 per sq ft — workstations, pantry, washrooms, glass and floors, done after hours so no workday is lost.",
  },
  {
    file: 'blog/bathroom-deep-cleaning-services-gurgaon-guide', page: 'article',
    title: "Bathroom Deep Cleaning in Gurgaon from ₹800/Bath",
    description: "Bathroom deep cleaning in Gurgaon at ₹800 per bathroom: acid descaling, grout scrubbing, commode sanitisation and glass polish — 45–60 minutes per bath.",
  },
  {
    file: 'blog/carpet-cleaning-gurgaon-guide', page: 'article',
    title: "Carpet Cleaning in Gurgaon from ₹15/Sq Ft — Method & Drying",
    description: "Carpet and rug cleaning in Gurgaon from ₹15 per sq ft — shampoo versus dry cleaning, 6–8 hour drying, and how the method is picked for each fibre.",
  },
  {
    file: 'blog/best-deep-cleaning-services-gurgaon', page: 'article',
    title: "Best Deep Cleaning Services in Gurgaon: 5 Compared",
    description: "Five Gurgaon deep cleaning services compared on BHK pricing, scope, staff verification and guarantees — including where Aone Deep Cleaning wins and why.",
  },
  {
    file: 'blog/housekeeping-vs-deep-cleaning-gurgaon', page: 'article',
    title: "Housekeeping vs Deep Cleaning in Gurgaon: Which & When",
    description: "A maid keeps the house running; a deep clean resets it. What each covers in a Gurgaon home, what they cost and why most homes need both on a schedule.",
  },
  {
    file: 'blog/balcony-terrace-cleaning-gurgaon', page: 'article',
    title: "Balcony & Terrace Cleaning in Gurgaon: Prices & Drain Care",
    description: "Balcony and terrace cleaning in Gurgaon from ₹300: pigeon-dropping removal, drain flushing, tile scrubbing and the monsoon prep most bookings skip.",
  },
  {
    file: 'blog/deep-cleaning-all-sectors-gurgaon', page: 'article',
    title: "Deep Cleaning in Every Gurgaon Sector: the Full Map",
    description: "Which sectors our deep cleaning crews cover daily, typical building access in each, and the fixed 1–5BHK prices that apply everywhere in Gurgaon.",
  },
  {
    file: 'blog/commercial-cleaning-services-gurgaon', page: 'article',
    title: "Commercial Cleaning in Gurgaon: Offices, Shops & Clinics",
    description: "Commercial cleaning in Gurgaon for offices, shops and clinics: AMC housekeeping, quarterly deep cleans, after-hours scheduling and per-sq-ft pricing.",
  },
  {
    file: 'blog/best-home-cleaning-services-gurgaon', page: 'article',
    title: "Best Home Cleaning Services in Gurgaon: 5 Compared",
    description: "Five home cleaning services in Gurgaon compared on visit pricing, staff checks, deep-clean depth and rescheduling terms — with the honest differences.",
  },
  {
    file: 'blog/full-house-cleaning-checklist-gurgaon', page: 'article',
    title: "Full House Cleaning Checklist for Gurgaon Homes",
    description: "The 40-point checklist our crews tick room by room in Gurgaon homes — use it to audit any cleaning service before you pay the final instalment.",
  },
  {
    file: 'blog/deep-cleaners-near-me-gurgaon', page: 'article',
    title: "Hiring Deep Cleaners Near You in Gurgaon: a Vetting Guide",
    description: "How to vet deep cleaners in Gurgaon: police verification, equipment, written scope and pay-after-walkthrough terms — plus the red flags that predict a bad job.",
  },
  {
    file: 'blog/residential-cleaning-services-near-me-gurgaon', page: 'article',
    title: "Residential Cleaning Services in Gurgaon: Your Options",
    description: "Every type of residential cleaning in Gurgaon — one-time deep, weekly upkeep, move-out, festive — with prices and the right choice for each situation.",
  },
  {
    file: 'blog/home-cleaning-services-near-me-gurgaon', page: 'article',
    title: "What Home Cleaning Near You in Gurgaon Should Cost",
    description: "What home cleaning near you in Gurgaon should cost — ₹499 visits, ₹2,500+ deep cleans — and the three questions that separate pros from hourly gig workers.",
  },
  {
    file: 'blog/what-is-deep-cleaning-guide', page: 'article',
    title: "What Is Deep Cleaning? the Difference You Can Feel",
    description: "Deep cleaning explained: the machines, chemicals and dwell times that separate it from regular cleaning, room by room, and when an Indian home needs one.",
  },
  {
    file: 'blog/diwali-cleaning-gurgaon', page: 'article',
    title: "Diwali Cleaning in Gurgaon: Book Before the Rush",
    description: "Diwali deep cleaning in Gurgaon books out two weeks early. Rates, the pre-festive checklist and the dates that still have morning slots.",
  },
  {
    file: 'blog/dussehra-cleaning-gurgaon', page: 'article',
    title: "Dussehra Cleaning in Gurgaon: Get Ahead of Diwali",
    description: "Dussehra is the smart window for festive cleaning in Gurgaon — crews are free, prices are standard and the deep clean carries you through Diwali.",
  },
  {
    file: 'blog/navratri-cleaning-gurgaon', page: 'article',
    title: "Navratri Cleaning in Gurgaon: Pooja-Ready in One Day",
    description: "A one-day pooja-ready deep clean for Navratri in Gurgaon: kitchen degrease, bathroom descaling, pooja-room detailing and same-day slots.",
  },
  {
    file: 'blog/cleaning-services-gurgaon-guide', page: 'article',
    title: "Cleaning Services in Gurgaon: Every Price That Matters",
    description: "From ₹499 visits to ₹9,000 villa deep cleans — the complete 2026 price picture for cleaning services in Gurgaon, with what changes the quote.",
  },
  {
    file: 'blog/full-home-deep-cleaning-packages-gurgaon', page: 'article',
    title: "Full Home Deep Cleaning Packages in Gurgaon (1–5BHK+)",
    description: "Full home packages for Gurgaon: 1BHK ₹2,500, 2BHK ₹4,500, 3BHK ₹5,500, 4–5BHK and villas by survey — each with the same written checklist.",
  },
  {
    file: 'blog/room-cleaning-services-gurgaon', page: 'article',
    title: "Room Cleaning Services in Gurgaon, Priced per Room",
    description: "Single-room cleaning in Gurgaon from ₹299: when a one-room deep makes sense, what it includes and when the full-home rate works out cheaper.",
  },
  {
    file: 'blog/mr-deep-cleaning-vs-sachin-deep-cleaning', page: 'article',
    title: "Mr. Deep Cleaning vs Aone Deep Cleaning: Honest Compare",
    description: "Mr. Deep Cleaning and Aone Deep Cleaning compared on BHK rates, checklist depth, verification and guarantee — including the two categories where we lose.",
  },
  {
    file: 'blog/best-office-deep-cleaning-services-gurgaon', page: 'article',
    title: "Best Office Deep Cleaning Services in Gurgaon: Top 5",
    description: "Five office deep cleaning services in Gurgaon compared on per-sq-ft rates, after-hours capability, AMC terms and washroom specialisation.",
  },
  {
    file: 'blog/urban-company-vs-sachin-deep-cleaning', page: 'article',
    title: "Urban Company vs Aone Deep Cleaning in Gurgaon",
    description: "Urban Company vs Aone Deep Cleaning on price, crew continuity, checklist ownership and what happens when a Gurgaon deep clean goes wrong.",
  },
  {
    file: 'blog/house-maid-vs-deep-cleaning-gurgaon', page: 'article',
    title: "House Maid vs Deep Cleaning in Gurgaon: the Cost Math",
    description: "A full-time maid costs ₹12,000–₹18,000 a month; a quarterly deep clean costs ₹4,500. What each actually buys in a Gurgaon home and where they overlap.",
  },
  {
    file: 'book-cleaning-online-gurgaon', page: 'landing',
    title: 'Book Cleaning Online in Gurgaon — No App Needed',
    description: 'Book house & deep cleaning online in Gurgaon without any app — 30-second WhatsApp booking, same-day slots, fixed price, pay after walkthrough.',
  },
  // ── PPC-only ad landing pages (noindex: hidden from search + sitemap) ──
  {
    file: 'book-deep-cleaning-services-in-gurgaon', page: 'ppc',
    title: 'Deep Cleaning Services in Gurgaon | 40% Off Today',
    description: 'Deep cleaning services in Gurgaon — up to 40% OFF today. 1BHK ₹2,500, 2BHK ₹4,500, 3BHK ₹5,500. Verified team, pay after walkthrough. Book on WhatsApp.',
    noindex: true,
  },
  {
    file: 'book-house-deep-cleaning-services-in-gurgaon', page: 'ppc',
    title: 'House Deep Cleaning Services in Gurgaon | 40% Off',
    description: 'House deep cleaning services in Gurgaon — up to 40% OFF today. Whole-house crews for floors & villas from ₹4,500. Pay after walkthrough. Book now.',
    noindex: true,
  },
  {
    file: 'blog/nobroker-cleaning-vs-sachin-deep-cleaning', page: 'article',
    title: "NoBroker Cleaning vs Aone Deep Cleaning: Gurgaon Rates",
    description: "NoBroker cleaning and Aone Deep Cleaning compared for Gurgaon homes — pricing model, crew vetting, scope depth and rescheduling terms.",
  },
  {
    file: 'blog/safaiwale-vs-sachin-deep-cleaning', page: 'article',
    title: "Safaiwale vs Aone Deep Cleaning: Gurgaon Prices Compared",
    description: "Safaiwale and Aone Deep Cleaning side by side for Gurgaon: rate cards, checklist depth, machine use and the guarantee difference that matters.",
  },
  // ── New: Price-intent blogs (Batch 1 — 1/2/3BHK + sofa per-seat, complete) ──
  {
    file: 'blog/1bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "1BHK Deep Cleaning in Gurgaon: ₹2,500, Itemised",
    description: "What the ₹2,500 1BHK deep clean in Gurgaon covers room by room, how long it takes and when a 1BHK booking needs the villa checklist instead.",
  },
  {
    file: 'blog/2bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "2BHK Deep Cleaning in Gurgaon for a Fixed ₹4,500",
    description: "The fixed ₹4,500 2BHK deep clean in Gurgaon: both bathrooms, kitchen degrease, wardrobes in and out, machine-polished floors and a pay-after walkthrough.",
  },
  {
    file: 'blog/3bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "3BHK Deep Cleaning in Gurgaon for a Fixed ₹5,500",
    description: "The fixed ₹5,500 3BHK deep clean in Gurgaon: three bathrooms, full kitchen degrease, balcony, machine scrub and a written checklist you audit before paying.",
  },
  {
    file: 'blog/sofa-cleaning-price-gurgaon-per-seat', page: 'article',
    title: "Sofa Cleaning Price in Gurgaon — ₹499/Seat Explained",
    description: "What ₹499 per seat buys in Gurgaon sofa cleaning: hot-water extraction, fabric testing, 4–6 hour drying and why three-seat quotes vary.",
  },
  // ── Batch 2 — bathroom/kitchen price + micro-local (complete) ──
  {
    file: 'blog/bathroom-cleaning-price-gurgaon-per-bathroom', page: 'article',
    title: "Bathroom Cleaning Price in Gurgaon (₹800/Bath)",
    description: "₹800 per bathroom in Gurgaon: the nine descaling and sanitisation steps inside the price, timing per bath and the discounts for booking 2–3 together.",
  },
  {
    file: 'blog/kitchen-cleaning-price-gurgaon-chimney', page: 'article',
    title: "Kitchen Cleaning in Gurgaon — ₹1,500, Chimney Included",
    description: "Kitchen cleaning in Gurgaon from ₹1,500 with chimney degreasing included — the size brackets, what pushes it to ₹2,500 and the 2-hour process.",
  },
  {
    file: 'blog/dlf-phase-3-deep-cleaning-gurgaon', page: 'article',
    title: "Same-Day Deep Cleaning in DLF Phase 3, Gurgaon",
    description: "Same-day deep cleaning in DLF Phase 3 Gurgaon — tower access, market-facing flat quirks and the fixed ₹2,500–₹5,500 BHK rates.",
  },
  {
    file: 'blog/sohna-road-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning on Sohna Road, Gurgaon: All Towers Served",
    description: "Deep cleaning across Sohna Road high-rises — Central Park, Vatika, Uniworld: service-lift bookings, fixed BHK prices and evening slots after work.",
  },
  // ── Batch 3 — Golf + house price + end-tenancy + pest vs (complete) ──
  {
    file: 'blog/golf-course-road-deep-cleaning-gurgaon', page: 'article',
    title: "Golf Course Road Deep Cleaning for Premium Gurgaon Homes",
    description: "Deep cleaning for Golf Course Road apartments and builder floors: marble-safe chemistry, concierge coordination and villa-grade checklists.",
  },
  {
    file: 'blog/house-cleaning-price-gurgaon-per-visit', page: 'article',
    title: "What a ₹499 House Cleaning Visit in Gurgaon Covers",
    description: "What a ₹499 house cleaning visit in Gurgaon covers, what it never covers, and when upgrading to a ₹2,500+ deep clean is the cheaper decision.",
  },
  {
    file: 'blog/end-of-tenancy-cleaning-gurgaon', page: 'article',
    title: "End of Tenancy Cleaning in Gurgaon: Get the Deposit Back",
    description: "End-of-tenancy cleaning in Gurgaon from ₹2,500: the deposit-costing items landlords check, day-before-move handover timing and photo documentation.",
  },
  {
    file: 'blog/pest-control-vs-deep-cleaning-gurgaon', page: 'article',
    title: "Pest Control or Deep Cleaning First? Gurgaon Answer",
    description: "Book deep cleaning first, pest control two or three days after — the sequencing logic, what each removes, and the combined booking most Gurgaon homes want.",
  },
  // ── Batch 4 — Top 11 work areas: Sushant Lok 1-3, DLF 1,2,4,5, Sector 65-67 (complete) ──
  {
    file: 'blog/sushant-lok-1-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 1, Gurgaon: C-Block to Vyapar",
    description: "Deep cleaning across Sushant Lok 1 Gurgaon — builder floors and the Vyapar Kendra side: access notes, fixed BHK prices and same-day slots.",
  },
  {
    file: 'blog/sushant-lok-2-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 2, Gurgaon: B-Block & Sec 57",
    description: "Deep cleaning in Sushant Lok 2 and the Sector 57 edge: builder-floor stairs, parking for equipment and the same fixed BHK rate card.",
  },
  {
    file: 'blog/sushant-lok-3-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sushant Lok 3 & Sectors 57–58, Gurgaon",
    description: "Deep cleaning for Sushant Lok 3 and Sectors 57–58: newer towers, society gate passes and the fixed ₹2,500–₹5,500 BHK pricing.",
  },
  {
    file: 'blog/dlf-phase-1-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 1, Gurgaon: Premium Homes",
    description: "Deep cleaning in DLF Phase 1 — independent houses and older builder floors: uptime for machines on upper floors, fixed rates, same-day slots.",
  },
  {
    file: 'blog/dlf-phase-2-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 2, Gurgaon: Same-Day Slots",
    description: "Same-day deep cleaning in DLF Phase 2 Gurgaon: colony access, typical home types and the unchanged ₹2,500–₹5,500 fixed BHK price card.",
  },
  {
    file: 'blog/dlf-phase-4-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 4: Galleria & Supermart Belt",
    description: "Deep cleaning around Galleria and Supermart 1 in DLF Phase 4 — tower rules, market-facing flat issues and fixed BHK prices with same-day slots.",
  },
  {
    file: 'blog/dlf-phase-5-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in DLF Phase 5 & Sectors 43–53, Gurgaon",
    description: "Deep cleaning in DLF Phase 5 and the Sector 43–53 belt: large flats and villas, society scheduling and villa-grade checklists at fixed rates.",
  },
  {
    file: 'blog/sector-65-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 65, Gurgaon: World Spa & Villas",
    description: "Deep cleaning in Sector 65 — World Spa apartments and villa lanes: premium-society norms, marble-safe cleaning and the standard fixed BHK rates.",
  },
  {
    file: 'blog/sector-66-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 66, Gurgaon: Vatika & New Towers",
    description: "Deep cleaning in Sector 66 Gurgaon — Vatika City and the newer towers: move-in dust, society scheduling and the fixed 1–5BHK price card.",
  },
  {
    file: 'blog/sector-67-deep-cleaning-gurgaon', page: 'article',
    title: "Deep Cleaning in Sector 67, Gurgaon: Ansal & Beyond",
    description: "Deep cleaning in Sector 67 — Ansal floor, Housing Board and new societies: varied home types, one fixed price card, same-day slots when open.",
  },
  // ── guide to answers better than Urban/a marketplace listing/a national aggregator for bare "full home deep cleaning" (search results #4) & a company site #6 ──
  {
    file: 'blog/full-home-deep-cleaning', page: 'article',
    title: "Full Home Deep Cleaning: Price & Checklist (2026)",
    description: "Full home deep cleaning prices for 2026 — ₹2,500 to ₹9,000 by BHK — with the room-by-room checklist and the pay-after walkthrough that protects you.",
  },
  {
    file: 'blog/home-deep-cleaning-service-gurgaon', page: 'article',
    title: "Home Deep Cleaning Service in Gurgaon: Book in 5 Minutes",
    description: "WhatsApp three photos and get a fixed 1–5BHK deep cleaning price in five minutes — checklist, timing and pay-after-approval terms in writing.",
  },
  {
    file: 'blog/bathroom-deep-cleaning-gurgaon-best', page: 'article',
    title: "Bathroom Deep Cleaning in Gurgaon: the ₹800 Benchmark",
    description: "What the best bathroom deep cleaning in Gurgaon looks like at ₹800 a bath — descaling dwell times, grout work and the glass finish you should expect.",
  },
  // ── 3 high-volume 0-click Instagram queries (skip mr brand) ──
  {
    file: 'blog/deep-cleaning-services', page: 'article',
    title: "Deep Cleaning Services: What’s Included, BHK by BHK",
    description: "Every deep cleaning service laid out BHK by BHK: the included list, the honest exclusions, timing per home size and fixed prices before booking.",
  },
  {
    file: 'blog/home-cleaning-services-gurgaon', page: 'article',
    title: "Home Cleaning Services in Gurgaon: Plans & Pricing",
    description: "Home cleaning plans in Gurgaon — ₹499 upkeep visits or full deep cleans from ₹2,500 — with the checklist difference that decides which you need.",
  },
  {
    file: 'blog/home-deep-cleaning-services-gurgaon', page: 'article',
    title: "Home Deep Cleaning Services in Gurgaon: Fixed BHK Rates",
    description: "Fixed BHK rates for home deep cleaning services in Gurgaon — ₹2,500/₹4,500/₹5,500 — an hour-by-hour account of the crew's day and what moves the price.",
  },
  {
    file: 'blog/post-construction-cleaning-services-gurgaon', page: 'article',
    title: "Post-Construction Cleaning in Gurgaon: the 3-Phase Method",
    description: "Post-construction cleaning in Gurgaon in three phases — debris, fine dust, detail: why paint and cement residue need different chemistry and 1–2 days.",
  },
  {
    file: 'blog/office-deep-cleaning-udyog-vihar', page: 'article',
    title: "Office Deep Cleaning in Udyog Vihar: Phases 1–5, After-Hours",
    description: "After-hours office deep cleaning across Udyog Vihar Phases 1–5: ₹3/sq ft, 9-area scope, weekend nights for large floors, no workday lost.",
  },
  {
    file: 'blog/carpet-cleaning-udyog-vihar', page: 'article',
    title: "Onsite Carpet Cleaning in Udyog Vihar at ₹15/Sq Ft",
    description: "Onsite carpet cleaning for Udyog Vihar offices at ₹15 per sq ft — low-moisture method for cubicle carpets, night work, dry by morning.",
  },
  {
    file: 'blog/carpet-shampoo-cleaning-udyog-vihar', page: 'article',
    title: "Carpet Shampoo Cleaning in Udyog Vihar — ₹18/Sq Ft",
    description: "Deep carpet shampooing for Udyog Vihar offices at ₹18 per sq ft — hot-water extraction for heavily soiled carpets, sectioned so work never stops.",
  },

  {
    file: 'blog/sofa-cleaning-udyog-vihar', page: 'article',
    title: "Office Sofa Cleaning in Udyog Vihar — ₹499/Seat Onsite",
    description: "Onsite office sofa cleaning in Udyog Vihar at ₹499 per seat — reception and lounge upholstery cleaned after hours, dry by next morning.",
  },
  {
    file: 'blog/chair-cleaning-udyog-vihar', page: 'article',
    title: "Office Chair Cleaning in Udyog Vihar from ₹199/Chair",
    description: "Office chair cleaning in Udyog Vihar from ₹199 a chair — mesh, fabric and leather care, volume rates for 50+ chairs, done overnight.",
  },
  {
    file: 'blog/office-bathroom-cleaning-udyog-vihar', page: 'article',
    title: "Office Bathroom Cleaning in Udyog Vihar — ₹800/Bath",
    description: "Office bathroom cleaning in Udyog Vihar at ₹800 a bath: urinal descaling, drain and trap treatment, high-touch disinfection — 1–2 hours per bath.",
  },
  {
    file: 'blog/commercial-office-cleaning-udyog-vihar', page: 'article',
    title: "Commercial Office Cleaning in Udyog Vihar: AMC & Deep",
    description: "Commercial office cleaning in Udyog Vihar: daily housekeeping AMCs priced per sq ft plus quarterly deep cleans from ₹3,999 — after-hours, survey-quoted.",
  },
  {
    file: 'blog/office-deep-cleaning-sector-44-gurgaon', page: 'article',
    title: "Office Deep Cleaning in Sector 44 & Corporate Hubs",
    description: "Office deep cleaning in Sector 44 from \u20b93/sq ft \u2014 after-hours crews for Cyber City, Golf Course Rd, Sector 32 & Udyog Vihar. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/sector-44-office-deep-cleaning-gurgaon', page: 'article',
    title: "Sector 44 Office Deep Cleaning: Full Guide",
    description: "Office deep cleaning in Sector 44 from ₹3/sq ft — metro-side crews, coworking turnover, night shifts. GST invoice, NDA, pay after sign-off.",
  },
  {
    file: 'blog/office-deep-cleaning-cyber-city-gurgaon', page: 'article',
    title: "Cyber City Office Deep Cleaning, Gurgaon",
    description: "Cyber City office deep cleaning from ₹3/sq ft — tower passes, dock slots, 9 PM night windows. Density crews. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/office-deep-cleaning-golf-course-road-gurgaon', page: 'article',
    title: "Golf Course Road Office Deep Cleaning",
    description: "Premium office deep cleaning on Golf Course Road from ₹3/sq ft — marble-safe chemistry, concierge slots. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/office-deep-cleaning-sector-32-gurgaon', page: 'article',
    title: "Sector 32 Office Deep Cleaning, Gurgaon",
    description: "Sector 32 office deep cleaning from ₹3/sq ft — weekend-night crews for managed workspaces. Shared scope in writing. GST invoice, pay after sign-off.",
  },
  {
    file: 'blog/home-cleaning-service-guide', page: 'article',
    title: "Home Cleaning Service: What It Includes & Costs",
    description: "What a home cleaning service includes, the four booking types, India-typical costs per visit, and how to choose between a service, a maid and a deep clean.",
  },
  // ── Batch 4 — 4/5BHK price + mattress + Dwarka + society + monsoon ──
  {
    file: 'blog/4bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "4BHK Deep Cleaning in Gurgaon for a Fixed ₹6,500",
    description: "Fixed ₹6,500 4BHK deep cleaning in Gurgaon: four bedrooms, three baths, lounge, kitchen degrease, balconies and a written checklist audited before you pay.",
  },
  {
    file: 'blog/5bhk-deep-cleaning-price-gurgaon', page: 'article',
    title: "5BHK Deep Cleaning in Gurgaon for a Fixed ₹9,000",
    description: "Fixed ₹9,000 5BHK and villa deep cleaning in Gurgaon: five bedrooms, four-plus baths, terrace, kitchen degrease and a written checklist audited before you pay.",
  },
  {
    file: 'blog/mattress-cleaning-gurgaon', page: 'article',
    title: "Mattress Cleaning in Gurgaon — Steam & Shampoo Guide",
    description: "Mattress cleaning in Gurgaon by steam and shampoo extraction: dust mites, stains, odour, drying time and how mattress jobs bundle with sofa service.",
  },
  {
    file: 'blog/dwarka-expressway-deep-cleaning-gurgaon', page: 'article',
    title: "Dwarka Expressway Deep Cleaning in Gurgaon",
    description: "Deep cleaning on Dwarka Expressway in Gurgaon — Sectors 102–113, new towers, move-in dust, service-lift bookings and fixed BHK prices.",
  },
  {
    file: 'blog/society-deep-cleaning-day-gurgaon', page: 'article',
    title: "Society Deep Cleaning in Gurgaon: Cluster Days",
    description: "Society deep cleaning in Gurgaon through tower cluster days: RWA coordination, gate passes, lift slots, the same BHK card and pay-after walkthrough.",
  },
  {
    file: 'blog/monsoon-cleaning-checklist-gurgaon', page: 'article',
    title: "Monsoon Cleaning Checklist for Gurgaon Homes",
    description: "Monsoon cleaning checklist for Gurgaon homes: drains, balconies, grout, damp corners, drying, and the post-monsoon deep clean that resets it all.",
  },
];
