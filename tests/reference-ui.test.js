import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import mapping from '../data/ufpn-mapping.json' with {type:'json'};

const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');

test('French editorial colour palette uses ink blue, warm paper, wine red and muted gold',()=>{
 assert.match(css,/--paper:#F5F0E7/);
 assert.match(css,/--ink:#252B35/);
 assert.match(css,/--green:#26364A/);
 assert.match(css,/--green-deep:#17263A/);
 assert.match(css,/--coral:#A64B55/);
 assert.match(css,/--lime:#D8B98A/);
 assert.match(css,/--muted:#66717C/);
 assert.doesNotMatch(css,/--green:#245b49|--lime:#d9e77c|--coral:#e77f61/);
});

test('the technical IPA-to-UFPN and adopted-grapheme references use shared accordions',()=>{
 assert.match(app,/createReferenceAccordion\('ufpn-technical'/);
 assert.match(app,/createReferenceAccordion\('ufpn-graphemes'/);
 assert.match(app,/reference-accordion-title/);
 assert.match(app,/reference-accordion-count/);
 assert.doesNotMatch(app,/ufpn-features|featureDetails/);
});

test('phonetic dimensions remain in canonical data but are not exposed as a site panel',()=>{
 assert.equal(mapping.featureDimensions.length,18);
 assert.doesNotMatch(html,/Повний перелік фонетичних вимірів|ufpn-features/);
 assert.doesNotMatch(app,/createReferenceAccordion\('ufpn-features'/);
});

test('only adopted graphemes are displayed in the site inventory',()=>{
 assert.match(app,/appendGraphemeItem\(item\)/);
 assert.doesNotMatch(app,/appendGraphemeItem\(item,false\)|inventory\.candidates|Кандидат · не призначено/);
 assert.equal(mapping.graphemeInventory.adopted.length,10);
 assert.equal(mapping.graphemeInventory.candidates.length,2);
 assert.ok(mapping.graphemeInventory.adopted.some(item=>item.grapheme==='ъ'&&item.ipa.includes('ə')));
 for(const item of mapping.graphemeInventory.candidates)assert.ok(['ы','ё'].includes(item.grapheme));
 assert.match(app,/Cyrillic hard sign \(project-specific UFPN use\).*Кириличний твердий знак, проєктна голосна графема UFPN/s);
 assert.match(app,/'ъ':'У UFPN твердий знак ъ — проєктна голосна графема для IPA \/ə\//);
});

test('word breakdown opens on word selection without an extra checkbox',()=>{
 assert.match(html,/id="explain-panel"[^>]*hidden/);
 assert.doesNotMatch(html,/show-explanations|explanation-toggle-help|Показувати розбір вибраного слова/);
 assert.match(app,/\$\('explain-panel'\)\.hidden=false/);
 assert.match(app,/if\(b\)detail\(Number\(b\.dataset\.index\)\)/);
});

test('reference panels remain responsive and keyboard accessible without unused controls',()=>{
 assert.match(css,/\.reference-accordion>summary:focus-visible/);
 assert.match(css,/\.feature-grid/);
 assert.match(css,/\.grapheme-list/);
 assert.doesNotMatch(css,/\.status-options|\.explanation-toggle/);
});

test('the page removes decorative micro-labels and keeps meaningful navigation',()=>{
 for(const phrase of ['ФОНЕТИЧНИЙ РОБОЧИЙ СТІЛ','01 / ВВЕДЕННЯ','02 / РЕЗУЛЬТАТ','03 / ФОНЕТИЧНИЙ РОЗБІР','ПРИНЦИП РОБОТИ','дослідницька версія 0.2','незабаром'])
  assert.ok(!html.includes(phrase),'decorative or unavailable UI copy remains: '+phrase);
 for(const phrase of ['Ваш текст','Результат вимови','Міжнародний фонетичний алфавіт','Український запис','Підказка латиницею','Не транслітерація.'])
  assert.ok(html.includes(phrase),'meaningful product information was removed: '+phrase);
 assert.ok(html.includes('<footer>')&&html.includes('Джерела')&&html.includes('Стан проєкту')&&html.includes('</footer>'));
 assert.doesNotMatch(html,/<option disabled>/);
});


test('profile selector explains pronunciation differences in plain Ukrainian',()=>{
 assert.match(html,/Варіант вимови/);
 assert.match(html,/Елізія — випадіння звука \/ə\//);
 assert.match(html,/цей звук позначається літерою ъ/);
 assert.match(html,/Звичайна вимова/);
 assert.match(html,/Вокальна дикція/);
});

test('result captions distinguish phonetic notation from a reading aid',()=>{
 assert.match(html,/Результат вимови/);
 assert.match(html,/проміжний запис/);
 assert.match(html,/гібридна нотація/);
 assert.match(html,/Спрощена підказка для читання/);
 assert.match(html,/не є точною фонетичною транскрипцією/);
});


test('profile help is visually subordinate but readable',()=>{
 assert.match(html,/aria-describedby="profile-help"/);
 assert.match(css,/#profile-help/);
});


test('French reading companion teaches common spelling patterns and keeps examples actionable',()=>{
 assert.match(html,/id="french-reading-guide"/);assert.match(html,/Як читати французькою/);
 for(const pattern of ['ou','u','oi','au · eau','an · en','un · um','œ̃','è · ê','ç','Noël','-ent','enchaînement','ch','gn','ph','qu','liaison'])assert.ok(html.includes(pattern),'reading guide is missing '+pattern);
 assert.match(html,/data-lesson-example="Bonjour !"/);assert.match(app,/data-lesson-example/);assert.match(app,/source\.value=b\.dataset\.lessonExample/);
});
test('UFPN documentation is presented as an in-page visual guide, not a raw Markdown navigation link',()=>{
 assert.match(html,/href="#ufpn-guide"/);assert.match(html,/id="ufpn-guide"/);assert.doesNotMatch(html,/href="\.\/docs\/UKRAINIAN-NOTATION\.md"/);
 assert.match(html,/id="ufpn-symbol-grid"/);assert.match(html,/бɔ̃жуғ/);assert.match(app,/guideGrid\.append\(card\)/);
 assert.match(app,/technicalDetails\.id='ufpn-technical'/);assert.match(app,/featureDetails\.id='ufpn-features'/);assert.match(app,/graphemeDetails\.id='ufpn-graphemes'/);
});
test('learning companion and UFPN guide remain responsive and keyboard accessible',()=>{
 assert.match(css,/\.learning-section/);assert.match(css,/\.self-check summary/);assert.match(css,/\.ufpn-symbol-grid/);assert.match(css,/@media\(max-width:700px\)\{\.learning-section/);assert.match(css,/\.lesson-examples button/);assert.match(html,/зливається з \/ɛ̃\//);
});


test('requested UI simplification removes unused controls and expands the two uneven grids',()=>{
 assert.match(html,/class="lesson-card lesson-wide"[\s\S]*?04 · КІНЦІВКИ ТА ЗВ’ЯЗУВАННЯ/);
 assert.doesNotMatch(html,/show-explanations|explanation-toggle-help|Показувати розбір вибраного слова/);
 assert.doesNotMatch(html,/ufpn-features|Повний перелік фонетичних вимірів/);
 assert.doesNotMatch(html,/href="#ufpn-features"/);
 assert.doesNotMatch(html,/ufpn-level/);
 assert.doesNotMatch(html,/id="uncertainty"/);
 assert.match(html,/id="explain-panel"[^>]*hidden/);
 assert.match(app,/renderUfpn\(w\.ipa,'basic'\)/);
 assert.doesNotMatch(app,/w\.confidence|Упевненість|низька впевненість|explanationToggle|featureDetails/);
 assert.match(app,/for\(const item of inventory\.adopted\)/);
 assert.doesNotMatch(app,/appendGraphemeItem\(item,false\)|inventory\.candidates/);
 assert.match(css,/\.lesson-wide\{grid-column:1\/-1\}/);
 assert.match(css,/\.ufpn-symbol-grid\{display:flex/);
 assert.match(css,/\.ufpn-symbol-card\{flex:1 1 220px/);
 assert.match(css,/\.grapheme-list\{display:flex/);
 assert.match(css,/\.grapheme-card\{flex:1 1 320px/);
});
