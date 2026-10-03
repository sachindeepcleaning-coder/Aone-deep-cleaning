import { waMsg } from '../lib/site.js';
import { phoneCallClick, whatsappClick } from '../lib/landing.js';

export default function ThankYouPage() {
  return (
    <section className="hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="hero-grid"></div>
      <div className="hero-inner" style={{ maxWidth: 720, textAlign: 'center', display: 'block' }}>
        <div className="hero-eyebrow" style={{ margin: '0 auto 18px' }}>Request Received</div>
        <h1>Thank You, <span className="hl">We’ll Call You Back!</span></h1>
        <p className="hero-sub">
          We’ve received your request and a member of our team will call you within <strong>5 minutes</strong> to confirm your booking. For an even faster reply, chat with us on WhatsApp.
        </p>
        <div className="final-cta-btns" style={{ justifyContent: 'center' }}>
          <a href={waMsg('Hi, I just submitted a quote. Please share pricing.')} target="_blank" rel="noopener" className="fcta-wa" onClick={whatsappClick}>
            💬 WhatsApp Us Now
          </a>
          <a href="tel:+919267905943" className="fcta-call" onClick={phoneCallClick}>
            📞 Call: +91 92679-05943
          </a>
        </div>
        <p style={{ marginTop: '28px' }}>
          <a href="/" style={{ color: '#8FA4BE', textDecoration: 'none', fontWeight: 600 }}>← Back to home</a>
        </p>
      </div>
    </section>
  );
}