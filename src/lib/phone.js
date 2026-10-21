// Phone normalisation for the Aone Deep Cleaning lead forms.
//
// THE BUG THIS FIXES (owner priority: never lose a lead):
// the forms used to cut the input at 10 digits and then validate the RAW
// value, so
//   "09873915215"     -> truncated to "0987391521" -> regex failed -> the
//                         lead was dropped BEFORE sendLead ever ran
//                         (no email, no Sheet, no lead),
//   "+91 98739-15215" -> digits "919873915215" -> cut to "9198739152" ->
//                         the regex PASSED -> the lead gateway accepted it
//                         and the owner was emailed a WRONG number.
// Now the field keeps up to 13 digits, the value is normalised ONCE at
// submit time, and the canonical 10 digits are what the lead gateway, the
// Sheet and the owner get.
//
// Pure module (no imports) so it can be unit-tested with `node --test`.
// Test: tests/phone.test.mjs

// The lead gateway validates this exact pattern
// (email/worker/worker.js: /^[6-9][0-9]{9}$/).
export const PHONE_PATTERN = /^[6-9][0-9]{9}$/;

// Canonicalise an Indian mobile number typed by a visitor:
//   "9873915215"      -> "9873915215"
//   "09873915215"     -> "9873915215"   (leading 0)
//   "919873915215"    -> "9873915215"   (+91 country code)
//   "+91 98739-15215" -> "9873915215"
//   "98739 15215"     -> "9873915215"
// Anything else is returned as digits only and will fail isValidPhone().
export function normalizePhone(value) {
  let d = String(value === null || value === undefined ? '' : value).replace(/\D/g, '');
  if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
  else if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
  return d;
}

// True only for a canonical 10-digit Indian mobile number.
// Normalising first makes it safe to call with the raw field value.
export function isValidPhone(value) {
  return PHONE_PATTERN.test(normalizePhone(value));
}
