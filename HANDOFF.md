# Handoff — French–Ukrainian phonetic web service

## Repository state
- Default branch `main`: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch: `feat/french-ipa-ufpn-engine`.
- Latest inspected head before this handoff refresh: `9693885934e3ab56c659f479376cdefd8ee2b9dd`; 64 commits ahead and 0 behind main.
- Draft PR #1: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/1 (open, not merged).
- Git clone/local browser QA were not available in this connector-only environment; remote GitHub reads/writes and hosted CI were used.

## Web service
- Static browser app: `index.html`, `styles.css`, `src/app.js`.
- French text input/examples, OpenIPA profile selector, synchronized IPA/UFPN/Latin outputs.
- Basic / Detailed / Extended UFPN, word-level rule explanations, uncertainty indicators, searchable UFPN reference.
- Copy, TXT export, browser print-to-PDF, responsive styling.
- No app backend: user-entered text is processed in the browser.
- Capability and deployment guide: `docs/WEB-SERVICE.md`.

## Deployment finding
- Repository metadata reports `has_pages=false`.
- Workflow runs build/test/check on branch and PR; deploy is restricted to `main`.
- Pages probe run `45177924718` passed build, 46/46 tests and syntax check, then failed at `actions/configure-pages@v5` with HTTP 404 because Pages is not configured. This confirms a hosting configuration blocker, not an application build failure.
- Latest head CI: push `45178377533` and PR `45178389166`; both test jobs passed build, 46/46 tests and syntax checks; deploy skipped on feature/PR refs.
- Owner action required: Settings → Pages → Build and deployment → **GitHub Actions**. After enabling, approve/merge PR #1 and verify the `github-pages` environment URL and deployed commit. No settings or merge were changed.
- No Vercel project is Git-linked to this repo; no second hosting platform was created.

## OpenIPA parser integration
- Original OpenIPA French parser vendored from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504`.
- Browser ESM bundle built from upstream TypeScript with pinned esbuild 0.25.0.
- All French words go through original OpenIPA full-text parser; project seed IPA overrides, manual liaison postprocessing and manual lyric-final-schwa injection were removed.
- `lyric-diction-fr` invokes upstream text-level liaison/elision hooks; `metropolitan-fr` uses base parser without automatic cross-word liaison/elision.
- Parser explanations, source IPA and word-local source spans preserved. Greek epsilon `ε` normalizes to IPA `ɛ`; `õ` remains visible pending review.
- AGPL-3.0 adopted with owner approval; see LICENSE and THIRD_PARTY_NOTICES.md.

## UFPN implementation
- 37 segmental mappings, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- Three UFPN levels; IPA is the only adapter input; unsupported IPA remains visible.
- Extended Cyrillic inventory includes `ў` for /w/ and `э` for /ɛ/; `ы` and `ё` remain unassigned.

## Remaining blockers
1. **Public hosting:** enable GitHub Pages and approve PR #1; acceptance is successful main deploy plus verified URL/commit.
2. **Browser QA:** Chromium, Firefox, WebKit, mobile, keyboard and screen-reader checks.
3. **Expert review:** independent French phonologist and Ukrainian phonetician validate IPA conventions and UFPN mappings.
4. **Gold benchmark:** licensed, independently curated IPA/UFPN references with provenance; no accuracy score before review.
5. **Linguistic coverage:** POS-dependent `-ent`, h-aspiré, morphology, lexical exception coverage, liaison/schwa/enchaînement remain incomplete.
6. **IPA conventions:** review `õ` and other upstream conventions; do not invent mappings.

## Readiness
**Partial research prototype with an implemented static browser service and green hosted CI. Not publicly deployed, not release-ready, and not independently validated for arbitrary French text.**
