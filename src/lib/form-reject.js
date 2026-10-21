// Shared helpers for a submit the SITE refused.
//
// Owner priority: never lose a lead, and never fake one. When the site
// refuses a submit (invalid number, failed send) NO lead exists — so
// click-guard must not keep the conversion it recorded, or the owner gets
// an alert email and a CRM card for a lead that was never created.
//
// Two signals are sent, so the refusal is seen even before the beacon grows
// the explicit hook:
//   1. the focus jumps back into the form the site just rejected — the
//      click-guard beacon (v12) tells a refused submit from a good one by
//      exactly that focusin event, and a React form never moves the focus
//      by itself, so without this the owner was told about a lead that did
//      not exist;
//   2. window.cgFormRejected() — the direct channel, a no-op until the
//      beacon grows it (v13), so both paths can coexist.

// Move the focus back to the field the visitor has to fix.
// The blur() is NOT cosmetic: focus() on the element that is already focused
// fires no focusin event, and the beacon v12 detection relies on that event.
export function focusField(el) {
  if (!el || typeof el.focus !== 'function') return;
  try {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (typeof document !== 'undefined' && document.activeElement === el) el.blur();
    el.focus({ preventScroll: true });
    if (start !== null && start !== undefined && typeof el.setSelectionRange === 'function') {
      try { el.setSelectionRange(start, end); } catch (_) {}
    }
  } catch (_) {}
}

// Tell click-guard that the site refused this submit, so it can undo the
// conversion it recorded (no lead exists -> no alert email, no CRM card).
export function notifyRejected() {
  try {
    if (typeof window !== 'undefined' && typeof window.cgFormRejected === 'function') {
      window.cgFormRejected();
    }
  } catch (_) {}
}
