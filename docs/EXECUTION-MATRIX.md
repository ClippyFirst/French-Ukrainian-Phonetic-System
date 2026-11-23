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
| E1 | French G2P and syntax | PARTIAL | Original OpenIPA parser now handles every French word; project IPA seed overrides and custom liaison rules were removed. POS/morphology, h-aspiré classes, broad lexical coverage and gold evaluation remain incomplete |
| Q1 | Unit tests | DONE_VERIFIED | GitHub Actions run 45175694114 on code head 3d0d756: build passed; npm test passed 46/46 (14 engine + 23 UFPN + 4 French G2P adapter + 5 OpenIPA integration); npm run check passed. Pages deploy skipped on feature branch. Local clone remains DNS-blocked, hosted CI is authoritative |
| Q2 | Browser/mobile/accessibility | BLOCKED | no browser automation available in current runtime; prior Chromium timeout |
| Q3 | Linguistic benchmark | BLOCKED | independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md updated with academic sources/reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | Owner approved AGPL-3.0; LICENSE and THIRD_PARTY_NOTICES.md added |
| D3 | Pages deployment | PARTIAL | previous head CI test job succeeded; Pages deploy skipped on PR branch; Pages settings not verified |


## OpenIPA engine integration (2026-11-23)

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source preserved under `vendor/openipa/`; upstream revision recorded in THIRD_PARTY_NOTICES.md; CI run 45175694114 passed build, 46 tests and syntax check |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` via pinned esbuild 0.25.0; CI run 45175694114 passed |
| Route fallback G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`; `src/engine.js`; upstream fixture and trace tests; CI run 45174088150 passed 46/46 |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit notation normalization; `õ` and other conventions remain visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | `LICENSE`, `THIRD_PARTY_NOTICES.md`, README; owner approved AGPL-3.0 |
| Expand upstream fixture and edge-case coverage | TODO | Port additional upstream tests where feasible; distinguish regression fixtures from independent gold data |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
| Use OpenIPA text-level liaison/elision hooks in lyric profile | DONE_VERIFIED | `src/engine.js` calls full-text adapter; `tests/engine.test.js` covers `les amis` liaison and `calme ami` elision; CI run 45174088150 passed 47/47 and syntax check |
