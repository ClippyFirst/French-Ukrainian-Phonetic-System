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
- Regression cases: `bonjour`, `garçon`, `mer`; end-to-end `bonjour` expected UFPN `бɔ̃жух̬̠` with no unsupported IPA.
- PR #11's adapter behavior was superseded by profile-aware PR #13. Final main commit `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5` and workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) verify the corrected profile contract; 52 tests, syntax, font audit, six browser/viewport checks and Pages deployment all passed. Linguistic expert review remains an independent outstanding gate.


### Final profile-aware deployment verification (2026-11-23)
- PR #13 merged as `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5`.
- Main workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029) passed build, all 52 tests, syntax, Charis 7 glyph/anchor audit, Playwright installation, six cross-browser/viewport checks and Pages deployment.
- Fresh live Pages scrape shows default Metropolitan `bɔ̃ʒuʁ` → `бɔ̃жух̬̠`; raw published adapter contains the profile-aware branch. Lyric-diction `[ɾ]` preservation is covered by unit tests (`бо̆̃жур̌`).
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


## Current main verification and Pages deployment closeout — 2026-11-23

- Verified application/workflow commit: `bba1a66fdb31241e889fe16fe25b2371bb3641fc`; subsequent closeout commits are documentation-only and do not alter the deployed application.
- PR #27 merged as `18c340aad06d25940504a8a6f177228e9f5a6806`: all six pinned OpenIPA French fixture rows are covered; `garçon` asserts raw `gaɾsõ` provenance and normalized `gaɾsɔ̃`; the `descends` executable-vs-CSV divergence remains explicit. PR CI 45277660637 passed 58/58 tests and browser checks.
- PR #28 merged as `39eb12f6712c26c3afb1864ff8fbb8d5dbc78c28`: the French source textarea has an accessible name, and skip-link activation transfers focus to `<main>`. PR CI 45278479262 passed 58/58 tests and all 12 Chromium/Firefox/WebKit × viewport combinations.
- PR #29 reconciled the matrix, audit and handoff with the observed evidence.
- PR #30 merged as `bba1a66fdb31241e889fe16fe25b2371bb3641fc`: Pages artifact creation is now a separate `pages-artifact` job; `deploy` only publishes the already-created artifact. This gives artifact metadata time to propagate and makes deploy-only retries safe.
- Main workflow [45281476706](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706): all three jobs SUCCESS — test (58/58, build, syntax, Charis 7 audit, 12 browser/viewport combinations), `pages-artifact`, and `deploy`.
- Artifacts: exactly one `github-pages` artifact [14870605812](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706/artifacts/14870605812) and browser specimen [14870611063](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706/artifacts/14870611063).
- Fresh live scrape [01a20a90-e14f-7024-b6d9-0f5af46dd418] returned HTTP 200 and verified `main#top[tabindex="-1"]`, `textarea[aria-labelledby="source-label"]`, exactly 37 sound rows and all five table headers including «Як вимовити».
- The earlier metadata failures in runs 45278852488 and 45279727256 are resolved by the split-job workflow; do not retry a deploy job that re-uploads the artifact.
- Remaining acceptance: manual screen-reader, browser zoom/reflow, physical-device and owner visual QA PARTIAL; independent French/Ukrainian phonetic review BLOCKED; independently curated/licensed gold IPA/UFPN benchmark BLOCKED. This remains a research prototype, not an academically validated phonetic standard.

## Pages artifact retry isolation — verified

The failure mechanism was confirmed by the logs: the Pages artifact finalized at 22:31:41.615Z, while `deploy-pages` queried artifact metadata at 22:31:42.089Z, only 0.47 seconds later. The internal artifact list did not yet include `github-pages`; a later retry in the same job uploaded a duplicate. The behavior matches reports in [actions/deploy-pages#418](https://github.com/actions/deploy-pages/issues/418) and duplicate-artifact retry reports in [actions/deploy-pages#415](https://github.com/actions/deploy-pages/issues/415).

PR #30 moved `actions/upload-pages-artifact@v3` into a dedicated `pages-artifact` job and made `deploy` depend on it. Main workflow 45281476706 verified the fix: artifact job succeeded, exactly one `github-pages` artifact was listed, and `actions/deploy-pages@v4` succeeded. A fresh live scrape confirmed the deployed content. The workflow retry fix is therefore DONE_VERIFIED.


## Owner-approved UFPN glide notation — 2026-11-24
- Current implementation branch: `feat/ufpn-labial-palatal-glide-grapheme`; base main at start: `9633b43bad1a74899ac556bfd19f293977c18d61`.
- /ɥ/ is now represented by the composed UFPN string `й̹` (U+0439 U+0339), using the existing U+0339 combining right half ring below as a project-specific more-rounded marker. All three output levels use the same canonical NFC string.
- /ɲ/ remains the single Cyrillic letter `њ`; the regression test asserts this explicitly.
- No IPA source, French G2P rule, other segment mapping, or /y/ mapping changed. PR #33 CI 45370163542 passed 59/59 tests, Charis audit and 12 Chromium/Firefox/WebKit × viewport checks. Main run 45370457031 passed test, Pages artifact and deploy. Fresh live scrape `01a20d01-a5ea-70bf-bafe-3e58d7a307bb` returned HTTP 200 and confirmed the visible /ɥ/ → `й̹` row.


## Rounding feature registry consistency — 2026-11-24
- Follow-up branch: `fix/rounding-feature-registry-for-y-labial-glide`, based on main after PR #33.
- The machine-readable `featureDimensions.rounding` description now agrees with the adopted /ɥ/ composition `й̹`: dedicated Cyrillic letters encode /y ø œ/, while U+0339 below `й` marks the labial-palatal glide; finer rounding gradience remains evidence-gated.
- Added a regression assertion linking the rounding feature description to `й̹`. No output mapping changed in this follow-up.


## Rounding feature metadata follow-up — 2026-11-24
- PR #34 synchronizes `featureDimensions.rounding` with the merged /ɥ/ composition `й̹` and adds a regression assertion. It changes descriptive metadata only; no IPA→UFPN output changes.


## Owner-approved IPA vowel graphemes — 2026-11-24
- The previous inventory did not implement the owner's full requested set: it still rendered `/œ/` as `ӧ`, `/ɔ/` as `о̆`, `/ə/` as `ӹ`, and `/ɛ/` as `э`.
- Corrective branch `feat/retain-ipa-vowel-graphemes` retains the exact standalone IPA symbols `œ`, `ɔ`, `ə`, `ɛ` in the executable mapping. Nasal vowels use `œ̃`, `ɔ̃`, `ɛ̃`; `/ɔ̃/` no longer carries the extra breve.
- The change is an owner-approved notation decision, not a claim that the IPA symbols are native Ukrainian letters. Cyrillic graphemes `ў`, `ү`, `ө`, `њ`, `ң`, `ғ` remain intact; `/ɥ/` remains `й̹`.
- Acceptance and evidence are pending CI, browser checks, and a fresh live Pages scrape. Until those pass, this correction is PARTIAL and not deployed.


## Verification — standalone IPA vowel graphemes deployed (2026-11-24)
- PR #35 merged as `4c56c5637831bdbfb12dc1a93b0e104624ab2454`; main workflow [45378841718](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45378841718) completed SUCCESS.
- Verified: build, 60/60 tests, syntax, Charis 7 glyph/anchor audit, 12 Chromium/Firefox/WebKit × viewport combinations, Pages artifact and deployment.
- Charis 7 covered 46 UFPN inventory codepoints, 19 combining marks, 13 mapped clusters and 26 HarfBuzz shaping samples; anchor inspections passed.
- Fresh live scrape `01a20d31-75b2-723e-aad0-aef0e6e8005d` returned HTTP 200 and confirmed `bɔ̃ʒuʁ` → `бɔ̃жуғ`, plus visible `ɛ`, `œ`, `ɔ`, `ə`, nasal `ɛ̃`, `ɔ̃`, `œ̃`, `й̹` and `њ`.
- The previous failure was limited to two stale end-to-end expected strings (`о̆̃`); tests were corrected to expect `ɔ̃`, and final CI passed 60/60.
- Remaining linguistic expert review, licensed gold benchmark, screen-reader/zoom/reflow and physical-device checks remain evidence-limited; this does not change the experimental research-prototype status.


## Перевірка української локалізації сайту — 2026-11-24
- Виявлено, що англійська була не лише в HTML, а й у динамічних підписах результатів, feature registry, поясненнях OpenIPA та загальних шаблонах транскрипційних правил.
- Перекладено всі виявлені користувацькі рядки, які рендеряться головною сторінкою й довідковими панелями; перекладено також доступні назви та підписи TXT/копіювання.
- Переклад не змінює фонетичні значення, IPA, французькі приклади або машинні ідентифікатори. Брендові назви та міжнародні абревіатури залишаються.
- CI run [45383515829](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45383515829): build PASS; 65/65 tests PASS; syntax PASS; Charis 7 glyph/anchor audit PASS; 12 browser × viewport combinations across Chromium, Firefox and WebKit PASS. Browser specimen artifact `14915013026`.
- PR #37, #38 і #39 злиті; фінальний стан і live-перевірку зафіксовано нижче.


## Остаточне закриття української локалізації — 2026-11-24
- Публічний інтерфейс і видимі довідкові панелі локалізовані українською; статус DONE_VERIFIED.
- Динамічні пояснення правил OpenIPA, загальні шаблони для графем, лексичні винятки, таблиці вимірів/статусів, метадані, доступні назви та TXT/копіювання також локалізовані.
- PR #37, #38 і #39 merged; фінальний `main` SHA `3b67ef59ca9f012f00dcbf4bc04eb6ce32714778`.
- Main CI/deploy [45386058400](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45386058400): 65/65 tests, build, syntax, Charis 7 glyph/anchor audit, 12 Chromium/Firefox/WebKit viewport combinations, Pages artifact and deployment — SUCCESS.
- Live audit `01a20d5c-3f55-7718-a428-e5656b4332ce` returned HTTP 200 and found no residual English interface/rule phrases from the audited list. The /ə/ note now reads grammatically «до звука ə».
- Залишкові латинські рядки на сторінці — власні назви/бренди, абревіатури, французькі приклади та латинізований фонетичний запис. Це не англомовний текст інтерфейсу.
- Фонетична валідність самої експериментальної системи й незалежна експертна перевірка залишаються окремими дослідницькими задачами; локалізація не змінює статусу дослідницького прототипу.


## Reference panels and explanation control — 2026-11-24
- Owner feedback: the IPA mapping table, the full list of phonetic dimensions and the UFPN grapheme inventory looked like unrelated UI components; the 18-dimension list was difficult to read and appeared as empty list markers in the reported view. The explanation checkbox did not state what it controlled.
- PR #41 (branch fix/reference-panels-and-explanation-toggle) gives all three reference sections one shared accordion hierarchy with consistent title/count/description treatment. It replaces the dense 18-item plain list with cards showing Ukrainian dimension names, Ukrainian values, evidence status and UFPN coverage notes. Adopted graphemes and unassigned candidates are shown separately.
- The checkbox is now labelled «Показувати розбір вибраного слова» and explicitly says it only shows/hides the selected-word analysis panel; it does not change transcription output. aria-controls and aria-expanded expose the relationship/state.
- Added tests/reference-ui.test.js for the three accordion contracts, 18-dimension rendering contract, adopted/candidate inventory distinction, checkbox semantics and responsive/focus styles.
- Scope is presentation/accessibility only; no G2P, IPA normalization or UFPN mapping changes. PR #41 was squash-merged as `f04a7b280b9b1a855ae1faed4c6bf1b08f070998`. Workflow `45407617594` passed build, tests, syntax, Charis 7 audit and Chromium/Firefox/WebKit rendering. Main workflow `45411777853` also passed all those checks plus `pages-artifact` and `deploy`. Fresh live scrape with `?deploycheck=45411777853` returned HTTP 200 and confirmed the new checkbox label «Показувати розбір вибраного слова», its explanation that transcription is unaffected, and card rendering in place of the old 18-item plain list. Reference UI follow-up is DONE_VERIFIED.

## UI copy-noise review — 2026-11-24
- Review scope: static page shell, profile selector, result-card labels, explanation heading and footer.
- Findings addressed: repeated product/section identifiers, decorative ordinal labels, non-functional future profile options, duplicated GitHub destination and hard-coded version text.
- Kept intentionally: distinct format names and explanatory descriptions, uncertainty/prototype limitations, accessible control labels, source/status navigation. These communicate product semantics rather than decoration.
- Changes are isolated to HTML, design guidance and regression coverage; no G2P, IPA, UFPN, confidence, provenance or export logic was edited.
- PR workflow [45417023021](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45417023021) succeeded: build, 71/71 tests, syntax check, Charis 7/OpenType audit, and 12 Chromium/Firefox/WebKit × viewport checks. Screenshots at 1440/1024/768/390 px were downloaded and manually inspected; the updated hierarchy remains legible and no horizontal overflow was reported. Artifact [14931722793](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45417023021/artifacts/14931722793).


## Контентний UX — UI-06 (2026-11-24)
- Вихідний стан: селектор називався «Профіль OpenIPA», а самі опції пояснювали різницю через технічне «випадіння голосного» / «елізія» без визначення. Користувач мав знати назву рушія, щоб зрозуміти контроль.
- Вихідний стан результатів: латинський стовпець називався «Латинська підказка», але його пояснення «авторська мнемонічна підказка» не пояснювало практичного застосування й не попереджало прямо, що це не точна транскрипція.
- Зміни: «Варіант вимови», коротке визначення елізії та її впливу; заголовок «Результат вимови»; описи IPA, UFPN і латинської підказки уточнюють їхню різну роль. Для профільної підказки додано `aria-describedby`; стиль підказки не використовує дрібний моноширинний метатекст.
- Методика: контентний аудит, контентна ієрархія, мікрокопірайтинг та узгоджене маркування за designer-skills (MIT). У репозиторій не копіювалися файли upstream skill.
- Зміни обмежені HTML/CSS/тестами/дизайн-документацією. G2P, IPA, профільні ідентифікатори, UFPN mapping, confidence, provenance та експорт не змінювалися.
- Статус: PARTIAL до проходження CI, браузерних перевірок та live-перевірки після merge.

- CI-аудит PR #44: перший workflow [45421702699](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45421702699) мав build PASS і 73/74 tests через застаріле очікування в `tests/localization.test.js:12`; це була помилка тесту, не runtime regression. Виправлено у коміті `012beb169565c639d24192705e29d233fb0791d6`. Повторний workflow [45433252768](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433252768): build PASS, 74/74 tests PASS, syntax PASS, Charis 7/OpenType audit PASS, але його було скасовано на етапі встановлення Playwright після нових комітів документації. Актуальний workflow [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) повторно пройшов build, 74/74 tests, syntax і font audit; Playwright installation і рендеринг Chromium/Firefox/WebKit завершилися успішно. PR #44 злито в main комітом `76f70f6ea6f832523cea72af2cabad7b8dbb8447`. Workflow [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) повністю успішний: build, 74/74 tests, syntax, Charis 7/OpenType, Playwright та Chromium/Firefox/WebKit rendering; browser artifact [14939324505](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826). У PR-події `pages-artifact` і `deploy` були skipped, як і передбачено workflow. Потрібне підтвердження main deployment та live HTTP-вмісту; статус PARTIAL лише щодо production hosting.


## UFPN schwa grapheme update — 2026-11-24
- Owner decision: map all IPA `/ə/` tokens to `ъ` in practical UFPN output at all three detail levels. The canonical IPA layer remains `/ə/`; no French G2P, profile elision, or IPA provenance behavior is altered.
- The mapping registry now records `ъ` as the adopted UFPN grapheme for IPA `/ə/`, with an explicit project-specific rationale. This does not claim that the French vowel is silent or identical to Bulgarian `/ɤ/`; in UFPN, `ъ` is to be read as a short neutral vowel.
- Automated regression tests cover Basic/Detailed/Extended, word context and supplied length. PR CI [45442539824](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45442539824) passed build, 75/75 tests, syntax, Charis 7/OpenType audit, Playwright install and Chromium/Firefox/WebKit rendering. Production Pages deployment [workflow 45443265333](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45443265333) succeeded; live smoke verification confirmed `/ə/` remains in IPA while UFPN output and the grapheme reference use `ъ`.


## Localization correction — 2026-11-24
- Live review found the newly adopted `ъ` grapheme inventory card exposed its origin and rationale in English because its new data values had no Ukrainian UI dictionary entries. Added explicit Ukrainian labels and regression assertions; the page's existing Ukrainian-only content requirement is preserved.


## Final live localization verification — 2026-11-24
- PR #48 fixed the only English fallback exposed by the new `ъ` inventory entry: origin and rationale now have explicit Ukrainian UI translations, guarded by regression assertions.
- Main Pages workflow [45445140803](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45445140803) passed build, 75/75 tests, syntax, font audit, browser rendering, Pages artifact and deploy.
- Final live smoke test confirmed: IPA retains `/ə/`; UFPN output uses `ъ`; the reference row is `ъ | ə`; the `ъ` inventory origin and rationale are Ukrainian.


## French editorial colour review — 2026-11-24
- Replaced the forest-green/lime emphasis with ink blue, wine red and muted champagne over warm ivory; neutral slate and pale blue-grey support text and surfaces.
- The palette avoids a literal tricolour while evoking French editorial/print design.
- Scope is deliberately limited to CSS colour values/tokens and a regression assertion. No typography, spacing, layout, wording, interaction or phonetic logic changes.


## French editorial colour — post-merge production verification (2026-11-24)
- PR #50 merged as `9efa311f0d500ab24347f481cc61ba151cecbea0`; the implementation is limited to CSS colour values/tokens, design guidance and a palette regression assertion.
- Main Pages workflow [45460636622](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45460636622) completed successfully. The `test` job passed build, test suite, syntax, Charis 7/OpenType audit, Playwright installation and Chromium/Firefox/WebKit rendering; both `pages-artifact` and `deploy` jobs also succeeded.
- Live production CSS was fetched uncached at `https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/styles.css?v=9efa311f0d500ab24347f481cc61ba151cecbea0` (HTTP 200). It contains the new `#F5F0E7`, `#26364A`, `#A64B55`, `#D8B98A`, `#66717C` palette, updated supporting surfaces and component colours.
- The first live fetch was a stale cache hit showing the prior palette; a cache-busting request with `storeInCache=false` returned the current deployed CSS. This was a cache observation, not a deployment failure.
- Outcome: palette implementation, automated checks and production hosting are DONE_VERIFIED. No phonetic, IPA, UFPN or runtime behavior was changed.


## Навчальний супровід французького читання та UFPN UI — 2026-11-24

- Мета: додати навчальний шар до наявного транскриптора, не змінюючи його фонетичний контракт.
- Французький мінікурс розрізняє типові графемні відповідності та контекстні/варіативні правила; охоплює /œ̃/ з приміткою про можливе злиття з /ɛ̃/, c/g, акценти й дієрезу, кінцеві приголосні, дієслівне -ent, schwa, liaison та enchaînement. Посилання ведуть до S1, S4, S10, S14–S16 та нових S38–S44 у source registry. Undermind workspace містить окрему записку з аналізом PDF Racine & Detey, Stridfeldt і Nawafleh; результати японської/шведської/арабської L1 груп не узагальнюються безпосередньо на українців. Runtime і mapping не змінюються.
- Навігаційний пункт UFPN тепер веде до вбудованого HTML-розділу, а не до сирого Markdown. Картки графем створюються безпосередньо з UFPN_MAPPING.graphemeInventory.adopted, щоб уникнути дублювання інвентарю в UI-коді.
- Приклад bonjour показує IPA як проміжний шар і чинний UFPN результат основного профілю; три рівні нотації пояснені окремо.
- Регресійні перевірки охоплюють зміст навчальних правил, зв'язок кнопок прикладів з основним полем, генерацію карток із mapping та responsive CSS.
- Статус: DONE_VERIFIED після merge PR #53. Навчальний матеріал не є повним підручником французької мови, не замінює аудіо та не обіцяє покрити всі лексичні винятки.
- Перевірки: build, 79/79 tests, syntax/check, Charis 7/OpenType audit, Playwright Chromium/Firefox/WebKit, Pages artifact/deploy та live smoke test HTTP 200. У production підтверджено обидві секції, якорі навігації, UFPN приклад і CSS для нового UI.
- Scope: навчальний блок має виключно навчальне призначення. Результати досліджень шведськомовних, японськомовних та арабомовних студентів не екстраполюються на україномовних учнів.
- Deployment evidence: main commit ba02467bd7b8c1102bab0ec79d9fff5568acd87d; workflow run 45466573635 (test, pages-artifact, deploy success).


## Final verification — French reading + UFPN web guide (2026-11-24)

**Status: DONE_VERIFIED**

- PR #53 merged by squash into main: `ba02467bd7b8c1102bab0ec79d9fff5568acd87d`.
- PR CI run [#379 / 45466119617](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45466119617): build PASS; 79/79 tests PASS; syntax check PASS; Charis 7/OpenType audit PASS; Playwright browser install PASS; Chromium/Firefox/WebKit rendering PASS; specimen upload PASS.
- Main Pages run [#380 / 45466573635](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45466573635): test job PASS (79/79); Pages artifact upload PASS; deploy PASS.
- Live smoke test via Firecrawl on 2026-11-24: `https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/` returned HTTP 200. Extracted live page contains the French reading module, nasal-vowel variation note, liaison/enchaînement, the UFPN visual guide, adopted grapheme cards and technical table anchors. Navigation points to `#ufpn-guide`; the raw `docs/UKRAINIAN-NOTATION.md` is no longer a navigation target.
- Linguistic scope: educational orientation only. Source registry S38–S44 records peer-reviewed evidence; full PDFs of Racine & Detey, Stridfeldt and Nawafleh were reviewed; abstracts/metadata were reviewed for Law, Brissaud et al., Viebahn et al. and Granget et al. No licensed corpora or paper datasets were imported.
- The phonetic engine, IPA generation, IPA→UFPN mapping, profiles, notation levels and exports were not changed.


## Final UI metadata deployment — 2026-11-24

- PR #57 merged as `b9225311c80b18f99a8d90e5d49752ea9b9a6012` to align `meta theme-color` with the French editorial paper token `#F5F0E7` and to make the educational-only purpose explicit in the learning module.
- Final main Pages workflow [#385 / 45468292682](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45468292682) passed: 79/79 tests, build/check, font audit, Chromium/Firefox/WebKit render, artifact upload and deployment.
- Final live smoke after this deploy returned HTTP 200; both sections remain present and UFPN navigation still points to the in-page HTML guide.


## UI-07 — власницьке UX-уточнення (2026-11-24)
- Коренева причина порожнього місця в блоці 04: картка не мала класу lesson-wide, хоча навчальна сітка мала дві колонки. Додано розтягування на всю ширину.
- Коренева причина порожнього місця в останньому ряду графем: фіксована CSS Grid-колонкова схема. Візуальні картки переведено на flex-wrap з гнучкою базою; останній рядок може розтягувати картки, а не залишати порожню комірку.
- Прибрано UI перемикача «Показувати розбір вибраного слова» та його допоміжний текст. Панель розбору прихована до вибору слова й відкривається через наявну взаємодію з сегментом результату.
- Прибрано відображення рівнів «Докладний» і «Розширений»; транскриптор і технічна таблиця використовують лише базову форму UFPN. Інші рівні та їхні дані не видалялися з внутрішнього дослідницького mapping.
- Прибрано з сайту повний список фонетичних вимірів і картки кандидатів ы / ё. Їхні дослідницькі записи лишилися в JSON-реєстрі, але не відображаються користувачу; прийняті графеми не змінені.
- Прибрано індикатори впевненості з інтерфейсу (хвилясте підкреслення, підписи в aria-label, метадані розбору й попереджувальний блок). Внутрішні оцінки рушія не змінювалися.
- PR #60: fix/streamline-ufpn-and-reading-layout-2026-11-24; реалізація/CI ще перевіряються.
- Перший PR CI [45472721047](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45472721047): build PASS; 74/80 tests PASS. Шість падінь були зумовлені застарілими перевірками UI після навмисного видалення перемикача/рівнів/панелі вимірів, старим очікуванням локалізаційного підпису, а також ненавмисним вилученням словників локалізації прийнятих графем під час прибирання невикористаного коду. Словники inventoryOriginUk, inventoryRationaleUk, featureStatusUk і phonologyStatusUk відновлено; таблиця IPA→UFPN продовжує використовувати потрібні статуси. Тестові очікування оновлено відповідно до нового контракту. Runs [45473143323](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45473143323) та [45473266943](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45473266943) скасовані наступними push. Workflow [45473750549](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45473750549) — pending на момент останнього огляду; успішне завершення не заявляється.
- Локальний git clone недоступний: DNS не розв’язує github.com. Статичні acceptance checks через GitHub API пройшли для 12 вимог; це не замінює повний npm test/check/build та браузерний CI.

## UI-07 — final PR verification (2026-11-24)
- Final PR #60 head: `1eb528df11d0175de84a98d8cfa91871aae40e47`.
- Workflow [#409 / 45474480437](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45474480437) SUCCESS: build, 79/79 tests, syntax check, Charis 7/OpenType audit, Playwright browser installation, Chromium/Firefox/WebKit render and artifact upload.
- Browser artifact [14959101782](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45474480437/artifacts/14959101782) contains desktop, laptop, tablet and mobile screenshots. Desktop and mobile screenshots were inspected: lesson 04 spans both columns; the UFPN symbol-card final row uses the available width; mobile layout remains a single readable column without horizontal overflow.
- Earlier failed CI runs were traced to stale assertions for removed UI and one temporary omission of localization dictionaries; all were corrected. The final run is green.
- PR CI does not run Pages deployment. Hosting remains PARTIAL until merge, main Pages deploy and live HTTP/content smoke verification.


## UI-07 — production closeout (2026-11-24)
- PR #60 merged to main as `bcafb611bf90270f52e91d4c445f02cdbd8fe3fe`; implementation branch retained.
- PR workflow [#409 / 45474480437](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45474480437) SUCCESS: build, 79/79 tests, syntax check, Charis 7/OpenType audit, Playwright installation, Chromium/Firefox/WebKit render and specimen upload.
- Main Pages workflow [#412 / 45475060963](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45475060963) SUCCESS: test job, Pages artifact and deploy.
- Live smoke after deployment: `https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/` returned HTTP 200. HTML confirms lesson 04 uses `lesson-wide`; the explanation checkbox, full feature-dimensions panel and unassigned candidate cards are absent; only Basic UFPN remains; confidence labels/warnings are absent. Live app.js confirms Basic-only mode and the selected-word detail behavior (hidden on input, shown on selection). Live CSS confirms full-width lesson card and flex-wrapped symbol cards.
- Browser specimen [14959101782](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45474480437/artifacts/14959101782) inspected at desktop and mobile sizes; the last UFPN card row fills available width and mobile has no horizontal overflow.
- IPA, G2P engine, profiles, canonical mapping and internal confidence calculation were not changed. Candidate `ы` and `ё` records remain in the research registry but are not rendered on the website.


## Editorial motion audit — 2026-11-24
- PR #62 merged into main as `ba55c46763d0a09f75faa55830d51192b6efb6e8`.
- CSS-only micro-interactions: 140 ms ease for selected-word colour/background and reference-link colour; 2 px ease-in-out lift for spelling/grapheme cards only on fine-pointer hover.
- `prefers-reduced-motion: reduce` removes card transitions and movement while retaining colour feedback. No scroll reveal, no movement of phonetic output, no JS animation loop or external runtime dependency.
- PR CI [45479094417](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45479094417) SUCCESS. Post-merge main Pages workflow [#424 / 45483025203](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45483025203) SUCCESS: build, tests, check, font audit, Playwright install, Chromium/Firefox/WebKit rendering, Pages artifact and deploy.
- Browser artifact [14961860727](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45479094417/artifacts/14961860727) visually inspected at desktop and mobile; no visible layout regression or horizontal overflow.
- Live production CSS was fetched after deployment and confirmed `--motion-fast:140ms`, fine-pointer hover lift by 2 px, and reduced-motion movement reset. Production homepage fetch succeeded. MOTION-01: DONE_VERIFIED and deployed.



## Disclosure accordion refinement — 2026-11-24
- У live UI виявлено неоднорідність: довідкові секції вже мали власний стилізований accordion, тоді як три питання «Перевірте себе» залишалися майже нативними details із браузерним маркером. Це робило взаємодію візуально непослідовною.
- На гілці `fix/consistent-disclosure-accordions-2026-11-24` уніфіковано заголовки, індикатори відкриття/закриття, фокус-контур, hover-стан, розміри зон натискання та мобільні відступи. Збережено нативну семантику HTML `details/summary`; JS для відкриття не додавався.
- Додано регресійні перевірки стилів у `tests/editorial-motion.test.js`. Reduced-motion вимикає переходи accordion-контейнерів.
- Статус DISC-01: PARTIAL до проходження CI та перевірки browser specimen.
