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
| Q1 | Unit tests | DONE_VERIFIED | CI run 45177924718: build passed; npm test passed 46/46; npm run check passed. Local clone remains DNS-blocked, hosted CI is authoritative |
| Q2 | Browser/mobile/accessibility | TODO | Browser smoke test and Chromium/Firefox/WebKit accessibility QA not run |
| Q3 | Linguistic benchmark | BLOCKED | independent gold IPA/UFPN set = 0; expert reviewers unavailable |
| D1 | Source registry | DONE_VERIFIED | docs/SOURCE-REGISTRY.md updated with academic sources/reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | Owner approved AGPL-3.0; LICENSE and THIRD_PARTY_NOTICES.md added |
| D3 | Pages deployment | BLOCKED | Repo reports `has_pages=false`; CI run 45177924718 build/tests passed but `actions/configure-pages@v5` returned Get Pages site failed: Not Found. Owner must enable Settings → Pages → Build and deployment → GitHub Actions. |
| W1 | Browser web service UI | DONE_VERIFIED | `index.html`, `styles.css`, `src/app.js` provide French input, OpenIPA profiles, IPA/UFPN/Latin outputs, 3 UFPN levels, word explanations, searchable reference, copy and TXT/PDF export; see docs/WEB-SERVICE.md |
| W2 | Browser-hosted smoke/accessibility QA | TODO | Requires Pages enabled and real browser QA in Chromium, Firefox and WebKit, including mobile and keyboard/screen-reader checks |

## OpenIPA engine integration (2026-11-23)

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source preserved under `vendor/openipa/`; upstream revision recorded in THIRD_PARTY_NOTICES.md; CI run 45177924718 passed build, 46 tests and syntax check |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` via pinned esbuild 0.25.0; CI run 45177924718 passed |
| Route all French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`; `src/engine.js`; upstream fixture and trace tests; CI run 45177924718 passed 46/46 |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit notation normalization; `õ` and other conventions remain visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | `LICENSE`, `THIRD_PARTY_NOTICES.md`, README; owner approved AGPL-3.0 |
| Expand upstream fixture and edge-case coverage | TODO | Port additional upstream tests where feasible; distinguish regression fixtures from independent gold data |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
| Use OpenIPA text-level liaison/elision hooks in lyric profile | DONE_VERIFIED | `src/engine.js` calls full-text adapter; `tests/engine.test.js` covers `les amis` liaison and `calme ami` elision; CI run 45177924718 passed 46/46 and syntax check |

## Web service and deployment continuation

- The browser application was already present in the working branch; this continuation audited its real entry points and documented the user-facing capabilities in `docs/WEB-SERVICE.md`.
- Updated README to identify it as a web service and link its run/deployment instructions.
- Attempted feature-branch Pages deployment in CI run `45177924718`. Build, all 46 tests and syntax checks passed; deploy failed because the repository has no Pages site configured (`has_pages=false`; configure-pages returned Not Found).
- Restored the safe deployment gate: feature branch continues to run build/tests, deployment remains on `main` only. No external Pages setting was changed.
- Required owner action: Settings → Pages → Build and deployment → GitHub Actions. After that, merge PR #1 or run the workflow on `main`; confirm the deploy environment URL before declaring the service publicly hosted.
