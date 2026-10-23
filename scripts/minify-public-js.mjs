// Minifies the hand-written public scripts that Vite copies verbatim into
// dist/ (beacon.js, tracking.js). Lighthouse flagged beacon.js as
// "unminified JavaScript" (~5 KiB of wasted transfer on every page).
//
// Runs AFTER `vite build` and overwrites the copied files in dist/, so the
// source files in public/ stay readable and maintainable.
//
// Uses Vite's built-in Oxc transformer: a pure per-file transform, so the
// script keeps its top-level scope (no IIFE wrapping) and stays a classic
// script.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minifySync } from 'rolldown/utils';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');

const TARGETS = ['beacon.js', 'tracking.js'];

let saved = 0;
for (const name of TARGETS) {
  const distPath = resolve(distDir, name);
  if (!existsSync(distPath)) {
    console.warn(`minify-public-js: ${name} not in dist/, skipped`);
    continue;
  }
  const src = readFileSync(distPath, 'utf8');
  const before = Buffer.byteLength(src);
  try {
    // Conservative settings for a classic script:
    //  - unused: false  -> never drop a top-level binding (it may be reached
    //                      through window.* from another script)
    //  - mangle.toplevel: false -> keep global names intact
    const { code } = minifySync(name, src, {
      compress: { unused: false, dropDebugger: true },
      mangle: { toplevel: false },
      codegen: { removeWhitespace: true, legalComments: 'none' },
    });
    const after = Buffer.byteLength(code);
    writeFileSync(distPath, code);
    saved += before - after;
    console.log(
      `minify-public-js: ${name} ${before} -> ${after} bytes (-${Math.round(
        (1 - after / before) * 100
      )}%)`
    );
  } catch (err) {
    console.warn(`minify-public-js: ${name} failed, kept original (${err.message})`);
  }
}

console.log(`minify-public-js: total saved ${saved} bytes`);
