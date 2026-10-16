import { useState } from 'react';
import { PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick } from '../lib/landing.js';

// Simple lead form posting to Web3Forms, then redirecting to thank-you.html.
export default function LeadForm({ formName = 'lead', source = 'Website', compact = false }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const data = new FormData(e.target);
    const ok = await sendLead({
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
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
  };

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="source" value={source} />
      <div className={compact ? 'hero-form-row' : ''}>
        <div>
          <label htmlFor={`${formName}-name`}>Your Name *</label>
          <input id={`${formName}-name`} name="name" placeholder="e.g. Rahul Sharma" required />
        </div>
        <div>
          <label htmlFor={`${formName}-phone`}>Phone Number *</label>
          <input
            id={`${formName}-phone`}
            name="phone"
            type="tel"
            placeholder="+91 9267905943"
            pattern="[0-9+ ]{8,15}"
            required
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
