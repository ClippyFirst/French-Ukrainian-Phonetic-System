# Handoff — UFPN Phase 2 / Extended Cyrillic update

## Repository
- Default branch: main.
- Working branch: feat/french-ipa-ufpn-engine (continued; contains previous phase and Draft PR #1).
- Phase 2 base SHA: 7cdbcbbc54918d94195c1d5d058a04acb23f9ee0.
- Draft PR: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/1
- Final implementation commit (CI-verified): 2e21c8fe78075d41109676fbd79d21a7276d1dd4.
- Current branch compare at implementation head: 12 commits ahead, 0 behind main.
- Git clone blocked by DNS; GitHub connector used for remote reads/writes.

## Latest continuation: extended Cyrillic inventory
- Adopted Belarusian `ў` for IPA /w/, preserving /v/ → `в`, /ɥ/ → `й̊`, /j/ → `й`.
- Adopted Russian/Belarusian `э` for /ɛ/ and `э̃` for /ɛ̃/.
- Added machine-readable `graphemeInventory` with provenance and candidate decisions. `ы` is not mapped to schwa ([ɨ] is not /ə/); `ё` is not mapped to /ø, œ/ (its ordinary value is iotated/contextual).
- Updated adapter mapping, UI reference, tests and notation/source documentation.

## Implemented in this phase
- Data-driven UFPN specification with 37 phonemic/segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 phonetic feature dimensions, 19 allophone phenomena, 13 context processes and 7 profile records.
- Basic, Detailed and Extended output levels.
- Dedicated IPA-only adapter; unsupported IPA remains visible.
- Unicode NFC/NFD tests.
- Allophone, context-process, prosody and regional-profile registers; Québec /t,d/ affrication and diphthongization are evidence-backed research entries, not default metropolitan rules.
- UI selector for UFPN level, searchable segment/allophone mapping reference and 18-feature inventory panel.

## Previous verification
- Previous head 7cdbcbbc54918d94195c1d5d058a04acb23f9ee0: GitHub Actions run 45149960488 completed successfully; test and syntax-check jobs succeeded; Pages deploy skipped because this was a PR branch.
- Final implementation SHA 2e21c8fe78075d41109676fbd79d21a7276d1dd4 passed GitHub Actions run 45154509214: npm test (31 tests: 12 engine + 19 UFPN) and npm run check succeeded.
- Deploy job was skipped because this is a PR branch; GitHub Pages settings/public deployment were not verified.
- No browser/mobile/accessibility QA or independent phonetic review has been run.

## Linguistic findings
- /ɛ̃–œ̃/ merger is widespread in contemporary northern/Parisian French but not universal.
- /a–ɑ/ contrast is neutralized for many speakers but retained in some varieties/speakers.
- Mid-vowel height varies with syllable structure, duration and speaker.
- Schwa deletion and reduction are distinct; epenthetic schwa is a separate phenomenon.
- Liaison is lexically and syntactically constrained with a large variable periphery.
- /ʁ/ and some /ɲ/ realizations vary; regional profiles must not be conflated.
- Extended prosody markers require audio/annotation; text punctuation is insufficient.

## Remaining blockers
1. Independent review by French phonologist and Ukrainian phonetician.
2. Licensed, independently verified gold IPA/UFPN corpus (currently 0).
3. Full morphology/POS/syntax, lexical candidates, complete liaison/schwa/enchaînement engine.
4. Browser/mobile/accessibility testing in Chromium, Firefox and WebKit.
5. Speaker-balanced regional data for Québec/Belgium/Switzerland/Southern France.
6. Owner's repository license decision.

## Readiness
Partial research prototype. UFPN specification and adapter can be iterated, but arbitrary French text is not yet reliably transcribed and no scientific accuracy score is claimed.
