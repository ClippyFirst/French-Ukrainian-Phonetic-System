# French–Ukrainian Phonetic Web Service — Continuation Plan

> **For agentic workers:** Continue inline; use TDD for behavior changes and fresh verification before completion.

**Goal:** Maintain the browser-first French → IPA → UFPN service and bring it to a verifiably published and linguistically reviewed state.

**Architecture:** Static HTML/CSS/ES modules. Vendored OpenIPA French parser is the only source G2P; IPA is the sole input to UFPN. GitHub Actions provides CI and a Pages deploy job gated to `main`.

**Tech Stack:** Node.js 20.10+, native browser ES modules, pinned esbuild 0.25.0, Node test runner, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-23-french-ukrainian-phonetics-design.md`

## Global Constraints
- Preserve French text → OpenIPA → IPA → UFPN.
- Do not reintroduce unverified IPA seed overrides or manual pronunciation postprocessing.
- Preserve upstream traces and word-local source spans.
- Keep unknown IPA visible; never guess.
- No backend or server-side user-text persistence.
- Preserve AGPL-3.0 and upstream attribution/network-source notices.
- Do not merge PRs or change repository settings without owner authorization.

## Review Focus
- Empty/whitespace-only input must remain a safe empty state.
- Apostrophes, punctuation, Unicode NFC/NFD and word boundaries must preserve source text.
- OpenIPA liaison/elision must remain profile-specific.
- Unsupported IPA must survive adaptation and remain visible.
- Feature-branch CI must not publish unreviewed code as production.

## Task Ledger

### Task 1 — OpenIPA integration
- [x] Vendor original OpenIPA French parser and required modules at pinned upstream revision.
- [x] Route all French words through upstream parser; remove project IPA overrides and manual liaison/schwa postprocessing.
- [x] Preserve source IPA, word-local spans and rule traces.
- **Evidence:** `vendor/openipa/`, `src/french-g2p.js`, `src/engine.js`; upstream revision in `THIRD_PARTY_NOTICES.md`.

### Task 2 — IPA → UFPN adapter
- [x] Keep IPA as the only adapter input.
- [x] Implement Basic / Detailed / Extended and unsupported-symbol reporting.
- [x] Add mapping/schema and adapter tests.
- [ ] Reconcile `õ` and other upstream notation only with independent phonetic evidence.
- **Evidence:** `src/ufpn.js`, `data/ufpn-mapping.json`, `tests/ufpn.test.js`.

### Task 3 — Browser service
- [x] Static interactive UI with French input, profile selector and live synchronized IPA/UFPN/Latin guide.
- [x] Word-level rule explanations, confidence/uncertainty warnings and searchable UFPN reference.
- [x] Copy, TXT export and browser print-to-PDF.
- [x] No backend; user-entered text is processed in the browser.
- [ ] Complete Chromium/Firefox/WebKit, mobile, keyboard and screen-reader QA.
- **Evidence:** `index.html`, `styles.css`, `src/app.js`, `docs/WEB-SERVICE.md`.

### Task 4 — CI and public Pages hosting
- [x] Build, test and syntax checks in GitHub Actions.
- [x] Pages artifact/deploy job configured for `main` only.
- [x] Probe confirms build/tests/check pass and Pages config fails because no Pages site is enabled.
- [ ] Owner enables Settings → Pages → Build and deployment → GitHub Actions.
- [ ] Owner reviews and merges PR #1; verify live URL and deployed commit.
- **BLOCKED:** repo reports `has_pages=false`; probe run 45177924718 got HTTP 404 from `actions/configure-pages@v5`. Settings/admin permission and merge are external owner actions.

### Task 5 — Linguistic evidence
- [ ] Independent French phonologist and Ukrainian phonetician review.
- [ ] Licensed, independently curated gold IPA/UFPN corpus and reproducible benchmark.
- [ ] Expand POS-dependent `-ent`, h-aspiré, morphology, lexical exception, liaison, schwa and enchaînement coverage.
- **BLOCKED / evidence-limited:** independent gold corpus and specialist sign-off are not available; do not invent IPA or scores.

## Verification contract
Latest branch head at this plan refresh: `9693885934e3ab56c659f479376cdefd8ee2b9dd`.
- Push run 45178377533: build, 46/46 tests and syntax checks passed; deploy skipped on feature branch.
- PR run 45178389166: build, 46/46 tests and syntax checks passed; deploy skipped on PR ref.
- Pages probe 45177924718: build, 46/46 tests and syntax checks passed; deploy failed at Pages configuration because Pages is disabled.
- Local clone/tests/browser QA were not run in this connector-only environment.

## Stop condition
All feasible implementation tasks are complete for the current static-service scope. Remaining tasks are explicitly blocked by repository owner settings/merge, browser QA capability, independent reviewers and licensed gold data. Do not call the project release-ready until those gates pass.
