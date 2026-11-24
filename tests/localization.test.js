import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {transcribeFrenchWordDetailed} from '../src/french-g2p.js';
import {describeSegment,transcribe} from '../src/engine.js';

test('the website shell uses Ukrainian interface copy',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<html lang="uk">/);
 for(const phrase of ['Latin guide','Basic ·','Detailed ·','Extended ·','FR → UKR','elision)'])
  assert.ok(!html.includes(phrase),'unexpected English interface text: '+phrase);
 assert.ok(html.includes('Латинська підказка'));
 assert.ok(html.includes('з елізією'));
});

test('dynamic interface labels and exported headings are localized',async()=>{
 const app=await readFile(new URL('../src/app.js',import.meta.url),'utf8');
 for(const phrase of ['French:','Latin guide:','Provenance:','Технічна таблиця IPA → Basic','Розширений кириличний інвентар'])
  assert.ok(!app.includes(phrase),'outdated English UI label: '+phrase);
 for(const phrase of ['Французький текст:','Латинська підказка:','Джерело:','Базовий · зручний для читання','Графемний склад UFPN'])
  assert.ok(app.includes(phrase),'missing Ukrainian UI label: '+phrase);
});

test('OpenIPA rule explanations shown to users are Ukrainian',()=>{
 const examples=[
  transcribeFrenchWordDetailed('chat'),
  transcribeFrenchWordDetailed('mer'),
  transcribeFrenchWordDetailed('écho'),
  transcribeFrenchWordDetailed('et'),
  transcribeFrenchWordDetailed('bonjour',{profile:'metropolitan-fr'}),
  transcribeFrenchWordDetailed('calme ami',{profile:'lyric-diction-fr'}),
  transcribeFrenchWordDetailed('les amis',{profile:'lyric-diction-fr'})
 ];
 const rules=examples.flatMap(result=>result.trace.map(item=>item.rule).filter(Boolean));
 assert.ok(rules.length>0);
 for(const rule of rules){
  assert.match(rule,/[А-Яа-яІіЇїЄєҐґ]/u,rule);
  assert.doesNotMatch(rule,/When followed|All .* transcribed|Single .* vowels|Note:|due to elision/i,rule);
 }
});

test('profile, source and allophone explanations do not expose English labels',()=>{
 const word=transcribe('bonjour').words[0];
 assert.equal(word.explanation,'Транскрипцію створено оригінальним рушієм OpenIPA на основі правил; точність для довільних слів незалежно не виміряна.');
 assert.equal(word.source,'openipa-french-engine');
 assert.match(describeSegment('t͡s'),/квебекської французької/);
 assert.doesNotMatch(describeSegment('t͡s'),/Québec|Metropolitan/);
});

test('all displayed feature dimensions have Ukrainian translations',async()=>{
 const mapping=JSON.parse(await readFile(new URL('../data/ufpn-mapping.json',import.meta.url),'utf8'));
 const app=await readFile(new URL('../src/app.js',import.meta.url),'utf8');
 for(const feature of mapping.featureDimensions){
  assert.ok(app.includes("'"+feature.dimension+"':"),'missing translation for '+feature.dimension);
  for(const value of feature.values){
   const key="'"+value+"':";
   assert.ok(app.includes(key)||app.includes(value+':'),'missing translation for '+feature.id+' / '+value);
  }
 }
});
