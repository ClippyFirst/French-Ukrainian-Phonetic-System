# Execution Matrix

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch/commits/PR/branches/CI | DONE_VERIFIED | main, один initial commit, одна гілка, PR 0, workflow runs 0 |
| R2 | OpenIPA/Replica recon | PARTIAL | README, OpenIPA package.json та AGPL license, Replica README |
| E1 | Static frontend | DONE_VERIFIED | index.html, app.js, styles.css |
| E2 | IPA-first adapters | PARTIAL | обидва адаптери читають IPA; G2P fallback heuristic |
| E3 | UFPN | PARTIAL | mapping реалізовано, expert review відсутній |
| E4 | Latin guide | PARTIAL | реалізовано як non-standard mnemonic |
| E5 | French phonology/context | PARTIAL | seed lexicon + narrow liaison/elision |
| E6 | Provenance/explanations | PARTIAL | word-level, не grapheme-level |
| E7 | Copy/TXT/PDF | DONE_VERIFIED | код UI; реальний browser QA відсутній |
| Q1 | Unit tests | DONE_VERIFIED | 11/11 локально |
| Q2 | Browser/mobile/accessibility | BLOCKED | браузерний runner недоступний |
| Q3 | Linguistic benchmark | BLOCKED | gold set та експерти відсутні |
| D1 | Research docs | PARTIAL | source registry, але data imports не виконані |
| D2 | License | DEFERRED | потрібне рішення власника |
| D3 | GitHub Pages | PARTIAL | workflow є; Settings/deploy не перевірені |
