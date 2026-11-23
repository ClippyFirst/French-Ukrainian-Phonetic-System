# Тестування UFPN

Запуск: `npm test`; syntax check: `npm run check`. French G2P tests: `tests/french-g2p.test.js`; UFPN tests: `tests/ufpn.test.js`.

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

Поточний набір: 12 engine tests + 23 UFPN adapter/specification tests + 6 French G2P/rule-trace tests (разом 41; GitHub Actions run 45167053528 passed all 41 tests and `npm run check` on code head 375f329). Це перевірки адаптера, структури даних і окремих очікуваних правил; не gold pronunciation benchmark і не доказ вимови довільних слів. Незалежно верифікованих IPA/UFPN gold records поки 0. Browser, mobile, screen-reader, clipboard, аудіоакустичні вимірювання й експертна оцінка не виконані. Поточний G2P fallback потребує незалежної перевірки; його low-confidence output не слід трактувати як словникову транскрипцію.


The UFPN suite additionally asserts /w/ → `ў`, /v/ → `в` across Basic/Detailed/Extended, /ɛ/ → `э`, nasal /ɛ̃/ → `э̃`, and explicit non-assignment rationale for `ы` and `ё`.
