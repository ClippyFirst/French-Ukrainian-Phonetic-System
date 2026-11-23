# Тестування UFPN

Запуск: npm test. UFPN-тести: tests/ufpn.test.js.

Покриття:
- 37 одиниць референсного інвентарю та 15 allophone mappings;
- 13 feature dimensions із evidence/status;
- передні огублені голосні;
- чотири носові категорії;
- увулярний ротичний /ʁ/;
- /ɲ/ і периферійний /ŋ/;
- межі складів, довгота, наголос та інтонаційні маркери;
- вузькі IPA-модифікатори;
- увулярні та регіональні ротичні алофони;
- збереження невідомого IPA;
- NFC/NFD;
- provenance/evidence metadata.

Поточний набір: 11 engine tests + 17 UFPN adapter/specification tests (разом 28). Це перевірки адаптера та структури даних, не gold pronunciation benchmark і не доказ вимови прикладів. Незалежно верифікованих IPA/UFPN gold records поки 0. Browser, mobile, screen-reader, clipboard, аудіоакустичні вимірювання й експертна оцінка не виконані.
