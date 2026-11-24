import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import mapping from '../data/ufpn-mapping.json' with {type:'json'};

const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');

test('all three UFPN reference sections use the shared accordion component',()=>{
 assert.match(app,/createReferenceAccordion\('ufpn-technical'/);
 assert.match(app,/createReferenceAccordion\('ufpn-features'/);
 assert.match(app,/createReferenceAccordion\('ufpn-graphemes'/);
 assert.match(app,/reference-accordion-title/);
 assert.match(app,/reference-accordion-count/);
});

test('all 18 phonetic dimensions render as readable cards with Ukrainian status and guidance',()=>{
 assert.equal(mapping.featureDimensions.length,18);
 assert.match(app,/featureList\.className='feature-grid'/);
 assert.match(app,/card\.className='feature-card'/);
 assert.match(app,/featureStatusUk\[feature\.status\]/);
 assert.match(app,/featureUfpnUk\[feature\.id\]/);
 for(const feature of mapping.featureDimensions){
  assert.ok(feature.values.length>0,feature.id+' must list its values');
  assert.ok(feature.status,feature.id+' must expose an evidence status');
 }
});

test('grapheme inventory distinguishes adopted graphemes from unassigned candidates',()=>{
 assert.match(app,/appendGraphemeItem\(item,true\)/);
 assert.match(app,/appendGraphemeItem\(item,false\)/);
 assert.match(app,/Кандидат · не призначено/);
 assert.equal(mapping.graphemeInventory.adopted.length,10);
 assert.equal(mapping.graphemeInventory.candidates.length,2);
});

test('explanation checkbox names the exact panel and states that transcription is unaffected',()=>{
 assert.match(html,/id="show-explanations"[^>]*aria-controls="explain-panel"/);
 assert.match(html,/Показувати розбір вибраного слова/);
 assert.match(html,/на саму транскрипцію не впливає/);
 assert.match(app,/explanationPanel\.hidden=!enabled/);
 assert.match(app,/explanationToggle\.setAttribute\('aria-expanded',String\(enabled\)\)/);
});

test('reference panels and explanation control have responsive and keyboard-visible styling',()=>{
 assert.match(css,/\.reference-accordion>summary:focus-visible/);
 assert.match(css,/\.feature-grid/);
 assert.match(css,/\.grapheme-list/);
 assert.match(css,/\.status-options/);
});
