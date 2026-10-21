// Lead-form tests — "never lose a lead, never fake one".
//
// Run:  npm test
//   or: node --test tests/forms.test.mjs
//
// Two classes of bug are pinned here:
//
//   1. A form that REFUSES a valid number. The old phone `pattern`
//      ("[0-9+ ]{8,15}") made the BROWSER block a hyphenated number
//      ("98739-15215") or a "+91 98739 15215" before the submit handler
//      ever ran, so the visitor could not submit at all and the lead was
//      lost. The pattern is gone; the number is normalised and validated in
//      JavaScript instead.
//
//   2. A form that FAKES a conversion. A refused submit must not leave
//      click-guard with a conversion (the owner would be emailed and a CRM
//      card created for a lead that does not exist). The site therefore
//      moves the focus back into the form and calls the rejection hook.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { focusField, notifyRejected } from '../src/lib/form-reject.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(resolve(ROOT, rel), 'utf8');

const FORMS = [
  { file: 'src/components/QuoteForm.jsx', label: 'QuoteForm' },
  { file: 'src/components/LeadForm.jsx', label: 'LeadForm' },
  { file: 'src/components/MultiStepForm.jsx', label: 'MultiStepForm' },
];

// ---- 1. No browser-side pattern may refuse a valid number ---------------

test('no form keeps the pattern that refused a hyphenated / +91 number', () => {
  for (const { file, label } of FORMS) {
    const src = read(file);
    assert.ok(
      !/pattern="\[0-9\+ \]\{8,15\}"/.test(src),
      `${label} still has pattern="[0-9+ ]{8,15}" — the browser refuses a
       hyphenated or +91 number and the lead is lost`
    );
    assert.ok(
      !/pattern=/.test(src),
      `${label} still sets a pattern attribute — no form may let the browser
       refuse a number, the validation belongs in JavaScript`
    );
  }
});

test('no form truncates the number in a way that cuts a valid one', () => {
  for (const { file, label } of FORMS) {
    const src = read(file);
    // A CHARACTER-based cap must be wide enough for "+91 98739-15215" (14
    // chars) — a tighter cap turns a valid number into a different,
    // valid-looking one (the old bug: "9198739152" was accepted).
    // QuoteForm is the exception: its onChange strips the non-digits BEFORE
    // the slice, so its cap counts DIGITS and 13 is safe there.
    const digitOnly = /replace\(\/\\D\/g, ''\)\.slice\(0, \d+\)/.test(src);
    const caps = [...src.matchAll(/maxLength="(\d+)"/g)].map((m) => Number(m[1]));
    for (const cap of caps) {
      assert.ok(
        digitOnly ? cap >= 13 : cap >= 20,
        `${label} has maxLength="${cap}" — a character cap below 20 cuts
         "+91 98739-15215" into a wrong number`
      );
    }
    assert.ok(
      !/slice\(0,\s*10\)/.test(src),
      `${label} still cuts the number at 10 digits`
    );
  }
});

// ---- 2. Every form normalises and validates in JavaScript ---------------

test('every form validates the normalised number with isValidPhone', () => {
  for (const { file, label } of FORMS) {
    const src = read(file);
    assert.ok(
      /import \{[^}]*isValidPhone[^}]*\} from '\.\.\/lib\/phone\.js'/.test(src),
      `${label} must import isValidPhone`
    );
    assert.ok(
      /import \{[^}]*normalizePhone[^}]*\} from '\.\.\/lib\/phone\.js'/.test(src),
      `${label} must import normalizePhone`
    );
    assert.ok(
      /normalizePhone\(/.test(src),
      `${label} must normalise the number before sending it`
    );
    assert.ok(
      /isValidPhone\(/.test(src),
      `${label} must validate the normalised number`
    );
    assert.ok(
      !/\^\[6-9\]\[0-9\]\{9\}\$/.test(src),
      `${label} must not test the RAW value against the gateway regex`
    );
  }
});

test('every form sends the normalised number to sendLead', () => {
  const quote = read('src/components/QuoteForm.jsx');
  assert.ok(
    /sendLead\(\{ name: n, phone: p,/.test(quote),
    'QuoteForm must send the normalised number'
  );

  const lead = read('src/components/LeadForm.jsx');
  assert.ok(
    /const p = normalizePhone\(/.test(lead) && /phone: p,/.test(lead),
    'LeadForm must send the normalised number'
  );

  const multi = read('src/components/MultiStepForm.jsx');
  assert.ok(
    /const p = normalizePhone\(/.test(multi) && /phone: p,/.test(multi),
    'MultiStepForm must send the normalised number'
  );
});

// ---- 3. A refused submit must undo the conversion -----------------------

test('every form calls the rejection hook and moves the focus back', () => {
  for (const { file, label } of FORMS) {
    const src = read(file);
    assert.ok(
      /import \{[^}]*focusField[^}]*\} from '\.\.\/lib\/form-reject\.js'/.test(src),
      `${label} must import focusField`
    );
    assert.ok(
      /import \{[^}]*notifyRejected[^}]*\} from '\.\.\/lib\/form-reject\.js'/.test(src),
      `${label} must import notifyRejected`
    );
    assert.ok(
      /notifyRejected\(\)/.test(src),
      `${label} must call notifyRejected() when the site refuses the submit`
    );
    assert.ok(
      /focusField\(/.test(src),
      `${label} must move the focus back into the form`
    );
  }
});

test('the rejection hook is called on the failure paths, not only on validation', () => {
  // A failed send is just as much a "no lead exists" as an invalid number.
  for (const { file, label } of FORMS) {
    const src = read(file);
    const afterSendFailure = src.slice(src.indexOf("Couldn't send your request"));
    assert.ok(
      afterSendFailure.includes('notifyRejected()'),
      `${label} must tell click-guard when the send itself failed`
    );
    assert.ok(
      /focusField\(|backToDetails\(/.test(afterSendFailure),
      `${label} must move the focus back when the send itself failed`
    );
  }
});

// ---- 4. The helpers themselves -------------------------------------------

test('focusField blurs before focusing, so the beacon sees a focusin event', () => {
  const calls = [];
  const el = {
    selectionStart: 3,
    selectionEnd: 3,
    blur() { calls.push('blur'); },
    focus() { calls.push('focus'); },
    setSelectionRange(s, e) { calls.push('selection'); },
  };
  const prevDocument = globalThis.document;
  globalThis.document = { activeElement: el };
  try {
    focusField(el);
  } finally {
    if (prevDocument === undefined) delete globalThis.document;
    else globalThis.document = prevDocument;
  }
  assert.deepEqual(calls, ['blur', 'focus', 'selection']);
});

test('focusField is a no-op for a missing element', () => {
  assert.doesNotThrow(() => focusField(null));
  assert.doesNotThrow(() => focusField(undefined));
  assert.doesNotThrow(() => focusField({}));
});

test('notifyRejected calls the click-guard hook when it exists', () => {
  let called = 0;
  const prevWindow = globalThis.window;
  globalThis.window = { cgFormRejected() { called += 1; } };
  try {
    notifyRejected();
  } finally {
    if (prevWindow === undefined) delete globalThis.window;
    else globalThis.window = prevWindow;
  }
  assert.equal(called, 1);
});

test('notifyRejected is a safe no-op before the beacon grows the hook', () => {
  const prevWindow = globalThis.window;
  globalThis.window = {};
  try {
    assert.doesNotThrow(() => notifyRejected());
  } finally {
    if (prevWindow === undefined) delete globalThis.window;
    else globalThis.window = prevWindow;
  }
  // No window at all (server-side render) must not throw either.
  const prevWindow2 = globalThis.window;
  delete globalThis.window;
  try {
    assert.doesNotThrow(() => notifyRejected());
  } finally {
    if (prevWindow2 !== undefined) globalThis.window = prevWindow2;
  }
});
