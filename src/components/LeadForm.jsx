import { useState } from 'react';
import { FORMSPREE_ID } from '../lib/site.js';
import { track } from '../lib/landing.js';

// Simple lead form posting to Formspree, then redirecting to thank-you.html.
export default function LeadForm({ formName = 'lead', source = 'Website', compact = false }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const data = new FormData(e.target);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        track('generate_lead', { event_category: 'Lead', event_label: 'Lead Form' });
        window.setTimeout(() => { window.location.href = '/thank-you.html'; }, 250);
        return;
      }
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.errors?.[0]?.message || 'Something went wrong. Please try again or call us.');
    } catch (err) {
      setStatus('idle');
      setError(err.message);
    }
  };

  return (
    <form className="lead-form" onSubmit={onSubmit} data-formspree-id={FORMSPREE_ID}>
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
      {error && <p className="form-error">{error}</p>}
      <p className="lead-note">We’ll call you back to confirm your booking.</p>
    </form>
  );
}
