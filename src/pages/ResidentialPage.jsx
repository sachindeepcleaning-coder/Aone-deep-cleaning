import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import PricingSection from '../components/PricingSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import YtShortsSection from '../components/YtShortsSection.jsx';
import { JsonLd, localBusinessSchema, faqSchema, serviceSchema } from '../lib/schema.jsx';

const NEAR_ME = [
  ['📍', 'Closest Available Team', 'We route your request to the cleaning crew already working nearest to your sector — not a team crossing the whole city.'],
  ['⏱️', 'Faster Arrival Windows', 'Local dispatch means shorter travel time, which usually means a same-day or next-morning slot instead of a multi-day wait.'],
  ['🏢', 'Familiar With Local Societies', 'Our teams already have visitor-pass experience with most major RWAs and gated societies across Gurgaon.'],
  ['👮', 'Still Fully Verified', 'Nearby never means less vetted — every cleaner, local or not, is police-verified and ID-checked before entering your home.'],
];

const FAQS = [
  ['What do residential cleaning services near me include in Gurgaon?', 'Everything a Gurgaon home needs: full-home deep clean (all rooms, kitchen chimney degreasing, bathroom descaling, windows, balconies) plus single services — sofa shampoo from ₹499/seat, carpet from ₹15/sq ft, and weekly house cleaning from ₹499/visit. Villas add terrace and facade wash.'],
  ['Are you the same team for deep cleaners near me and home cleaners near me searches?', 'Yes — whether you search residential cleaning services near me, deep cleaners near me, home cleaners near me or deep cleaning services near me, you reach the same police-verified local team. The wording differs; the booking, machines and pay-after-satisfaction guarantee are identical.'],
  ['How do you decide which cleaning team is nearest to me?', 'We match your area or sector to the crew already working closest to it that day. This is why we ask for your area in the quote form — it directly affects your arrival time.'],
  ['Is a local team as reliable as a citywide company?', 'Yes — every cleaner, regardless of which zone they are dispatched from, goes through the same police verification, training, and satisfaction guarantee.'],
  ['Can I get same-day residential cleaning near me?', 'In most Gurgaon sectors, yes — especially if you book before noon. We will confirm exact same-day availability for your specific area on the callback.'],
  ['Do you cover gated societies and RWAs?', 'Yes. Our teams regularly work across Gurgaon major societies and are used to standard visitor-entry and ID-verification processes.'],
  ['What if my exact locality is not listed?', 'Our listed areas are not exhaustive. Call us directly — we cover most of Gurgaon and can usually confirm coverage in under a minute.'],
  ['How is pricing fixed for my specific home?', 'On the confirmation call we itemise your BHK, bathroom count, kitchen type and add-ons (sofa seats, carpet sq ft) and lock one figure. 1 BHK from ₹2,500, 2 BHK from ₹4,500, 3 BHK from ₹5,500 — same in every sector, no travel or gate-entry surcharge.'],
  ['Do you clean villas and builder floors, not just flats?', 'Yes — villas and floors get larger teams (5–6 cleaners), terrace and facade wash, and stairwell detailing. 4–5 BHK villa packages run ₹6,500–₹9,000 with the same pay-after walkthrough.'],
  ['Can I get the same team for repeat visits?', 'On weekly and bi-weekly plans, yes — the same crew learns your home, your RWA gate and your preferences. One-time and festive bookings get the nearest available verified team.'],
];

const PILLS = [
  'Nearby Team Dispatch',
  'Police-Verified',
  'Pay After Cleaning',
  'Same-Day Slots',
];

const STATS = [
  ['5,000', '+', 'Homes Cleaned'],
  ['4.5', '★', 'Average Rating'],
  ['30', '+', 'Sectors Covered'],
  ['₹2,000', '+', 'Starting Price'],
];


export default function ResidentialPage({ url }) {


  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: 'Residential Cleaners Near Me in Gurgaon', description: 'Local, police-verified residential cleaners dispatched from the team nearest to your Gurgaon area. Pay only after cleaning.', url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Local Team · Gurugram · 4.5★ Rated
            </div>
            <h1>
              <span className="hl">Residential Cleaners Near Me?</span><br />
              You've Found Gurgaon's<br />
              <span className="hl2">Local, Verified Team</span>
            </h1>
            <p className="hero-sub">
              Searching residential cleaning services near me, deep cleaners near me, home cleaners near me or deep cleaning services near me? Our nearest verified team reaches your sector <strong>today</strong>. Police-verified residential cleaners, transparent pricing, and <strong>pay only after cleaning</strong>.
            </p>
            <div className="hero-pills">
              {PILLS.map((p) => (
                <span key={p} className="pill"><span className="pi">✓</span> {p}</span>
              ))}
            </div>
            <div className="hero-stats">
              {STATS.map(([num, suffix, label]) => (
                <div key={label} className="hs">
                  <div className="hs-num">{num}<span>{suffix}</span></div>
                  <div className="hs-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Local Coverage</div>
            <h2 className="section-title">Why "Residential Cleaners Near Me" Actually Matters</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A nearby team means faster arrival, lower travel delays, and someone who already knows your building or society's access rules.</p>
          </div>
          <div className="whyus-grid">
            {NEAR_ME.map(([icon, title, desc]) => (
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

      <PricingSection />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Who We Serve</div>
            <h2 className="section-title">Every Kind of Gurgaon Residence</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Society flat, builder floor, villa or PG room — the nearest team carries the right checklist for your home type, not a one-size-fits-all wipe.</p>
          </div>
          <div className="whyus-grid">
            {[
              ['🏢', 'Society Flats (1–4 BHK)', 'Tower protocols, service lifts and quiet hours handled. DLF 1–5, Vatika City, Nirvana Country, Sushant Lok, South City and all Huda-sector societies.'],
              ['🏠', 'Builder Floors & Villas', 'Stairwells, terraces, larger plates and facade wash. Golf Course Extension, Ardee City, Emaar Emerald Hills, Godrej Aria and Manesar villas.'],
              ['🏚️', 'Old Gurgaon Houses', 'Palam Vihar, Sectors 14/15/22 and plotted houses with Kota stone, older fittings and heavy descaling needs.'],
              ['🛏️', 'PG & Rental Rooms', 'Single-room details with quiet timing around flatmates. Sector 45/46/57, Cyber City and MG Road corridors.'],
            ].map(([icon, title, desc]) => (
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
            <div className="section-tag">How Dispatch Works</div>
            <h2 className="section-title">From Your Message to Our Team at Your Door</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Five zone rosters (DLF corridor, Golf Course, Sohna/South, West/Old Gurgaon, Cyber/Central) plus New Gurgaon and Manesar coverage — the crew already working nearest to you gets your job.</p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {[
              ['Share sector + BHK', 'WhatsApp +91 9560739281 — society, tower and preferred date. Thirty seconds of typing.'],
              ['Nearest roster checked', 'We match your zone, not a random citywide queue — travel stays under an hour.'],
              ['Fixed quote on call', 'Rooms, baths, kitchen and add-ons itemised and locked. No travel fee, ever.'],
              ['Team arrives equipped', 'Machines, descalers and eco-friendly products in hand; IDs ready for your gate.'],
              ['Walkthrough, then pay', 'You inspect every room first. UPI, cash or bank transfer after approval.'],
            ].map(([title, desc], i) => (
              <div key={title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{title}</div>
                <div className="hiw-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="section section-alt">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="fade-up">
            <div className="section-tag">Real Work</div>
            <h2 className="section-title">See a Real Deep Cleaning in Action</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Watch a residential deep-cleaning job done by our team in Gurgaon.</p>
          </div>
          <div className="reel-showcase">
            <div className="reel-showcase-item">
              <span className="reel-showcase-label">📱 Live Instagram Reel</span>
              <div className="sdc-ig-card">
                <div className="ig-reel-frame">
                  <a
                    href="https://www.instagram.com/reel/DbtA_gdz5zA/"
                    target="_blank"
                    rel="noopener"
                    className="yt-thumb"
                    aria-label="Watch residential deep-cleaning reel on Instagram"
                  >
                    <img
                      src="/images/full-home-deep-cleaning.webp"
                      alt="Residential deep-cleaning job in Gurgaon — watch on Instagram"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="yt-play-btn">▶</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '.84rem', color: 'var(--muted)' }}>
            Can't see the reel? <a href="https://www.instagram.com/reel/DbtA_gdz5zA/" target="_blank" rel="noopener" style={{ color: 'var(--green)', fontWeight: 700 }}>View on Instagram →</a>
          </p>
        </div>
      </section>

      <YtShortsSection />

      <AreasSection />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="faq-wrap">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Residential Cleaners Near Me — Common Questions</h2>
            </div>
            <FaqSection faqs={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
