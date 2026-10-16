import { WEB3FORMS_KEY } from './site.js';

// Shared lead sender for all Aone forms (Web3Forms).
// Returns true ONLY when Web3Forms confirms success
// (HTTP 2xx AND json.success === true). Any network error,
// timeout, non-2xx status or success:false resolves to false.
// NOTE: Web3Forms blocks server-side (non-browser) requests, so this
// must only be called from browser event handlers — never during prerender.
const ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 10000;

export async function sendLead({ name, phone, source = 'Website', page, fields } = {}) {
  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), TIMEOUT_MS) : null;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'New lead - Aone Deep Cleaning',
        from_name: 'Aone Website',
        name: name || '',
        phone: phone || '',
        source,
        page: page || (typeof window !== 'undefined' ? window.location.href : ''),
        botcheck: '', // honeypot — must stay empty; free plan has no domain restriction
        ...(fields || {}),
      }),
      ...(ctrl ? { signal: ctrl.signal } : {}),
    });
    if (!res.ok) return false;
    const json = await res.json().catch(() => null);
    return Boolean(json && json.success === true);
  } catch (err) {
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
