import test from 'node:test';
import assert from 'node:assert/strict';
import {renderUfpn,UFPN_MAPPING,tokenizeIpa} from '../src/ufpn.js';
test('reference inventory contains 37 entries',()=>assert.equal(UFPN_MAPPING.phonemes.length,37));
test('Basic preserves front rounded vowel contrasts',()=>assert.equal(renderUfpn('i y ø œ').text,'і і̊ е̊́ е̊̆'));
test('nasal vowels retain quality, rounding and nasalization',()=>assert.equal(renderUfpn('ɑ̃ ɛ̃ ɔ̃ œ̃').text,'а̠̃ ӗ̃ о̆̃ е̊̆̃'));
test('uvular rhotic is not represented as Ukrainian alveolar r',()=>assert.equal(renderUfpn('ʁ').text,'х̬̠'));
test('palatal and velar nasals remain distinct',()=>assert.equal(renderUfpn('ɲ ŋ').text,'нь нґ'));
test('Detailed retains syllable boundaries and supplied length',()=>assert.equal(renderUfpn('ˈbɔ̃.ʒuːʁ','detailed').text,'бо̆̃·жуːх̬̠'));
test('Basic suppresses prosodic annotation while Extended preserves it',()=>{
 assert.equal(renderUfpn('ˈpə.ti↗','basic').text,'пе̇ті');
 assert.equal(renderUfpn('ˈpə.ti↗','extended').text,'ˈпе̇·ті↗');
});
test('Extended preserves narrow phonetic modifiers',()=>assert.equal(renderUfpn('ʁ̞ tʲ kʷ','extended').text,'х̬̠̞ тʲ кʷ'));
test('unknown IPA remains visible and is reported',()=>{
 const r=renderUfpn('ʔ'); assert.equal(r.text,'⟦ʔ⟧'); assert.deepEqual(r.unsupported,['ʔ']);
});
test('NFC and NFD produce stable normalized output',()=>{
 const s='ɑ̃ ɛ̃ ɔ̃ œ̃'; assert.equal(renderUfpn(s).text,renderUfpn(s.normalize('NFD')).text);
 assert.equal(renderUfpn(s).text,renderUfpn(s).text.normalize('NFC'));
});
test('tokenizer preserves prosodic controls and combining marks',()=>{
 assert.deepEqual(tokenizeIpa('ˈt͡sɛː‿a'),['ˈ','t͡','s','ɛ','ː','‿','a']);
});
test('all mapping records have three levels and source provenance',()=>{
 for(const p of UFPN_MAPPING.phonemes){assert.ok(p.basic&&p.detailed&&p.extended,p.id);assert.ok(p.sources.length,p.id);assert.ok(p.evidenceStatus,p.id);}
});

test('documented rhotic allophones have explicit practical mappings',()=>{
 assert.equal(renderUfpn('χ ɣ ʁ̞ ɾ r ɹ x','extended').text,'х̠ х̬ х̬̠̞ р̌ р р̞ х');
});
