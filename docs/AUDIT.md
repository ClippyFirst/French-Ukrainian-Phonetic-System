# Audit Register — Phase 2 and Website Service

## Verified repository state (2026-11-23)
- Default branch `main`: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch: `feat/french-ipa-ufpn-engine`; before this audit refresh the head was `eb92e2ecddded35a823725400539732ed0789d70).
- PR #1 remains open, Draft, targets `main`, and is not merged.
- Branch comparison before this documentation refresh: 68 commits ahead, 0 behind.
- Current-head Actions run [45178726418](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45178726418) succeeded: `npm run build`, `npm test` (46/46), and `npm run check` passed. Deploy job skipped on feature branch.
- Pages probe [45177924718](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45177924718): build/tests/check passed; `actions/configure-pages@v5` returned HTTP 404 because Pages is not configured. Latest recorded repository state is `has_pages=false`.
- Workflow deploy remains restricted to `main`; no repository settings or PR merge were changed.
- Local clone attempt failed because this environment could not resolve github.com. No local browser QA was performed.

## Website service audit
- **Implementation: DONE_VERIFIED.** Static browser app exists in `index.html`, `styles.css`, `src/app.js`; French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin output, Basic/Detailed/Extended levels, word-level explanations, uncertainty markers, searchable UFPN reference, copy, TXT export and browser print-to-PDF.
- **Runtime/privacy:** no application backend; entered text is processed in the browser. External static assets include Google Fonts.
- **Build integration: DONE_VERIFIED.** Current-head hosted CI passes build, 46 tests and syntax check.
- **Public hosting: BLOCKED.** Pages is not enabled/configured; configure-pages returned 404. The available GitHub integration has no operation to enable Pages. Owner must select Settings → Pages → Build and deployment → GitHub Actions, then review/merge PR #1 and verify the live URL/deployed SHA.
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
- AGPL-3.0 and upstream attribution/network-source notices are present.
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
- Enable Pages, review/merge PR #1, then verify public deployment URL and deployed commit.
- Run browser/mobile/accessibility QA.
- Obtain independent French and Ukrainian phonetic review.
- Obtain independently licensed gold IPA/UFPN data.
- Expand morphology/context and edge-case coverage with source-backed fixtures.
- Resolve upstream IPA notation conventions only with evidence.
