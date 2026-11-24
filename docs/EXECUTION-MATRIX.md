# Execution Matrix — Phase 2 and Web Service

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | Початковий main `b7c74e2`; PR #1 (69 commits, 84 files) злито squash merge; main merge SHA `313fc0dfef85afaf413dfc4f91d93019f578ed7d` |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry розширено; повний літературний синтез і specialist review залишаються |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended реалізовано; незалежна експертна валідація очікується |
| U2 | Machine-readable mapping | PARTIAL | 37 segmental units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; це не повний вузькофонетичний інвентар |
| U3 | IPA→UFPN adapter | PARTIAL | Детермінований adapter, тести й UI selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD тести проходять у Node CI; browser grapheme/cursor/mobile перевірки не виконані |
| U5 | Extended Cyrillic grapheme inventory and Ukrainian sound table | PARTIAL | `ў`, `ү`, `ө`, `њ`, `ң`, `ғ`, збережені IPA-графеми `ɛ`, `œ`, `ɔ` та проєктну графему `ъ` для IPA `/ə/` реалізовано; носові варіанти зберігають базову графему з тильдою; /ɥ/ uses owner-approved `й̹` composition and /ɲ/ retains `њ`; searchable UI table covers all 37 segments with exact/contextual/approximate/no-equivalent labels and a Ukrainian articulation guide per segment; usability and expert review pending |
| F1 | Allophone registry | PARTIAL | Документовано evidence-backed cases; не всі можливі реалізації мовців |
| F2 | Prosody layer | PARTIAL | Optional annotation markers; аудіо prosody engine відсутній |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization описано; повної regional G2P моделі немає |
| E1 | French G2P and syntax | PARTIAL | Оригінальний OpenIPA parser обробляє французький текст; POS/morphology, h-aspiré, lexical coverage та незалежна gold evaluation неповні |
| Q1 | Build, unit and syntax tests | DONE_VERIFIED | Main application commit `39eb12f6712c26c3afb1864ff8fbb8d5dbc78c28` and Pages workflow refactor commit `bba1a66fdb31241e889fe16fe25b2371bb3641fc` passed main workflow 45281476706: build, 58/58 tests, syntax, Charis 7 audit, 12 Chromium/Firefox/WebKit × viewport checks, Pages artifact build and deploy. PR #27/#28 and PR #30 CI also passed their applicable checks. |
| Q2 | Browser/mobile/accessibility | PARTIAL | PR #28 CI 45278479262 passed all 12 Chromium/Firefox/WebKit × viewport combinations; each verified the named French input and first-tab skip link focus transfer to `<main>`. Screen-reader, physical-device, zoom/reflow and owner visual acceptance remain outstanding |
| Q3 | Linguistic benchmark | BLOCKED | Немає незалежно curated/licensed gold IPA/UFPN dataset; expert reviewers недоступні |
| D1 | Source registry | DONE_VERIFIED | `docs/SOURCE-REGISTRY.md` містить джерела, provenance та reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | AGPL-3.0 та third-party notices; власник явно погодив ліцензію 2026-11-23 |
| D3 | Pages deployment | DONE_VERIFIED | Main workflow 45281476706 completed all three jobs successfully: test, `pages-artifact`, and `deploy`. Exactly one `github-pages` artifact (14870605812) was present alongside the Charis browser specimen (14870611063). Fresh Firecrawl scrape 01a20a90-e14f-7024-b6d9-0f5af46dd418 returned HTTP 200 and confirmed `main#top[tabindex=-1]`, the source textarea's `aria-labelledby=source-label`, 37 table rows, and all five expected headers including «Як вимовити». |
| W1 | Browser web service UI | DONE_VERIFIED | Live Pages deployment from main workflow 45281476706 verified by fresh scrape 01a20a90-e14f-7024-b6d9-0f5af46dd418 (HTTP 200). The live DOM contains the focusable main landmark and labelled French input; the sound table has exactly 37 rows and all five expected columns, including «Як вимовити». |
| W2 | Browser-hosted smoke/accessibility QA | PARTIAL | PR #28 CI 45278479262 and main workflow 45281476706 passed all 12 Chromium/Firefox/WebKit × viewport checks for accessible source naming, first-tab skip-link focus and focus transfer to `<main>`. Fresh live scrape confirms the deployed accessible DOM. Manual screen-reader, zoom/reflow, physical-device and owner visual acceptance remain outstanding. |
| W3 | Cyrillic UFPN diacritic typography | PARTIAL | Native NFC text run retained; official SIL Charis 7.000 is now self-hosted locally with Regular/Bold WOFF2 and OFL-1.1. Font audit script checks all 36 inventory codepoints, mapped mark-to-base/mark-to-mark anchor pairs and HarfBuzz shaping; font audit passed in run 45216293204; all six Chromium/Firefox/WebKit desktop/mobile typography checks passed in run 45233413912. Owner-side visual and accessibility acceptance remain. |
| W4 | Vendor official Charis 7.000 webfonts | DONE_VERIFIED | Official SIL release archive SHA-256 verified in GitHub Actions run 45213736031; Regular/Bold WOFF2 and exact OFL text committed; local @font-face + preload replace external Charis SIL import. |
| W5 | Inspect Charis 7 glyph and anchor coverage | DONE_VERIFIED | CI passed: all 45 UFPN inventory codepoints, 19 combining marks, 14 mapped clusters, 28 HarfBuzz shaping samples; active Cyrillic `mark`/`mkmk` and required anchor pairs verified in PR #16 run 45259870325. |
| W6 | Browser visual QA for stacked UFPN marks | PARTIAL | Main workflow 45281476706 passed all 12 Chromium/Firefox/WebKit × viewport checks and uploaded specimen artifact 14870611063. Earlier desktop/laptop/tablet/mobile screenshots were manually inspected. Screen-reader, zoom/reflow, physical-device and owner-side visual acceptance remain. |

## OpenIPA engine integration

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source у `vendor/openipa/`; upstream revision зазначена в THIRD_PARTY_NOTICES.md |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` passed in CI |
| Route French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`, `src/engine.js`; integration tests included |
| Align upstream IPA notation to canonical IPA | PARTIAL | Adapter normalizes OpenIPA `õ` → `ɔ̃`; maps `ɾ` → `ʁ` only for `metropolitan-fr`, and preserves `ɾ` for `lyric-diction-fr`. Raw upstream form remains in `sourceIpa`. Regression coverage for both profiles; independent phonetic review still pending. Other upstream notation/edge cases remain to audit |
| Adopt AGPL-3.0 and upstream attribution | DONE_VERIFIED | LICENSE, THIRD_PARTY_NOTICES.md, README; owner approval explicit |
| Expand upstream fixture and edge-case coverage | PARTIAL | All six rows in the vendored OpenIPA revision's `src/tests/french/_words.csv` are represented in `tests/openipa-french.test.js`; `descends` executable-vs-CSV divergence is explicitly pinned, and `garçon` asserts raw `gaɾsõ` provenance plus normalized `gaɾsɔ̃`. PR #27 CI 45277660637 passed 58/58 tests and all browser checks. These are upstream regression fixtures, not independent gold data; broader corpus reuse remains unassessed. |
| Browser/mobile/accessibility and expert phonetic QA | PARTIAL | Automated three-engine responsive and keyboard checks are verified (PR #28 / run 45278479262). Manual screen-reader/physical-device QA and independent French/Ukrainian phonetic review remain outstanding. |
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


### Live deployment and cross-browser follow-up (2026-11-23)
- Main `9bc73498cd6e5f1190d508884d48af3a58ce89a2` is deployed; workflow [45217105821](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45217105821) passed both test and deploy jobs.
- Public app and `styles.css` independently returned HTTP 200 on a fresh live scrape. The app rendered its current sample; CSS contains local Charis Regular/Bold WOFF2 declarations and no Charis SIL Google Fonts import.
- PR #10 adds Playwright coverage for Chromium, Firefox and WebKit at desktop and mobile viewport sizes; run 45233413912 passed all six browser/viewport checks; keyboard, screen-reader, real-device and owner visual acceptance remain. Keyboard, screen-reader, real-device and owner visual acceptance are separate outstanding gates.


### Post-merge verification status (2026-11-23)
- PR #10 merged at `87ae7c3566e373633ad53b945ef811951d3f4ea0`; its run 45233413912 passed all six cross-browser/viewport typography checks.
- Latest post-merge main workflow is tracked in `docs/AUDIT.md` and `HANDOFF.md`; do not treat superseded/cancelled run 45236413859 as a failure. Build, 48 tests, syntax and font audit had passed in run 45236513836 before its browser installation stage.
- Browser QA is technically verified; accessibility, physical-device and owner visual acceptance remain partial. Linguistic expert review and licensed gold benchmark remain blocked.


### OpenIPA canonical IPA adapter correction (2026-11-23)
- Primary-source check: the official OpenIPA site describes itself as a Lyric Diction tool and explicitly documents flipped French `r` as `[ɾ]`. Therefore the tap is intentional in the lyric profile, not a parser error.
- Adapter behavior is profile-aware: `metropolitan-fr` converts OpenIPA's lyric-diction `[ɾ]` convention to broad `/ʁ/`; `lyric-diction-fr` preserves `[ɾ]` → UFPN `р̌`. The raw upstream value remains in `sourceIpa` and trace. `õ` → `ɔ̃` and `ε` → `ɛ` remain explicit broad-IPA normalizations; no French-grapheme→UFPN shortcut was introduced.
- Added regressions for `bonjour`, `garçon`, and `mer`, including `bonjour` in both profiles: Metropolitan `бɔ̃жух̬̠`, lyric diction `бɔ̃жур̌`; both have no unsupported IPA.
- Status: implementation committed to a feature branch; CI and Pages deployment are pending. This is an adapter normalization based on the vendored parser's own enum and default `parseR` implementation, not independent expert validation of every French speaker or dialect.


### Profile-aware OpenIPA rhotic normalization (2026-11-23)
- Primary-source check: the official OpenIPA site describes itself as a Lyric Diction tool and explicitly describes flipped French `r` as `[ɾ]` (https://www.openipa.org/).
- Adapter behavior is profile-aware: `metropolitan-fr` converts OpenIPA's lyric-diction `[ɾ]` convention to broad `/ʁ/`; `lyric-diction-fr` preserves `[ɾ]` → UFPN `р̌`. The raw upstream value remains in `sourceIpa` and trace. `õ` → `ɔ̃` and `ε` → `ɛ` remain explicit broad-IPA normalizations.
- Regressions cover `bonjour` in both profiles, `garçon`, and `mer`; lyric-profile output is intentionally `бɔ̃жур̌`, while default Metropolitan output is `бɔ̃жух̬̠`.
- Independent expert review remains pending.


### Profile-aware OpenIPA correction — final main verification (2026-11-23)
- PR #13 merged as `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5`.
- Main workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) passed: build, 52/52 tests, syntax check, Charis 7 audit, all six Chromium/Firefox/WebKit desktop/mobile checks, and GitHub Pages deployment.
- Fresh live scrape confirms the default Metropolitan sample displays IPA `bɔ̃ʒuʁ` and UFPN `бɔ̃жух̬̠`; published source confirms the profile-aware adapter. Unit tests verify lyric-diction preserves `[ɾ]` and `р̌`.
- The adapter/profile behavior is DONE_VERIFIED. Independent phonetic expert review and licensed gold benchmark remain separate PARTIAL/BLOCKED gates.


### Expanded Cyrillic and Ukrainian sound correspondence table (2026-11-23)
- New dedicated letters reduce combining-mark load: `ү` /y/, `ө` /ø/, `ӧ` /œ/, `ӹ` /ə/, `њ` /ɲ/, `ң` /ŋ/, `ғ` /ʁ/. Existing `ў` /w/ and `э` /ɛ/ retained. `ү̯` represents non-syllabic /ɥ/ with one modifier.
- The browser now presents a visible, searchable table with 37 phoneme rows: UFPN letter, IPA sound, a Ukrainian word/position where the sound occurs, and an explicit exact/contextual/approximate/no-equivalent status. It does not fabricate Ukrainian examples for French nasal vowels or other absent contrasts.
- Mapping JSON schema is 1.2.0; regression tests cover new graphemes and require Ukrainian-example status/note for every phoneme. Font audit now checks the cmap coverage of every adopted grapheme as well as diacritics.
- Source provenance: S34 Kazakh phoneme/grapheme correspondences, S35 Serbian `њ` /ɲ/, S36 Hill Mari `ӹ` /ə/; S37 confirms Eastern Mari /œ/ exists but does not support `ӧ` as its grapheme. UFPN `ӧ` /œ/ is a project-specific assignment. This is an evidence-informed notation proposal, not yet independently approved by a Ukrainian phonetician or user-tested.
- Acceptance: all tests, font audit, browser checks, and Pages deploy must pass before marking DONE_VERIFIED; expert/usability review remains PARTIAL.


### Final expanded-Cyrillic status (2026-11-23)
- PR #15 merged as `b914629a5cbc70dc417a8fe535e1a57300f73dba`; main workflow 45259255626 passed build, 54 tests, syntax, font audit, six browser/viewport checks and Pages deployment. Fresh live scrape confirms the 37-row table.
- PR #16 merged as `eac00a1bea2a85dc7ed03a68fbf43f6b9e2f6925`; PR workflow 45259870325 passed build, 55 tests, syntax, 45-codepoint Charis audit, six browser/viewport checks and all six 37-row table assertions. It preserves `х̬` for velar [ɣ] separately from `ғ` for uvular /ʁ/ and updates the UI subtitle.
- Current main is `eac00a1bea2a85dc7ed03a68fbf43f6b9e2f6925`. Main workflow 45260260821 has build, 55 tests, syntax and font audit passed; Playwright install is still in progress, so deployment of this final follow-up is not yet verified. The PR #15 table deployment remains live.
- U5 remains PARTIAL pending independent Ukrainian/French phonetic review and owner readability acceptance. Q2 remains PARTIAL pending keyboard/screen-reader and real-device checks. Q3 remains BLOCKED pending an independently curated/licensed gold dataset.


| U6 | Ukrainian articulation guidance for all sound-table entries | DONE_VERIFIED | `data/ufpn-mapping.json` contains a non-empty Ukrainian pronunciation guide for all 37 segments; `src/app.js` renders it as a dedicated searchable table column; `tests/ufpn.test.js` checks coverage. PR #19 workflow `45263336209` passed the six-browser rendering checks (Chromium, Firefox, WebKit × desktop/mobile) after fixing the test helper. Final `main` deployment is tracked separately under D3. |


## Design refinement — phonetics workbench (2026-11-23)

| ID | Task | Status | Evidence / remaining acceptance |
|---|---|---|---|
| UI-01 | Refine existing editorial UI, responsive layout, controls, outputs, focus states and reduced-motion behavior without changing phonetic logic | DONE_VERIFIED | PR #25 merged as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`; source head `3ee313c31ed8c4a005fd1daea234b1a2817a3d34`; final PR workflow [45270636340](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340) passed build, 57/57 tests, syntax, Charis audit and 12 browser/viewport combinations |
| UI-02 | Automated responsive and keyboard checks | DONE_VERIFIED | Chromium, Firefox and WebKit × 1440, 1024, 768 and 390 px; checks confirm output panels render, expected 3/3/2/1 result columns, first-tab skip-link focus and no horizontal page overflow. Final artifact [14865776425](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340/artifacts/14865776425) |
| UI-03 | Human visual review, screen-reader and physical-device accessibility review | PARTIAL | Desktop/laptop/tablet/mobile screenshots from artifact 14865776425 were manually inspected; visual refinements were applied and rechecked by CI. Screen-reader, physical-device and browser zoom/reflow checks remain outstanding |
| UI-04 | Publish the design refinement to GitHub Pages | DONE_VERIFIED | Main workflow 45370457031 deployed main commit `c76801dbfa9c7bae1009ad3b137c652f033da517`; test, Pages artifact and deploy jobs all succeeded. Fresh live scrape `01a20d01-a5ea-70bf-bafe-3e58d7a307bb` returned HTTP 200 and verified the new /ɥ/ row `й̹` in the visible 37-row sound table. |

Scope guard: no French G2P, IPA normalization, IPA → UFPN mapping, phonetic data, confidence/provenance logic, export behavior or runtime dependencies were changed. The repository remains a research prototype; this UI work does not change linguistic validation or release-readiness status.


Baseline at the start of PR #25 was `81098345c69a3c58d770b95fd63949133fa872d7`; it is superseded by merged UI commit `41f96a1f3fbb8b220931d434626a4edddc3c13c7` and follow-up documentation commits. Previous verified live commit `95ec26e6127465d0f3152194c07db1b3dbf089e2` is historical only; current live deployment must be checked after main workflow 45272182990 completes.


### UI refinement closeout — PR #25 (2026-11-23)
- PR #25 merged by squash as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`; source head `3ee313c31ed8c4a005fd1daea234b1a2817a3d34`.
- Final PR workflow [45270636340](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340) succeeded: build, 57/57 tests, syntax check, Charis 7 glyph/OpenType audit, Playwright installation, and Chromium/Firefox/WebKit rendering at 1440/1024/768/390 px (12 combinations). Artifact [14865776425](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340/artifacts/14865776425) contains desktop/laptop/tablet/mobile screenshots and the font specimen; all four UI screenshots were manually inspected. Visual refinements addressed spellcheck-like confidence underlines and tablet heading wrap.
- UI-01/UI-02: DONE_VERIFIED. UI-03: PARTIAL — manual screenshot review complete; screen-reader, physical-device and zoom/reflow testing remain. UI-04: MERGED; Pages publication awaits main workflow and live verification.
- Merge did not alter French G2P, IPA normalization, IPA→UFPN mappings, phonetic data, confidence/provenance, exports or runtime dependencies. Linguistic expert review and licensed gold benchmark remain separate outstanding gates.


### Authoritative Pages CI status — run 45272944761 (2026-11-23)
- Current main SHA: `0503cfe0b0450b88a2a4b9bedff5ee594323668d`; workflow [45272944761](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45272944761) is the active run for this exact SHA.
- Build, `npm test`, syntax check, and Charis 7 glyph/OpenType audit have passed. Playwright browser-engine installation is still in progress; Chromium/Firefox/WebKit rendering, artifact upload, and Pages deployment have not started.
- Earlier run 45272182990 and other superseded documentation-push runs were cancelled by concurrency. Do not use their status as the current deployment gate.
- UI-04 remains PARTIAL until this run's test job and Pages deploy both succeed and the live site is checked. No new main commit was made while this workflow was active.


## Owner-approved glide notation update — 2026-11-24
- Branch: `feat/ufpn-labial-palatal-glide-grapheme`, based on main `9633b43bad1a74899ac556bfd19f293977c18d61`.
- The IPA adapter now maps /ɥ/ to `й̹` at Basic, Detailed and Extended levels: Ukrainian `й` + U+0339 COMBINING RIGHT HALF RING BELOW. This is an explicit UFPN design convention for a /j/-like glide with added lip rounding, not a claim that the composed spelling is an IPA character.
- /ɲ/ remains `њ` unchanged; no other vowel or consonant mappings were changed.
- PR #33 merged as `c76801dbfa9c7bae1009ad3b137c652f033da517`. PR workflow 45370163542 passed build, 59/59 tests, syntax, Charis 7 audit (45 codepoints, 19 marks, 14 mapped clusters, 28 HarfBuzz samples) and all 12 Chromium/Firefox/WebKit × viewport checks; specimen artifact [14908069680](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45370163542/artifacts/14908069680).
- Main workflow [45370457031](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45370457031) passed all three jobs: test, `pages-artifact`, deploy. Pages artifact [14908164942](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45370457031/artifacts/14908164942); browser specimen [14909131178](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45370457031/artifacts/14909131178).
- Fresh live scrape `01a20d01-a5ea-70bf-bafe-3e58d7a307bb` returned HTTP 200 and confirmed the visible table row /ɥ/ → `й̹`; /ɲ/ remains `њ`.
- Runtime mapping and browser typography are DONE_VERIFIED. Manual owner visual acceptance and independent phonetic review remain separate acceptance items.


## Rounding feature registry consistency — 2026-11-24
- Follow-up branch: `fix/rounding-feature-registry-for-y-labial-glide`, based on main after PR #33.
- The machine-readable `featureDimensions.rounding` description now agrees with the adopted /ɥ/ composition `й̹`: dedicated Cyrillic letters encode /y ø œ/, while U+0339 below `й` marks the labial-palatal glide; finer rounding gradience remains evidence-gated.
- Added a regression assertion linking the rounding feature description to `й̹`. No output mapping changed in this follow-up.


## Rounding feature metadata follow-up — 2026-11-24
- PR #34 aligns `featureDimensions.rounding.ufpn` with the approved /ɥ/ notation `й̹`; this is a metadata consistency change and does not alter adapter output.
- A regression assertion requires the rounding feature description to mention `й̹`; PR CI is running before merge.


## Owner-approved IPA vowel graphemes — 2026-11-24
- Feature branch: `feat/retain-ipa-vowel-graphemes`, based on main `4117f10cbd51f034835242491beb1dda3ee1c479`.
- Owner clarification: retain `œ`, `ɔ`, `ə`, `ɛ` as standalone UFPN graphemes. Removed former Cyrillic substitutions `ӧ`, `ӹ`, `э` and the diacritic substitute `о̆` for these four IPA symbols.
- Nasal counterparts preserve their base grapheme: `œ̃`, `ɔ̃`, `ɛ̃`; `/ɔ̃/` no longer adds a redundant open-mid breve.
- Runtime mapping, machine-readable inventory, unit tests, Ukrainian notation guide and IPA mapping table updated together. `/ɥ/ → й̹` and `/ɲ/ → њ` are unchanged.
- Acceptance: all three output levels must preserve the exact graphemes; nasal forms must retain the base symbol plus combining tilde; retired substitutes must not appear as adopted graphemes. CI and live Pages verification pending.


## Verification — standalone IPA vowel graphemes deployed (2026-11-24)
- PR #35 merged as `4c56c5637831bdbfb12dc1a93b0e104624ab2454`.
- Main workflow [45378841718](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45378841718): SUCCESS — build, 60/60 tests, syntax, Charis 7 audit, Chromium/Firefox/WebKit rendering (12 browser × viewport combinations), Pages artifact and deploy all passed.
- Charis 7 audit: 46 UFPN inventory codepoints covered; 19 combining marks; 13 mapped base/mark clusters; 26 HarfBuzz shaping samples; mark-to-base and Cyrillic mark-to-mark anchor inspections passed.
- Pages artifact: `14913211117`; browser specimen: `14912862093`.
- Fresh live scrape `01a20d31-75b2-723e-aad0-aef0e6e8005d` returned HTTP 200. The live result shows `bɔ̃ʒuʁ` → `бɔ̃жуғ`; the searchable sound table contains `ɛ`, `œ`, `ɔ`, `ə` and nasal forms `ɛ̃`, `ɔ̃`, `œ̃`. It also retains `й̹` and `њ`.
- U5 remains PARTIAL only for independent linguistic/readability review and manual accessibility/device QA; the grapheme implementation and deployment are DONE_VERIFIED.
- PR #36 separately corrects the visible result caption from “extended Cyrillic” to “hybrid notation”; no mapping behavior changes.


## Україномовний інтерфейс сайту — 2026-11-24
- Реалізовано переклад статичних і динамічних написів інтерфейсу: назви режимів UFPN, профілі, метадані результату, підказки, таблиці, статуси, доступні назви, копіювання та TXT-експорт.
- Перекладено 18 фонетичних вимірів, їхні значення й статуси, описи інвентарю графем та технічної таблиці.
- Перекладено пояснення правил OpenIPA, зокрема загальні шаблони для літер/сполук і лексичні винятки; французькі приклади й IPA не змінювалися.
- Внутрішні ідентифікатори, назви брендів OpenIPA/GitHub, абревіатури IPA/UFPN і формати TXT/PDF не є англомовним текстом інтерфейсу й залишені як власні назви/позначення.
- Регресійні тести локалізації додані в `tests/localization.test.js`; CI на коміті `d0bc7489618305f3636ad7f61adaa23174220ddb` пройшов: 65/65 тестів, build, syntax check, Charis 7 audit і браузерне відображення Chromium/Firefox/WebKit успішні. Після документаційного оновлення потрібен повторний CI.
- PR #37: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/37.


## Остаточне закриття української локалізації — 2026-11-24
- Статус локалізації головної сторінки та довідкових панелей: DONE_VERIFIED.
- PR #37 (основна локалізація), PR #38 (локалізація примітки таблиці) та PR #39 (граматичне уточнення примітки) злито.
- Поточний `main`: `3b67ef59ca9f012f00dcbf4bc04eb6ce32714778`.
- Main workflow [45386058400](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45386058400): build, syntax, 65/65 tests, Charis 7 audit, Chromium/Firefox/WebKit render, Pages artifact і deploy — SUCCESS.
- Charis 7: усі 46 кодових точок UFPN, 19 комбінованих знаків, 13 кластерів, 26 HarfBuzz shaping samples; перевірки якорів успішні. Браузерні перевірки пройшли на 12 комбінаціях рушіїв/розмірів вікна.
- Жива сторінка після останнього деплою: HTTP 200, scrape `01a20d5c-3f55-7718-a428-e5656b4332ce`. Перевірка не знайшла жодного з контрольних англомовних підписів/пояснень; примітка /ə/ показує «до звука ə».
- Залишені назви OpenIPA/GitHub, абревіатури IPA/UFPN, формати TXT/PDF, французькі приклади та латинізований фонетичний результат — це бренди, позначення або мовні дані, а не англомовні інструкції інтерфейсу.


| W7 | Узгодженість довідкових панелей і зрозумілість прапорця пояснень | DONE_VERIFIED | PR #41 злито в main (`f04a7b280b9b1a855ae1faed4c6bf1b08f070998`). PR CI 45407617594 та main workflow 45411777853: build, tests, syntax, Charis 7 audit, Chromium/Firefox/WebKit rendering, Pages artifact і deploy — SUCCESS. Свіжий live scrape `?deploycheck=45411777853` повернув HTTP 200, підтвердив новий підпис «Показувати розбір вибраного слова», пояснення про відсутність впливу на транскрипцію та карткове відображення 18 вимірів замість маркованого списку.

### UI-05 — усунення декоративного текстового шуму (2026-11-24)
- Статус: DONE_VERIFIED — PR workflow [45417023021](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45417023021) завершився SUCCESS: build, 71/71 tests, syntax, Charis 7/OpenType audit і Chromium/Firefox/WebKit на 12 комбінаціях браузерів/розмірів вікна.
- Прибрано декоративні числові мітки секцій/карток, дубльований мікропідпис hero, маркер-крапку, неактивні регіональні профілі «незабаром», дубль GitHub у футері та жорстко зашитий номер версії.
- Збережено змістовні назви трьох форматів, пояснення їхньої ролі, опис обмежень прототипу, перемикачі, статуси й посилання на джерела/стан проєкту.
- Критерії: регресійний тест забороняє повернення декоративних написів і водночас вимагає збереження змістовних пояснень; build/tests/syntax і браузерна перевірка мають пройти. Фонетичний код, дані та експорти не змінюються.


## Контентна зрозумілість інтерфейсу — UI-06 (2026-11-24)

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| UI-06 | Пояснити вибір вимовного профілю та роль кожного формату результату простою українською | PARTIAL | У гілці `content/ux-copy-clarity-2026-11-24` замінено технічну назву «Профіль OpenIPA» на «Варіант вимови», додано визначення елізії та пояснення ролі IPA, UFPN і латинської підказки. Перший CI [45421702699](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45421702699) виявив застаріле очікування тексту в `tests/localization.test.js` (73/74). Виправлено комітом `012beb169565c639d24192705e29d233fb0791d6`. Повторний CI [45433252768](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433252768) підтвердив build, 74/74 tests, syntax і Charis 7/OpenType audit; його було скасовано під час встановлення Playwright після надходження нових комітів документації. На актуальному HEAD CI [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) повторно підтвердив ті самі кроки; станом на останню перевірку встановлення браузерів Playwright ще триває. UI-06 лишається PARTIAL PR #44 злито в main комітом `76f70f6ea6f832523cea72af2cabad7b8dbb8447`. PR workflow [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) завершив усі кроки успішно: build, 74/74 tests, syntax, Charis 7/OpenType, Playwright install, Chromium/Firefox/WebKit render та browser artifact [14939324505](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826). `pages-artifact` і `deploy` у PR workflow пропущені за умовою події; після merge потрібен main Pages deploy і live HTTP-перевірка. Поточний статус PARTIAL лише щодо підтвердження production hosting. Фонетичну поведінку не змінювати. |


- Перший PR workflow [45421702699](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45421702699) виявив застаріле очікування «Латинська підказка». Виправлено на «Підказка латиницею» у `tests/localization.test.js`. Повторний workflow [45433252768](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433252768) підтвердив build, 74/74 tests, syntax та Charis 7/OpenType audit, але був скасований під час встановлення Playwright після нових комітів документації. Актуальний workflow [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) повторно пройшов build/tests/syntax/font audit; Playwright installation і rendering Chromium/Firefox/WebKit завершилися успішно.


### UFPN schwa grapheme decision (2026-11-24)
- Owner-approved decision: replace every IPA `/ə/` with the project-specific UFPN grapheme `ъ` at Basic, Detailed and Extended levels. IPA output remains `/ə/`; the IPA-first adapter boundary and OpenIPA source trace are unchanged.
- `ъ` is a practical vowel grapheme in this notation, not a silent hard sign and not an assertion that French `/ə/` is phonetically identical to Bulgarian `/ɤ/`. Schwa elision remains controlled by the selected pronunciation profile: when IPA contains no `/ə/`, UFPN emits no `ъ`.
- Regression coverage pins all three levels, a word-level sample, and supplied length. PR CI [45442539824](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45442539824) passed: build, 75/75 tests, syntax, Charis 7/OpenType audit, Playwright install and Chromium/Firefox/WebKit rendering. Main Pages deployment [workflow 45443265333](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45443265333) completed successfully; live smoke verification confirmed the profile helper, `/ə/` IPA output and `ъ` UFPN output on https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/.


- Final inventory localization follow-up: PR #48 added Ukrainian origin/rationale text for `ъ`; main Pages workflow [45445140803](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45445140803) passed all CI, artifact and deploy jobs. Live verification confirmed the adopted `ъ` card contains Ukrainian text only.


### French editorial colour palette (2026-11-24)
- Status: DONE_VERIFIED — PR #50 merged to `main` as `9efa311f0d500ab24347f481cc61ba151cecbea0`.
- Palette: ivory `#F5F0E7`, ink blue `#26364A`, wine red `#A64B55`, champagne `#D8B98A`, slate `#66717C`; supporting surfaces use warm ivory and pale blue-grey.
- Scope remained CSS colour values/tokens plus a palette regression test. Typography, layout, UI copy, interaction and phonetic behavior were not changed.
- Main Pages workflow [45460636622](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45460636622) completed successfully: build, tests, syntax check, Charis 7/OpenType audit, Playwright installation, Chromium/Firefox/WebKit rendering, browser specimen upload, `pages-artifact` and `deploy` (all jobs SUCCESS).
- Production verification: fresh uncached stylesheet request `https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/styles.css?v=9efa311f0d500ab24347f481cc61ba151cecbea0` returned HTTP 200 and confirmed the deployed palette tokens and component colours. An initial cached request returned the previous stylesheet; cache-busting fetch resolved this and confirmed the current deployment.
- Acceptance: DONE_VERIFIED for implementation, CI and production hosting. Owner-side visual preference remains subjective and can be revisited separately; no functional or linguistic blocker remains for this palette task.


## Навчальний розділ і візуальне представлення UFPN (2026-11-24)

| ID | Завдання | Статус | Доказ / acceptance |
|---|---|---|---|
| W8 | Навчальний супровід читання французькою | PARTIAL до merge/deploy | На сторінці додано структурований україномовний мінікурс: голосні буквосполучення, носові голосні, часті приголосні групи, контекстні c/g, кінцеві приголосні, schwa та liaison; приклади можна передати в основне поле сервісу. Потрібні CI, browser review і live smoke test. Матеріал має навчальний статус і явно позначає типові правила та винятки. |
| W9 | Вбудований візуальний UFPN guide замість raw Markdown navigation | PARTIAL до merge/deploy | Додано візуальне пояснення IPA → UFPN, Basic/Detailed/Extended, картки прийнятих графем із mapping JSON та переходи до технічних таблиць. Навігація більше не веде на UKRAINIAN-NOTATION.md. Потрібні CI, browser review і live smoke test. |
