# French G2P engine — scope and rule contract

The generic engine now uses a deterministic, context-sensitive grapheme pass for words absent from the reviewed seed lexicon. It is a practical fallback, not a claim of complete French phonology. The implementation is clean-room code: OpenIPA is an architectural/behavioral reference, not a source of copied code or database records.

## Rule families implemented
- multi-letter consonant groups (`ch`, `gn`, `ph`, `th`, `qu`, `gu`, `ill`);
- contextual soft/hard `c` and `g`, intervocalic `s`, and common `x` values;
- common oral vowel groups, glides, and nasal-vowel spellings;
- common suffix spellings (`-tion`, `-sion`, `-er`, `-ez`);
- silent `h`, common final-consonant behavior, and consonant doubling.

## Scope alignment
The UI exposes a separate `lyric-diction-fr` profile for the upstream project's stated vocal/lyric diction use case. It realizes final mute `e` as schwa in supported patterns; the default `metropolitan-fr` profile remains spoken French. This is a scoped compatibility layer, not a complete classical singing/poetic scansion engine.

## Explicit limitations
- `-ent` is morphosyntactically ambiguous: the fallback currently emits a nasal vowel and cannot reliably distinguish verb inflection from lexical endings.
- schwa deletion, liaison, enchaînement, h-aspiré lexical classes, POS, homographs, regional variants, proper names, and loanwords require lexical/contextual data.
- final `e`, mid-vowel openness, and some nasal-vowel mergers vary by lexical item, region, register, and speaking style.
- generic fallback output remains low confidence. Add exceptions to the reviewed lexicon only with an inspectable pronunciation source.

## OpenIPA comparison
OpenIPA's public repository documents rule-driven French transcription, per-letter feedback, exceptions, and lyric-diction orientation. Its README acknowledges that exceptions are still being added and POS-dependent rules remain incomplete. This project targets comparable practical behavior, not identical output or broader linguistic coverage. OpenIPA is AGPL-3.0; this project does not copy its implementation or database.
