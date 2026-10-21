import { useState, useEffect, useRef } from 'react';
import { PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick } from '../lib/landing.js';
import { normalizePhone, isValidPhone } from '../lib/phone.js';
import { focusField, notifyRejected } from '../lib/form-reject.js';

const STEPS = [{ title: 'Your Details' }, { title: 'Service' }, { title: 'Schedule' }];
const STORAGE_KEY = 'sdc_lead';

// Multi-step quote form: progress bar, localStorage draft, Web3Forms submit.
export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', phone: '', service: '', date: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setData((d) => ({ ...d, ...JSON.parse(s) }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // The name/phone fields live on step 0 and are unmounted while the visitor
  // is on the last step, so a refused submit has to walk them back to step 0
  // before the focus can be moved into the field. That focus jump is the
  // signal click-guard's beacon (v12) reads to see that the SITE refused the
  // submit, so the conversion is undone instead of faking a lead.
  const backToDetails = (field) => {
    setStep(0);
    setTimeout(() => {
      focusField(field === 'phone' ? phoneRef.current : nameRef.current);
    }, 0);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const n = String(data.name || '').trim();
    // Normalise ONCE, at submit — never while typing.
    const p = normalizePhone(data.phone);
    if (n.length < 2) {
      setError('❌ Please enter your full name.');
      notifyRejected();
      backToDetails('name');
      return;
    }
    if (!isValidPhone(p)) {
      setError('❌ Enter a valid 10-digit mobile number (it starts with 6-9).');
      notifyRejected();
      backToDetails('phone');
      return;
    }
    setStatus('sending');
    const ok = await sendLead({
      name: n,
      phone: p,
      source: 'Multi-Step Form',
      fields: { service: data.service, date: data.date, message: data.message },
    });
    if (ok) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      track('generate_lead', { event_category: 'Lead', event_label: 'Multi-Step Form' });
      window.setTimeout(() => { window.location.href = '/thank-you.html'; }, 250);
      return;
    }
    setStatus('idle');
    setError(`❌ Couldn't send your request. Please call ${PHONE} or`);
    // The send failed, so no lead exists on the site either — click-guard
    // must not count this as a conversion.
    notifyRejected();
    backToDetails('phone');
  };

  return (
    <form className="multistep" onSubmit={submit}>
      <div className="steps-bar">
        {STEPS.map((s, i) => (
          <div key={i} className={`bar${i <= step ? ' done' : ''}`} />
        ))}
      </div>
      <p className="text-muted" style={{ marginBottom: 16 }}>
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>

      {step === 0 && (
        <>
          <label>Your Name *</label>
          <input value={data.name} onChange={(e) => set('name', e.target.value)} required ref={nameRef} />
          <label>Phone *</label>
          {/* No `pattern`: the old one ("[0-9+ ]{8,15}") made the BROWSER
              refuse a hyphenated number ("98739-15215") or a "+91 98739 15215"
              outright, so the visitor could not submit at all and the lead was
              lost. Every format is accepted here and normalised at submit.
              The maxLength counts CHARACTERS, so it must stay wide enough
              for "+91 98739-15215" — a tighter cap would cut a valid number
              into a different, valid-looking one. */}
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
            inputMode="numeric"
            maxLength="20"
            autoComplete="tel"
            required
            ref={phoneRef}
          />
        </>
      )}
      {step === 1 && (
        <>
          <label>Service Needed</label>
          <input value={data.service} onChange={(e) => set('service', e.target.value)} placeholder="e.g. 2 BHK deep cleaning" />
          <label>Message</label>
          <textarea rows="3" value={data.message} onChange={(e) => set('message', e.target.value)} />
        </>
      )}
      {step === 2 && (
        <>
          <label>Preferred Date</label>
          <input type="date" value={data.date} onChange={(e) => set('date', e.target.value)} />
          <p className="lead-note">We’ll confirm the exact time by phone.</p>
        </>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {step > 0 && (
          <button type="button" className="btn btn-outline" onClick={prev}>
            Back
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button type="button" className="btn btn-primary" onClick={next}>
            Next
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button type="submit" className="btn btn-secondary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </button>
        )}
      </div>
      {error && (
        <p className="form-error">
          {error}{' '}
          <a href={waMsg('Hi, my booking request on your website did not go through. Please call me back.')} target="_blank" rel="noopener" onClick={whatsappClick}>
            WhatsApp us →
          </a>
        </p>
      )}
    </form>
  );
}
