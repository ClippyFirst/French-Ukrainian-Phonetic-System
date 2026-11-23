import test from 'node:test';
import assert from 'node:assert/strict';
import {transcribe,adaptIpa,INVENTORY,describeSegment} from '../src/engine.js';
import {transcribeFrenchTextDetailed} from '../src/french-g2p.js';
test('IPA is the source for both adapters',()=>{const a=adaptIpa('ʃɑ̃');assert.equal(a.ufpn,'ша̠̃');assert.equal(a.romanized,'shan');assert.deepEqual(a.tokens,['ʃ','ɑ̃'])});
test('Bonjour receives canonical IPA and a fully mapped UFPN result',()=>{const r=transcribe('bonjour');assert.equal(r.words[0].ipa,'bɔ̃ʒuʁ');assert.equal(r.words[0].sourceIpa,'bõʒuɾ');assert.equal(r.words[0].ufpn,'бо̆̃жух̬̠');assert.deepEqual(adaptIpa(r.words[0].ipa).unsupported,[])});
test('all French words use OpenIPA rather than unverified seed overrides',()=>{const r=transcribe('Bonjour !');assert.equal(r.words[0].source,'openipa-french-engine');assert.equal(r.words[0].confidence,'low');assert.equal(r.words[0].ipa,transcribeFrenchTextDetailed('Bonjour',{profile:'metropolitan-fr'}).ipa)});
test('Metropolitan profile does not invent cross-word liaison',()=>{const r=transcribe('les amis');assert.equal(r.words[0].liaisonApplied,false);assert.equal(r.words[0].ipa,transcribeFrenchTextDetailed('les').ipa)});
test('unknown fallback is low confidence',()=>{const r=transcribe('zorblique');assert.equal(r.words[0].confidence,'low');assert.equal(r.words[0].source,'openipa-french-engine');assert.ok(r.warnings.includes('zorblique'))});
test('every adapter mapping has a value',()=>{for(const [ipa,ufpn] of Object.entries(INVENTORY))assert.ok(ufpn.length>0,'missing '+ipa)});
test('Unicode normalization is stable',()=>{assert.equal(transcribe('école').text,transcribe('e\u0301cole').text)});
test('elision prefixes remain pronounced segments',()=>{const r=transcribe("j'aime");assert.equal(r.words[0].text,"j'");assert.equal(r.words[0].ipa,'ʒ')});
test('numbers are unsupported rather than guessed',()=>{const r=transcribe('J’ai 2026 ans');assert.equal(r.words.find(w=>w.text==='2026').ipa,'???');assert.ok(r.warnings.includes('2026'))});
test('punctuation blocks lyric-profile cross-boundary liaison',()=>{const r=transcribe('les, amis',{profile:'lyric-diction-fr'});assert.equal(r.words[0].liaisonApplied,false)});
test('common words are delegated to the upstream parser without project overrides',()=>{for(const word of ['amis','aime','appelle','bonjour','femme','petite']){const result=transcribe(word).words[0];assert.equal(result.ipa,transcribeFrenchTextDetailed(word,{profile:'metropolitan-fr'}).ipa,word);assert.equal(result.source,'openipa-french-engine')}});

test('Latin guide and segment explanations cover mapped allophones',()=>{
 const a=adaptIpa('t͡s d͡z n͡ŋ s̬ z̥');
 assert.equal(a.romanized,'ts dz n-ng s-voiced z-devoiced');
 assert.ok(a.ufpn.includes('т͡с'));
 assert.ok(describeSegment('t͡s').includes('Québec'));
});

test('lyric-diction profile delegates final schwa and lexical behavior to OpenIPA',()=>{
 const sung=transcribe('petite',{profile:'lyric-diction-fr'});
 const spoken=transcribe('petite',{profile:'metropolitan-fr'});
 assert.equal(sung.words[0].ipa,transcribeFrenchTextDetailed('petite',{profile:'lyric-diction-fr'}).ipa);
 assert.equal(spoken.words[0].ipa,transcribeFrenchTextDetailed('petite',{profile:'metropolitan-fr'}).ipa);
});

test('OpenIPA full-text parser applies schwa elision only when enabled',()=>{
 const spoken=transcribe('calme ami',{profile:'metropolitan-fr'});
 const sung=transcribe('calme ami',{profile:'lyric-diction-fr'});
 assert.equal(spoken.words[0].ipa,'kalmə');
 assert.equal(sung.words[0].ipa,'kalm');
 assert.ok(sung.words[0].ruleTrace.every(item=>item.start>=0&&item.end<=5));
});

test('OpenIPA liaison trace is attached to the preceding word in lyric profile',()=>{
 const result=transcribe('les amis',{profile:'lyric-diction-fr'});
 assert.equal(result.words[0].ipa,'lez‿');
 assert.equal(result.words[0].liaisonApplied,true);
 assert.ok(result.words[0].ruleTrace.some(item=>item.boundary&&item.ipa==='z‿'));
 assert.ok(result.words[0].ruleTrace.every(item=>item.start>=0&&item.end<=3));
});

test('lyric-diction profile preserves OpenIPA flipped-r as the intended tap',()=>{const r=transcribe('bonjour',{profile:'lyric-diction-fr'});assert.equal(r.words[0].ipa,'bɔ̃ʒuɾ');assert.equal(r.words[0].ufpn,'бо̆̃жур̌');assert.deepEqual(adaptIpa(r.words[0].ipa).unsupported,[])});
