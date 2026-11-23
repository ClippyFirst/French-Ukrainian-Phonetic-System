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
 assert.equal(transcribeFrenchWord('avec'),'avɛk');
});
test('final consonant heuristic',()=>{
 assert.equal(transcribeFrenchWord('petit'),'pəti');
 assert.equal(transcribeFrenchWord('avec'),'avɛk');
 assert.equal(transcribeFrenchWord('hiver'),'ivɛʁ');
});
