import test from 'node:test';
import assert from 'node:assert/strict';
import {transcribe,adaptIpa,INVENTORY,describeSegment} from '../src/engine.js';
test('IPA is the source for both adapters',()=>{const a=adaptIpa('ʃɑ̃');assert.equal(a.ufpn,'ша̠̃');assert.equal(a.romanized,'shan');assert.deepEqual(a.tokens,['ʃ','ɑ̃'])});
test('lexical entries retain IPA and provenance',()=>{const r=transcribe('Bonjour !');assert.equal(r.words[0].ipa,'bɔ̃.ʒuʁ');assert.equal(r.words[0].source,'project-seed-unverified');assert.equal(r.words[0].confidence,'medium')});
test('liaison applies only to supported determiner-vowel pattern',()=>{const r=transcribe('les amis');assert.equal(r.words[0].ipa,'lez');assert.equal(r.words[0].liaisonApplied,true);assert.equal(transcribe('et amis').words[0].ipa,'e')});
test('unknown fallback is low confidence',()=>{const r=transcribe('zorblique');assert.equal(r.words[0].confidence,'low');assert.equal(r.words[0].source,'orthographic-fallback');assert.ok(r.warnings.includes('zorblique'))});
test('every adapter mapping has a value',()=>{for(const [ipa,ufpn] of Object.entries(INVENTORY))assert.ok(ufpn.length>0,'missing '+ipa)});
test('Unicode normalization is stable',()=>{assert.equal(transcribe('école').text,transcribe('e\u0301cole').text)});
test('elision prefixes remain pronounced segments',()=>{const r=transcribe("j'aime");assert.equal(r.words[0].text,"j'");assert.equal(r.words[0].ipa,'ʒ')});
test('numbers are unsupported rather than guessed',()=>{const r=transcribe('J’ai 2026 ans');assert.equal(r.words.find(w=>w.text==='2026').ipa,'???');assert.ok(r.warnings.includes('2026'))});
test('punctuation blocks cross-boundary liaison',()=>{const r=transcribe('les, amis');assert.equal(r.words[0].ipa,'le');assert.equal(r.words[0].liaisonApplied,false)});
test('nasal graphemes before vowels retain nasal consonants',()=>{assert.equal(transcribe('amis').words[0].ipa,'a.mi');assert.equal(transcribe('aime').words[0].ipa,'ɛm')});
test('fallback collapses doubled consonants',()=>{assert.equal(transcribe('appelle').words[0].ipa,'a.pɛl')});

test('Latin guide and segment explanations cover mapped allophones',()=>{
 const a=adaptIpa('t͡s d͡z n͡ŋ s̬ z̥');
 assert.equal(a.romanized,'ts dz n-ng s-voiced z-devoiced');
 assert.ok(a.ufpn.includes('т͡с'));
 assert.ok(describeSegment('t͡s').includes('Québec'));
});

test('lyric-diction profile applies final schwa while preserving lexical article forms',()=>{
 const sung=transcribe('petite',{profile:'lyric-diction-fr'});
 assert.equal(sung.words[0].ipa,'pə.titə');
 assert.equal(transcribe('les amis',{profile:'lyric-diction-fr'}).words[0].ipa,'lez');
 assert.equal(transcribe('petite',{profile:'metropolitan-fr'}).words[0].ipa,'pə.tit');
});
