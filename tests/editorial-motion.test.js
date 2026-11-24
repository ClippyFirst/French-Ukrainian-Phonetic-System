import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

test('editorial motion is short, purposeful and limited to existing UI states', () => {
  assert.match(css, /--motion-fast:\s*140ms/);
  assert.match(css, /\.word-token\s*\{[^}]*transition:color[^}]*background-color/s);
  assert.match(css, /\.spelling-card:hover,\.ufpn-symbol-card:hover\s*\{\s*transform:translateY\(-2px\)/);
  assert.doesNotMatch(css, /transition\s*:\s*all\b/i);
});

test('hover motion is restricted to hover-capable fine pointers', () => {
  assert.match(css, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
});

test('reduced-motion preference removes transitions and movement', () => {
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transition:none/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transform:none/);
});
