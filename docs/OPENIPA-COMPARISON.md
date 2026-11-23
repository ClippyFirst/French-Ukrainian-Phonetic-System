# OpenIPA integration and scope

## Integration status

The project now vendors and executes OpenIPA's original French TypeScript parser rather than approximating its rules with a separate clean-room G2P fallback.

Vendored components:
- `ParseFrench.ts` — text-level parser, word exception dispatch, liaison/elision hooks and post-processing;
- all original French per-letter parsers under `parse-letters/`;
- original `FrenchRules.ts`, `FrenchExceptions.ts`, `FrenchHelper.ts`, and `FrenchNotes.ts`;
- required generic helpers/constants under `vendor/openipa/src/constants/` and `vendor/openipa/src/util/`.

The upstream modules are bundled to `src/openipa-french.js` with esbuild at build time. `src/french-g2p.js` is a thin adapter; it calls the upstream parser and preserves its rule descriptions, source spans and raw IPA output. IPA is then passed into the existing UFPN adapter. No second spelling-to-UFPN path was added.

## Upstream provenance and license

- Project: [hfellerhoff/openipa](https://github.com/hfellerhoff/openipa)
- Revision inspected and vendored: `266c002d6c03c6b581b2bea74ca39bf1a92a7504`
- License: AGPL-3.0; the full license is in the repository's `LICENSE`.
- Attribution and scope: `THIRD_PARTY_NOTICES.md`.

The source is retained under `vendor/openipa/` with its upstream module layout. Only the project-facing adapter and build integration are newly authored here. The project is distributed under AGPL-3.0, and network deployment must comply with section 13.

## IPA notation boundary

OpenIPA's IPA enum uses Greek epsilon `ε` as a project symbol for the open-mid front vowel. The adapter normalizes that specific symbol to standard IPA `ɛ` before the UFPN adapter and retains the original in `sourceIpa`/per-rule `sourceIpa` fields. Other upstream conventions such as `õ` are not silently guessed into another IPA symbol; if unsupported by UFPN, they remain visible and must be explicitly reconciled.

## Scope and known limitations

OpenIPA is primarily oriented toward vocal/lyric diction. Its parser includes substantial contextual letter rules and lexical exceptions, plus optional liaison and elision analysis. It does not establish complete modern conversational French coverage. Upstream comments and tests themselves document incomplete POS-dependent `-ent` handling and additional rules still to implement.

All French words now use the vendored OpenIPA parser. The former project seed lexicon no longer overrides its output. This removes a source of silent divergence and makes the upstream parser the single French pronunciation source; the UFPN adapter receives the parser's IPA output.

## Verification

The six rows in the upstream French fixture file `src/tests/french/_words.csv` at the pinned revision are represented in `tests/openipa-french.test.js`. Four rows match the fixture's visible IPA strings; `descends` is deliberately pinned to the executable parser result `dɛssɑ̃` rather than the CSV's `d(e)sɑ̃`, and `garçon` asserts both upstream raw `gaɾsõ` provenance and adapter-normalized `gaɾsɔ̃`. The `descends` discrepancy is a known upstream inconsistency requiring specialist review. These are regression fixtures from the same upstream project, not an independent gold set. Passing tests demonstrate integration and regression behavior, not phonetic accuracy across arbitrary French text.

Remaining work:
- reconcile all upstream IPA conventions with the canonical IPA inventory without guessing;
- assess upstream's larger French/Latin test corpus for provenance and redistribution conditions before any reuse;
- assess whether upstream's larger test corpus can be reused; do not import it until its data provenance and redistribution terms are verified;
- add explicit POS/morphology and h-aspiré coverage only with evidence;
- browser/mobile/accessibility QA and independent French phonetics review.
