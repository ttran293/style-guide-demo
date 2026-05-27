import { readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();
const skip = new Set(['MSG', 'dist', 'node_modules']);

function collectHtml(dir = root) {
  const out = {};
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      Object.assign(out, collectHtml(full));
    } else if (name.endsWith('.html')) {
      const key = relative(root, full).replace(/\\/g, '/').replace(/\.html$/, '');
      out[key] = resolve(full);
    }
  }
  return out;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: collectHtml(),
    },
  },
});
