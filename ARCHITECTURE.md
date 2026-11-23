# Архітектура

Поточний pipeline:

French orthography → tokenization / lexical lookup / conservative G2P → contextual rules → canonical IPA → IPA tokenizer → UFPN adapter / Latin guide adapter → aligned UI output.

## UFPN boundary

- data/ufpn-mapping.json — канонічна машинозчитувана специфікація: phoneme records, diacritics, allophones, contextual processes, prosody, regional profiles and 18 phonetic feature dimensions.
- src/ufpn.js — чистий IPA → UFPN adapter з режимами Basic/Detailed/Extended.
- src/engine.js — наявний французький прототип, який повертає IPA; його словникова база та G2P fallback залишаються неповними.
- src/app.js — live UI; перемикач UFPN level перераховує лише адаптер, не запускає незалежний French→Ukrainian шлях.

## Дані та provenance

Кожна одиниця mapping містить IPA, category, артикуляційний опис, рівні запису, приклади, source IDs, confidence та evidenceStatus. Allophone/process registries позначають scope та статус реалізації. Наявність джерела не означає, що його corpus data імпортовані.

## Важливі межі

- Фонологічна транскрипція та вузька фонетична реалізація — різні рівні.
- Unknown IPA зберігається як ⟦…⟧ і потрапляє в unsupported.
- Prosody/allophone marks не виводяться з орфографії чи пунктуації.
- Регіональні профілі, крім metropolitan seed, поки описові, не виконувані.
- French G2P engine не є повною довільнотекстовою моделлю.
