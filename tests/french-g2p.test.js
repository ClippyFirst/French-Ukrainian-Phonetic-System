import test from 'node:test';
import assert from 'node:assert/strict';
import {transcribeFrenchWord} from '../src/french-g2p.js';

test('core consonant digraphs',()=>{
 assert.equal(transcribeFrenchWord('chat'),'ʃa');
 assert.equal(transcribeFrenchWord('champ'),'ʃɑ̃');
 assert.equal(transcribeFrenchWord('montagne'),'mɔ̃taɲ');
 assert.equal(transcribeFrenchWord('phare'),'faʁ');
});
test('contextual c and g',()=>{
 assert.equal(transcribeFrenchWord('cité'),'site');
 assert.equal(transcribeFrenchWord('cadeau'),'kado');
 assert.equal(transcribeFrenchWord('girafe'),'ʒiʁaf');
 assert.equal(transcribeFrenchWord('gare'),'gaʁ');
});
test('common vowel groups and glides',()=>{
 assert.equal(transcribeFrenchWord('eau'),'o');
 assert.equal(transcribeFrenchWord('boîte'),'bwat');
 assert.equal(transcribeFrenchWord('oui'),'wi');
 assert.equal(transcribeFrenchWord('nuit'),'nɥi');
});
test('nasal spellings and oral-vowel context',()=>{
 assert.equal(transcribeFrenchWord('bon'),'bɔ̃');
 assert.equal(transcribeFrenchWord('année'),'ane');
});
test('final consonant heuristic',()=>{
 assert.equal(transcribeFrenchWord('petit'),'pəti');
 assert.equal(transcribeFrenchWord('avec'),'avɛk');
 assert.equal(transcribeFrenchWord('hiver'),'ivɛʁ');
 assert.equal(transcribeFrenchWord('mer'),'mɛʁ');
 assert.equal(transcribeFrenchWord('ville'),'vil');
});

import {transcribeFrenchWordDetailed} from '../src/french-g2p.js';
test('rule trace covers every source grapheme with spans and explanations',()=>{
 const d=transcribeFrenchWordDetailed('chat');
 assert.equal(d.ipa,'ʃa');
 assert.equal(d.trace.map(x=>x.grapheme).join(''),'chat');
 assert.ok(d.trace.every(x=>Number.isInteger(x.start)&&Number.isInteger(x.end)&&x.ruleId&&x.explanationUk));
 assert.equal(d.trace.at(-1).ruleId,'silent-final-consonant');
});

test('vowel-to-glide contexts include ou and final il',()=>{
 assert.equal(transcribeFrenchWord('jouer'),'ʒwe');
 assert.equal(transcribeFrenchWord('travail'),'tʁavaj');
});
