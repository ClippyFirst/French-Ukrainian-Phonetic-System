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
  assert.equal(transcribeFrenchWord('garçon'), 'gaʁsɔ̃');
  assert.equal(transcribeFrenchWord('eau'), 'o');
  assert.equal(transcribeFrenchWord('oui'), 'wi');
});

test('OpenIPA nasal-O and flipped-R symbols normalize to canonical French IPA', () => {
  const bonjour = transcribeFrenchWordDetailed('bonjour');
  assert.equal(bonjour.ipa, 'bɔ̃ʒuʁ');
  assert.equal(bonjour.sourceIpa, 'bõʒuɾ');
  assert.ok(bonjour.trace.some((item) => item.sourceIpa.includes('õ') && item.ipa.includes('ɔ̃')));
  assert.ok(bonjour.trace.some((item) => item.sourceIpa.includes('ɾ') && item.ipa.includes('ʁ')));
});

test('the adapter keeps upstream raw IPA while normalizing legacy symbols', () => {
  const result = transcribeFrenchWordDetailed('mer');
  assert.equal(result.ipa, 'mɛʁ');
  assert.equal(result.sourceIpa, 'mεɾ');
  assert.ok(result.trace.some((item) => item.sourceIpa.includes('ε') && item.ipa.includes('ɛ')));
});

test('rule traces preserve the upstream explanations', () => {
  const result = transcribeFrenchWordDetailed('chat');
  assert.equal(result.ipa, 'ʃa');
  assert.ok(result.trace.every((item) => item.rule && item.source === 'OpenIPA'));
});
