# Audit Register — Phase 2

## Verified repository state
- Main SHA: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch: `feat/french-ipa-ufpn-engine`; PR #1 remains open/draft and targets main.
- Latest code change in this continuation: CI/deployment workflow adjusted, then reverted to safe Pages-on-main-only policy after confirming Pages is not configured. Documentation commits record the current state.
- CI run `45177924718` on commit `0acb2e83a4b5ca9f1530d57a8f6c53ecd9cda310`: build passed; 46/46 tests passed; syntax check passed. Pages deploy failed at `actions/configure-pages@v5` with `Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions` (HTTP 404). The repository API currently reports `has_pages=false`.
- The failed Pages attempt was a controlled deployment probe from the feature branch. The workflow was restored to deploy only from `main`; no Pages settings were changed. The feature branch still runs CI on push and PR.
- Latest branch head should be read from GitHub after this audit update; latest documentation changes follow commit `0acb2e83a4b5ca9f1530d57a8f6c53ecd9cda310`.
- Local clone/test attempt remains blocked by DNS resolution for github.com; hosted CI is the verification evidence.

## Verified implementation inventory (current branch candidate)
- 37 segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- UFPN levels Basic/Detailed/Extended; IPA remains canonical input.
- Québec /t,d/ affrication and diphthongization are profile-specific; cross-word nasal place and fricative voicing assimilation are Extended/audio-gated.

## Extended Cyrillic inventory update
- `ў` adopted for /w/; /v/ remains `в`, /ɥ/ remains `й̊`, /j/ remains `й`. Cambridge JIPA describes Belarusian [w] after vowels in coda position and notes differing phonological analyses.
- `э` adopted for /ɛ/ and /ɛ̃/ on the basis of its established [ɛ]-type value in Russian/Belarusian orthography.
- `ы` is not assigned to /ə/ because [ɨ] is a different vowel quality; `ё` is not assigned to /ø, œ/ because its ordinary value is iotated/contextual.
- Machine-readable decisions and sources are in `data/ufpn-mapping.json` → `graphemeInventory`; S31 records the Belarusian orthographic form and S33 its phonetic [w] realization.

## OpenIPA French parser integration
- Vendored the original OpenIPA French parser, all per-letter parsers, exception/rule dictionaries and minimal supporting constants/helpers from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504` under `vendor/openipa/`.
- The original TypeScript source is bundled for browser use by `scripts/build-openipa.mjs` and pinned esbuild 0.25.0.
- `src/french-g2p.js` calls the original parser and preserves its per-grapheme rule descriptions, source spans and source IPA. It normalizes only the upstream Greek epsilon notation `ε` to standard IPA `ɛ`; `õ` is deliberately not guessed.
- The former project seed lexicon and hand-written liaison/final-schwa overrides have been removed from the runtime path. Every French word now comes from OpenIPA's full-text parser.
- Added upstream fixture regression tests and adapter provenance tests. They test integration, not independent pronunciation accuracy.
- AGPL-3.0 is now the repository license; source attribution and network-use requirements are in `THIRD_PARTY_NOTICES.md`.
- Latest relevant hosted CI run `45177924718` passed build, 46/46 tests and syntax checks. No local test was run in this connector-only environment.

## Web application audit (2026-11-23)
- Confirmed the repository already contains a static browser app: `index.html`, `styles.css`, `src/app.js`, `src/engine.js`, `src/french-g2p.js`, `src/ufpn.js`.
- User-visible capabilities include French text input/examples, OpenIPA profile selection, IPA/UFPN/Latin outputs, Basic/Detailed/Extended modes, word-level trace explanations, uncertainty markers, searchable UFPN reference, copy, TXT export and browser print-to-PDF.
- Added `docs/WEB-SERVICE.md` and surfaced the app and deployment instructions in README. This documents an existing app; it does not claim browser QA or public hosting.
- Repository API reports `has_pages=false`. Deployment probe `45177924718`: build/test/check all passed; Pages configuration returned 404; artifact upload and deploy were skipped.
- Workflow reverted to deploy only from `main`, avoiding a permanently failing deploy job on every feature-branch push. No external Pages setting was changed.
- Required external action: repository owner enables Settings → Pages → Build and deployment → GitHub Actions. Then PR #1 can be merged or workflow run on main; verify the resulting environment URL.
- Browser/mobile/accessibility QA remains TODO; run in Chromium, Firefox and WebKit after a public preview exists.

## Main linguistic risks
- UFPN is a project notation, not an established standard.
- /œ̃/ and /ɑ/ contrasts vary by speaker/region.
- /ʁ/, /ɲ/, mid vowels, schwa and liaison are variable.
- Extended narrow phonetic marks require observed IPA/audio; they cannot be inferred from spelling.

## Remaining acceptance blockers
- expert IPA and Ukrainian phonetic review;
- independently licensed gold data;
- complete morphology/context engine;
- browser/mobile/accessibility QA;
- enable GitHub Pages in repository settings and verify a successful deployment.
