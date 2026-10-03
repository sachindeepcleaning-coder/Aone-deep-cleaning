import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, breadcrumbSchema } from '../lib/schema.jsx';
import { SITE_URL, PHONE, WHATSAPP, SOCIAL, pageUrl, waMsg, AREAS, asset, pageLink } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

const TEAM = [
  'Police-verified and identity-checked',
  'Professionally trained on our processes and products',
  'Equipped with the right tools for the job',
];

const PROCESS = [
  { title: 'Call or WhatsApp', desc: 'Reach us at +91 9267905943 or fill the form — we confirm scope, exact price and slot, often same-day if booked before noon.' },
  { title: 'We Arrive Equipped', desc: 'Our team arrives with all machines and eco-friendly, food-safe products.' },
  { title: 'We Deep Clean', desc: 'Every area is cleaned systematically — kitchen, bathrooms, rooms, floors and fixtures.' },
  { title: 'You Inspect', desc: 'We walk through every area together so you can see the result.' },
  { title: 'Pay When Happy', desc: 'You pay only when satisfied. If anything is not right, we return and fix it free of charge.' },
];

const PRICING = [
  ['1 BHK full home deep clean', 'from ₹2,500'],
  ['2 BHK full home deep clean', 'from ₹4,500'],
  ['3 BHK full home deep clean', 'from ₹5,500'],
  ['4 BHK full home deep clean', 'from ₹6,500'],
  ['5 BHK full home deep clean', 'from ₹9,000'],
  ['Move-in / move-out cleaning', 'from ₹1,999'],
  ['Kitchen deep clean', 'from ₹1,500'],
  ['Bathroom deep clean', 'from ₹800'],
  ['Sofa shampoo cleaning', 'from ₹499 per seat'],
];

export default function AboutPage({ url, file }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aone Deep Cleaning',
    url: SITE_URL,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressLocality: 'Gurgaon', addressRegion: 'Haryana', addressCountry: 'IN' },
    areaServed: 'Gurgaon, Haryana, India',
    foundingDate: '2015',
    description: 'Police-verified, eco-friendly deep cleaning team serving Gurgaon. Full-home, kitchen, bathroom, sofa and carpet deep cleaning with pay-after-satisfaction.',
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, WHATSAPP],
  };
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sachin Kumar',
    jobTitle: 'Founder & Lead Cleaning Specialist',
    url: `${SITE_URL}/about.html#sachin-kumar`,
    image: `${SITE_URL}/images/cleaning-1.webp`,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    worksFor: { '@id': `${SITE_URL}/#business` },
    knowsAbout: ['Deep Cleaning', 'House Cleaning', 'Bathroom Descaling', 'Kitchen Degreasing', 'Gurgaon'],
    description: 'Founder of Aone Deep Cleaning, 10+ years hands-on deep cleaning in Gurgaon — DLF to Sohna Road, 148 verified Google reviews, police-verified team lead.',
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={personSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'About Us', url },
        ])}
      />

      <section className="hero" style={{ backgroundImage: `url("${asset(file, '/images/template/home/Balaji-Deep-Cleaning-banner-1.webp')}")` }}>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              About Aone Deep Cleaning
            </div>
            <h1>
              <span className="hl">The Police-Verified</span><br />
              Deep Cleaning Team<br />
              <span className="hl2">Gurgaon Trusts</span>
            </h1>
            <p className="hero-sub">
              A professional home and office deep cleaning service based in Gurgaon, Haryana since 2015. Transparent pricing, pay after satisfaction, same-day service across DLF, Sohna Road and all sectors — from society flats and builder floors to villas, shops and clinics.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Pay After Satisfaction</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
              <span className="pill"><span className="pi">✓</span> Eco-Friendly Products</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Milestones</div>
            <h2 className="section-title">Ten Years, Same Rule</h2>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {[
              ['2015 — One team, one rule', 'Started in Gurgaon with a single crew: pay only after you approve the work. The rule has survived every festive season since.'],
              ['2018 — Machines over mops', 'Added hot-water extraction, scrubbers and trade descalers as hard-water and construction-dust jobs demanded real equipment.'],
              ['2021 — Society routes', 'Zone rosters across DLF, Sohna Road and Golf Course Road — nearest-team dispatch replacing cross-city travel.'],
              ['2024 — 100+ verified reviews', 'Sector-tagged Google reviews crossed a century; festive rosters (Diwali, Navratri, Dussehra) became annual fixtures.'],
              ['2026 — 5,000+ homes', 'Studios to villas plus offices and clinics, with published BHK prices and owner-supervised 3 BHK+ jobs.'],
            ].map(([title, desc], i) => (
              <div key={title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{title}</div>
                <div className="hiw-desc">{desc}</div>
              </div>
            ))}
          </div>
          <p className="section-sub" style={{ margin: '28px auto 0', textAlign: 'center', fontStyle: 'italic' }}>
            “Every home teaches something — a new stain, a new stone, a new society gate. Ten years in, we still walk every room with you before a rupee changes hands, and we still answer our own phone.” — Sachin, Founder
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Who We Are</div>
            <h2 className="section-title">Specialists in Deep, Not Just Clean</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We focus exclusively on deep, specialised cleaning tasks using professional equipment and eco-friendly, non-toxic products that are safe for children, elderly family members and pets. Our promise is simple: <strong>you only pay after you are completely satisfied</strong> with the result. No advance payment. Free re-clean within 24 hours if any area does not meet your expectation.
            </p>
          </div>
          <div className="services-grid" style={{ marginTop: '36px' }}>
            <div className="card">
              <div className="card-icon">🏠</div>
              <h3>Full-Home Deep Cleaning</h3>
              <p>Top-to-bottom refresh for apartments and independent houses across Gurugram.</p>
            </div>
            <div className="card">
              <div className="card-icon">🍳</div>
              <h3>Kitchen Degreasing</h3>
              <p>Chimneys, exhausts, cabinets and hobs freed of sticky grease build-up.</p>
            </div>
            <div className="card">
              <div className="card-icon">🚿</div>
              <h3>Bathroom Descaling</h3>
              <p>Hard-water scale and mould removed from tiles, taps and glass.</p>
            </div>
            <div className="card">
              <div className="card-icon">🛋️</div>
              <h3>Sofa & Carpet Shampoo</h3>
              <p>Stain removal and dust-mite extraction that refreshes upholstery.</p>
            </div>
            <div className="card">
              <div className="card-icon">📦</div>
              <h3>Move-In / Move-Out</h3>
              <p>Handover-ready cleaning for flats, offices and empty homes.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏢</div>
              <h3>Office Cleaning</h3>
              <p>Workstations, pantries and washrooms cleaned around your business hours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Why Gurgaon Needs Us</div>
            <h2 className="section-title">Cleaning Challenges Only Professionals Can Solve</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Gurgaon's combination of construction dust, hard water and heavy Indian cooking creates cleaning challenges that regular housekeeping cannot solve. Hard-water scale builds on bathroom tiles and taps within weeks. Kitchen chimneys and exhausts accumulate sticky grease. Sofas and carpets trap dust mites and allergens. This is why we exist.
            </p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            <div className="hiw-step fade-up">
              <div className="hiw-num">1</div>
              <div className="hiw-title">Hard-Water Scale</div>
              <div className="hiw-desc">Dissolved and scrubbed with professional descalers — not just wiped over.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">2</div>
              <div className="hiw-title">Sticky Kitchen Grease</div>
              <div className="hiw-desc">Chimney filters dismantled, soaked and degreased until suction is restored.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">3</div>
              <div className="hiw-title">Dust Mites & Allergens</div>
              <div className="hiw-desc">Deep vacuuming and extraction remove them from sofas and carpets.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Team</div>
            <h2 className="section-title">Trained. Verified. Trusted.</h2>
          </div>
          <div className="areas-list" style={{ marginTop: '24px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {TEAM.map((t) => (
              <span key={t} className="area-tag" style={{ color: 'var(--green)', fontWeight: 700 }}>
                ✓ {t}
              </span>
            ))}
          </div>
          <p className="section-sub" style={{ margin: '28px auto 0', textAlign: 'center' }}>
            We treat your home with the same care we would give our own — every visit, every season, every room.
          </p>
          <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            Season after season you will find our teams in DLF Magnolias and DLF Phase 1–5, Emaar Emerald Hills, Godrej Aria, Unitech South City, Ardee City, Vatika City, Nirvana Country, Sushant Lok, South City, Palam Vihar and Sectors 14–92 — the same societies, the same supervisors, the same walkthrough before payment.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Story</div>
            <h2 className="section-title">Cleaning Gurgaon Homes Since 2015</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Aone Deep Cleaning started in 2015 with one team, one scrubber and a simple rule that has never changed: <strong>you pay only after you walk through and approve the work</strong>. A decade later that rule still runs every job — across DLF Phase 1–5, Sohna Road, Golf Course Road, Palam Vihar, Sushant Lok, South City and 30+ sectors, from compact 1 RK studios to 5 BHK villas, plus offices, shops and clinics after hours.
            </p>
            <p className="section-sub" style={{ margin: '16px auto 0' }}>
              What changed in ten years is the craft: hot-water extraction for sofas and carpets, acid descaling tuned for Gurgaon’s hard water, food-safe degreasing for modular chimneys, and a supervisor walkthrough on every booking — plus festive rosters that have run eleven straight Diwali seasons without missing a single booked slot. What never changed is the accountability — the owner’s number (+91 92679-05943) is on every quote, and the same police-verified teams return to the same societies season after season.
            </p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            <div className="hiw-step fade-up">
              <div className="hiw-num">10+</div>
              <div className="hiw-title">Years in Gurgaon</div>
              <div className="hiw-desc">Serving the same sectors since 2015 — festive seasons, move-ins, renovations and all.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">5k+</div>
              <div className="hiw-title">Homes Deep Cleaned</div>
              <div className="hiw-desc">Studios to villas, plus offices and shops across Gurugram.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">4.5★</div>
              <div className="hiw-title">148 Google Reviews</div>
              <div className="hiw-desc">Sector-tagged, verifiable — DLF, Sohna Road, Golf Course Road and beyond.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">How We Train</div>
            <h2 className="section-title">Verified First, Trained Always</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Every cleaner is police-verified and ID-checked before their first booking — then trained on our room-by-room process: descaling dilutions that remove limescale without etching chrome, degreaser dwell times for chimney filters, extraction passes for upholstery, and electronics-safe wiping for workstations. New members shadow senior leads across DLF, Sohna Road and Golf Course routes before leading jobs, and every 3 BHK+ booking is owner-supervised. Training never stops because Gurgaon’s dust, water and cooking load never stop changing it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="sachin-kumar">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Meet the Founder</div>
            <h2 className="section-title">Aone Deep Cleaning — Hands-On in Every Gurgaon Home</h2>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginTop: 32, maxWidth: 800, marginInline: 'auto' }} className="fade-up">
            <img src={asset(file, '/images/cleaning-1.webp')} alt="Aone Deep Cleaning team in Gurgaon — police-verified lead specialists" width="180" height="180" style={{ borderRadius: '50%', width: 140, height: 140, objectFit: 'cover', border: '3px solid var(--primary)' }} loading="lazy" />
            <div style={{ flex: 1, minWidth: 260 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, marginBottom: 8 }}>Aone Deep Cleaning — Founder & Lead Specialist</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>10+ years cleaning Gurgaon homes from DLF Phase 5 to Sector 92. Police-verified, owner-present on every 3 BHK+ job, 148 verified Google reviews. Trained in descaling, extraction and food-safe degreasing. <a href={pageLink(file, '/blog/best-deep-cleaning-services-gurgaon.html')} style={{ color: 'var(--primary)', fontWeight: 700 }}>See how we compare →</a></p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>Facebook →</a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>Instagram →</a>
                <a href={WHATSAPP} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 700 }}>WhatsApp →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Our Process</div>
            <h2 className="section-title">From Call to Sparkling Home</h2>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {PROCESS.map((p, i) => (
              <div key={p.title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{p.title}</div>
                <div className="hiw-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Areas We Serve</div>
            <h2 className="section-title">All of Gurgaon / Gurugram</h2>
          </div>
          <div className="areas-list" style={{ marginTop: '24px' }}>
            {AREAS.map((a) => (
              <span key={a} className="area-tag">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Transparent Pricing</div>
            <h2 className="section-title">What We Say Is What You Pay</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              We quote the final amount on the confirmation call based on your home size and condition. No hidden charges.
            </p>
          </div>
          <div className="blog-table-wrap" style={{ marginTop: '32px' }}>
            <table className="blog-table">
              <thead>
                <tr><th>Service (2026)</th><th>Starting Price</th></tr>
              </thead>
              <tbody>
                {PRICING.map(([s, p]) => (
                  <tr key={s}><td>{s}</td><td>{p}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's Make Your Home Genuinely Clean</h2>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waMsg('Hi, I want a free quote for deep cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }} onClick={whatsappClick}>
                💬 WhatsApp: {PHONE}
              </a>
              <a href="tel:+919267905943" className="fcta-call" style={{ margin: 0, textAlign: 'center' }} onClick={phoneCallClick}>
                📞 Call: {PHONE}
              </a>
            </div>
            <p className="section-sub" style={{ margin: '20px auto 0' }}>Hours: Monday–Sunday, 8:00 AM – 8:00 PM</p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
