import test from 'node:test';
import assert from 'node:assert/strict';
import {renderUfpn,UFPN_MAPPING,tokenizeIpa} from '../src/ufpn.js';
test('reference inventory contains 37 entries',()=>assert.equal(UFPN_MAPPING.phonemes.length,37));
test('Basic preserves front rounded vowel contrasts',()=>assert.equal(renderUfpn('i y ø œ').text,'і ү ө ӧ'));
test('nasal vowels retain quality, rounding and nasalization',()=>assert.equal(renderUfpn('ɑ̃ ɛ̃ ɔ̃ œ̃').text,'а̃ э̃ о̆̃ ӧ̃'));
test('uvular rhotic is not represented as Ukrainian alveolar r',()=>assert.equal(renderUfpn('ʁ').text,'ғ'));
test('palatal and velar nasals remain distinct',()=>assert.equal(renderUfpn('ɲ ŋ').text,'њ ң'));
test('Detailed retains syllable boundaries and supplied length',()=>assert.equal(renderUfpn('ˈbɔ̃.ʒuːʁ','detailed').text,'бо̆̃·жуːғ'));
test('Basic suppresses prosodic annotation while Extended preserves it',()=>{
 assert.equal(renderUfpn('ˈpə.ti↗','basic').text,'пӹті');
 assert.equal(renderUfpn('ˈpə.ti↗','extended').text,'ˈпӹ·ті↗');
});
test('Extended preserves narrow phonetic modifiers',()=>assert.equal(renderUfpn('ʁ̞ tʲ kʷ','extended').text,'ғ̞ тʲ кʷ'));
test('unknown IPA remains visible and is reported',()=>{
 const r=renderUfpn('ʔ'); assert.equal(r.text,'⟦ʔ⟧'); assert.deepEqual(r.unsupported,['ʔ']);
});
test('NFC and NFD produce stable normalized output',()=>{
 const s='ɑ̃ ɛ̃ ɔ̃ œ̃'; assert.equal(renderUfpn(s).text,renderUfpn(s.normalize('NFD')).text);
 assert.equal(renderUfpn(s).text,renderUfpn(s).text.normalize('NFC'));
});
test('tokenizer preserves prosodic controls and combining marks',()=>{
 assert.deepEqual(tokenizeIpa('ˈt͡sɛː‿a'),['ˈ','t͡s','ɛ','ː','‿','a']);
});
test('all mapping records have three levels and source provenance',()=>{
 for(const p of UFPN_MAPPING.phonemes){assert.ok(p.basic&&p.detailed&&p.extended,p.id);assert.ok(p.sources.length,p.id);assert.ok(p.evidenceStatus,p.id);}
});

test('documented rhotic allophones have explicit practical mappings',()=>{
 assert.equal(renderUfpn('χ ɣ ʁ̞ ɾ r ɹ x','extended').text,'х̠ х̬ ғ̞ р̌ р р̞ х');
});

test('glides remain distinct and /w/ uses Belarusian ў',()=>assert.equal(renderUfpn('j ɥ w').text,'й й̹ ў'));
test('/ɥ/ uses the project-approved й̹ composition at every level while њ remains /ɲ/',()=>{
 const glide=UFPN_MAPPING.phonemes.find(item=>item.ipa==='ɥ');
 assert.equal(glide.baseGrapheme,'й');
 assert.deepEqual(glide.diacritics,['̹']);
 for(const level of ['basic','detailed','extended']) assert.equal(renderUfpn('ɥ',level).text,'й̹');
 assert.equal(renderUfpn('ɲ').text,'њ');
 assert.equal('й̹'.normalize('NFC'),'й̹');
 assert.deepEqual([...('й̹')].map(char=>char.codePointAt(0)),[0x0439,0x0339]);
});
test('/w/ and /v/ remain distinct in every level',()=>{for(const level of ['basic','detailed','extended'])assert.equal(renderUfpn('w v',level).text,'ў в')});
test('/ɛ/ uses э and nasal /ɛ̃/ preserves its nasal marker',()=>assert.equal(renderUfpn('ɛ ɛ̃').text,'э э̃'));
test('extended Cyrillic inventory records adopted graphemes and rejected candidates',()=>{const g=UFPN_MAPPING.graphemeInventory;assert.ok(g.adopted.some(x=>x.grapheme==='ў'&&x.ipa.includes('w')));assert.ok(g.adopted.some(x=>x.grapheme==='э'&&x.ipa.includes('ɛ')));assert.ok(g.adopted.some(x=>x.grapheme==='ү'&&x.ipa.includes('y')));assert.ok(g.adopted.some(x=>x.grapheme==='ө'&&x.ipa.includes('ø')));assert.ok(g.adopted.some(x=>x.grapheme==='ӧ'&&x.ipa.includes('œ')));assert.ok(g.adopted.some(x=>x.grapheme==='њ'&&x.ipa.includes('ɲ')));assert.ok(g.adopted.some(x=>x.grapheme==='ң'&&x.ipa.includes('ŋ')));assert.ok(g.adopted.some(x=>x.grapheme==='ғ'&&x.ipa.includes('ʁ')));assert.ok(g.candidates.some(x=>x.grapheme==='ы'&&x.decision==='NOT_ASSIGNED'));assert.ok(g.candidates.some(x=>x.grapheme==='ё'&&x.decision==='NOT_ASSIGNED'))});
test('Québec coronal affricates preserve the tie bar in every UFPN level',()=>{
 assert.equal(renderUfpn('t͡s d͡z','basic').text,'т͡с д͡з');
 assert.equal(renderUfpn('t͜s d͜z','extended').text,'т͜с д͜з');
});

test('Extended preserves gradient place assimilation and fricative voicing changes',()=>{
 assert.equal(renderUfpn('n͡ŋ s̬ z̥','extended').text,'н͡нґ с̬ з̥');
 assert.equal(renderUfpn('n͡ŋ s̬ z̥','basic').text,'н с з');
});
test('feature dimension registry classifies phonetic coverage and evidence',()=>{
 assert.equal(UFPN_MAPPING.featureDimensions.length,18);
 assert.equal(UFPN_MAPPING.diacritics.length,36);
 assert.equal(UFPN_MAPPING.allophoneMappings.length,15);
 assert.equal(UFPN_MAPPING.allophones.length,19);
 assert.equal(UFPN_MAPPING.processes.length,13);
 assert.equal(UFPN_MAPPING.profiles.length,7);
 for(const feature of UFPN_MAPPING.featureDimensions){assert.ok(feature.status,feature.id);assert.ok(feature.ufpn,feature.id);assert.ok(feature.sources.length,feature.id)}
});

test('Extended preserves optional aspiration, release, syllabicity and voice-quality marks',()=>{
 assert.equal(renderUfpn('pʰ t̚ n̩ s̤ kˤ','extended').text,'пʰ т̚ н̩ с̤ кˤ');
 assert.equal(renderUfpn('pʰ t̚ n̩ s̤ kˤ','basic').text,'п т н с к');
});

test('IPA mapping schema declares all registries used by the adapter',()=>{
 assert.equal(UFPN_MAPPING.schemaVersion,'1.2.0');
 assert.ok(Array.isArray(UFPN_MAPPING.allophones));
 assert.ok(Array.isArray(UFPN_MAPPING.processes));
 assert.ok(Array.isArray(UFPN_MAPPING.profiles));
});

test('extended Cyrillic inventory is internally consistent and source-backed',()=>{
 const inventory=UFPN_MAPPING.graphemeInventory,adopted=inventory.adopted;
 assert.equal(new Set(adopted.map(x=>x.grapheme)).size,adopted.length,'adopted graphemes must be unique');
 for(const item of adopted){
  assert.ok(item.sources.length,item.grapheme+' needs provenance');
  for(const ipa of item.ipa){
   const record=UFPN_MAPPING.phonemes.find(x=>x.ipa===ipa);
   assert.ok(record,'missing IPA record for '+ipa);
   assert.equal(record.baseGrapheme,item.grapheme,'base grapheme mismatch for '+ipa);
  }
 }
 for(const item of inventory.candidates){assert.ok(item.sources.length,item.grapheme+' candidate needs provenance');assert.equal(item.decision,'NOT_ASSIGNED')}
 assert.equal(UFPN_MAPPING.phonemes.find(x=>x.ipa==='w').basic,'ў');
 assert.equal(UFPN_MAPPING.phonemes.find(x=>x.ipa==='v').basic,'в');
});


import {renderUfpnDisplay} from '../src/ufpn-display.js';

test('UFPN display passes canonical combining sequences to native text shaping intact',()=>{
 const value='е̊̆̃ а̠̃ х̬̠';
 const container={replaceChildren(){},append(){},set textContent(v){this.rendered=v}};
 const previousDocument=globalThis.document;
 globalThis.document={
  createTextNode:text=>({textContent:text}),
  createElement:()=>({style:{setProperty(){}},append(){},set textContent(value){this.value=value}})
 };
 try{
  renderUfpnDisplay(container,value);
  assert.equal(container.rendered,value.normalize('NFC'));
 }finally{
  if(previousDocument===undefined)delete globalThis.document;
  else globalThis.document=previousDocument;
 }
});

test('UFPN display keeps affricate tie bars in the same native text run',()=>{
 const value='т͡с д͜з';
 const container={replaceChildren(){},append(){},set textContent(v){this.rendered=v}};
 renderUfpnDisplay(container,value);
 assert.equal(container.rendered,value.normalize('NFC'));
});

test('Basic uses dedicated extended Cyrillic letters instead of stacked quality marks where exact graphemes exist',()=>{
 assert.equal(renderUfpn('y ø œ ɲ ŋ ʁ').text,'ү ө ӧ њ ң ғ');
});
test('every phoneme has a Ukrainian sound example or an explicit no-equivalent statement',()=>{
 for(const p of UFPN_MAPPING.phonemes){
  assert.ok(p.ukrainianExampleStatus,p.id+' status');
  assert.ok(p.ukrainianExample,p.id+' example or dash');
  assert.ok(p.ukrainianExampleNote,p.id+' explanation');
  assert.ok(['EXACT','CONTEXTUAL','APPROXIMATE','NONE'].includes(p.ukrainianExampleStatus),p.id+' status enum');
 }
});

test('voiced velar and uvular fricatives remain distinct',()=>{assert.equal(renderUfpn('ɣ ʁ').text,'х̬ ғ')});

test('all 37 phoneme rows have Ukrainian articulation guidance',()=>{
 assert.equal(UFPN_MAPPING.phonemes.length,37);
 for(const p of UFPN_MAPPING.phonemes){assert.ok(typeof p.pronunciationGuideUk==='string'&&p.pronunciationGuideUk.length>=25,p.id);}
});

test('the /œ/ articulation guide keeps open-mid tongue height and adds lip rounding',()=>{
 const phoneme=UFPN_MAPPING.phonemes.find((item)=>item.id==='v_oe_open');
 assert.match(phoneme.pronunciationGuideUk,/напіввідкрите положення язика/);
 assert.match(phoneme.pronunciationGuideUk,/округліть губи/);
 assert.match(phoneme.pronunciationGuideUk,/не змінюючи висоту голосного/);
});
