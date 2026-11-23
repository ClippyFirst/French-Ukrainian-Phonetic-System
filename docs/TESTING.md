# Тестування UFPN

Запуск: `npm run build && npm test`; syntax check: `npm run check`. Збірка компілює vendored OpenIPA TypeScript parser у browser ESM bundle через esbuild 0.25.0. OpenIPA integration tests: `tests/openipa-french.test.js` і `tests/french-g2p.test.js`; engine tests: `tests/engine.test.js`; UFPN tests: `tests/ufpn.test.js`.

Покриття:
- 37 одиниць референсного інвентарю та 15 allophone mappings;
- 18 feature dimensions із evidence/status;
- передні огублені голосні;
- чотири носові категорії;
- увулярний ротичний /ʁ/;
- /ɲ/ і периферійний /ŋ/;
- межі складів, довгота, наголос та інтонаційні маркери;
- вузькі IPA-модифікатори;
- увулярні та регіональні ротичні алофони;
- збереження невідомого IPA;
- NFC/NFD;
- aspiration, unreleased stops, syllabicity, voice quality, release modifiers;
- provenance/evidence metadata.

Після інтеграції OpenIPA набір включає upstream fixture tests, rule-trace/source-provenance tests, engine tests та UFPN adapter/specification tests. Hosted CI на новому commit має підтвердити фактичну кількість і проходження; попередні 44 тести на старому clean-room fallback не є доказом нового стану. Ці перевірки демонструють інтеграцію, а не gold pronunciation benchmark і не доводять вимову довільних слів. Незалежно верифікованих IPA/UFPN gold records поки 0. Browser, mobile, screen-reader, clipboard, аудіоакустичні вимірювання й експертна оцінка не виконані.


The UFPN suite additionally asserts /w/ → `ў`, /v/ → `в` across Basic/Detailed/Extended, /ɛ/ → `э`, nasal /ɛ̃/ → `э̃`, and explicit non-assignment rationale for `ы` and `ё`.


## OpenIPA integration gates
- Run `npm run build` before tests; the generated `src/openipa-french.js` is required by the browser adapter and test imports.
- Regression fixtures in `tests/openipa-french.test.js` reproduce examples from the upstream OpenIPA French test corpus.
- `sourceIpa` retains upstream conventions. Greek epsilon `ε` is normalized to standard IPA `ɛ`; `õ` remains visible until independently reviewed.
- Do not count upstream's own expected fixtures as independent gold records or use them to claim comparative accuracy.
