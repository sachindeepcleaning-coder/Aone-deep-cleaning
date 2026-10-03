import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, localBusinessSchema, faqSchema, serviceSchema } from '../lib/schema.jsx';

const WHO = [
  ['🏢', 'RWAs & Facility Desks', 'Cluster-day bookings for whole towers: one roster, one supervisor, one GST invoice. Pre-festival season slots for Diwali and Holi rushes.'],
  ['🏘️', 'Villa Owners & Floors', 'Independent houses and builder floors with terraces, stairwells and larger plates — 5–6 cleaner crews with facade-reachable wash.'],
  ['🛏️', 'PG Operators & Hostels', 'Room-turnover details between occupants: single rooms from ₹800, whole-floor resets on fixed per-room rates.'],
  ['🏪', 'Society Shops & Clinics', 'Market-complex shops, dental and physio clinics inside societies — after-hours crews that never disturb footfall.'],
];

const FAQS = [
  ['How do society cluster-day bookings work?', 'Your tower books multiple flats on one roster day. One supervisor runs the schedule, gate passes are pre-cleared in bulk, and each flat still gets its own fixed quote, walkthrough and pay-after terms. Ask for your society’s next cluster day on WhatsApp.'],
  ['Can our RWA get a single GST invoice?', 'Yes — consolidated GST invoicing with itemised flat-wise scope lines for facility desks and RWA treasurers, plus staff ID records and photo-logged walkthrough reports on request.'],
  ['Do you handle move-in/out turnover for rented flats?', 'Yes — landlord-checklist resets (kitchen degrease, bathroom descale, floor scrub, ticked sign-off sheet) that protect deposits. Owners and property managers across DLF, Vatika City, Nirvana Country and Sushant Lok use us between tenancies.'],
  ['What does society apartment cleaning cost?', 'Same city-wide rates: 1 BHK from ₹2,500, 2 BHK from ₹4,500, 3 BHK from ₹5,500. Single rooms from ₹800. No travel or gate surcharge in any sector — price locked on call.'],
  ['Which societies do you already serve?', 'Festive and quarterly routes run across DLF Phase 1–5, Golf Course Road & Extension, Sushant Lok 1–3, South City 1–2, Sohna Road (Vatika City, Nirvana Country, Ardee City), Palam Vihar, Sectors 14–92, Emaar Emerald Hills, Godrej Aria and Unitech South City.'],
  ['Can PG operators schedule recurring room turnovers?', 'Yes — per-room rates with quiet-hour timing around residents, same verification and walkthrough standards as full-home jobs. Weekly and bi-weekly turnover plans available.'],
  ['Society me bulk booking par rate kam hota hai kya?', 'Rate card same rehta hai — lekin cluster day par slots pakke, gate-pass bulk clearance aur supervisor dedicated milta hai. Asli bachat repeat visits aur zero-delay me hai, hidden discount ke vaadon me nahi.'],
];

const STEPS = [
  ['Share society + scope', 'RWA contact or owner sends tower name, flat count or BHK mix, and preferred date on WhatsApp +91 9267905943.'],
  ['Fixed quote per unit', 'Each flat or room gets an itemised locked price — BHK bands plus add-ons. Consolidated billing for the society.'],
  ['Gate pre-clearance', 'Team IDs and police-verification shared a day prior; service-lift windows mapped with the facility desk.'],
  ['Cluster-day execution', 'Supervisor-led roster works flat to flat; each walkthrough signed before payment — UPI, cash or bank transfer.'],
];

export default function PartnersPage({ url }) {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: 'Society & Apartment Cleaning Services in Gurgaon', description: 'Bulk RWA cluster-day bookings, villa and PG turnover cleaning across Gurgaon societies. Fixed quotes, GST invoice, pay after walkthrough.', url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Societies · RWAs · Villas · PG Operators
            </div>
            <h1>
              <span className="hl">Society Cleaning Services in Gurgaon</span><br />
              RWA Bulk Bookings, <span className="hl2">One Trusted Crew</span>
            </h1>
            <p className="hero-sub">
              <a href="/deep-cleaning-services-in-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>Cluster-day deep cleaning</a> for towers, villa rows and PG floors — one roster, one supervisor,
              one GST invoice. Serving Gurgaon societies <strong>since 2015</strong> with fixed quotes and
              <strong> pay only after walkthrough</strong>.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> Bulk Cluster Days</span>
              <span className="pill"><span className="pi">✓</span> GST Invoice</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Crew</span>
              <span className="pill"><span className="pi">✓</span> Pay After Walkthrough</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Who We Serve</div>
            <h2 className="section-title">Built for How Gurgaon Societies Actually Work</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Gate passes, service lifts, quiet hours, <a href="/blog/diwali-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>festival rushes</a> — society cleaning fails on logistics, not mops. Our cluster model solves the logistics first.</p>
          </div>
          <div className="whyus-grid">
            {WHO.map(([icon, title, desc]) => (
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
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">From RWA Message to Signed Walkthroughs</h2>
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

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }} className="fade-up">
            <div className="section-tag">Why Societies Stay Since 2015</div>
            <h2 className="section-title">The Same Crews, Season After Season</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A decade of Diwali rushes, tenant turnovers and monsoon recoveries across <a href="/blog/dlf-phase-4-deep-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>DLF 1–5</a>, Vatika City, Nirvana Country, <a href="/blog/sushant-lok-3-deep-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sushant Lok</a>, South City, Palam Vihar and Sectors 14–92. Facility desks keep our number because gate formalities, fixed billing and re-clean windows work the same way every single time — no retraining a new vendor each festival. Tower clusters, villa rows and PG floors all run on the identical pay-after-walkthrough promise as single homes: inspect every room first, pay only on approval, with a free 24-hour re-clean on any miss.</p>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <AreasSection />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="faq-wrap">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Society & Bulk Booking Questions</h2>
            </div>
            <FaqSection faqs={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
