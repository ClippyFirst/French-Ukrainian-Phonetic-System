# Audit Register — Phase 2

## Verified repository state
- Current working head: e693b15717b71f3bf30be12cd434e346b1d8d60c on `feat/french-ipa-ufpn-engine`; based on `main`; see PR #1 for live ahead/behind counts.
- Last previously verified CI: run 45162238932 on e9f1c952b31d0bb91155b6663ddee61c1778942f; 35 tests and `npm run check` passed; Pages deploy skipped on PR branch.
- Expanded G2P/trace implementation is on current head; PR workflow run 45166534429 remained pending without jobs at handoff. An earlier run on 54a878ce failed because the generated module contained escaped quote characters; this was corrected in subsequent commits.
- Local clone/test attempt failed before checkout: `Could not resolve host: github.com`; no local test result is claimed.
- main SHA: b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed.
- Phase 2 starting working head: 7cdbcbbc54918d94195c1d5d058a04acb23f9ee0.
- Current CI-verified code baseline: e9f1c952b31d0bb91155b6663ddee61c1778942f (35 tests + syntax check; run 45162238932).
- Draft PR #1 open; based on main with 0 commits behind; consult PR #1 for live ahead count.
- GitHub Actions run 45154509214 on implementation head: test job success; npm test (31 tests) and npm run check passed; deploy skipped on PR.

## Verified implementation inventory (current branch candidate)
- 37 segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- UFPN levels Basic/Detailed/Extended; IPA remains canonical input.
- Québec /t,d/ affrication and diphthongization are profile-specific; cross-word nasal place and fricative voicing assimilation are Extended/audio-gated.

## Extended Cyrillic inventory update
- `ў` adopted for /w/; /v/ remains `в`, /ɥ/ remains `й̊`, /j/ remains `й`. Cambridge JIPA describes Belarusian [w] after vowels in coda position and notes differing phonological analyses.
- `э` adopted for /ɛ/ and /ɛ̃/ on the basis of its established [ɛ]-type value in Russian/Belarusian orthography.
- `ы` is not assigned to /ə/ because [ɨ] is a different vowel quality; `ё` is not assigned to /ø, œ/ because its ordinary value is iotated/contextual.
- Machine-readable decisions and sources are in `data/ufpn-mapping.json` → `graphemeInventory`; S31 records the Belarusian orthographic form and S33 its phonetic [w] realization.

## French G2P parity work added on current branch
- Replaced the longest-match fallback with a clean-room context-sensitive grapheme pass covering common consonant groups, soft/hard c/g, intervocalic s, x, glides, oral/nasal vowel spellings, common suffixes, silent h/final letters and consonant doubling.
- Added per-grapheme source spans, IPA output, rule IDs and Ukrainian explanations to the word detail model and UI.
- Generic fallback remains low confidence. POS-sensitive `-ent`, lexical exception classes, schwa variation, liaison and regional variants remain explicitly unresolved. This is not a measured OpenIPA parity claim.
- Added `docs/OPENIPA-COMPARISON.md` describing scope and clean-room reuse boundary.

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
- Pages deployment and repository license decision.
