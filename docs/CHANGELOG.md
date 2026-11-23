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
