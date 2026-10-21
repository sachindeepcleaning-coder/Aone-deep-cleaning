import { useState, useRef } from 'react';
import { PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick } from '../lib/landing.js';
import { normalizePhone, isValidPhone } from '../lib/phone.js';
import { focusField, notifyRejected } from '../lib/form-reject.js';

// Simple lead form posting to Web3Forms, then redirecting to thank-you.html.
export default function LeadForm({ formName = 'lead', source = 'Website', compact = false }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData(e.target);
    const n = String(data.get('name') || '').trim();
    // Normalise ONCE, at submit: the visitor may type "09873915215",
    // "+91 98739-15215" or "98739 15215" and the canonical 10 digits are
    // what the gateway, the Sheet and the owner must get.
    const p = normalizePhone(String(data.get('phone') || ''));
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
    const ok = await sendLead({
      name: n,
      phone: p,
      source,
      fields: { message: String(data.get('message') || '').trim() },
    });
    if (ok) {
      track('generate_lead', { event_category: 'Lead', event_label: 'Lead Form' });
      window.setTimeout(() => { window.location.href = '/thank-you.html'; }, 250);
      return;
    }
    setStatus('idle');
    setError(`❌ Couldn't send your request. Please call ${PHONE} or`);
    // The send failed, so no lead exists on the site either — click-guard
    // must not count this as a conversion.
    notifyRejected();
    focusField(phoneRef.current);
  };

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="source" value={source} />
      <div className={compact ? 'hero-form-row' : ''}>
        <div>
          <label htmlFor={`${formName}-name`}>Your Name *</label>
          <input id={`${formName}-name`} name="name" placeholder="e.g. Rahul Sharma" required ref={nameRef} />
        </div>
        <div>
          <label htmlFor={`${formName}-phone`}>Phone Number *</label>
          {/* No `pattern`: the old one ("[0-9+ ]{8,15}") made the BROWSER
              refuse a hyphenated number ("98739-15215") or a "+91 98739 15215"
              outright, so the visitor could not submit at all and the lead was
              lost. Every format is accepted here and normalised at submit.
              The maxLength counts CHARACTERS, so it must stay wide enough
              for "+91 98739-15215" — a tighter cap would cut a valid number
              into a different, valid-looking one. */}
          <input
            id={`${formName}-phone`}
            name="phone"
            type="tel"
            placeholder="+91 9267905943"
            inputMode="numeric"
            maxLength="20"
            autoComplete="tel"
            required
            ref={phoneRef}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${formName}-msg`}>Message</label>
        <textarea id={`${formName}-msg`} name="message" rows="3" placeholder="Tell us about your cleaning needs" />
      </div>
      <button type="submit" className="btn btn-secondary btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Get Free Quote'}
      </button>
      {error && (
        <p className="form-error">
          {error}{' '}
          <a href={waMsg('Hi, my quote request on your website did not go through. Please call me back.')} target="_blank" rel="noopener" onClick={whatsappClick}>
            WhatsApp us →
          </a>
        </p>
      )}
      <p className="lead-note">We’ll call you back to confirm your booking.</p>
    </form>
  );
}
