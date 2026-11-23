# Audit Register — Phase 2 and Website Service

## Verified repository state (2026-11-23)
- Starting default-branch SHA: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- PR #1 merged into `main` by squash merge; merge SHA `313fc0dfef85afaf413dfc4f91d93019f578ed7d`.
- Merged head: `276c0375b3843ff1aa9c85d54d052dd0ddf1089b`; 69 commits and 84 changed files.
- Feature CI run [45179583235](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45179583235) passed build, 46/46 tests and syntax checks.
- Main CI run [45192430970](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192430970) passed `npm run build`, `npm test` and `npm run check`; 46 tests passed.
- Main deploy run [45192891355](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192891355) completed successfully, including `actions/deploy-pages@v4`; deployed SHA `422430fe142e8f15e55d8ef2bd1876853b2e209e`.
- Environment URL emitted by the successful deploy: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Direct HTTP/content verification remains unavailable: web fetch reported inaccessible and container DNS could not resolve the host. Previous run 45192430970 failed due artifact metadata; retrying only deploy duplicated the artifact, so a clean new run was used.
- Local clone failed because this environment could not resolve github.com. No manual browser QA was performed.

## Website service audit
- **Implementation: DONE_VERIFIED.** Static browser app exists in `index.html`, `styles.css`, `src/app.js`; French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin output, Basic/Detailed/Extended levels, word-level explanations, uncertainty markers, searchable UFPN reference, copy, TXT export and browser print-to-PDF.
- **Runtime/privacy:** no application backend; entered text is processed in the browser. External static assets include Google Fonts.
- **Build/test integration: DONE_VERIFIED.** Main CI run 45192430970 passes build, 46 tests and syntax check.
- **Public hosting: PARTIAL.** Clean deploy run 45192891355 succeeded and emitted the public Pages URL; direct HTTP response, page content and asset smoke verification remain unconfirmed because DNS/web access from this environment failed.
- **Browser QA: TODO.** Chromium, Firefox, WebKit, mobile, keyboard and screen-reader checks have not been run.

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
- Verify the emitted public Pages URL over HTTP, inspect app assets and run a browser smoke test; the deployment action and deployed SHA are already confirmed.
- Run browser/mobile/accessibility QA.
- Obtain independent French and Ukrainian phonetic review.
- Obtain independently licensed gold IPA/UFPN data.
- Expand morphology/context and edge-case coverage with source-backed fixtures.
- Resolve upstream IPA notation conventions only with evidence.
