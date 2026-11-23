import test from 'node:test';
import assert from 'node:assert/strict';
import { transcribeFrenchWord, transcribeFrenchWordDetailed } from '../src/french-g2p.js';

test('OpenIPA contextual consonants and digraphs', () => {
  assert.equal(transcribeFrenchWord('chat'), 'ʃa');
  assert.equal(transcribeFrenchWord('cité'), 'site');
  assert.equal(transcribeFrenchWord('cadeau'), 'kado');
  assert.equal(transcribeFrenchWord('ville'), 'vilə');
});

test('OpenIPA nasal and vowel sequences retain upstream conventions', () => {
  assert.equal(transcribeFrenchWord('garçon'), 'gaɾsɔ̃');
  assert.equal(transcribeFrenchWord('eau'), 'o');
  assert.equal(transcribeFrenchWord('oui'), 'wi');
});

test('OpenIPA nasal-O normalizes to broad IPA and rhotic follows the selected profile', () => {
  const metropolitan = transcribeFrenchWordDetailed('bonjour', { profile: 'metropolitan-fr' });
  assert.equal(metropolitan.ipa, 'bɔ̃ʒuʁ');
  assert.equal(metropolitan.sourceIpa, 'bõʒuɾ');
  assert.ok(metropolitan.trace.some((item) => item.sourceIpa.includes('õ') && item.ipa.includes('ɔ̃')));
  assert.ok(metropolitan.trace.some((item) => item.sourceIpa.includes('ɾ') && item.ipa.includes('ʁ')));

  const lyric = transcribeFrenchWordDetailed('bonjour', { profile: 'lyric-diction-fr' });
  assert.equal(lyric.ipa, 'bɔ̃ʒuɾ');
  assert.equal(lyric.sourceIpa, 'bõʒuɾ');
  assert.ok(lyric.trace.some((item) => item.sourceIpa.includes('ɾ') && item.ipa.includes('ɾ')));
  assert.equal(transcribeFrenchWordDetailed('bonjour').ipa, 'bɔ̃ʒuɾ');
});

test('the adapter keeps upstream raw IPA while normalizing epsilon and nasal-O', () => {
  const result = transcribeFrenchWordDetailed('mer');
  assert.equal(result.ipa, 'mɛɾ');
  assert.equal(result.sourceIpa, 'mεɾ');
  assert.ok(result.trace.some((item) => item.sourceIpa.includes('ε') && item.ipa.includes('ɛ')));
});

test('rule traces preserve the upstream explanations', () => {
  const result = transcribeFrenchWordDetailed('chat');
  assert.equal(result.ipa, 'ʃa');
  assert.ok(result.trace.every((item) => item.rule && item.source === 'OpenIPA'));
});

test('Metropolitan profile adapts OpenIPA flipped-R to the broad French rhotic', () => {
  const result = transcribeFrenchWordDetailed('mer', { profile: 'metropolitan-fr' });
  assert.equal(result.ipa, 'mɛʁ');
  assert.equal(result.sourceIpa, 'mεɾ');
});
