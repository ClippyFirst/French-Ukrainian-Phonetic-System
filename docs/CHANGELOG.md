# Changelog

## 0.2.0 — UFPN Phase 2 (2026-11-23)
- Added machine-readable UFPN inventory and diacritic/allophone/process/profile registries.
- Added Basic, Detailed and Extended IPA-to-UFPN adapter.
- Unknown IPA symbols are preserved and reported.
- Added Unicode NFC canonicalization, allophone mappings, regional affrication and assimilation cases, and adapter tests.
- Added a working UI selector for UFPN detail level.
- Expanded feature-dimension coverage, Québec affrication/diphthongization and cross-word assimilation research; expert review and linguistic gold benchmark remain pending.

## 0.1.0 — 2026-11-23
- Initial IPA-first static workbench, provisional lexicon, heuristic fallback and experimental UFPN.

- Added 12 optional IPA modifiers for aspiration/release, syllabicity, voice quality, rounding and secondary articulation; added feature dimensions for gemination, fluency and speech rate.


## 0.3.0 — Extended Cyrillic UFPN inventory
- Adopted Belarusian `ў` for /w/ and Russian/Belarusian `э` for /ɛ/; nasal counterpart /ɛ̃/ is `э̃`.
- Preserved /v/ → `в`, /ɥ/ → `й̊`, /j/ → `й`.
- Added machine-readable adopted/candidate grapheme register; explicitly rejected arbitrary assignments of `ы` to /ə/ and `ё` to /ø, œ/.

- Verified cross-registry Cyrillic inventory integrity (unique adopted graphemes, IPA/base-grapheme consistency and candidate provenance); GitHub Actions run 45161676953 passed 35 tests and syntax checks.


## 0.4.0 — Context-sensitive French G2P (work in progress)
- Replaced the generic longest-match spelling fallback with a clean-room context-sensitive French grapheme pass for common digraphs, vowel groups, nasal spellings, glides (including `ou`→/w/ and vowel+`il`→/j/), contextual consonants, suffixes and silent endings.
- Added source-span rule traces with rule identifiers and Ukrainian explanations to word details.
- Added a dedicated lyric-diction profile with final-schwa handling to align the supported use case with OpenIPA; the default spoken-French profile remains separate.
- Added focused French G2P tests and OpenIPA scope/reuse comparison.
- This remains a low-confidence fallback; GitHub Actions run 45168613204 passed all 44 tests and syntax checks. Independent pronunciation evaluation remains pending.


## 0.5.0 — Direct OpenIPA integration (2026-11-23)
- Vendored OpenIPA's original French parser, per-letter parsers, contextual functions, exceptions and supporting constants under AGPL-3.0.
- Added the repository AGPL-3.0 license, third-party attribution and AGPL section 13 network-source notice.
- Added pinned esbuild bundling for the browser and integrated the upstream text-level liaison/elision options into the lyric-diction profile.
- Preserved original rule descriptions, source spans and raw upstream IPA; normalized only Greek epsilon `ε` to standard IPA `ɛ`.
- Added upstream fixture regressions, source trace tests, full-text liaison/elision integration tests and a documented discrepancy in the upstream `descends` fixture.
- Hosted CI run 45172865213 passed build, all 44 tests and syntax checks for the initial direct parser integration. Text-level liaison/elision expansion is being revalidated on the latest commit.


## 0.5.1 — OpenIPA single-source alignment (2026-11-23)
- Removed the project's unverified French IPA seed lexicon from the runtime path.
- Removed hand-written liaison postprocessing and lyric-profile final-schwa injection; all French word output now comes from the vendored OpenIPA parser, including its text-level liaison/elision options.
- Kept the IPA → UFPN boundary unchanged; unsupported IPA remains visible rather than silently substituted.
- Replaced tests that asserted project overrides with delegation/parity checks against the upstream parser.
- CI run 45175694114 passed browser bundle build, 46/46 tests and syntax checks.
