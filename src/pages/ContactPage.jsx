import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import ReelSection from '../components/ReelSection.jsx';
import { JsonLd, localBusinessSchema } from '../lib/schema.jsx';
import { waMsg } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

const FAQS = [
  ['How quickly can you start?', 'Often within 24 hours — same-day when you message before noon. WhatsApp us your sector and BHK and we confirm the nearest slot, usually within 30 minutes.'],
  ['Do you serve my area?', 'Yes — every sector across Gurgaon: DLF Phase 1–5, Sohna Road, Golf Course Road & Extension, Sushant Lok, South City, Palam Vihar, Sectors 14–92, Cyber City, MG Road and Manesar. Name your society and we confirm in one message.'],
  ['What does it cost?', 'House cleaning from ₹499/visit; full-home deep clean ₹2,500 (1 BHK) to ₹9,000 (villa); kitchen from ₹1,500; bathroom from ₹800; sofa from ₹499/seat. Free estimate on WhatsApp or via the form — price locked before booking, nothing hidden.'],
  ['What are your working hours?', 'Monday–Sunday, 8:00 AM – 8:00 PM for bookings and service. Early-morning, evening and weekend slots available; office cleaning runs after-hours so your team is never disturbed.'],
  ['How do I pay?', 'UPI, cash or bank transfer — only after the walkthrough, when you approve the work. Zero advance, ever. If any area misses the mark, we re-clean free within 24 hours.'],
  ['Can I reschedule or cancel?', 'Yes — message or call us and we move your slot free of charge. Morning-of changes are fine; we would rather arrive when it suits you than rush a bad slot.'],
  ['Do you need anything from my side?', 'Only water access and entry. We bring all machines, eco-friendly products and tools. For societies, share the tower/gate info and we handle the visitor-pass process with our IDs.'],
  ['Is the estimate on call really final?', 'Yes. We itemise rooms, bathrooms, kitchen and add-ons on the confirmation call and that figure is locked. The team cannot revise it on-site — if scope was misjudged on our side, that is our cost, not yours.'],
  ['Do you respond on Sundays and holidays?', 'Yes — bookings run all 7 days, 8 AM to 8 PM, including most holidays. Festival weeks (Diwali, Navratri) operate with extended rosters; message a day earlier in peak weeks for first pick of slots.'],
  ['I am a first-time customer — what should I ask on the call?', 'Four things cover 90% of surprises: exact room-by-room scope, crew size and hours for your BHK, what is excluded (fridge interiors? marble polish?), and the re-clean window. Our manager answers all four unprompted — use them to cross-check any competitor too.'],
  ['Do you give written quotes for offices and societies?', 'Yes — itemised written quotes with scope lines go on email or WhatsApp for every office, shop and RWA booking, with GST invoice on completion. Facility desks in Cyber City and Udyog Vihar routinely clear them same-day.'],
];

export default function ContactPage({ url }) {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Contact Balaji Deep Cleaning
            </div>
            <h1>
              <span className="hl">Get Your Free Quote</span><br />
              in Gurgaon<br />
              <span className="hl2">Same-Day</span> Booking
            </h1>
            <p className="hero-sub">
              Leave your details and we’ll call you back in under 5 minutes — often under 3. Or reach us directly on WhatsApp for an instant reply from our work manager, who confirms your sector slot and <a href="/blog/deep-cleaning-cost-gurgaon-2026.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>locks your fixed price</a> in the same chat.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> 5-Min Callback</span>
              <span className="pill"><span className="pi">✓</span> Free Estimate</span>
              <span className="pill"><span className="pi">✓</span> No Advance Pay</span>
            </div>
            <div style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={waMsg('Hi, I would like to get a quote for cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ margin: 0 }} onClick={whatsappClick}>
                💬 WhatsApp Us Now — Instant Reply
              </a>
              <a href="tel:+919560739281" className="fcta-call" style={{ margin: 0, textAlign: 'center' }} onClick={phoneCallClick}>
                📞 Call: +91 95607-39281
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">What Happens Next</div>
            <h2 className="section-title">After You Hit Send — Minute by Minute</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>No black boxes, no “we’ll get back shortly”. Here is the exact chain from your message to a team at your door.</p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {[
              ['0–3 min: human callback', 'Our work manager — not a bot — calls back, usually within 3 minutes in working hours (8 AM–8 PM). After hours, first thing next morning.'],
              ['3–10 min: scope + fixed price', 'BHK, bathrooms, kitchen type and add-ons itemised on the call. One locked figure — 1 BHK from ₹2,500, 2 BHK from ₹4,500, 3 BHK from ₹5,500.'],
              ['10–30 min: slot locked', 'Nearest zone roster checked — DLF, Golf Course, Sohna, West or Central. Same-day when you message before noon; society gate formalities started early.'],
              ['On the day: equipped arrival', 'Police-verified team with machines, descalers and eco-friendly products. Team lead number shared with you before arrival.'],
              ['After: walkthrough, then pay', 'You inspect every room first and pay only on approval — UPI, cash or bank transfer. Anything missed is re-cleaned on the spot, free.'],
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

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Three Ways In</div>
            <h2 className="section-title">Call, WhatsApp or Form — Same Promise</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Every channel reaches the same Gurgaon desk, the same fixed-price rule and the same pay-after walkthrough. Pick whichever is fastest for you right now.</p>
          </div>
          <div className="whyus-grid" style={{ marginTop: '28px' }}>
            {[
              ['📞', 'Call +91 95607-39281', 'Fastest for complex jobs — villas, offices, post-renovation. Talk scope with the manager and lock the price in one conversation.'],
              ['💬', 'WhatsApp with photos', 'Best for accuracy — send room, kitchen and bathroom photos with your sector and BHK; the fixed quote comes back with zero guesswork.'],
              ['📝', 'Quote form above', 'Best when busy — drop name, number and requirement; callback in under 5 minutes in working hours. Zero spam, zero commitment.'],
              ['🏢', 'Societies & offices', 'Share tower, sq ft and timing constraints once — RWA passes, service lifts and after-hours windows handled for you.'],
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
            <div className="section-tag">Request a Quote</div>
            <h2 className="section-title">Tell Us About Your Home</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Fill the form above or reach out directly — no commitment, no hidden charges.</p>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            <div className="hiw-step fade-up">
              <div className="hiw-num">1</div>
              <div className="hiw-title">Call or WhatsApp</div>
              <div className="hiw-desc">Share your requirements with our team.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">2</div>
              <div className="hiw-title">Get a Free Quote</div>
              <div className="hiw-desc">Transparent pricing confirmed on the call.</div>
            </div>
            <div className="hiw-step fade-up">
              <div className="hiw-num">3</div>
              <div className="hiw-title">We Clean</div>
              <div className="hiw-desc">Pay only after you inspect the results.</div>
            </div>
          </div>
        </div>
      </section>

      <AreasSection />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Find Us</div>
            <h2 className="section-title">We Serve Every Sector of Gurgaon</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Service-area business — no single shop counter, team dispatched to your sector. Headquarters at <a href="/blog/sushant-lok-1-deep-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sushant Lok Phase I</a> with zone rosters across DLF, <a href="/blog/golf-course-road-deep-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>Golf Course Road</a>, <a href="/blog/sohna-road-deep-cleaning-gurgaon.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sohna Road</a>, West and Central Gurgaon, so the <a href="/residential-cleaners-near-me.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>nearest crew</a> — never a cross-city one — gets your job. Call +91 95607-39281 to confirm nearest slot.</p>
          </div>
          <div style={{ marginTop: 32, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', height: 360 }} className="fade-up">
            <iframe
              title="Balaji Deep Cleaning — A one deep cleaning, Sushant Lok Phase I, Gurugram"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.0786716!3d28.4612679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1918a4b66c09%3A0xd7f8d0265ff60bef!2sA%20one%20deep%20cleaning!5e0!3m2!1sen!2sin"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '.92rem', color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--dark)' }}>Balaji Deep Cleaning</strong> — Sushant Lok Phase I, Gurugram, Haryana 122009 &nbsp;|&nbsp; <a href="tel:+919560739281" style={{ color: 'var(--primary)', fontWeight: 700 }}>+91 95607-39281</a>
          </div>
        </div>
      </section>

      <ReelSection />
      <FaqSection faqs={FAQS} />
    </>
  );
}