# Архітектура

```text
French input → NFC/tokenizer → lexical lookup / orthographic fallback
 → narrow contextual rules → phonological IPA
 → phoneme tokenization → IPA display
                         ├→ IPA-to-UFPN adapter
                         └→ IPA-to-Latin-guide adapter
```

`src/engine.js` — детерміноване ядро. `transcribe()` повертає послівні IPA, сегменти, source, confidence, alternatives, profile та пояснення. Обидва адаптери споживають тільки IPA-токени; вони не читають французькі графеми.

| Модуль | Стан |
|---|---|
| Unicode/tokenizer | Частково |
| Морфологія/POS | TODO |
| Лексикон | Малий project-seed-unverified |
| G2P fallback | Евристичний, низька впевненість |
| Liaison/elision | Обмежена підмножина |
| IPA/UFPN/Latin adapters | Базова реалізація |
| Alignment/explanations | Послівне вирівнювання, не grapheme-level |
| UI | Live input, три формати, copy/export |

Не реалізовані: повний синтаксис, схеми фонологічних правил з rule IDs, повна schwa-модель, регіональні профілі, audio, corpus import. Надалі морфологія має повертати POS/features до правил; IPA має зберігати provenance й альтернативи.
