import { useState, useRef } from 'react';
import { NETLIFY_FORM_NAME, PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick, thankYouPath } from '../lib/landing.js';
import { normalizePhone, isValidPhone } from '../lib/phone.js';
import { focusField, notifyRejected } from '../lib/form-reject.js';

// Hero quote form card.
// Lead delivery: Web3Forms via sendLead (works on GitHub Pages).
// On success it shows the confirmation state + WhatsApp nudge popup.
export default function QuoteForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [error, setError] = useState('');
  const [errorWa, setErrorWa] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sentPhone, setSentPhone] = useState('');
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorWa(false);
    const n = name.trim();
    // Normalise ONCE, here — never while typing. The visitor may type
    // "+91 98739-15215" or a leading 0; the raw value stays in the field and
    // is canonicalised at submit, so nothing is cut off mid-typing and the
    // gateway, the Sheet and the owner all get the same 10 digits.
    const p = normalizePhone(phone);
    if (n.length < 2) {
      setError('❌ Please enter your full name.');
      notifyRejected();
      focusField(nameRef.current);
      return;
    }
    if (!isValidPhone(p)) {
      setError('❌ Enter a valid 10-digit mobile number (it starts with 6-9).');
      notifyRejected();
      focusField(phoneRef.current);
      return;
    }
    setStatus('sending');

    const ok = await sendLead({ name: n, phone: p, source: 'Quote Form' });
    if (ok) {
      setStatus('success');
      setSentPhone(p);
      track('generate_lead', { event_category: 'Lead', event_label: 'Quote Form' });
      // Give GTM a beat to read the dataLayer, then redirect to the thank-you
      // page so the "GA4 Form submission" tag (page path /thank-you.html) fires.
      window.setTimeout(() => { window.location.href = thankYouPath(); }, 250);
      return;
    }
    setStatus('idle');
    setError(`❌ Couldn't send your request. Please call ${PHONE} or`);
    setErrorWa(true);
    // The send failed, so no lead exists on the site either — click-guard
    // must not count this as a conversion.
    notifyRejected();
    focusField(phoneRef.current);
  };

  if (status === 'success') {
    return (
      <div className="form-card" id="formCard">
        <div className="success-box" style={{ display: 'block' }}>
          <div className="s-icon">✅</div>
          <h3>Quote Request Sent!</h3>
          <p>We&rsquo;ll call <strong>+91{sentPhone || normalizePhone(phone)}</strong> within 5 minutes.<br />Want a faster reply? Chat with us on WhatsApp below ↓</p>
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

      {error && (
        <div className="error-msg" style={{ display: 'block' }}>
          {error}
          {errorWa && (
            <>
              {' '}
              <a href={waMsg('Hi! The quote form on your website failed to send. Please call me back.')} target="_blank" rel="noopener" onClick={whatsappClick}>
                WhatsApp us →
              </a>
            </>
          )}
        </div>
      )}

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
          <input type="text" id="fname" name="name" placeholder="e.g. Priya Sharma" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} />
        </div>
        <div className="field-wrap">
          <label htmlFor="fphone">Mobile Number <span className="req">*</span></label>
          <div className="phone-wrap">
            <span className="phone-prefix">+91</span>
            {/* 13 digits, not 10: the visitor may type "+91 98739-15215" or a
                leading 0. The raw value is kept until submit and normalised
                there (see onSubmit) so a valid number is never truncated
                away — truncating it used to LOSE the lead. */}
            <input type="tel" id="fphone" name="phone" placeholder="10-digit mobile number" inputMode="numeric" maxLength="13" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 13))} ref={phoneRef} />
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