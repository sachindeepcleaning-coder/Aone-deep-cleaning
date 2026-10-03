import { useState, useRef, useEffect } from 'react';
import { NETLIFY_FORM_NAME, FORMSPREE_ID, PHONE, PHONE_TEL, waMsg } from '../lib/site.js';
import { track, whatsappClick, thankYouPath } from '../lib/landing.js';

// Hero quote form card.
// Primary: Netlify Forms (works when deployed to Netlify).
// Fallback: Formspree (works on Vercel / Cloudflare Pages / GitHub Pages).
// On success it shows the confirmation state + WhatsApp nudge popup.
export default function QuoteForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (typeof window.gtag === 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const n = name.trim();
    const p = phone.trim();
    if (n.length < 2) { setError('❌ Please enter your full name.'); return; }
    if (!/^[6-9][0-9]{9}$/.test(p)) { setError('❌ Enter a valid 10-digit Indian mobile number.'); return; }
    setStatus('sending');

    const success = () => {
      setStatus('success');
      track('generate_lead', { event_category: 'Lead', event_label: 'Quote Form' });
      // Give GTM a beat to read the dataLayer, then redirect to the thank-you
      // page so the "GA4 Form submission" tag (page path /thank-you.html) fires.
      window.setTimeout(() => { window.location.href = thankYouPath(); }, 250);
    };

    try {
      // 1) Try Netlify Forms first (host-native; no-op on non-Netlify hosts).
      const fd = new FormData();
      fd.append('form-name', NETLIFY_FORM_NAME);
      fd.append('name', n);
      fd.append('phone', p);
      const res = await fetch('/', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) { success(); return; }
      throw new Error('Netlify failed');
    } catch (netlifyErr) {
      // 2) Fallback: Formspree — works on Vercel / Cloudflare Pages / GitHub Pages.
      try {
        const fs = new FormData();
        fs.append('form-name', 'lead-quote');
        fs.append('name', n);
        fs.append('phone', p);
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: fs,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) { success(); return; }
        throw new Error('Formspree failed');
      } catch (formspreeErr) {
        setStatus('idle');
        setError('❌ Something went wrong. Please call ' + PHONE);
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="form-card" id="formCard">
        <div className="success-box" style={{ display: 'block' }}>
          <div className="s-icon">✅</div>
          <h3>Quote Request Sent!</h3>
          <p>We&rsquo;ll call <strong>+91{phone}</strong> within 5 minutes.<br />Want a faster reply? Chat with us on WhatsApp below ↓</p>
        </div>
        <a href={waMsg('Hi! I just submitted a quote. Please share pricing.')} target="_blank" rel="noopener" className="btn-wa-form" style={{ marginTop: '16px' }} onClick={whatsappClick}>
          💬 WhatsApp Us Now — Instant Reply
        </a>
      </div>
    );
  }

  return (
    <div className="form-card" id="formCard">
      <div className="form-offer">
        <div className="form-offer-icon">🎁</div>
        <div className="form-offer-text">
          <div className="form-offer-main">₹200 OFF + FREE Bathroom Clean</div>
          <div className="form-offer-sub">For new customers booking today</div>
        </div>
        <div className="form-offer-slots" id="slotsForm" data-slots></div>
      </div>

      <div className="form-title">Get Your FREE Quote — 30 Seconds</div>
      <div className="form-subtitle">
        We call you back in <span className="cb-time" id="callbackTime">under 3 min</span> · No spam, no commitment
      </div>

      {error && <div className="error-msg" style={{ display: 'block' }}>{error}</div>}

      <form
        ref={formRef}
        id="leadForm"
        data-netlify="true"
        name={NETLIFY_FORM_NAME}
        method="POST"
        action="/thank-you.html"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
        <div className="field-wrap">
          <label htmlFor="fname">Your Full Name <span className="req">*</span></label>
          <input type="text" id="fname" name="name" placeholder="e.g. Priya Sharma" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field-wrap">
          <label htmlFor="fphone">Mobile Number <span className="req">*</span></label>
          <div className="phone-wrap">
            <span className="phone-prefix">+91</span>
            <input type="tel" id="fphone" name="phone" placeholder="10-digit mobile number" inputMode="numeric" maxLength="10" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
          </div>
        </div>
        <button type="submit" className="btn-submit" id="submitBtn" disabled={status === 'sending'}>
          {status === 'sending' ? '⏳ Sending...' : '🧹 GET MY FREE QUOTE NOW →'}
        </button>
      </form>

      <div className="or-divider">or connect instantly</div>

      <a href={waMsg('Hi I want to get a free quote for deep cleaning in Gurgaon.')} target="_blank" rel="noopener" className="btn-wa-form" onClick={whatsappClick}>
        WhatsApp Us Now — Instant Reply
      </a>

      <div className="form-micro">
        <div className="form-micro-item"><span className="mi">🔒</span> 100% Private</div>
        <div className="form-micro-item"><span className="mi">⚡</span> 5-Min Callback</div>
        <div className="form-micro-item"><span className="mi">0️⃣</span> No Advance Pay</div>
      </div>
    </div>
  );
}