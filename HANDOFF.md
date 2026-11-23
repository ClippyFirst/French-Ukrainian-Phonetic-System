# Handoff — French–Ukrainian phonetic web service

## Repository state
- Default branch: `main`, starting SHA `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch: `feat/french-ipa-ufpn-engine`.
- Draft PR #1: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/1 (not merged).
- No other branches were present at the latest inspection.
- The current branch head must be read from GitHub after this handoff commit.
- Git clone was previously blocked by DNS; GitHub connector remote operations and hosted CI were used.

## Web service
The repository already contains a static browser app, not merely a library:
- `index.html`, `styles.css`, `src/app.js`;
- engine path: browser ESM bundle of vendored OpenIPA → IPA → UFPN / Latin guide;
- French text input and examples, profile selector, synchronized IPA/UFPN/Latin output;
- Basic / Detailed / Extended UFPN levels;
- word-level rule explanations, uncertainty warnings, searchable UFPN inventory;
- copy, TXT export and browser print-to-PDF;
- responsive styles.

A full capability and hosting guide was added at `docs/WEB-SERVICE.md`; README now links it.

## Deployment finding
- Repository API reports `has_pages=false`.
- CI run `45177924718`, commit `0acb2e83a4b5ca9f1530d57a8f6c53ecd9cda310`: build passed, 46/46 tests passed, `npm run check` passed.
- A feature-branch deployment probe reached `actions/configure-pages@v5` and failed with HTTP 404: no Pages site exists/configured. Upload and deploy were skipped.
- The workflow was restored to its safe policy: build/test/check on feature branch and PR; deploy only from `main`. No repository Pages setting was changed.
- Owner action required: GitHub repository Settings → Pages → Build and deployment → **GitHub Actions**. After enabling, merge PR #1 or run workflow on main and confirm the `github-pages` environment URL. Until then, no public website URL is verified.
- Do not claim hosted service is live yet.

## Latest engine architecture
- Vendored original OpenIPA French parser from revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504`.
- Every French word goes through original OpenIPA full-text parser; project seed lexicon, hand-written liaison postprocessing and manual lyric-final-schwa injection were removed.
- `lyric-diction-fr` enables OpenIPA text-level liaison/elision hooks; `metropolitan-fr` uses base parser without automatic cross-word liaison.
- IPA is the only input to the UFPN adapter. Unsupported IPA remains visible.
- Only explicit notation normalization currently made: OpenIPA Greek epsilon `ε` → standard IPA `ɛ`. `õ` remains visible pending expert review.
- AGPL-3.0 adopted with owner approval; see LICENSE and THIRD_PARTY_NOTICES.md.

## Verification
- Latest implementation CI before web-service docs: run `45176571302` passed build, 46/46 tests and syntax checks on `c84e7274baf4c5bb4d5a31931f073da6bd69ee2c`.
- Latest CI after workflow deployment probe: run `45177924718`; build passed, 46/46 tests passed, syntax check passed; deploy failed only at Pages configuration because Pages is disabled.
- No local test/browser run was possible in the connector-only environment. Browser QA remains outstanding.

## Preserved implementation
- 37 segmental mappings, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- Three UFPN levels; extended Cyrillic inventory including `ў` for /w/ and `э` for /ɛ/; `ы` and `ё` remain unassigned.
- Parser trace, provenance, NFC normalization, tests, documentation and PR #1 retained.

## Remaining tasks and acceptance criteria
1. **Enable Pages (BLOCKED by owner setting):** Settings → Pages → GitHub Actions; then successful deployment job and verified environment URL.
2. **Browser QA (TODO):** smoke test and responsive/keyboard/accessibility checks in Chromium, Firefox and WebKit.
3. **Expert phonetic review (BLOCKED):** independent French phonologist and Ukrainian phonetician approve IPA conventions, UFPN mappings and edge cases.
4. **Gold benchmark (BLOCKED):** independently curated/licensed French IPA and UFPN references with provenance; report error metrics only after review.
5. **Linguistic coverage (PARTIAL):** POS/morphology, h-aspiré, lexical exception coverage, full liaison/schwa/enchaînement and regional G2P need source-backed expansion.
6. **IPA notation reconciliation (PARTIAL):** review `õ` and other upstream conventions; no speculative mappings.

## Readiness
Partial research prototype with a functioning static browser app in the branch and passing hosted CI. Not release-ready, not yet publicly hosted, and not independently validated for arbitrary French text.
