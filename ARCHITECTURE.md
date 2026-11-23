# Архітектура

Поточний pipeline:

French orthography → tokenization / OpenIPA French parser → source rule trace + source IPA → narrow notation normalization → canonical IPA → IPA tokenizer → UFPN adapter / Latin guide adapter → aligned UI output.

## French G2P boundary

- `vendor/openipa/src/transcription/french/ParseFrench.ts` — оригінальний text-level parser із правилами літер, винятками та опційними liaison/elision.
- `vendor/openipa/src/transcription/french/parse-letters/` — контекстні парсери окремих літер і графем.
- `vendor/openipa/src/transcription/french/FrenchRules.ts` та `FrenchExceptions.ts` — оригінальні пояснення правил і лексичні винятки.
- `src/french-g2p.js` — thin adapter, який зберігає upstream rule descriptions, source spans і raw source IPA. Greek epsilon `ε` нормалізується до IPA `ɛ`; інші upstream conventions не вгадуються.
- `scripts/build-openipa.mjs` — компілює vendored TypeScript у browser ESM bundle `src/openipa-french.js` за допомогою esbuild 0.25.0.
- `src/engine.js` — передає весь французький текст оригінальному OpenIPA parser; його word-level trace розподіляється за словами без локальних IPA override; lyric profile використовує upstream liaison/elision hooks.

## UFPN boundary

- `data/ufpn-mapping.json` — канонічна машинозчитувана специфікація: phoneme records, diacritics, allophones, contextual processes, prosody, regional profiles and 18 phonetic feature dimensions and the extended Cyrillic `graphemeInventory`.
- `src/ufpn.js` — чистий IPA → UFPN adapter з режимами Basic/Detailed/Extended.
- IPA — єдиний інтерфейс між французьким рушієм і UFPN; французький G2P не генерує українські графеми напряму.
- Невідомі IPA символи зберігаються як `⟦…⟧` і потрапляють у unsupported.

## Дані та provenance

Кожна одиниця mapping містить IPA, category, артикуляційний опис, рівні запису, приклади, source IDs, confidence та evidenceStatus. Allophone/process registries позначають scope та статус реалізації. Наявність джерела не означає, що його corpus data імпортовані.

## Важливі межі

- OpenIPA орієнтований на lyric diction; це не доказ повної якості сучасної спонтанної вимови.
- Проєктні словникові override вимкнено, щоб не змінювати результат OpenIPA; сам upstream parser має задокументовані межі покриття.
- Upstream `õ` поки не має узгодженого alias у canonical IPA inventory й залишається видимим unsupported.
- POS-залежне `-ent`, повна морфологія, h-aspiré, регіональні G2P моделі та інші upstream TODO залишаються обмеженнями.
- Prosody/allophone marks не виводяться з орфографії чи пунктуації.
- Browser/mobile/accessibility QA та незалежна фонетична перевірка ще не виконані.
