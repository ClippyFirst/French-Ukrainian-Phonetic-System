# Execution Matrix — Phase 2 and Web Service

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | main `b7c74e2`; working branch `feat/french-ipa-ufpn-engine`; PR #1 open/Draft; last verified implementation SHA `eb92e2e`; later commits update docs only; branch was 68 ahead / 0 behind before final documentation sync |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry extended; complete literature synthesis and specialist review remain |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended implemented; independent expert validation pending |
| U2 | Machine-readable mapping | PARTIAL | 37 segmental units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; not a complete narrow-phonetic inventory |
| U3 | IPA→UFPN adapter | PARTIAL | Deterministic adapter, tests and UI level selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD tests pass in Node CI; browser grapheme/cursor/mobile checks not run |
| U5 | Extended Cyrillic grapheme inventory | PARTIAL | `ў` → /w/ and `э` → /ɛ, ɛ̃/ implemented; `ы`, `ё` deliberately unassigned; expert usability review pending |
| F1 | Allophone registry | PARTIAL | Evidence-backed cases documented; not every possible speaker realization |
| F2 | Prosody layer | PARTIAL | Optional annotation markers; no audio prosody engine |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization documented; no full regional G2P model |
| E1 | French G2P and syntax | PARTIAL | Original OpenIPA parser handles French text; POS/morphology, h-aspiré, broad lexical coverage and independent gold evaluation remain incomplete |
| Q1 | Build, unit and syntax tests | DONE_VERIFIED | Current-head run 45178726418: build passed; 46/46 tests passed; syntax check passed |
| Q2 | Browser/mobile/accessibility | TODO | Chromium/Firefox/WebKit, mobile, keyboard and screen-reader QA not run |
| Q3 | Linguistic benchmark | BLOCKED | No independently curated/licensed gold IPA/UFPN dataset; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | `docs/SOURCE-REGISTRY.md` records sources, provenance and reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | AGPL-3.0 and third-party notices present; owner approval recorded in project history |
| D3 | Pages deployment | BLOCKED | Pages not enabled/configured; probe 45177924718 passed build/tests/check but configure-pages returned HTTP 404. Available connector cannot change this setting; owner action required |
| W1 | Browser web service UI | DONE_VERIFIED | Static app provides French input, OpenIPA profiles, IPA/UFPN/Latin outputs, 3 UFPN levels, explanations, searchable reference, copy and TXT/PDF export |
| W2 | Browser-hosted smoke/accessibility QA | TODO | Requires Pages preview/live site and browser QA in Chromium, Firefox and WebKit |

## OpenIPA engine integration

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source under `vendor/openipa/`; upstream revision in THIRD_PARTY_NOTICES.md |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` passed in current-head CI |
| Route French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`, `src/engine.js`; integration tests included |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit; `õ` remains unresolved/visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | LICENSE, THIRD_PARTY_NOTICES.md, README |
| Expand upstream fixture and edge-case coverage | TODO | Port additional upstream tests where feasible; distinguish regression fixtures from independent gold data |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
| Use OpenIPA text-level liaison/elision hooks in lyric profile | DONE_VERIFIED | Full-text adapter; tests cover `les amis` liaison and `calme ami` elision |

## Web service and deployment
- Static browser app is implemented and documented in README and `docs/WEB-SERVICE.md`.
- Current-head Actions run 45178726418 passed build, all 46 tests and syntax checks; deploy skipped on feature branch.
- Pages deployment probe 45177924718 passed build/tests/check but failed at configure-pages because Pages is disabled.
- Workflow tests feature/PR refs and deploys only from `main`.
- Required owner action: Settings → Pages → Build and deployment → GitHub Actions; review/merge PR #1; verify live URL and deployed SHA.
