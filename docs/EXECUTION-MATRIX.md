# Execution Matrix — Phase 2 and Web Service

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | Початковий main `b7c74e2`; PR #1 (69 commits, 84 files) злито squash merge; main merge SHA `313fc0dfef85afaf413dfc4f91d93019f578ed7d` |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry розширено; повний літературний синтез і specialist review залишаються |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended реалізовано; незалежна експертна валідація очікується |
| U2 | Machine-readable mapping | PARTIAL | 37 segmental units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; це не повний вузькофонетичний інвентар |
| U3 | IPA→UFPN adapter | PARTIAL | Детермінований adapter, тести й UI selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD тести проходять у Node CI; browser grapheme/cursor/mobile перевірки не виконані |
| U5 | Extended Cyrillic grapheme inventory | PARTIAL | `ў` → /w/ і `э` → /ɛ/ реалізовано; `ы`, `ё` навмисно не призначені; usability review pending |
| F1 | Allophone registry | PARTIAL | Документовано evidence-backed cases; не всі можливі реалізації мовців |
| F2 | Prosody layer | PARTIAL | Optional annotation markers; аудіо prosody engine відсутній |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization описано; повної regional G2P моделі немає |
| E1 | French G2P and syntax | PARTIAL | Оригінальний OpenIPA parser обробляє французький текст; POS/morphology, h-aspiré, lexical coverage та незалежна gold evaluation неповні |
| Q1 | Build, unit and syntax tests | DONE_VERIFIED | Feature CI 45179583235, typography PR CI 45195492754 і main CI 45195557498: build passed, 46/46 tests passed, syntax check passed |
| Q2 | Browser/mobile/accessibility | PARTIAL | Chromium desktop/mobile and Firefox/WebKit desktop/mobile checks are added in PR #10; keyboard, screen-reader and real-device QA remain outstanding until checks complete |
| Q3 | Linguistic benchmark | BLOCKED | Немає незалежно curated/licensed gold IPA/UFPN dataset; expert reviewers недоступні |
| D1 | Source registry | DONE_VERIFIED | `docs/SOURCE-REGISTRY.md` містить джерела, provenance та reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | AGPL-3.0 та third-party notices; власник явно погодив ліцензію 2026-11-23 |
| D3 | Pages deployment | DONE_VERIFIED | Main workflow 45217105821 успішно розгорнув `9bc73498cd6e5f1190d508884d48af3a58ce89a2`; live site and stylesheet returned HTTP 200 via fresh public scrape; CSS confirms local Charis Regular/Bold WOFF2 and no legacy Charis SIL import |
| W1 | Browser web service UI | DONE_VERIFIED | Static app: French input, OpenIPA profiles, IPA/UFPN/Latin outputs, 3 UFPN levels, explanations, searchable reference, copy, TXT/PDF export |
| W2 | Browser-hosted smoke/accessibility QA | PARTIAL | Live Pages page and stylesheet returned HTTP 200; deployed sample rendered. Chromium passed all 23 clusters in run 45217105821; PR #10 adds Firefox/WebKit and mobile viewports. Keyboard/screen-reader/owner acceptance remain |
| W3 | Cyrillic UFPN diacritic typography | PARTIAL | Native NFC text run retained; official SIL Charis 7.000 is now self-hosted locally with Regular/Bold WOFF2 and OFL-1.1. Font audit script checks all 36 inventory codepoints, mapped mark-to-base/mark-to-mark anchor pairs and HarfBuzz shaping; CI pending. Browser visual acceptance still required. |
| W4 | Vendor official Charis 7.000 webfonts | DONE_VERIFIED | Official SIL release archive SHA-256 verified in GitHub Actions run 45213736031; Regular/Bold WOFF2 and exact OFL text committed; local @font-face + preload replace external Charis SIL import. |
| W5 | Inspect Charis 7 glyph and anchor coverage | DONE_VERIFIED | CI passed: all 36 inventory codepoints, 19 combining marks, 23 mapped clusters, 46 HarfBuzz samples; active Cyrillic `mark`/`mkmk` and required anchor pairs verified in run 45216293204. |
| W6 | Browser visual QA for stacked UFPN marks | PARTIAL | Chromium loaded local Charis Regular (312,790 bytes), confirmed `document.fonts.check`, and rendered all 23 clusters; screenshot artifact 14839625822 visually inspected. Firefox/WebKit, keyboard/screen-reader, real-device and owner acceptance remain. |

## OpenIPA engine integration

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source у `vendor/openipa/`; upstream revision зазначена в THIRD_PARTY_NOTICES.md |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` passed in CI |
| Route French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`, `src/engine.js`; integration tests included |
| Align upstream IPA notation to canonical IPA | PARTIAL | `ε` → `ɛ` explicit; `õ` unresolved/visible pending phonetic review |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | LICENSE, THIRD_PARTY_NOTICES.md, README; owner approval explicit |
| Expand upstream fixture and edge-case coverage | TODO | Port additional upstream tests; distinguish regression fixtures from independent gold data |
| Browser/mobile/accessibility and expert phonetic QA | TODO | Manual browser matrix and independent French/Ukrainian review |
| Use OpenIPA text-level liaison/elision hooks in lyric profile | DONE_VERIFIED | Full-text adapter; tests cover `les amis` liaison and `calme ami` elision |

## Web service and deployment
- Static browser app is implemented and documented in README and `docs/WEB-SERVICE.md`.
- Main Actions run 45217105821: build, 48 tests, syntax check, Charis font audit, Chromium specimen and Pages deployment passed for commit `9bc73498cd6e5f1190d508884d48af3a58ce89a2`.
- GitHub Pages is enabled and workflow deploys only from `main`.
- Main run 45217105821 successfully deployed commit `9bc73498cd6e5f1190d508884d48af3a58ce89a2`. A fresh live scrape confirmed HTTP 200 for the public app and stylesheet, the current Ukrainian UI and the self-hosted Charis Regular/Bold WOFF2 declarations; no legacy Charis SIL Google Fonts import remains.
- PR #2 added Noto Sans but did not resolve detached marks. Follow-up branch uses Charis SIL, specifically designed for language/phonetic text and combining marks; IPA→UFPN mapping strings are unchanged. Browser confirmation remains required.


## Deterministic UFPN typography follow-up
- Branch: `fix/deterministic-cyrillic-diacritic-layout` (based on main `f28e20436f988342a88fa04f1720f5144a05fe70`).
- Added `src/ufpn-display.js`, CSS overlay positioning, display decomposition tests and syntax-check coverage.
- This is a visual rendering layer only; copied/exported UFPN remains canonical combining Unicode.
- Status remains PARTIAL until CI, deployment and owner visual acceptance pass.

- PR #4 merged as `1560bbb65d6e142c9d25cb45d2307d1db5f7b65a`; PR #5 merged as `214c65e527b83a565371309599fa2d47251cd6d4`. PR CI runs 45201122860 and 45201424564 passed; main run 45201504905 passed build, tests, syntax checks and Pages deployment.
- Typography spacing refinement: branch `fix/compact-ufpn-diacritic-spacing` removes excess top padding and tightens mark offsets after owner feedback; visual acceptance remains pending.


### Diacritic scale correction (2026-11-23)
- Research: Google Fonts diacritics guidance recommends coherent mark proportions, conventional shapes, optical attachment to the base, and compact, balanced stacked marks: https://googlefonts.github.io/gf-guide/diacritics.html . OpenType GPOS describes mark-to-base and mark-to-mark attachment: https://learn.microsoft.com/en-us/typography/opentype/spec/gpos .
- Inspection: the overlay marks used bold Manrope at `.62em` while the base used Charis SIL. At 22px output this rendered marks at approximately 13.6px.
- Branch `fix/typographic-diacritic-scale`: same phonetic typeface as the base, regular weight, `.42em` (approximately 9.2px at 22px). No universal ratio is prescribed by the cited guidance; the value is an explicit proportional correction to the measured implementation.
- Status PARTIAL until CI, Pages deployment and owner visual acceptance. Browser visual QA remains outstanding.


### Native OpenType shaping correction (2026-11-23)
- Root cause verified by source inspection: manual DOM decomposition and spacing-glyph overlays bypass font-native mark attachment.
- Implementation on PR #8 branch: `src/ufpn-display.js` now assigns the complete NFC-normalized UFPN string to one text node; overlay CSS removed; `mark`/`mkmk` features remain enabled.
- Tests added for stacked combining marks and affricate tie bars. No phonetic mappings or canonical output changed.
- Status W3 remains PARTIAL pending Firefox/WebKit and owner-side visual acceptance. The official Charis 7 package is vendored; hosted font/anchor audit and Chromium desktop/mobile rendering are automated.


### Official Charis 7.000 font migration (2026-11-23)
- Feature branch: `fix/vendor-charis-7-diacritics`, based on main `b9fbca4fde027fc57213a205a3c5acf157b7c8f1`.
- Official SIL Charis 7.000 ZIP downloaded by GitHub Actions and SHA-256 verified against the published release asset digest (`e3237b1303c5d31af8f59b1d1914886c5e873b77c71390e4742fb3bc1c187666`).
- Vendored only Regular and Bold WOFF2 files (about 629 KB combined) plus the exact SIL OFL-1.1 license text. Local `@font-face` declarations and a preload replace the Charis SIL Google Fonts dependency for UFPN; the other UI fonts remain external.
- `scripts/audit-charis-font.py` checks all 36 mapping inventory codepoints, actual mark-to-base pairs used in mapped outputs, mark-to-mark pairs used by stacked combinations, and HarfBuzz output/zero-advance behavior. CI passed in run 45216293204: all 36 inventory codepoints, 19 combining marks, 23 mapped clusters and 46 HarfBuzz shaping samples passed.
- The import-only workflow was deleted after the font files were committed; the normal Pages workflow now runs the font audit on PR and main.
- W5 is DONE_VERIFIED. Chromium browser rendering passed for all 23 clusters and the generated screenshot was visually inspected; W6 remains PARTIAL until Firefox/WebKit/mobile and owner-side visual acceptance. The screenshot is retained as workflow artifact 14839625822 (run 45216293204).
\n\n### Live deployment and cross-browser follow-up (2026-11-23)\n- Main `9bc73498cd6e5f1190d508884d48af3a58ce89a2` is deployed; workflow [45217105821](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45217105821) passed both test and deploy jobs.\n- Public app and `styles.css` independently returned HTTP 200 on a fresh live scrape. The app rendered its current sample; CSS contains local Charis Regular/Bold WOFF2 declarations and no Charis SIL Google Fonts import.\n- PR #10 adds Playwright coverage for Chromium, Firefox and WebKit at desktop and mobile viewport sizes; until that run completes, cross-engine status remains PARTIAL. Keyboard, screen-reader, real-device and owner visual acceptance are separate outstanding gates.\n