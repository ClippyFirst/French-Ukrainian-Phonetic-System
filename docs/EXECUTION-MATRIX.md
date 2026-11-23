# Execution Matrix — Phase 2

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | main; working branch feat/french-ipa-ufpn-engine; PR #1 draft; based on main, 0 commits behind; live ahead count is shown in PR #1 |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry extended with academic sources; full literature review/specialist review remain |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended defined; expert validation pending |
| U2 | Machine-readable mapping | PARTIAL | 37 phonemic units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; not complete narrow-phonetic inventory |
| U3 | IPA→UFPN adapter | PARTIAL | deterministic adapter + tests + UI level selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD tests; browser grapheme/cursor/mobile checks not run |
| U5 | Extended Cyrillic grapheme inventory | PARTIAL | `ў` → /w/ and `э` → /ɛ, ɛ̃/ implemented; `ў` source distinguishes Belarusian orthographic status from [w] phonetic realization; `ы`, `ё` remain unassigned; expert usability review pending |
| F1 | Allophone registry | PARTIAL | evidence-backed cases documented; not every possible speaker realization |
| F2 | Prosody layer | PARTIAL | optional annotation markers; no audio prosody engine |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization documented; no full regional G2P model exists |
| E1 | French G2P and syntax | PARTIAL | Added clean-room context-sensitive grapheme rules, suffix/nasal/glide/consonant handling and per-grapheme rule trace with source spans; still lacks reviewed lexical exceptions, POS/morphology, h-aspiré classes, productive liaison/schwa/enchaînement and gold evaluation |
| Q1 | Unit tests | DONE_VERIFIED | GitHub Actions run 45167417126 on 1c63223: npm test passed 42/42 (12 engine + 23 UFPN + 7 French G2P/trace); npm run check passed; Pages deploy skipped on PR/feature branch. Local clone remains DNS-blocked, but hosted CI is authoritative |
| Q2 | Browser/mobile/accessibility | BLOCKED | no browser automation available in current runtime; prior Chromium timeout |
| Q3 | Linguistic benchmark | BLOCKED | independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md updated with academic sources/reuse limits |
| D2 | Repository LICENSE | DEFERRED | owner decision required |
| D3 | Pages deployment | PARTIAL | previous head CI test job succeeded; Pages deploy skipped on PR branch; Pages settings not verified |
