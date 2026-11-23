# Execution Matrix — Phase 2 and Web Service

| ID | Завдання | Статус | Доказ / blocker |
|---|---|---|---|
| R1 | Default branch, PR, branch, commits | DONE_VERIFIED | Початковий main `b7c74e2`; PR #1 (69 commits, 84 files) злито squash merge; main merge SHA `313fc0dfef85afaf413dfc4f91d93019f578ed7d` |
| R2 | Research audit of French phonetic variation | PARTIAL | Source registry розширено; повний літературний синтез і specialist review залишаються |
| U1 | UFPN three-level specification | PARTIAL | Basic/Detailed/Extended реалізовано; незалежна експертна валідація очікується |
| U2 | Machine-readable mapping | PARTIAL | 37 segmental units + 15 allophone mappings + 36 diacritic/prosodic markers + 18 feature dimensions + 19 allophone phenomena + 13 processes + 7 profile records; це не повний вузькофонетичний інвентар |
| U3 | IPA→UFPN adapter | PARTIAL | Детермінований adapter, тести й UI selector; expert review pending |
| U4 | Unicode robustness | PARTIAL | NFC/NFD тести проходять у Node CI; browser grapheme/cursor/mobile перевірки не виконані |
| U5 | Extended Cyrillic grapheme inventory and Ukrainian sound table | PARTIAL | `ў`, `ү`, `ө`, `ӧ`, `ӹ`, `э`, `њ`, `ң`, `ғ` реалізовано; searchable UI table covers all 37 segments with exact/contextual/approximate/no-equivalent labels and a dedicated Ukrainian articulation guide (`pronunciationGuideUk`) for each segment; usability and expert review pending |
| F1 | Allophone registry | PARTIAL | Документовано evidence-backed cases; не всі можливі реалізації мовців |
| F2 | Prosody layer | PARTIAL | Optional annotation markers; аудіо prosody engine відсутній |
| F3 | Regional profiles | PARTIAL | Québec affrication/diphthongization описано; повної regional G2P моделі немає |
| E1 | French G2P and syntax | PARTIAL | Оригінальний OpenIPA parser обробляє французький текст; POS/morphology, h-aspiré, lexical coverage та незалежна gold evaluation неповні |
| Q1 | Build, unit and syntax tests | DONE_VERIFIED | PR #23 CI 45265088534: build, unit tests (including the dedicated /œ/ articulation regression), syntax, Charis 7 audit and all six Chromium/Firefox/WebKit desktop/mobile checks passed. Current main `2606e437bc9003ebd546afd65b2f28ac2612fc65` workflow 45265379491 has passed build, tests, syntax and font audit; browser installation/rendering and final Pages deployment are pending. |
| Q2 | Browser/mobile/accessibility | PARTIAL | PR #16 CI 45259870325 passed all six Chromium/Firefox/WebKit desktop/mobile checks and verifies 37 sound-table rows at every viewport; keyboard, screen-reader, physical-device and owner visual acceptance remain outstanding |
| Q3 | Linguistic benchmark | BLOCKED | Немає незалежно curated/licensed gold IPA/UFPN dataset; expert reviewers недоступні |
| D1 | Source registry | DONE_VERIFIED | `docs/SOURCE-REGISTRY.md` містить джерела, provenance та reuse limits |
| D2 | Repository LICENSE | DONE_VERIFIED | AGPL-3.0 та third-party notices; власник явно погодив ліцензію 2026-11-23 |
| D3 | Pages deployment | PARTIAL | Main commit `95ec26e6127465d0f3152194c07db1b3dbf089e2` successfully deployed in workflow 45264961792 (test + deploy both passed). Fresh live scrape on 2026-11-23 returned HTTP 200 and confirmed the five-column table, including «Як вимовити», with all 37 rows populated. Current main `2606e437bc9003ebd546afd65b2f28ac2612fc65` adds the final /œ/ articulation wording correction; its workflow 45265379491 has passed build, tests, syntax and font audit, but browser checks and redeployment are still pending. |
| W1 | Browser web service UI | DONE_VERIFIED | Live Pages at `95ec26e6127465d0f3152194c07db1b3dbf089e2` was freshly scraped (HTTP 200): five columns including «Як вимовити», exactly 37 rows, and every row has a non-empty articulation guide. PR #19 CI 45263336209 passed all six Chromium/Firefox/WebKit desktop/mobile checks. Final /œ/ wording correction in main `2606e437bc9003ebd546afd65b2f28ac2612fc65` is awaiting its own Pages redeployment under D3. |
| W2 | Browser-hosted smoke/accessibility QA | PARTIAL | Live Pages page and stylesheet returned HTTP 200; deployed sample rendered. Merged PR #10 run 45233413912 passed all six Chromium/Firefox/WebKit desktop/mobile typography checks. Keyboard/screen-reader/physical-device/owner acceptance remain |
| W3 | Cyrillic UFPN diacritic typography | PARTIAL | Native NFC text run retained; official SIL Charis 7.000 is now self-hosted locally with Regular/Bold WOFF2 and OFL-1.1. Font audit script checks all 36 inventory codepoints, mapped mark-to-base/mark-to-mark anchor pairs and HarfBuzz shaping; font audit passed in run 45216293204; all six Chromium/Firefox/WebKit desktop/mobile typography checks passed in run 45233413912. Owner-side visual and accessibility acceptance remain. |
| W4 | Vendor official Charis 7.000 webfonts | DONE_VERIFIED | Official SIL release archive SHA-256 verified in GitHub Actions run 45213736031; Regular/Bold WOFF2 and exact OFL text committed; local @font-face + preload replace external Charis SIL import. |
| W5 | Inspect Charis 7 glyph and anchor coverage | DONE_VERIFIED | CI passed: all 45 UFPN inventory codepoints, 19 combining marks, 14 mapped clusters, 28 HarfBuzz shaping samples; active Cyrillic `mark`/`mkmk` and required anchor pairs verified in PR #16 run 45259870325. |
| W6 | Browser visual QA for stacked UFPN marks | PARTIAL | Chromium loaded local Charis Regular (312,790 bytes), confirmed `document.fonts.check`, and rendered all 23 clusters; screenshot artifact 14839625822 visually inspected. Merged PR #10 run 45233413912 passed all six Chromium/Firefox/WebKit desktop/mobile checks; keyboard/screen-reader, real-device and owner acceptance remain. |

## OpenIPA engine integration

| Task | Status | Evidence / acceptance |
|---|---|---|
| Vendor original OpenIPA French parser, letter rules, exceptions and minimal helpers | DONE_VERIFIED | Source у `vendor/openipa/`; upstream revision зазначена в THIRD_PARTY_NOTICES.md |
| Build upstream TypeScript into browser ESM bundle | DONE_VERIFIED | `npm run build` passed in CI |
| Route French G2P through upstream parser and preserve rule traces | DONE_VERIFIED | `src/french-g2p.js`, `src/engine.js`; integration tests included |
| Align upstream IPA notation to canonical IPA | PARTIAL | Adapter normalizes OpenIPA `õ` → `ɔ̃`; maps `ɾ` → `ʁ` only for `metropolitan-fr`, and preserves `ɾ` for `lyric-diction-fr`. Raw upstream form remains in `sourceIpa`. Regression coverage for both profiles; independent phonetic review still pending. Other upstream notation/edge cases remain to audit |
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
- Added regressions for `bonjour`, `garçon`, and `mer`, including `bonjour` in both profiles: Metropolitan `бо̆̃жух̬̠`, lyric diction `бо̆̃жур̌`; both have no unsupported IPA.
- Status: implementation committed to a feature branch; CI and Pages deployment are pending. This is an adapter normalization based on the vendored parser's own enum and default `parseR` implementation, not independent expert validation of every French speaker or dialect.


### Profile-aware OpenIPA rhotic normalization (2026-11-23)
- Primary-source check: the official OpenIPA site describes itself as a Lyric Diction tool and explicitly describes flipped French `r` as `[ɾ]` (https://www.openipa.org/).
- Adapter behavior is profile-aware: `metropolitan-fr` converts OpenIPA's lyric-diction `[ɾ]` convention to broad `/ʁ/`; `lyric-diction-fr` preserves `[ɾ]` → UFPN `р̌`. The raw upstream value remains in `sourceIpa` and trace. `õ` → `ɔ̃` and `ε` → `ɛ` remain explicit broad-IPA normalizations.
- Regressions cover `bonjour` in both profiles, `garçon`, and `mer`; lyric-profile output is intentionally `бо̆̃жур̌`, while default Metropolitan output is `бо̆̃жух̬̠`.
- Independent expert review remains pending.


### Profile-aware OpenIPA correction — final main verification (2026-11-23)
- PR #13 merged as `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5`.
- Main workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) passed: build, 52/52 tests, syntax check, Charis 7 audit, all six Chromium/Firefox/WebKit desktop/mobile checks, and GitHub Pages deployment.
- Fresh live scrape confirms the default Metropolitan sample displays IPA `bɔ̃ʒuʁ` and UFPN `бо̆̃жух̬̠`; published source confirms the profile-aware adapter. Unit tests verify lyric-diction preserves `[ɾ]` and `р̌`.
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
| UI-01 | Refine existing editorial UI, responsive layout, controls, outputs, focus states and reduced-motion behavior without changing phonetic logic | DONE_VERIFIED | PR #25 branch `design/phonetic-workspace-refinement`, commit `19157268124a46121c9c260c3abdb48a9b289ed3`; workflow [45268570405](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405) passed build, 57/57 tests, syntax checks, Charis audit and 12 browser/viewport combinations |
| UI-02 | Automated responsive and keyboard checks | DONE_VERIFIED | Chromium, Firefox and WebKit × 1440, 1024, 768 and 390 px; checks confirm output panels render, expected 3/3/2/1 result columns, first-tab skip-link focus and no horizontal page overflow. Five screenshots uploaded as workflow artifact [14864086549](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405/artifacts/14864086549) |
| UI-03 | Human visual review, screen-reader and physical-device accessibility review | PARTIAL | Screenshots are generated and available as an artifact but have not been manually inspected in this session. Screen-reader and real-device checks remain outstanding |
| UI-04 | Publish the design refinement to GitHub Pages | TODO | PR #25 is open and not merged. Merge only after visual review; then require a successful main Pages deployment and fresh live-page verification |

Scope guard: no French G2P, IPA normalization, IPA → UFPN mapping, phonetic data, confidence/provenance logic, export behavior or runtime dependencies were changed. The repository remains a research prototype; this UI work does not change linguistic validation or release-readiness status.


Current baseline at the start of PR #25: main `81098345c69a3c58d770b95fd63949133fa872d7`; public Pages still serves `95ec26e6127465d0f3152194c07db1b3dbf089e2`. Main includes the later /œ/ articulation correction, but its deployment is not yet live because workflow `45265871092` failed at the Pages artifact-metadata step after all test checks passed.


### UI refinement closeout — PR #25 (2026-11-23)
- PR #25 merged by squash as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`; source head `3ee313c31ed8c4a005fd1daea234b1a2817a3d34`.
- Final PR workflow [45270636340](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340) succeeded: build, 57/57 tests, syntax check, Charis 7 glyph/OpenType audit, Playwright installation, and Chromium/Firefox/WebKit rendering at 1440/1024/768/390 px (12 combinations). Artifact [14865776425](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340/artifacts/14865776425) contains desktop/laptop/tablet/mobile screenshots and the font specimen; all four UI screenshots were manually inspected. Visual refinements addressed spellcheck-like confidence underlines and tablet heading wrap.
- UI-01/UI-02: DONE_VERIFIED. UI-03: PARTIAL — manual screenshot review complete; screen-reader, physical-device and zoom/reflow testing remain. UI-04: MERGED; Pages publication awaits main workflow and live verification.
- Merge did not alter French G2P, IPA normalization, IPA→UFPN mappings, phonetic data, confidence/provenance, exports or runtime dependencies. Linguistic expert review and licensed gold benchmark remain separate outstanding gates.
