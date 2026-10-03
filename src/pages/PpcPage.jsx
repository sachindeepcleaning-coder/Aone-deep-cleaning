import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import CountdownStrip from '../components/CountdownStrip.jsx';
import LocalReel from '../components/LocalReel.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import { JsonLd, localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { SITE_URL, PHONE, pageUrl, waMsg, AREAS } from '../lib/site.js';
import { CHECKLIST, WHY_US, REVIEWS } from '../lib/landing.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

// PPC-only landing pages (noindex, excluded from sitemap + internal mesh).
// Built to mirror the converting sachincleaning.online/deep-cleaning ad page:
// urgency bar → exact-keyword hero + 30-sec quote form → offer countdown →
// includes → 3 steps → reviews → why-us → strikethrough pricing → guarantee
// → areas → keyword FAQs → final CTA. Content keyed by `file` so both ad
// groups share one component with zero prop plumbing (see App 'ppc').
const PPC = {
  'book-deep-cleaning-services-in-gurgaon': {
    keyword: 'Deep Cleaning Services in Gurgaon',
    eyebrow: "Gurgaon's Trusted Deep Cleaning · 4.5★ Rated",
    h1a: 'Deep Cleaning Services in Gurgaon',
    h1b: 'Pay Only After We Finish',
    sub: 'Top-to-bottom deep cleaning for your entire home — bedrooms, kitchen, bathrooms, floors, walls & more. Police-verified team, eco-friendly products. Up to 40% OFF today, same-day slots across all Gurgaon areas.',
    offer: 'Up to 40% OFF Deep Cleaning in Gurgaon',
    serviceName: 'Deep Cleaning Services in Gurgaon — Limited Offer',
    serviceDesc: 'Full-home deep cleaning in Gurgaon at up to 40% OFF: verified team, eco-friendly products, pay only after walkthrough.',
    stats: [['5k+', 'Homes Cleaned'], ['4.5★', '148 Google Reviews'], ['100%', 'Pay After Approval'], ['40%', 'Off Today']],
    prices: [
      ['1 BHK Deep Clean', '₹2,500', '₹4,199', 'Kitchen + 1 bathroom · all rooms & living area · ~5–6 hrs'],
      ['2 BHK Deep Clean', '₹4,500', '₹7,499', 'Kitchen + 2 bathrooms · balcony · ~7–8 hrs'],
      ['3 BHK Deep Clean', '₹5,500', '₹9,199', 'Kitchen + 2–3 bathrooms · study & balcony · ~9–10 hrs'],
    ],
    faqs: [
      ['What do deep cleaning services in Gurgaon cost with the 40% offer?', 'With today\u2019s offer: 1 BHK at ₹2,500 (regular ₹4,199), 2 BHK at ₹4,500 (regular ₹7,499), 3 BHK at ₹5,500 (regular ₹9,199) — up to 40% OFF. The exact figure is locked on the confirmation call before the team arrives, and you pay only after the walkthrough.'],
      ['How long does a full deep clean take?', 'Typically 5–10 hours depending on home size — 1 BHK ~5–6 hrs, 2 BHK ~7–8 hrs, 3 BHK ~9–10 hrs. You get an accurate estimate on the confirmation call.'],
      ['Do I really pay only after the cleaning?', 'Yes — zero advance, ever. We confirm on call, arrive on time, finish the job, and you pay only after inspecting every room to your satisfaction.'],
      ['Can I get same-day deep cleaning in Gurgaon?', 'Yes, subject to slots. Message before noon for the best chance of same-day service across DLF, Sohna Road, Golf Course Road and all sectors.'],
      ['Is the team police-verified?', 'Every cleaner is police-verified, ID-checked and trained before their first booking. Team-lead number shared before arrival.'],
      ['What if I\u2019m not happy with any area?', 'Tell us within 24 hours and we return and re-clean it free. That guarantee holds on offer bookings exactly like full-price ones.'],
      ['Gurgaon me deep cleaning aaj book ho jayegi?', 'Haan — WhatsApp +91 9267905943 par BHK + sector bhejein. Dopahar se pehle message par same-day slot, fixed price call par lock, kaam ke baad hi payment.'],
    ],
  },
  'book-house-deep-cleaning-services-in-gurgaon': {
    keyword: 'House Deep Cleaning Services in Gurgaon',
    eyebrow: 'Whole-House Deep Cleaning · Floors, Villas & Houses',
    h1a: 'House Deep Cleaning Services in Gurgaon',
    h1b: 'Pay Only After We Finish',
    sub: 'Whole-house deep cleaning for independent houses, builder floors and villas — every bedroom, kitchen, bathroom, terrace and balcony. Big crews, machines included, eco-friendly products. Up to 40% OFF today.',
    offer: 'Up to 40% OFF House Deep Cleaning in Gurgaon',
    serviceName: 'House Deep Cleaning Services in Gurgaon — Limited Offer',
    serviceDesc: 'Whole-house deep cleaning in Gurgaon at up to 40% OFF: houses, floors and villas, verified team, pay only after walkthrough.',
    stats: [['5k+', 'Houses Cleaned'], ['4.5★', '148 Google Reviews'], ['100%', 'Pay After Approval'], ['40%', 'Off Today']],
    prices: [
      ['2 BHK House Deep Clean', '₹4,500', '₹7,499', 'Kitchen + 2 bathrooms · courtyard/balcony · ~7–8 hrs'],
      ['3 BHK House Deep Clean', '₹5,500', '₹9,199', 'Kitchen + 2–3 bathrooms · terrace & balcony · ~9–10 hrs'],
      ['4 BHK / Villa Deep Clean', '₹6,500', '₹10,899', 'Full-day visit · 4–5 cleaners · owner-supervised'],
    ],
    faqs: [
      ['What do house deep cleaning services in Gurgaon include?', 'The whole house, room by room: all bedrooms, living areas, kitchen with chimney degreasing, every bathroom descaled, plus terrace, balcony, stairs and entrance. Machines and eco-friendly products included — you arrange nothing.'],
      ['How is house deep cleaning different from a flat deep clean?', 'Houses mean more area: staircases, terraces, courtyards, exterior windows and heavier dust load. We send a bigger crew (4–6 cleaners) with scrubbers and extraction machines, and the supervisor walks the full property with you.'],
      ['What does it cost with the 40% offer?', '2 BHK house at ₹4,500 (regular ₹7,499), 3 BHK at ₹5,500 (regular ₹9,199), 4 BHK/villa at ₹6,500 (regular ₹10,899) — up to 40% OFF, locked on the confirmation call, paid only after approval.'],
      ['How long does a full house take?', 'A 2–3 BHK house typically takes a full day (7–10 hrs); 4 BHK and villas can extend past a day with 5–6 cleaners. Timing is confirmed before booking.'],
      ['Do I pay in advance?', 'Never. Zero advance on offer bookings too — pay by UPI, cash or card only after you inspect the whole house.'],
      ['Can I get same-day house deep cleaning?', 'Message before noon and we confirm a same-day or next-morning slot in most sectors, villas included.'],
      ['Kya poore ghar ki deep cleaning ek din me ho jayegi?', '2–3 BHK ghar aam taur par ek din me ho jata hai; bade villa me 5–6 cleaners lagte hain. WhatsApp +91 9267905943 par ghar ka size bhejein — fixed price aur slot turant confirm.'],
    ],
  },
};

const STEPS = [
  ['Share name & number', 'Fill the 30-second form or WhatsApp us. We call back in under 5 minutes to lock price and slot — no advance, ever.'],
  ['Verified team arrives', 'Police-verified crew with machines and eco-friendly products reaches on time. Team-lead number shared beforehand.'],
  ['Approve, then pay', 'Walk every room first. Pay only on approval — anything missed is re-cleaned free within 24 hours.'],
];

export default function PpcPage({ url, file }) {
  const cfg = PPC[file] || PPC['book-deep-cleaning-services-in-gurgaon'];
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: cfg.serviceName, description: cfg.serviceDesc, url })} />
      <JsonLd data={faqSchema(cfg.faqs.map(([q, a]) => ({ q, a })))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: cfg.keyword, url },
        ])}
      />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              {cfg.eyebrow}
            </div>
            <h1>
              <span className="hl">{cfg.h1a}</span><br />
              <span className="hl2">{cfg.h1b}</span>
            </h1>
            <p className="hero-sub">{cfg.sub}</p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Up to 40% OFF Today</span>
              <span className="pill"><span className="pi">✓</span> Same-Day Slots</span>
              <span className="pill"><span className="pi">✓</span> Pay After Cleaning</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
            </div>
            <div className="hiw-wrap ppc-stats" style={{ marginTop: '24px' }}>
              {cfg.stats.map(([num, label]) => (
                <div key={label} className="hiw-step fade-up">
                  <div className="hiw-num">{num}</div>
                  <div className="hiw-title">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <CountdownStrip offerText={cfg.offer} />

      <LocalReel />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">What&rsquo;s Included</div>
            <h2 className="section-title">Every Room, Every Corner</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>The same 6-area checklist our full-price crews follow — offer bookings get zero shortcuts.</p>
          </div>
          <div className="services-grid" style={{ marginTop: '36px' }}>
            {CHECKLIST.map(([title, desc]) => (
              <div key={title} className="card fade-up">
                <div className="card-icon">✓</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Booked in 3 Simple Steps</h2>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {STEPS.map(([title, desc], i) => (
              <div key={title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{title}</div>
                <div className="hiw-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection reviews={REVIEWS} />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Why Aone</div>
            <h2 className="section-title">6 Reasons Gurgaon Trusts Us</h2>
          </div>
          <div className="whyus-grid">
            {WHY_US.map(([icon, title, desc]) => (
              <div key={title} className="why-card fade-up">
                <div className="why-icon">{icon}</div>
                <div>
                  <div className="why-title">{title}</div>
                  <div className="why-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Limited Offer Pricing</div>
            <h2 className="section-title">Up to 40% OFF — Today Only</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Exact price locked on the confirmation call before booking. No hidden charges, no surprises.</p>
          </div>
          <div className="blog-table-wrap" style={{ marginTop: '32px' }}>
            <table className="blog-table">
              <thead>
                <tr><th>Package</th><th>Today&rsquo;s Price</th><th>Regular</th><th>Scope</th></tr>
              </thead>
              <tbody>
                {cfg.prices.map(([size, offer, regular, scope]) => (
                  <tr key={size}><td>{size}</td><td><strong>{offer}</strong></td><td><s>{regular}</s></td><td>{scope}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waMsg(`Hi, I saw the 40% OFF offer for ${cfg.keyword}. Please share my fixed price.`)} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }} onClick={whatsappClick}>
              💬 Claim 40% OFF on WhatsApp
            </a>
            <a href="tel:+919267905943" className="fcta-call" style={{ margin: 0, textAlign: 'center' }} onClick={phoneCallClick}>
              📞 Call: {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Our Guarantee</div>
            <h2 className="section-title">Don&rsquo;t Pay Until You&rsquo;re Satisfied</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Zero advance. Walk every room with the supervisor, approve the work, then pay. Anything missed is re-cleaned free within 24 hours — offer bookings included.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
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

      <FaqSection faqs={cfg.faqs} />

      <FinalCta />
    </>
  );
}

// Canonical URL helper for ad platforms (parity with pageUrl in lib/site.js).
export function ppcUrl(file) {
  return file === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${file}.html`;
}
