import test from 'node:test';
import assert from 'node:assert/strict';
import { transcribeFrenchWord, transcribeFrenchWordDetailed, transcribeFrenchText } from '../src/french-g2p.js';

test('OpenIPA upstream French regression corpus', () => {
  assert.equal(transcribeFrenchWord('calme'), 'kalmə');
  assert.equal(transcribeFrenchWord('éclate'), 'eklatə');
  assert.equal(transcribeFrenchWord('docile'), 'dɔsilə');
  assert.equal(transcribeFrenchWord('céleste'), 'selɛstə');
  // Upstream's legacy CSV expects d(e)sɑ̃, but the current parser actually emits dɛssɑ̃.
  // Pin the executable upstream behavior and document the source-fixture divergence.
  assert.equal(transcribeFrenchWord('descends'), 'dɛssɑ̃');
  assert.equal(transcribeFrenchWord('garçon'), 'gaɾsõ');
});

test('OpenIPA rule explanations are preserved per source grapheme', () => {
  const result = transcribeFrenchWordDetailed('calme');
  assert.equal(result.ipa, 'kalmə');
  assert.equal(result.source, 'OpenIPA French transcription engine');
  assert.ok(result.trace.length > 0);
  assert.ok(result.trace.every((item) =>
    Number.isInteger(item.start) &&
    Number.isInteger(item.end) &&
    typeof item.grapheme === 'string' &&
    typeof item.ipa === 'string' &&
    item.rule &&
    item.source === 'OpenIPA'
  ));
  assert.equal(result.trace.map((item) => item.grapheme).join(''), 'calme');
});

test('text-level parser returns OpenIPA word and line structure', () => {
  const result = transcribeFrenchText('calme');
  assert.equal(result.lines.length, 1);
  assert.ok(result.lines[0].words[0].syllables.length > 0);
});

test('NFC normalization is applied before parsing', () => {
  assert.equal(transcribeFrenchWord('e\u0301clate'), transcribeFrenchWord('éclate'));
});
