# Audit Register — Phase 2

## Verified repository state
- main SHA: b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed.
- Phase 2 starting working head: 7cdbcbbc54918d94195c1d5d058a04acb23f9ee0.
- CI-verified implementation head: 2e21c8fe78075d41109676fbd79d21a7276d1dd4.
- Draft PR #1 open; branch 12 commits ahead, 0 behind main.
- GitHub Actions run 45154509214 on implementation head: test job success; npm test (31 tests) and npm run check passed; deploy skipped on PR.

## Verified implementation inventory (current branch candidate)
- 37 segmental entries, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- UFPN levels Basic/Detailed/Extended; IPA remains canonical input.
- Québec /t,d/ affrication and diphthongization are profile-specific; cross-word nasal place and fricative voicing assimilation are Extended/audio-gated.

## Extended Cyrillic inventory update
- `ў` adopted for /w/; /v/ remains `в`, /ɥ/ remains `й̊`, /j/ remains `й`.
- `э` adopted for /ɛ/ and /ɛ̃/ on the basis of its established [ɛ]-type value in Russian/Belarusian orthography.
- `ы` is not assigned to /ə/ because [ɨ] is a different vowel quality; `ё` is not assigned to /ø, œ/ because its ordinary value is iotated/contextual.
- Machine-readable decisions and sources are in `data/ufpn-mapping.json` → `graphemeInventory`.

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
