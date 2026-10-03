import QuoteForm from './QuoteForm.jsx';
import { PHONE_TEL } from '../lib/site.js';
import { phoneCallClick } from '../lib/landing.js';

const PILLS = [
  'Same-Day Service',
  'Police-Verified Team',
  'Pay After Cleaning',
  '100% Satisfaction',
  'Eco-Friendly Products',
];

const STATS = [
  ['5,000', '+', 'Homes Cleaned'],
  ['4.5', '★', 'Average Rating'],
  ['98', '%', 'Happy Customers'],
  ['₹2,000', '+', 'Starting Price'],
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <svg width="8" height="8" fill="#90c714" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
            Gurgaon&apos;s Trusted Deep Cleaning Service · 4.5★ Rated by 148 Customers
          </div>
          <h1>
            <span className="hl">Full Home Deep Cleaning in Gurgaon</span> — <span className="hl2">Pay Only After We Finish</span>
          </h1>
          <p className="hero-sub">
            Expert deep cleaning for your entire home — bedroom, living room, kitchen, bathrooms, floors, walls &amp; more. Rated among deep cleaning services in Gurgaon for pay-after-satisfaction. Professional, police-verified team. <strong>₹200 OFF today.</strong> Same-day booking available in all Gurgaon areas.
          </p>
          <div className="hero-actions">
            <a href="#formCard" className="btn btn-primary">Get Free Quote →</a>
            <a href={PHONE_TEL} className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }} onClick={phoneCallClick}>📞 +91 92679-05943</a>
          </div>
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
  );
}
