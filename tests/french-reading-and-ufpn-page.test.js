import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../docs/ufpn.html',import.meta.url),'utf8');
const pageJs=readFileSync(new URL('../docs/ufpn-page.js',import.meta.url),'utf8');
const pageCss=readFileSync(new URL('../docs/ufpn-page.css',import.meta.url),'utf8');

test('main navigation opens a rendered UFPN HTML guide rather than raw Markdown',()=>{
 assert.match(html,/<a href="\.\/docs\/ufpn\.html">UFPN<\/a>/);
 assert.match(page,/<html lang="uk">/);
 assert.match(page,/<title>UFPN — довідник української фонетичної нотації<\/title>/);
 assert.match(page,/<script type="module" src="\.\/ufpn-page\.js"><\/script>/);
 assert.match(page,/Технічна специфікація Markdown/);
 assert.match(page,/id="inventory"/);
 assert.match(pageJs,/from '\.\.\/data\/ufpn-mapping\.json'/);
 assert.match(pageJs,/mapping\.phonemes/);
 assert.match(pageCss,/\.ufpn-data-table/);
});

test('UFPN guide explains IPA-first processing, all three levels and project-specific schwa grapheme',()=>{
 assert.match(page,/Французький текст/);
 assert.match(page,/IPA \/ МФА/);
 assert.match(page,/Basic/);
 assert.match(page,/Detailed/);
 assert.match(page,/Extended/);
 assert.match(page,/IPA \/ə\/.*графемою <b>ъ<\/b>/s);
 assert.match(page,/експериментальна проєктна нотація/);
});

test('French reading lessons cover common spelling patterns and contextual caveats',()=>{
 for(const phrase of ['ou','oi','au, eau','on, om','an, en, am, em','in, im, ain, ein','un, um','ë, ï','ch','gn','ils parlent','les amis','avec elle','Liaison','Enchaînement'])
  assert.ok(html.includes(phrase),'missing learning content: '+phrase);
 assert.match(html,/не є універсальна заміна/);
 assert.match(html,/не виникає автоматично/);
 assert.match(html,/регіональні варіанти/);
});

test('French reading self-check is keyboard-operable and reports feedback',()=>{
 assert.match(html,/id="quiz-question"/);
 assert.match(html,/data-quiz-answer="\/o\//);
 assert.match(html,/data-quiz-answer="\/u\//);
 assert.match(html,/data-quiz-answer="\/wa\//);
 assert.match(html,/id="quiz-feedback" role="status" aria-live="polite"/);
 assert.match(app,/quizFeedback\.textContent/);
 assert.match(app,/quiz-correct/);
});
