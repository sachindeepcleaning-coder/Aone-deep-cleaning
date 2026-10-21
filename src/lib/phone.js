// Phone normalisation for the quote form.
//
// THE BUG THIS FIXES (owner priority: never lose a lead):
// the form used to cut the input at 10 digits and then validate the RAW
// value, so
//   "09873915215"     -> truncated to "0987391521" -> regex failed -> the
//                         lead was dropped BEFORE sendLead ever ran
//                         (no email, no Sheet, no lead),
//   "+91 98739-15215" -> digits "919873915215" -> cut to "9198739152" ->
//                         the regex PASSED -> the lead gateway accepted it
//                         and the owner was emailed a WRONG number.
// Now the value is normalised ONCE at submit time, and the canonical 10
// digits are what the lead gateway, the Sheet and the owner get.
//
// Canonicalise an Indian mobile number typed by a visitor:
//   "9873915215"      -> "9873915215"
//   "09873915215"     -> "9873915215"   (leading 0)
//   "919873915215"    -> "9873915215"   (+91 country code)
//   "+91 98739-15215" -> "9873915215"
//   "98739 15215"     -> "9873915215"
//   "091 98739 15215" -> "9873915215"   (leading 0 + country code)
//   "9109873915215"   -> "9873915215"   (+91 + a leading 0)
//   "0091 98739 15215"-> "9873915215"   (international prefix)
// Anything else is returned as digits only and will fail isValidPhone().
//
// A number we do NOT recognise is returned UNTOUCHED on purpose: it then
// fails validation loudly (the visitor sees the error and can retype it)
// instead of silently turning into a different — valid, wrong — number.
// That is the exact bug this fix exists to kill.
//
// Pure module (no imports) so it can be unit-tested with `node --test`.
// Test: tests/phone.test.mjs

// The lead gateway validates this exact pattern
// (email/worker/worker.js: /^[6-9][0-9]{9}$/).
export const PHONE_PATTERN = /^[6-9][0-9]{9}$/;

export function normalizePhone(value) {
  const d = String(value === null || value === undefined ? '' : value).replace(/\D/g, '');
  // Only a KNOWN prefix is stripped, and only when exactly 10 digits are
  // left behind — so no input can ever be silently reshaped into a
  // different valid number.
  if (d.length === 14 && d.indexOf('0091') === 0) return d.slice(4);            // 0091 + 10
  if (d.length === 13 && (d.indexOf('091') === 0 || d.indexOf('910') === 0)) {
    return d.slice(3);                                                          // 0+91 or 91+0, + 10
  }
  if (d.length === 12 && d.indexOf('91') === 0) return d.slice(2);               // 91 + 10
  if (d.length === 11 && d.charAt(0) === '0') return d.slice(1);                // 0 + 10
  return d;
}

// True only for a canonical 10-digit Indian mobile number.
// Normalising first makes it safe to call with the raw field value.
export function isValidPhone(value) {
  return PHONE_PATTERN.test(normalizePhone(value));
}
