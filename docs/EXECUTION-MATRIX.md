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
| Q1 | Unit tests | DONE_VERIFIED | GitHub Actions run 45168613204 on code head 594cb0b: npm test passed 44/44 (13 engine + 23 UFPN + 8 French G2P/trace); npm run check passed; PR run 45168622148 also passed; Pages deploy skipped on PR/feature branch. Local clone remains DNS-blocked, but hosted CI is authoritative |
| Q2 | Browser/mobile/accessibility | BLOCKED | no browser automation available in current runtime; prior Chromium timeout |
| Q3 | Linguistic benchmark | BLOCKED | independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md updated with academic sources/reuse limits |
| D2 | Repository LICENSE | DEFERRED | owner decision required |
| D3 | Pages deployment | PARTIAL | previous head CI test job succeeded; Pages deploy skipped on PR branch; Pages settings not verified |


## OpenIPA engine integration (2026-11-23)

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_PENDING_CI | Source preserved under `vendor/openipa/`; upstream revision recorded in THIRD_PARTY_NOTICES.md; build and CI must pass |
| Build upstream TypeScript into browser ESM bundle | DONE_PENDING_CI | `npm run build` via pinned esbuild 0.25.0; bundle is generated as `src/openipa-french.js` |
| Route fallback G2P through upstream parser and preserve rule traces | DONE_PENDING_CI | `src/french-g2p.js`; `src/engine.js`; regression tests in `tests/openipa-french.test.js` |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit notation normalization; `õ` and other conventions remain visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_PENDING_CI | `LICENSE`, `THIRD_PARTY_NOTICES.md`, README; verify CI |
| Verify full seed lexicon against upstream and external dictionaries | TODO | Compare every seed entry; only independently verified entries may receive high confidence |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
