# Handoff — French–Ukrainian phonetic web service

## Repository state (verified 2026-11-23)
- Default branch: `main`; core implementation merge: `313fc0dfef85afaf413dfc4f91d93019f578ed7d`; typography fix PR #2 merge: `360ef54a08af2ff7146d2a4052c326fec6968173`.
- Starting `main` SHA before this implementation: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Feature branch `feat/french-ipa-ufpn-engine` was merged through PR #1 (69 commits, 84 files) using squash merge; PR is closed/merged.
- PR head merged: `276c0375b3843ff1aa9c85d54d052dd0ddf1089b`.
- This handoff refresh is a follow-up documentation commit on `main`.
- Git clone from this environment failed because DNS could not resolve github.com; repository reads/writes and CI verification used GitHub-hosted services.

## Web service
- Static browser app: `index.html`, `styles.css`, `src/app.js`.
- French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin guide.
- Basic / Detailed / Extended UFPN, word-level parser explanations, uncertainty markers, searchable UFPN reference.
- UFPN base glyphs use Charis SIL. A follow-up display layer now decomposes combining sequences into base letters and spacing modifier glyphs explicitly positioned above/below them, avoiding dependence on font mark anchors. Canonical adapter strings and clipboard/export Unicode remain unchanged. Browser visual verification remains pending.
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
- Typography PR #2 was merged after PR CI [45195492754](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195492754) passed build, 46 tests and syntax checks.
- Main push run [45192430970](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192430970): tests passed; its deploy attempt failed because of artifact metadata lookup. Retrying only that job created duplicate same-name artifacts.
- Clean main run [45192891355](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192891355) completed successfully, including `deploy-pages@v4`. GitHub Actions emitted the environment URL: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Deployment commit: `422430fe142e8f15e55d8ef2bd1876853b2e209e`.
- GitHub Pages is enabled (`has_pages=true`); workflow deploys only from `main`. The public deployment action is verified, but direct HTTP/content smoke verification remains unverified: web/container access from this environment could not resolve the GitHub Pages host (DNS failure / inaccessible via web fetch).
- Node CI output: 46 passed, 0 failed. Node deprecation notices from transitive/action dependencies remain non-blocking.
- Main run [45195557498](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195557498) on `360ef54a08af2ff7146d2a4052c326fec6968173` passed build, 46 tests, syntax checks and Pages deployment.
- PR #3 CI run [45197892356](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45197892356) passed build, 46 tests and syntax checks; PR #3 merged as `01919e72d3ff1c46b5709b4a96f550db488e6498`. A production Pages deployment for this merge is not yet verified. A follow-up correction replaces Noto Sans with Charis SIL because the first visual attempt did not resolve detached Cyrillic diacritics; this correction is pending PR CI and deployment.
- A fresh local clone and manual Chromium/Firefox/WebKit/mobile/accessibility QA could not be run in this environment.

## Remaining acceptance gates
1. **Public hosting — PARTIAL:** Pages deploy succeeded and returned the public URL; direct HTTP/content verification remains because this environment could not resolve the host.
2. **Browser QA — TODO:** Chromium, Firefox, WebKit, mobile viewport, keyboard and screen-reader checks; includes visual confirmation of the new combining-mark typography.
3. **Expert review — BLOCKED:** independent French phonologist and Ukrainian phonetician review IPA conventions and UFPN mappings.
4. **Gold benchmark — BLOCKED:** independently curated/licensed IPA and UFPN references; do not report accuracy scores without them.
5. **Linguistic coverage — PARTIAL:** POS-dependent `-ent`, h-aspiré, morphology, lexical exceptions, liaison/schwa/enchaînement and regional G2P remain incomplete.
6. **IPA conventions — PARTIAL:** resolve `õ` and any other upstream notation only with independent phonetic evidence.

## Readiness
**Partial research prototype with a functioning static browser app and passing hosted build/test/check. Deployed through GitHub Pages (deployment action verified; direct HTTP smoke test pending), not release-ready, and not independently validated for arbitrary French text.**


## Owner-reported typography follow-up
- Font-only changes did not resolve detached Cyrillic marks.
- Branch `fix/deterministic-cyrillic-diacritic-layout` adds explicit visual mark placement in `src/ufpn-display.js` and `styles.css`; tests cover decomposition of stacked marks.
- PR #4 and PR #5 are merged; main run 45201504905 passed build, tests, syntax checks and Pages deployment for `214c65e527b83a565371309599fa2d47251cd6d4`. This has not yet been visually accepted by the owner. Do not call the issue resolved until the deployed page is checked.


## Diacritic spacing refinement
- Owner feedback: marks moved too high and had excessive gap to the base letter.
- Follow-up changes only CSS geometry (`styles.css`): remove top padding from each grapheme wrapper, move above marks closer, and tighten stacked-mark spacing. No mapping or Unicode sequence changes. Awaiting CI/deployment and owner visual check.
