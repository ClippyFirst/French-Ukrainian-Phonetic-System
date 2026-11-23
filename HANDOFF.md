# Handoff — French–Ukrainian phonetic web service

## Repository state (verified 2026-11-23)
- Default branch: `main`; merged implementation commit: `313fc0dfef85afaf413dfc4f91d93019f578ed7d`.
- Starting `main` SHA before this implementation: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Feature branch `feat/french-ipa-ufpn-engine` was merged through PR #1 (69 commits, 84 files) using squash merge; PR is closed/merged.
- PR head merged: `276c0375b3843ff1aa9c85d54d052dd0ddf1089b`.
- This handoff refresh is a follow-up documentation commit on `main`.
- Git clone from this environment failed because DNS could not resolve github.com; repository reads/writes and CI verification used GitHub-hosted services.

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
- Repository-wide AGPL-3.0 and upstream attribution/network-source notices are included; AGPL-3.0 was explicitly approved by the owner on 2026-11-23.

## UFPN
- 37 segmental mappings, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- Three output levels; extended Cyrillic inventory includes `ў` for /w/ and `э` for /ɛ/; `ы` and `ё` remain deliberately unassigned.
- UFPN is a project notation, not an independently approved phonetic standard.

## Verification and deployment
- Feature-branch Actions run [45179583235](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45179583235): build, 46/46 tests and syntax checks passed.
- Main push Actions run [45192430970](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192430970): test job passed (`npm run build`, `npm test`, `npm run check`); deployment failed during GitHub artifact lookup.
- First deploy attempt reported zero `github-pages` artifacts despite successful upload. Retrying only the failed deploy job re-uploaded a second artifact with the same name; deploy then correctly rejected two matching artifacts. This is a workflow-run artifact/retry issue, not a build or application test failure.
- GitHub Pages is enabled (`has_pages=true`); workflow deploys only from `main`. A clean new workflow run is required; do not rerun only the deploy job after a failed upload/deploy attempt.
- No live Pages URL or deployed commit is verified yet. The documentation refresh commit triggers a fresh `main` workflow; verify its deploy job and then inspect the published URL.
- Node CI output: 46 passed, 0 failed. Node deprecation notices from transitive/action dependencies remain non-blocking.
- A fresh local clone and manual Chromium/Firefox/WebKit/mobile/accessibility QA could not be run in this environment.

## Remaining acceptance gates
1. **Public hosting — PARTIAL:** Pages is enabled and workflow configured; clean main-branch deploy plus HTTP/content verification remain.
2. **Browser QA — TODO:** Chromium, Firefox, WebKit, mobile viewport, keyboard and screen-reader checks.
3. **Expert review — BLOCKED:** independent French phonologist and Ukrainian phonetician review IPA conventions and UFPN mappings.
4. **Gold benchmark — BLOCKED:** independently curated/licensed IPA and UFPN references; do not report accuracy scores without them.
5. **Linguistic coverage — PARTIAL:** POS-dependent `-ent`, h-aspiré, morphology, lexical exceptions, liaison/schwa/enchaînement and regional G2P remain incomplete.
6. **IPA conventions — PARTIAL:** resolve `õ` and any other upstream notation only with independent phonetic evidence.

## Readiness
**Partial research prototype with a functioning static browser app and passing hosted build/test/check. Not yet verified as publicly deployed, not release-ready, and not independently validated for arbitrary French text.**
