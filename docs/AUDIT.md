# Audit Register — Phase 2 and Website Service

## Verified repository state
- Default branch `main`: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch `feat/french-ipa-ufpn-engine`, latest inspected head `9693885934e3ab56c659f479376cdefd8ee2b9dd`; 64 commits ahead and 0 behind main.
- PR #1 remains open/draft, targets main, and is not merged.
- Latest push run `45178377533` and PR run `45178389166` on head `9693885934e3ab56c659f479376cdefd8ee2b9dd` both passed `npm run build`, `npm test` (46/46) and `npm run check`. Deploy jobs skipped on feature/PR refs.
- Pages probe `45177924718`: build, 46 tests and syntax checks passed; `actions/configure-pages@v5` returned HTTP 404 because no Pages site is configured. Repository metadata reports `has_pages=false`.
- The workflow is gated to deploy only from `main`; no repository Pages settings or PR merge were changed.
- Vercel Git deployment context reports no Git-linked project for this repository; no alternate hosting project was created.
- Local clone/test and browser QA were not performed in this connector-only environment; prior clone attempt failed DNS resolution for github.com.

## Website service audit
- **Implementation: DONE_VERIFIED.** Static browser app exists in `index.html`, `styles.css`, `src/app.js`; it provides French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin outputs, Basic/Detailed/Extended levels, word-level rule explanations, uncertainty markers, searchable UFPN reference, copy, TXT export and browser print-to-PDF.
- **Runtime/privacy:** no application backend is required; input text is processed in the browser. Static assets are served from the hosting provider; external Google Fonts stylesheet is used.
- **Build integration: DONE_VERIFIED.** CI runs `npm run build`, `npm test`, `npm run check`.
- **Public hosting: BLOCKED.** `has_pages=false`; deploy job is restricted to main. Owner/admin must enable Settings → Pages → GitHub Actions and approve PR #1 merge. No public URL is currently verified.
- **Browser QA: TODO.** Need Chromium, Firefox, WebKit, mobile, keyboard and screen-reader checks.

## Verified implementation inventory
- 37 segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- UFPN levels Basic/Detailed/Extended; IPA remains canonical input.
- Québec /t,d/ affrication and diphthongization are profile-specific; cross-word nasal place and fricative voicing assimilation are Extended/audio-gated.

## OpenIPA French parser integration
- Vendored original OpenIPA French parser, per-letter parsers, exception/rule dictionaries and required helpers from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504` under `vendor/openipa/`.
- Original TypeScript source is bundled for browser use by `scripts/build-openipa.mjs` with pinned esbuild 0.25.0.
- `src/french-g2p.js` calls the original parser and preserves per-grapheme rule descriptions, source spans and source IPA. Only upstream Greek epsilon `ε` is normalized to IPA `ɛ`; `õ` is not guessed.
- Former project seed lexicon and hand-written liaison/final-schwa overrides are removed from runtime. Every French word uses OpenIPA's full-text parser.
- Regression fixtures test integration, not independent pronunciation accuracy.
- AGPL-3.0 is the repository license; attribution and network-source requirements are in `THIRD_PARTY_NOTICES.md`.
- Upstream fixture discrepancy: legacy CSV expects `descends` → `d(e)sɑ̃`, while executable parser emits `dɛssɑ̃`; documented, not hidden.

## Main linguistic risks
- UFPN is a project notation, not an established standard.
- /œ̃/ and /ɑ/ contrasts vary by speaker/region.
- /ʁ/, /ɲ/, mid vowels, schwa and liaison are variable.
- Extended narrow phonetic marks require observed IPA/audio; they cannot be inferred from spelling.
- POS-dependent `-ent`, h-aspiré, morphology and lexical coverage remain upstream limitations.
- Independent IPA/UFPN gold corpus is not available; no accuracy benchmark is claimed.
- `õ` and other upstream notation conventions need independent review.

## Remaining acceptance blockers
- Enable Pages and approve PR merge; then verify public deployment URL and deployed commit.
- Independent French and Ukrainian phonetic review.
- Independently licensed gold IPA/UFPN data.
- Complete morphology/context engine and expanded edge-case fixtures.
- Browser/mobile/accessibility QA.
