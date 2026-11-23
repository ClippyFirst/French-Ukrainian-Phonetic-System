# Handoff — 2026-11-23

## Гілка й коміт
Робоча гілка: `feat/french-ipa-ufpn-engine`, створена від `main` / `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`. Кінцевий SHA буде записано після віддаленого коміту.

## Реалізовано
Статичний вебінтерфейс; IPA-first pipeline; експериментальна UFPN mapping table; не-standard Latin guide; seed-лексикон; low-confidence fallback; обмежені liaison/elision; provenance/explanations; copy/TXT/print-to-PDF; Node tests; GitHub Pages workflow; дослідницька документація.

## Перевірки
- `npm test` — PASS, 11/11.
- `npm run check` — PASS, node syntax checks для engine/app.
- `git clone ...` — BLOCKED: середовище не розв'язує github.com через DNS; віддалені зміни здійснюються GitHub connector API.
- Browser/mobile/accessibility, production Pages deployment, expert phonology review, benchmark — не запускалися.

## Блокери
1. Незалежна перевірка IPA seed-записів французьким фонетистом.
2. Перевірка UFPN українським фонетистом і user study.
3. Ліцензований gold corpus.
4. Повна POS/context-модель, liaison, schwa, числа, власні назви.
5. Browser QA та реальний Pages run.
6. Вибір ліцензії власником.

## Готовність
**Частковий прототип / research scaffold.** Не release-ready й не авторитетний конвертер довільних текстів.
