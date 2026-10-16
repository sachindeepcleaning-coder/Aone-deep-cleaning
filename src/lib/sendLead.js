import { WEB3FORMS_KEY, GATEWAY_URL, SITE_KEY } from './site.js';

// Shared lead sender for all Aone forms (gateway-first, Web3Forms fallback).
// Returns true ONLY on confirmed delivery
// (HTTP OK AND json.success === true from either path). Any network error,
// timeout, non-OK status or success:false resolves to false, so each form's
// existing success path (generate_lead event, thank-you redirect) and failure
// path stay exactly as they are.
// NOTE: Web3Forms blocks server-side (non-browser) requests, so this
// must only be called from browser event handlers — never during prerender.
const ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 10000;
const GATEWAY_TIMEOUT_MS = 6000;

export async function sendLead({ name, phone, source = 'Website', page, fields } = {}) {
  const resolvedPage = page || (typeof window !== 'undefined' ? window.location.href : '');
  // Gateway "message": fold every extra fields entry (the Worker only
  // accepts site/name/phone/source/page/message/botcheck, so service, date,
  // etc. would otherwise be dropped) into "Label: value" lines, then append
  // the user's own message text. Control chars stripped, trimmed, capped at
  // the Worker limit (worker.js: message.length > 2000 -> bad_message).
  const GATEWAY_MESSAGE_LIMIT = 2000;
  const SKIP_KEYS = new Set(['message', 'name', 'phone', 'botcheck', 'access_key']);
  const toLabel = (k) => {
    const words = String(k).replace(/[_-]+/g, ' ').replace(/([a-z0-9])([A-Z])/g, '$1 $2').trim().split(/\s+/).filter(Boolean);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Field';
  };
  const clean = (v) => String(v).replace(/[\u0000-\u001F\u007F]+/g, ' ').trim();
  const extraLines = [];
  if (fields && typeof fields === 'object') {
    for (const [k, v] of Object.entries(fields)) {
      if (SKIP_KEYS.has(k)) continue;
      if (typeof v !== 'string' && typeof v !== 'number') continue;
      const val = clean(v);
      if (!val) continue;
      extraLines.push(`${toLabel(k)}: ${val}`);
    }
  }
  const userMessage = fields && typeof fields.message === 'string' ? clean(fields.message) : '';
  if (userMessage) extraLines.push(userMessage);
  const gatewayMessage = extraLines.join('\n').slice(0, GATEWAY_MESSAGE_LIMIT).trim();

  // ---- 1. Try the lead gateway first (6s timeout). ----
  // If it confirms delivery (OK + success true) we return true HERE and
  // Web3Forms is NEVER called on this path.
  try {
    const gwCtrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const gwTimer = gwCtrl ? setTimeout(() => gwCtrl.abort(), GATEWAY_TIMEOUT_MS) : null;
    try {
      const gwRes = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          site: SITE_KEY,
          name: name || '',
          phone: phone || '',
          source,
          page: resolvedPage,
          ...(gatewayMessage ? { message: gatewayMessage } : {}),
          botcheck: '',
        }),
        ...(gwCtrl ? { signal: gwCtrl.signal } : {}),
      });
      if (gwRes.ok) {
        const gwJson = await gwRes.json().catch(() => null);
        if (gwJson && gwJson.success === true) return true;
      }
    } finally {
      if (gwTimer) clearTimeout(gwTimer);
    }
  } catch (_) {
    // Gateway network error / timeout / abort — fall through to Web3Forms.
  }

  // ---- 2. Fallback: existing Web3Forms call, unchanged. ----
  // Reached ONLY when the gateway did not confirm delivery.
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
