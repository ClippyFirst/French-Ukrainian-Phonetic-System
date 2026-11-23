# Audit Register — Phase 2

## Verified repository state
- Latest CI-verified code head: `3d0d756ec031ff80148436c3484d080705074ec2` on `feat/french-ipa-ufpn-engine`; branch was 52 commits ahead and 0 behind `main` at this code commit.
- GitHub Actions run `45175694114` on code head `3d0d756ec031ff80148436c3484d080705074ec2` passed `npm run build`, `npm test` (46/46: 14 engine + 23 UFPN + 4 French G2P adapter + 5 OpenIPA integration) and `npm run check`. Pages deploy skipped because this is not `main`.
- CI concurrency was corrected: push and PR runs now use distinct concurrency groups so they no longer cancel each other. Earlier failed runs exposed and helped fix source escaping, final consonant ordering, nasal cancellation, and lexical exceptions.
- Local clone/test attempt failed before checkout: `Could not resolve host: github.com`; hosted CI is the verification evidence.
- main SHA: b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed.
- Phase 2 starting working head: 7cdbcbbc54918d94195c1d5d058a04acb23f9ee0.
- Earlier CI-verified code head: 594cb0be465a6dff6fc5427f9873f4c1b3e0c0f8 (44 tests + syntax check; run 45168613204). Latest verification is recorded above.
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

## OpenIPA French parser integration
- Vendored the original OpenIPA French parser, all per-letter parsers, exception/rule dictionaries and minimal supporting constants/helpers from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504` under `vendor/openipa/`.
- The original TypeScript source is bundled for browser use by `scripts/build-openipa.mjs` and pinned esbuild 0.25.0.
- `src/french-g2p.js` now calls the original parser and preserves its per-grapheme rule descriptions, source spans and source IPA. It normalizes only the upstream Greek epsilon notation `ε` to standard IPA `ɛ`; `õ` is deliberately not guessed.
- The former project seed lexicon and hand-written liaison/final-schwa overrides have been removed from the runtime path. Every French word now comes from OpenIPA's full-text parser.
- Added upstream fixture regression tests and adapter provenance tests. They test integration, not independent pronunciation accuracy.
- AGPL-3.0 is now the repository license; source attribution and network-use requirements are in `THIRD_PARTY_NOTICES.md`.
- Latest hosted CI run `45175694114` passed build, 46/46 tests and syntax checks after removing project IPA overrides. No local test was run in this connector-only environment.

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
- Pages deployment and browser/mobile/accessibility QA.

- Latest trace-span correction localizes OpenIPA source spans to each output word; regression assertions verify the spans remain within the word. The latest change removes project seed overrides and passed CI run 45175694114 (46/46).
