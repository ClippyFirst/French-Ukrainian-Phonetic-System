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
- Feature branch: `fix/openipa-canonical-ipa-adapter`. CI/deployment result to be added after verification. Linguistic expert review remains an independent outstanding gate.
