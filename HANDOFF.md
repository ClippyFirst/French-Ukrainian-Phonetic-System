# Handoff — French–Ukrainian phonetic web service

## Repository state (verified 2026-11-23)
- Default branch `main`: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Working branch: `feat/french-ipa-ufpn-engine`.
- Current head before this handoff update: `eb92e2ecddded35a823725400539732ed0789d70`.
- PR #1: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/1 — open, Draft, targets `main`, not merged.
- Branch comparison: 65 commits ahead, 0 behind `main`.
- Git clone from this environment failed because DNS could not resolve github.com; repository reads and writes were performed through the GitHub connector.

## Web service
- Static browser app: `index.html`, `styles.css`, `src/app.js`.
- French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin guide.
- Basic / Detailed / Extended UFPN, word-level parser explanations, uncertainty markers, searchable UFPN reference.
- Copy, TXT export, browser print-to-PDF, responsive layout.
- No application backend; entered text is processed in the browser.
- Setup and hosting instructions: `docs/WEB-SERVICE.md`.

## OpenIPA integration
- Original OpenIPA French parser vendored from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504`.
- Browser ESM bundle built from vendored TypeScript using pinned esbuild 0.25.0.
- French G2P is routed through the upstream full-text parser; rule descriptions, source IPA and source spans are preserved.
- IPA is the only input to the UFPN adapter. Unsupported IPA remains visible.
- Explicit normalization: Greek epsilon `ε` → IPA `ɛ`; upstream `õ` remains unresolved and visible rather than guessed.
- `lyric-diction-fr` uses upstream text-level liaison/elision hooks; `metropolitan-fr` uses the base parser.
- AGPL-3.0 and upstream attribution/network-source notices are included.

## UFPN
- 37 segmental mappings, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- Three output levels; extended Cyrillic inventory includes `ў` for /w/ and `э` for /ɛ/; `ы` and `ё` remain deliberately unassigned.
- UFPN is a project notation, not an independently approved phonetic standard.

## Current verification
- GitHub Actions run [45178726418](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45178726418) for head `eb92e2ecddded35a823725400539732ed0789d70`: completed successfully.
- Job steps confirm `npm run build`, `npm test`, and `npm run check` all succeeded; Node test output: 46 passed, 0 failed.
- Deploy job was skipped as expected because this commit is on the feature branch, not `main`.
- Prior Pages probe [45177924718](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45177924718): build, tests and syntax check passed; `actions/configure-pages@v5` failed with HTTP 404 because Pages is not enabled/configured.
- A fresh local clone/test and real browser QA could not be run in this environment.

## GitHub Pages deployment blocker
- The Pages workflow `.github/workflows/pages.yml` already runs build/test/check on feature pushes and PRs, and deploys only from `main`.
- Repository Pages is not enabled (`has_pages=false` in the latest recorded API inspection); no public URL or deployed commit is verified.
- The available GitHub integration does not expose an operation to enable the repository Pages setting. Required owner action: Settings → Pages → Build and deployment → **GitHub Actions**.
- PR #1 remains Draft and unmerged. Review/merge it after Pages is enabled; then verify a successful `github-pages` deployment and its environment URL. No merge or repository setting was changed in this run.

## Remaining acceptance gates
1. **Public hosting — BLOCKED:** enable Pages, review/merge PR #1, and verify live URL plus deployed SHA.
2. **Browser QA — TODO:** Chromium, Firefox, WebKit, mobile viewport, keyboard and screen-reader checks.
3. **Expert review — BLOCKED:** independent French phonologist and Ukrainian phonetician review IPA conventions and UFPN mappings.
4. **Gold benchmark — BLOCKED:** independently curated/licensed IPA and UFPN references; do not report accuracy scores without them.
5. **Linguistic coverage — PARTIAL:** POS-dependent `-ent`, h-aspiré, morphology, lexical exceptions, liaison/schwa/enchaînement and regional G2P remain incomplete.
6. **IPA conventions — PARTIAL:** resolve `õ` and any other upstream notation only with independent phonetic evidence.

## Readiness
**Partial research prototype with a functioning static browser app and passing hosted build/test/check. Not publicly deployed, not release-ready, and not independently validated for arbitrary French text.**
