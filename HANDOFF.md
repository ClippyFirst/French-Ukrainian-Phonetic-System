# Handoff — 2026-11-23

## Branch and commits
- Branch: `feat/french-ipa-ufpn-engine`, based on `main`.
- Starting SHA: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Main implementation commit: `1dba48d49007777d06310e4441d5aa019064058c`.
- PR-check workflow follow-up: `cdf4c09b726035fc8fb308b248bdae5532779575`.
- Execution matrix update: `ad87c97093b5a5bc36c11b769d225b34d317312a`; browser/CI blocker update follows in branch history.
- Draft PR: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/1

## Implemented
Static web app; IPA-first pipeline; experimental UFPN mapping; non-standard Latin guide; provisional seed lexicon; low-confidence fallback; narrow liaison/elision; word-level provenance/explanations; copy/TXT/print-to-PDF; Node tests; GitHub Pages workflow; research, source, audit and handoff docs.

## Verification
- `npm test` — PASS, 11/11.
- `npm run check` — PASS, syntax checks for engine/app.
- Static HTML/JS ID references — PASS, no missing literal IDs.
- GitHub compare — branch is ahead of main, with no divergence; PR #1 is open, draft, and mergeable.
- `fetch_commit_workflow_runs` — no run returned for the final head; CI status is therefore NOT VERIFIED.
- Chromium headless attempt — BLOCKED: command timed out after 20 seconds; no DOM/browser result produced.
- Browser/mobile/accessibility, live Pages deploy, expert phonology review and linguistic benchmark — NOT RUN.
- `git clone` — BLOCKED by DNS/network; GitHub connector APIs used for remote inspection and writes.

## Remaining blockers
1. Independent IPA review by a French phonologist.
2. UFPN review by a Ukrainian phonetician and usability testing.
3. Licensed, source-backed gold corpus.
4. Full POS/context engine, liaison, schwa, numbers, names and abbreviations.
5. Browser/mobile/accessibility QA and live Pages validation.
6. Repository license selection by the owner.

## Readiness
**Partial prototype / research scaffold.** Not release-ready and not an authoritative arbitrary-text pronunciation service.
