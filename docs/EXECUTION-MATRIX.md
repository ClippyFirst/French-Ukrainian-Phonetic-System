# Execution Matrix — Phase 2 and Web Service

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | main `b7c74e2`; working branch `feat/french-ipa-ufpn-engine`; PR #1 draft; latest inspected head `9693885`, 64 ahead / 0 behind |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry extended; full literature review and specialist review remain |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended defined; expert validation pending |
| U2 | Machine-readable mapping | PARTIAL | 37 segmental units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; not a complete narrow-phonetic inventory |
| U3 | IPA→UFPN adapter | PARTIAL | Deterministic adapter, tests and UI level selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD tests; browser grapheme/cursor/mobile checks not run |
| U5 | Extended Cyrillic grapheme inventory | PARTIAL | `ў` → /w/ and `э` → /ɛ, ɛ̃/ implemented; `ы`, `ё` remain unassigned; expert usability review pending |
| F1 | Allophone registry | PARTIAL | Evidence-backed cases documented; not every possible speaker realization |
| F2 | Prosody layer | PARTIAL | Optional annotation markers; no audio prosody engine |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization documented; no full regional G2P model |
| E1 | French G2P and syntax | PARTIAL | Original OpenIPA parser handles every French word; project IPA seed overrides and custom liaison rules removed. POS/morphology, h-aspiré, broad lexical coverage and gold evaluation remain incomplete |
| Q1 | Build, unit and syntax tests | DONE_VERIFIED | Latest push run 45178377533 and PR run 45178389166 on `9693885`: build passed; 46/46 tests passed; syntax check passed |
| Q2 | Browser/mobile/accessibility | TODO | Browser smoke test and Chromium/Firefox/WebKit accessibility QA not run |
| Q3 | Linguistic benchmark | BLOCKED | Independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md records sources, provenance and reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | Owner approved AGPL-3.0; LICENSE and THIRD_PARTY_NOTICES.md added |
| D3 | Pages deployment | BLOCKED | Repo reports `has_pages=false`; probe run 45177924718 passed build/tests/check but `actions/configure-pages@v5` returned HTTP 404. Owner must enable Settings → Pages → GitHub Actions |
| W1 | Browser web service UI | DONE_VERIFIED | `index.html`, `styles.css`, `src/app.js`: French input, OpenIPA profiles, IPA/UFPN/Latin outputs, 3 UFPN levels, word explanations, searchable reference, copy and TXT/PDF export; see docs/WEB-SERVICE.md |
| W2 | Browser-hosted smoke/accessibility QA | TODO | Requires Pages enabled and real browser QA in Chromium, Firefox and WebKit, including mobile, keyboard and screen-reader checks |

## OpenIPA engine integration (2026-11-23)

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source under `vendor/openipa/`; upstream revision in THIRD_PARTY_NOTICES.md; latest CI passed build, 46 tests and syntax check |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` via pinned esbuild 0.25.0; latest CI passed |
| Route all French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`, `src/engine.js`; 46/46 tests passed |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit normalization; `õ` and other conventions remain visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | LICENSE, THIRD_PARTY_NOTICES.md, README; owner approved AGPL-3.0 |
| Expand upstream fixture and edge-case coverage | TODO | Port additional upstream tests where feasible; distinguish regression fixtures from independent gold data |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
| Use OpenIPA text-level liaison/elision hooks in lyric profile | DONE_VERIFIED | Full-text adapter; tests cover `les amis` liaison and `calme ami` elision |

## Web service and deployment
- Browser application is implemented; README and `docs/WEB-SERVICE.md` describe capabilities, privacy model, local run and hosting.
- Deployment probe 45177924718: build/tests/check passed; Pages config returned 404 because `has_pages=false`.
- Workflow is intentionally safe: test on branch/PR; deploy only from `main`.
- Required owner action: Settings → Pages → Build and deployment → GitHub Actions; approve/merge PR #1; verify the live environment URL and deployed commit.
