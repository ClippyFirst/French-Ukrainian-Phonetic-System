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
| Q2 | Browser/mobile/accessibility | TODO | Chromium/Firefox/WebKit, mobile, keyboard і screen-reader QA не виконані |
| Q3 | Linguistic benchmark | BLOCKED | Немає незалежно curated/licensed gold IPA/UFPN dataset; expert reviewers недоступні |
| D1 | Source registry | DONE_VERIFIED | `docs/SOURCE-REGISTRY.md` містить джерела, provenance та reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | AGPL-3.0 та third-party notices; власник явно погодив ліцензію 2026-11-23 |
| D3 | Pages deployment | PARTIAL | Main run 45195557498 успішно розгорнув commit `360ef54a08af2ff7146d2a4052c326fec6968173`; URL https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ ; HTTP/browser smoke verification не виконана через DNS failure у цьому середовищі |
| W1 | Browser web service UI | DONE_VERIFIED | Static app: French input, OpenIPA profiles, IPA/UFPN/Latin outputs, 3 UFPN levels, explanations, searchable reference, copy, TXT/PDF export |
| W2 | Browser-hosted smoke/accessibility QA | TODO | Потрібні live site і browser QA в Chromium, Firefox та WebKit |
| W3 | Cyrillic UFPN diacritic typography | PARTIAL | PR #8 `fix/native-opentype-diacritic-shaping` removes manual spacing-glyph decomposition and CSS overlays; canonical combining sequences are rendered as one text run for native OpenType GPOS `mark`/`mkmk` shaping. Regression tests added for stacked marks and tie bars. Local tests blocked by GitHub DNS failure; hosted CI status and browser visual QA pending. Earlier overlay/scale fixes are superseded. |

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
- Main Actions run 45195557498: build, 46 tests, syntax check and Pages deployment passed for typography fix commit `360ef54a08af2ff7146d2a4052c326fec6968173`.
- GitHub Pages is enabled and workflow deploys only from `main`.
- Main run 45195557498 successfully deployed typography fix commit `360ef54a08af2ff7146d2a4052c326fec6968173` and emitted URL https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Direct HTTP/content/browser verification remains unavailable because this environment could not resolve the host.
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
- Status W3 remains PARTIAL until hosted CI and browser screenshots/visual acceptance are verified. Local clone/test execution was blocked by DNS failure resolving github.com; official SIL Charis 7 package was not vendored.
