# Audit Register — Phase 2 and Website Service

## Verified repository state (2026-11-23)
- Starting default-branch SHA: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- PR #1 merged into `main` by squash merge; merge SHA `313fc0dfef85afaf413dfc4f91d93019f578ed7d`.
- PR #2 (initial Cyrillic UFPN typography attempt) merged by squash merge; merge SHA `360ef54a08af2ff7146d2a4052c326fec6968173`.
- PR #3 (Charis SIL diacritic positioning correction) merged by squash merge; merge SHA `01919e72d3ff1c46b5709b4a96f550db488e6498`.
- Merged head: `276c0375b3843ff1aa9c85d54d052dd0ddf1089b`; 69 commits and 84 changed files.
- Feature CI run [45179583235](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45179583235) passed build, 46/46 tests and syntax checks.
- Main CI run [45192430970](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192430970) passed `npm run build`, `npm test` and `npm run check`; 46 tests passed.
- Main deploy run [45192891355](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192891355) completed successfully, including `actions/deploy-pages@v4`; deployed SHA `422430fe142e8f15e55d8ef2bd1876853b2e209e`.
- Environment URL emitted by the successful deploy: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Direct HTTP/content verification remains unavailable: web fetch reported inaccessible and container DNS could not resolve the host. Previous run 45192430970 failed due artifact metadata; retrying only deploy duplicated the artifact, so a clean new run was used.
- PR #2 CI [45195492754](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195492754) passed build, all 46 tests and syntax checks.
- Main run [45195557498](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195557498) passed build, 46 tests, syntax checks and Pages deployment for the initial typography fix.
- PR #3 CI run [45197892356](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45197892356) passed build, 46 tests and syntax checks; merged commit `01919e72d3ff1c46b5709b4a96f550db488e6498`. Production deployment for this correction is not yet verified.
- Local clone failed because this environment could not resolve github.com. No manual browser QA was performed.

## Website service audit

### Cyrillic diacritic rendering follow-up (2026-11-23)
- Earlier font-only fixes (Noto Sans, then Charis SIL) did not resolve the owner-reported detached-mark rendering.
- Inspection confirmed mapping output uses combining Unicode code points after Cyrillic bases (for example `е́` = U+0435 U+0301); no spacing accents were found in the mapping records inspected.
- New branch `fix/deterministic-cyrillic-diacritic-layout` adds `src/ufpn-display.js`: split grapheme clusters into base + visual mark tokens and place spacing modifier glyphs with CSS above/below the base. The canonical adapter strings, NFC normalization, and clipboard/export values remain unchanged.
- New unit coverage checks mark decomposition and display-glyph mapping. Browser visual QA is still required; do not claim the owner's rendering issue is resolved until they confirm in the deployed site.

- **Implementation: DONE_VERIFIED.** Static browser app exists in `index.html`, `styles.css`, `src/app.js`; French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin output, Basic/Detailed/Extended levels, word-level explanations, uncertainty markers, searchable UFPN reference, copy, TXT export and browser print-to-PDF.
- **Runtime/privacy:** no application backend; entered text is processed in the browser. External static assets include Google Fonts.
- **Build/test integration: DONE_VERIFIED.** PR CI 45195492754 and main CI 45195557498 pass build, 46 tests and syntax check.
- **UFPN typography: PARTIAL.** Font-only changes failed owner visual acceptance. PR #4 (`1560bbb65d6e142c9d25cb45d2307d1db5f7b65a`) implements explicit CSS placement of spacing modifier glyphs over/under Cyrillic bases. PR #5 (`214c65e527b83a565371309599fa2d47251cd6d4`) preserves affricate tie bars. Main run [45201504905](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45201504905) passed build, tests, syntax checks and Pages deployment. Canonical Unicode output and IPA→UFPN mappings remain unchanged. Owner visual confirmation remains outstanding.
- **Public hosting: PARTIAL.** Clean deploy run 45192891355 succeeded and emitted the public Pages URL; direct HTTP response, page content and asset smoke verification remain unconfirmed because DNS/web access from this environment failed.
- **Browser QA: TODO.** Chromium, Firefox, WebKit, mobile, keyboard and screen-reader checks have not been run; visual appearance of stacked combining marks must be confirmed in browsers.

## Verified implementation inventory
- 37 segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- UFPN levels Basic/Detailed/Extended; IPA remains the canonical adapter input.
- Québec /t,d/ affrication and diphthongization are profile-specific; cross-word nasal place and fricative voicing assimilation are Extended/audio-gated.

## OpenIPA French parser integration
- Original OpenIPA French parser, per-letter parsers, exception/rule dictionaries and required helpers vendored from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504` under `vendor/openipa/`.
- Original TypeScript is bundled for browser use by `scripts/build-openipa.mjs` with pinned esbuild 0.25.0.
- `src/french-g2p.js` calls the original parser and preserves per-grapheme rule descriptions, source spans and source IPA. Only upstream Greek epsilon `ε` is normalized to IPA `ɛ`; `õ` remains unresolved/unsupported rather than guessed.
- Project seed overrides and hand-written liaison/final-schwa postprocessing were removed from runtime.
- Regression fixtures validate integration, not independent pronunciation accuracy.
- AGPL-3.0 and upstream attribution/network-source notices are present; repository owner explicitly approved AGPL-3.0 on 2026-11-23.
- Known fixture discrepancy: legacy CSV expects `descends` → `d(e)sɑ̃`, while executable parser emits `dɛssɑ̃`; discrepancy is documented.

## Main linguistic risks
- UFPN is a project notation, not an established or independently approved standard.
- /œ̃/ and /ɑ/ contrasts vary by speaker/region.
- /ʁ/, /ɲ/, mid vowels, schwa and liaison are variable.
- Narrow phonetic marks require observed IPA/audio; they cannot be inferred from spelling alone.
- POS-dependent `-ent`, h-aspiré, morphology and lexical coverage remain upstream limitations.
- No independently curated/licensed IPA/UFPN gold corpus is available; no accuracy benchmark is claimed.
- `õ` and other upstream notation conventions need independent review.

## Remaining acceptance blockers
- Public Pages verification is now DONE_VERIFIED: main run 45217105821 passed deploy for `9bc73498cd6e5f1190d508884d48af3a58ce89a2`; fresh live scrapes returned HTTP 200 for the app and stylesheet, and confirmed the deployed local Charis 7 Regular/Bold WOFF2 declarations.
- Complete Firefox/WebKit desktop/mobile checks (PR #10 in progress), then keyboard, screen-reader and real-device accessibility QA; obtain owner visual confirmation.
- Obtain independent French and Ukrainian phonetic review.
- Obtain independently licensed gold IPA/UFPN data.
- Expand morphology/context and edge-case coverage with source-backed fixtures.
- Resolve upstream IPA notation conventions only with evidence.

- PR #4 CI [45201122860](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45201122860) passed; PR #5 CI [45201424564](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45201424564) passed. Main deployment run [45201504905](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45201504905) passed for `214c65e527b83a565371309599fa2d47251cd6d4`. The page is deployed; visual acceptance in the owner's browser remains the only typography acceptance item.

### Compact mark spacing follow-up
- Owner reported that the first explicit-positioning pass placed marks too high with excessive whitespace between marks and bases.
- Follow-up branch `fix/compact-ufpn-diacritic-spacing` removes the `.34em` top padding and reduces above/below offsets and stacking intervals. This is a geometry-only CSS adjustment; canonical Unicode and phonetic mappings remain untouched. Visual acceptance still requires owner confirmation.


### Diacritic scale correction — research-backed follow-up
- Owner reported that the rendered diacritic glyphs remained much too large after the spacing correction.
- Reviewed Google Fonts' specialist diacritics guidance: marks should preserve conventional shape/proportion, remain visually coherent with the base typeface, and be optically close enough to read as one grapheme; stacked marks should be compact and not too high/heavy. OpenType GPOS documentation confirms that mark-to-base and mark-to-mark anchors are the font-native mechanism for this. References: https://googlefonts.github.io/gf-guide/diacritics.html and https://learn.microsoft.com/en-us/typography/opentype/spec/gpos
- Code inspection found the explicit overlay marks were still rendered in the unrelated Manrope sans face, bold, at `.62em`, while the base letters use Charis SIL. At the 22px output size this is approximately 13.6px, a conspicuously large modifier glyph.
- Branch `fix/typographic-diacritic-scale` changes only the display CSS: mark glyphs now use the same Charis SIL phonetic family, regular weight, and `.42em` (approximately 9.2px at 22px). This is a proportional reduction based on the observed computed size, not a claim that Google Fonts specifies a universal numeric ratio.
- Canonical combining Unicode, IPA→UFPN mappings, clipboard/export, and phonetic logic are unchanged.
- Verification: PR #7 CI run [45210184497](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45210184497) passed build, tests and syntax checks; merged as `a5b338077089c2653fd40d05d722d90574583b81`. Main run [45210252551](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45210252551) passed build, tests, syntax checks and Pages deploy. Status remains PARTIAL only for owner visual acceptance; browser screenshot QA was unavailable in this environment.


### Native OpenType shaping correction (2026-11-23; supersedes overlay-based display notes above)
- Root cause: `src/ufpn-display.js` split each grapheme into a base and separate mark nodes, replacing selected combining marks with spacing modifier glyphs and absolutely positioning them. This prevents the browser's shaping engine from seeing the original base+combining-mark sequence as one run, so the font's GPOS `mark`/`mkmk` attachment cannot perform its intended job.
- PR #8 branch `fix/native-opentype-diacritic-shaping` removes the decomposition/overlay and writes the normalized canonical UFPN string as one text node via `textContent`. Overlay CSS was removed. The existing `mark` and `mkmk` font feature settings remain enabled.
- Regression tests assert that stacked combining marks and affricate tie bars reach the display layer intact. Phonetic mapping, IPA adapter, clipboard/export strings and Unicode semantics are unchanged.
- Research: Google Fonts diacritics guidance (https://googlefonts.github.io/gf-guide/diacritics.html); Microsoft OpenType GPOS mark-to-base/mark-to-mark specification (https://learn.microsoft.com/en-us/typography/opentype/spec/gpos); SIL Charis 7 release notes document updated diacritic/anchor support (https://software.sil.org/charis/release-7-000/).
- Verification: PR CI run [45211693977](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45211693977) passed build, all 48 tests and syntax checks. The deploy job was correctly skipped for the PR. Local clone remains blocked by DNS failure. Browser screenshots/Chromium–Firefox–WebKit and mobile QA remain unverified; do not mark visual acceptance DONE until these are checked.
- Font distribution: repository still imports the existing Google Fonts Charis SIL family. The official SIL Charis 7.000 webfont package was not obtained in this environment, so this change does not claim that the repository now vendors the current SIL release.


### Official Charis 7.000 font migration (2026-11-23)
- Root cause follow-up: native OpenType shaping was already restored in PR #8, but the repository still loaded the legacy Google Fonts family `Charis SIL`. This left the actual font build/version and its anchor tables outside repository control.
- Official SIL Charis 7.000 archive was downloaded in GitHub Actions run [45213736031](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45213736031); the published SHA-256 digest was verified before extraction.
- Regular and Bold WOFF2 files were committed under `assets/fonts/`; the included SIL OFL-1.1 text is `licenses/Charis-OFL.txt`. CSS now declares local `@font-face` rules and index.html preloads the Regular face. The Charis SIL Google Fonts import was removed; unrelated UI families remain external.
- `scripts/audit-charis-font.py` uses fontTools and HarfBuzz to inspect all 36 UFPN inventory codepoints, mark-to-base pairs for mapped graphemes, mark-to-mark pairs for stacked marks, and shaping output/advance widths. The regular Pages workflow runs this audit. Run 45216293204 passed: all 36 inventory codepoints, 19 combining marks, 23 mapped clusters and 46 HarfBuzz shaping samples passed; the active Cyrillic GPOS feature set includes `mark` and `mkmk`.
- The one-time import workflow was deleted after the font files were committed. No IPA→UFPN mapping, normalization, clipboard/export, or renderer behavior was changed.
- The Chromium browser test in run 45216293204 also passed: the local Charis Regular WOFF2 was loaded (312,790 bytes), the browser confirmed `Charis` in `document.fonts`, and all 23 mapped clusters rendered. Screenshot artifact 14839625822 was downloaded and visually inspected; marks appear attached in the specimen. Firefox/WebKit/mobile and owner-side visual confirmation remain outstanding.


### Public deployment verification and expanded browser matrix (2026-11-23)
- Main run [45217105821](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45217105821) deployed commit `9bc73498cd6e5f1190d508884d48af3a58ce89a2`; test and deploy passed.
- Public Pages app and stylesheet returned HTTP 200; app rendered the current Ukrainian interface/sample and CSS loaded local Charis 7 Regular/Bold WOFF2 without the legacy Charis SIL Google Fonts import.
- PR #10 was merged after its run [45233413912](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45233413912) passed all six Chromium/Firefox/WebKit × desktop/mobile typography checks across all 23 UFPN clusters.
- Post-merge main run [45236513836](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45236513836) is the current verification. Build, 48 tests, syntax check and Charis glyph/anchor audit passed; browser-engine installation is still running. The preceding run [45236413859](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45236413859) was cancelled by the newer main commit before browser tests, so it is not evidence of a failed test.
- Remaining: finish post-merge CI; owner-side visual acceptance, keyboard/screen-reader and physical-device QA; linguistic expert review and independently licensed gold benchmark.

### OpenIPA legacy-symbol normalization (2026-11-23)
- Verified in vendored source: `IPA.NASAL_O` is `õ`; `IPA.FLIPPED_R` is `ɾ`; `parseR` supplies `ɾ` for ordinary French `r` throughout the parser. This conflicted with the project's canonical broad Metropolitan IPA inventory (`ɔ̃`, `ʁ`) and caused `⟦õ⟧` plus regional tap `р̌` in ordinary output.
- Adapter normalizes OpenIPA `õ` → `ɔ̃` and applies profile-aware rhotic handling: `metropolitan-fr` maps the upstream lyric-diction tap `ɾ` to broad `/ʁ/`, while `lyric-diction-fr` preserves `[ɾ]` as intentional tap `р̌`. Raw values remain in `sourceIpa` and trace.
- Regression cases: `bonjour`, `garçon`, `mer`; end-to-end `bonjour` expected UFPN `бо̆̃жух̬̠` with no unsupported IPA.
- PR #11's adapter behavior was superseded by profile-aware PR #13. Final main commit `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5` and workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) verify the corrected profile contract; 52 tests, syntax, font audit, six browser/viewport checks and Pages deployment all passed. Linguistic expert review remains an independent outstanding gate.


### Final profile-aware deployment verification (2026-11-23)
- PR #13 merged as `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5`.
- Main workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) passed build, all 52 tests, syntax, Charis 7 glyph/anchor audit, Playwright installation, six cross-browser/viewport checks and Pages deployment.
- Fresh live Pages scrape shows default Metropolitan `bɔ̃ʒuʁ` → `бо̆̃жух̬̠`; raw published adapter contains the profile-aware branch. Lyric-diction `[ɾ]` preservation is covered by unit tests (`бо̆̃жур̌`).
- No claim of independent linguistic validation; specialist review and licensed gold corpus remain blocked.

### Expanded Cyrillic inventory and Ukrainian sound correspondence table (2026-11-23)
- Owner requirement: reduce diacritic density using the permitted extended Cyrillic inventory and provide a visible table of UFPN letter → sound (IPA) → Ukrainian word/position where the sound can be heard.
- Implemented in PR #15: ү /y/, ө /ø/, ӧ /œ/, ӹ /ə/, њ /ɲ/, ң /ŋ/, ғ /ʁ/; existing ў /w/ and э /ɛ/ retained. /ɥ/ is ү̯; nasalization uses one tilde where possible. The basic /ʁ/ output no longer stacks voicing/backing marks on х.
- The visible searchable table contains 37 segment rows and labels each Ukrainian comparison EXACT, CONTEXTUAL, APPROXIMATE, or NONE. It explicitly states when Ukrainian has no exact equivalent; e.g. it does not conflate [nʲ] with [ɲ], [x] with [ʁ], or [ɪ] with [y].
- Mapping schema 1.2.0 adds Ukrainian example/status/note fields for all 37 phonemes. Tests require those fields. Charis audit now checks every adopted extended-Cyrillic glyph and the canonical NFC base/mark combinations; browser specimen includes all adopted letters and asserts the 37-row table is present at desktop/mobile viewports.
- Source registry adds S34–S37 for Kazakh, Serbian, Hill Mari and Eastern Mari evidence. S34–S36 support the cited grapheme/sound correspondences. S37 supports only the existence of Eastern Mari /œ/, not a Mari `ӧ` → /œ/ spelling. UFPN's `ӧ` = /œ/ is a project-specific assignment; the combined notation remains experimental and is not an independently standardized Ukrainian system.
- PR #15 merged as `b914629a5cbc70dc417a8fe535e1a57300f73dba`; main workflow 45259255626 passed build, 54 tests, syntax, font audit, all six browser/viewport checks and Pages deployment. Live scrape confirms the 37-row table.
- PR #16 merged as `eac00a1bea2a85dc7ed03a68fbf43f6b9e2f6925`; PR workflow 45259870325 passed build, 55 tests, syntax, 45-codepoint Charis audit and all six browser/viewport checks, including the 37-row table at each viewport. It preserves the distinction between velar [ɣ] (х̬) and uvular /ʁ/ (ғ).
- Current main workflow 45260260821 has build, 55 tests, syntax and font audit passed; Playwright installation is still running, so redeployment of the small PR #16 follow-up remains pending. The PR #15 table deployment is already live.
- Remaining acceptance: finish Playwright browser checks; verify deployed table; obtain Ukrainian/French phonetic expert review and user-side readability feedback. The lack of an exact Ukrainian counterpart for several French sounds is an explicit documented limitation, not a reason to invent a misleading Ukrainian word.


### Follow-up verification: velar/uvular distinction and live table
- PR #16 is merged; main SHA is `eac00a1bea2a85dc7ed03a68fbf43f6b9e2f6925`.
- `ғ` is retained for voiced uvular /ʁ/; `х̬` is retained for voiced velar [ɣ]. A regression test prevents these places of articulation from collapsing.
- The live Pages scrape after PR #15 confirms the expanded Cyrillic inventory and 37-row table. PR #16's subtitle/allophone correction is in main but awaiting its main Pages redeployment workflow 45260260821.


## Ukrainian pronunciation-guide column (2026-11-23)
- Added a Ukrainian-language articulation instruction to each of the 37 segmental mapping records. Instructions describe tongue/lip/jaw placement, voicing, airflow and nasal resonance as applicable; they do not invent Ukrainian lexical equivalents where none exist.
- The searchable browser reference table has a fifth column, **«Як вимовити»**, between IPA and Ukrainian example. Search also indexes the new guidance text.
- Regression coverage checks all 37 entries. PR #19 fixed the browser test harness to return the table-header and guided-row measurements. The corrected six-browser viewport test passed in PR #19 workflow `45263336209`; build, unit tests, syntax and font audit also passed.
- The merged `main` push workflow `45263533099` has passed build, tests, syntax and font audit; Playwright browser installation was still in progress at the time this audit note was updated. Live Pages deployment remains unverified until that workflow completes.


## Correction: Eastern Mari evidence and UFPN `ӧ` (2026-11-23)
- Corrected an overstatement in S37: EURPhon confirms Eastern Mari /œ/ in the phoneme inventory, but does not establish a Mari grapheme `ӧ` for /œ/.
- The UFPN mapping now labels `ӧ` = /œ/ as a project-specific assignment, chosen to distinguish it from `ө` = /ø/ without adding diacritics. It is not represented as a direct Mari grapheme-to-sound borrowing.
- `data/ufpn-mapping.json`, `docs/SOURCE-REGISTRY.md`, and `docs/IPA-MAPPING.md` now carry this scope qualification. The runtime output is intentionally unchanged; this is a provenance correction, not a phoneme remapping.


## Main deployment status after pronunciation-guide and provenance merges (2026-11-23)
- Main commit: `f078ba880e34361db1863922f2eb2febe502a86f` (PR #18 articulation guides, PR #19 browser harness correction, PR #20 Mari provenance correction).
- Main workflow `45264431136`: build, unit tests, syntax and Charis 7 audit passed. Playwright browser installation was still in progress at last check; no final main browser/deploy pass is claimed.
- PR #19 workflow `45263336209` passed the six browser checks, validating the five-column table and 37/37 articulation guides.
- Fresh live Pages scrape returned HTTP 200 but still showed the prior four-column table, without «Як вимовити». D3 and W1 therefore remain PARTIAL until the main deployment completes and the live page is re-scraped.


- Articulation-guide review: corrected the /œ/ instruction to keep the same open-mid tongue height as [ɛ] and add lip rounding only. A regression now guards this articulatory distinction.


## Live pronunciation table deployment confirmed (2026-11-23)
- Main commit `95ec26e6127465d0f3152194c07db1b3dbf089e2` deployed successfully in workflow `45264961792` (test and Pages deploy jobs both successful).
- Fresh live scrape returned HTTP 200 and verified the five-column sound table, the **«Як вимовити»** header, exactly 37 rows, and non-empty guidance in every row.
- Main commit `2606e437bc9003ebd546afd65b2f28ac2612fc65` contains a later /œ/ instruction refinement. Its workflow `45265379491` has passed build, unit tests, syntax and font audit; browser rendering and the follow-up Pages deployment are pending. The live site therefore currently reflects `95ec26e`, not the final `2606e` text refinement.


## Design refinement audit — phonetics workbench (2026-11-23)

### Findings addressed
- The original workbench had a strong editorial identity, but small metadata, compressed control spacing and inconsistent button/focus treatments weakened the reading hierarchy.
- Tablet-width sound-reference content could force a wide table beyond its container.
- Keyboard users had no dedicated skip link; reduced-motion behavior was not explicitly handled by the project stylesheet.

### Changes
- Preserved the warm-paper / forest-green palette and existing serif/sans identity while improving the hero, input controls, result hierarchy, explanatory copy, reference table and mobile action layout.
- Added visible focus treatment, a first-in-order skip link, short interaction feedback and `prefers-reduced-motion` handling.
- Kept the reference table horizontally scrollable within its own surface at tablet and phone widths.
- Added `DESIGN.md` with project-specific visual, interaction, accessibility and product-truth constraints. Upstream skill files and assets were not copied.

### Verification
- PR #25 head: `19157268124a46121c9c260c3abdb48a9b289ed3`.
- Workflow [45268570405](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405) passed `npm run build`, `npm test` (57/57), `npm run check`, Charis 7 glyph/OpenType audit, and Playwright checks in Chromium, Firefox and WebKit at 1440, 1024, 768 and 390 px.
- Automated checks verified non-empty IPA/UFPN/Latin outputs, expected result-column counts (3/3/2/1), keyboard focus on the skip link and no horizontal page overflow. The run uploaded the Charis specimen and four workbench screenshots as artifact [14864086549](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405/artifacts/14864086549).

### Limits and status
- Code and automated checks: DONE_VERIFIED.
- Human inspection of the rendered screenshots: completed for desktop/laptop/tablet/mobile from artifact 14865776425. Screen-reader behavior, zoom/reflow and physical-device testing remain PARTIAL; not claimed as passed.
- PR #25 is merged. Live Pages publication is not yet verified; main workflow 45272182990 is still in progress at Playwright browser installation, and the deploy job has not started.
- Historical main deployment `45265871092` failed in `actions/deploy-pages@v4` while fetching artifact metadata. A fresh post-merge main run `45272182990` is the current deployment gate; do not infer deployment success until its test and deploy jobs finish and the live site is checked.


Baseline clarification: current `main` is `81098345c69a3c58d770b95fd63949133fa872d7`, while the live Pages deployment remains `95ec26e6127465d0f3152194c07db1b3dbf089e2`. The /œ/ guide refinement is in main but is not yet on the public site. Workflow `45265871092` passed its test job and failed only at the Pages artifact metadata fetch; treat this as an external deployment blocker, not an application test failure.


## PR #25 UI refinement closeout (2026-11-23)
- PR #25 merged squash as `41f96a1f3fbb8b220931d434626a4edddc3c13c7` from head `3ee313c31ed8c4a005fd1daea234b1a2817a3d34`.
- Workflow [45270636340](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340) completed successfully: build, 57/57 unit tests, syntax, Charis 7/OpenType audit, and 12 Playwright browser/viewport combinations (Chromium/Firefox/WebKit × 1440/1024/768/390 px).
- Screenshot artifact [14865776425](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340/artifacts/14865776425) manually inspected at desktop, laptop, tablet and mobile sizes. Two issues found in earlier review were corrected: confidence marks no longer resemble browser spellcheck waves, and tablet section headings take a full row above controls.
- Remaining manual accessibility work: screen-reader testing, physical-device testing and browser zoom/reflow. No claim is made that these passed.
- PR changed presentation/documentation only; the French phonetic pipeline and datasets were preserved. Main Pages deployment and live verification are tracked separately in HANDOFF.md.


## Current main verification and Pages artifact blocker — 2026-11-23

- Current main SHA: `39eb12f6712c26c3afb1864ff8fbb8d5dbc78c28`.
- PR #27 merged as `18c340aad06d25940504a8a6f177228e9f5a6806`: all six pinned OpenIPA French fixture rows are covered; `garçon` now asserts raw `gaɾsõ` provenance and normalized `gaɾsɔ̃`; `descends` executable-vs-CSV divergence remains explicit. PR workflow 45277660637 passed 58/58 tests, build, syntax, font audit and browser checks.
- PR #28 merged as `39eb12f6712c26c3afb1864ff8fbb8d5dbc78c28`: the French source textarea has an accessible name, and skip-link activation transfers focus to `<main>`. PR workflow 45278479262 passed 58/58 tests and all 12 Chromium/Firefox/WebKit × viewport combinations; all combinations confirmed the accessible name and focus transfer.
- Main workflow [45278852488](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488): test job SUCCESS — build, 58/58 tests, syntax, Charis 7/OpenType audit, browser rendering and artifact upload all passed. Browser specimen artifact: [14869235188](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14869235188).
- Pages artifact upload succeeded as artifact [14867792849](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14867792849), but `actions/deploy-pages@v4` failed to resolve its metadata (reported one artifact but no matching `github-pages`). A deploy-only retry uploaded a second artifact [14867374732](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14867374732) and failed because two `github-pages` artifacts now existed for that run. Do not retry the deploy job again on this run.
- Required next step: a fresh main workflow run with a single `github-pages` artifact, then verify deployment and re-scrape the live Pages site. Last verified live baseline remains commit `95ec26e6127465d0f3152194c07db1b3dbf089e2`; current main is not yet confirmed deployed.
- Linguistic expert review and independently curated/licensed gold benchmark remain separate blockers. Screen-reader, zoom/reflow, physical-device and owner visual acceptance remain PARTIAL.

