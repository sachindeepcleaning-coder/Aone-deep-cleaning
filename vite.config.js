import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Directories never scanned for MPA entry shells.
const SKIP_DIRS = new Set(['node_modules', 'dist', 'dist-ssr', '.git', 'public', '.claude', 'html templete']);

// Recursively collect every *.html entry shell in the repo root.
// (Subdirectories like blog/ are supported so blog article pages build too.)
function collectHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) collectHtml(path.join(dir, entry.name), acc);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

const htmlFiles = collectHtml(__dirname).filter(
  (f) => !f.endsWith('google4bc4a68e1ff9b7f5.html')
);

// Input key = path relative to root; Vite preserves the folder structure
// so blog/deep-cleaning-cost-gurgaon-2026.html emits dist/blog/… .html.
const input = Object.fromEntries(
  htmlFiles.map((f) => {
    const key = path.relative(__dirname, f).replace(/\.html$/, '');
    return [key, f];
  })
);

export default defineConfig({
  // Relative base so built asset URLs (./assets/...) resolve correctly whether
  // the site is served from a GitHub Pages subpath (/Balaji-Deep-Cleaning/),
  // a custom domain, or locally. Without this, absolute /assets/ paths 404 on
  // the subpath and React never loads → blank screen.
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three';
        },
      },
    },
    target: 'es2018',
  },
});
