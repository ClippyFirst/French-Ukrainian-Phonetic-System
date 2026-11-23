# Execution Matrix — Phase 2

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | main; working branch feat/french-ipa-ufpn-engine; PR #1 draft; 6 commits ahead, 0 behind before Phase 2 |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry extended with academic sources; full literature review/specialist review remain |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended defined; expert validation pending |
| U2 | Machine-readable mapping | PARTIAL | 37 phonemic units + 15 allophone mappings + 24 diacritic/prosodic markers + 13 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; not complete narrow-phonetic inventory |
| U3 | IPA→UFPN adapter | PARTIAL | deterministic adapter + tests + UI level selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD tests; browser grapheme/cursor/mobile checks not run |
| F1 | Allophone registry | PARTIAL | evidence-backed cases documented; not every possible speaker realization |
| F2 | Prosody layer | PARTIAL | optional annotation markers; no audio prosody engine |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization documented; no full regional G2P model exists |
| E1 | French G2P and syntax | PARTIAL | prior seed fallback/narrow liaison; no full morphology/POS/context |
| Q1 | Unit tests | PARTIAL | previous 11 tests + UFPN tests; final CI run pending |
| Q2 | Browser/mobile/accessibility | BLOCKED | no browser automation available in current runtime; prior Chromium timeout |
| Q3 | Linguistic benchmark | BLOCKED | independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md updated with academic sources/reuse limits |
| D2 | Repository LICENSE | DEFERRED | owner decision required |
| D3 | Pages deployment | PARTIAL | previous head CI test job succeeded; Pages deploy skipped on PR branch; Pages settings not verified |
