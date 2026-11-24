# Handoff — French–Ukrainian phonetic web service

## Repository state (verified 2026-11-23)
- Default branch: `main`; core implementation merge: `313fc0dfef85afaf413dfc4f91d93019f578ed7d`; typography fix PR #2 merge: `360ef54a08af2ff7146d2a4052c326fec6968173`.
- Starting `main` SHA before this implementation: `b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed`.
- Feature branch `feat/french-ipa-ufpn-engine` was merged through PR #1 (69 commits, 84 files) using squash merge; PR is closed/merged.
- PR head merged: `276c0375b3843ff1aa9c85d54d052dd0ddf1089b`.
- This handoff refresh is a follow-up documentation commit on `main`.
- Git clone from this environment failed because DNS could not resolve github.com; repository reads/writes and CI verification used GitHub-hosted services.

## Web service
- Static browser app: `index.html`, `styles.css`, `src/app.js`.
- French input/examples, OpenIPA profile selection, synchronized IPA/UFPN/Latin guide.
- Basic / Detailed / Extended UFPN, word-level parser explanations, uncertainty markers, searchable UFPN reference.
- UFPN output is rendered as one NFC-normalized text run using native OpenType mark/mkmk shaping and self-hosted SIL Charis 7.000 Regular/Bold WOFF2. Font files and OFL-1.1 license are vendored. Canonical adapter strings and clipboard/export Unicode remain unchanged.
- Copy, TXT export, browser print-to-PDF, responsive layout.
- No application backend; entered text is processed in the browser.
- Setup and hosting instructions: `docs/WEB-SERVICE.md`.

## OpenIPA integration
- Original OpenIPA French parser vendored from upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504`.
- Browser ESM bundle built from vendored TypeScript using pinned esbuild 0.25.0.
- French G2P is routed through the upstream full-text parser; rule descriptions, source IPA and source spans are preserved.
- IPA is the only input to the UFPN adapter. Unsupported IPA remains visible.
- Explicit adapter normalization: OpenIPA legacy `ε` → IPA `ɛ` and `õ` → `ɔ̃`; the rhotic is profile-aware: `metropolitan-fr` maps OpenIPA's lyric-diction tap `ɾ` to broad `/ʁ/`, while `lyric-diction-fr` preserves `[ɾ]` → `р̌`. Raw upstream notation remains in `sourceIpa`/trace. This adapter correction is covered by regressions but is not independent phonetic expert validation.
- `lyric-diction-fr` uses upstream text-level liaison/elision hooks; `metropolitan-fr` uses the base parser.
- Repository-wide AGPL-3.0 and upstream attribution/network-source notices are included; AGPL-3.0 was explicitly approved by the owner on 2026-11-23.

## UFPN
- 37 segmental mappings, 15 allophone mappings, 36 diacritic/prosodic markers, 18 feature dimensions, 19 allophone phenomena, 13 contextual processes and 7 profile records.
- Three output levels; extended Cyrillic inventory includes `ў` for /w/ and `э` for /ɛ/; `ы` and `ё` remain deliberately unassigned.
- UFPN is a project notation, not an independently approved phonetic standard.

## Verification and deployment
- Feature-branch Actions run [45179583235](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45179583235): build, 46/46 tests and syntax checks passed.
- Typography PR #2 was merged after PR CI [45195492754](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195492754) passed build, 46 tests and syntax checks.
- Main push run [45192430970](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192430970): tests passed; its deploy attempt failed because of artifact metadata lookup. Retrying only that job created duplicate same-name artifacts.
- Clean main run [45192891355](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192891355) completed successfully, including `deploy-pages@v4`. GitHub Actions emitted the environment URL: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Deployment commit: `422430fe142e8f15e55d8ef2bd1876853b2e209e`.
- GitHub Pages is enabled (`has_pages=true`); workflow deploys only from `main`. The public deployment action is verified, but direct HTTP/content smoke verification remains unverified: web/container access from this environment could not resolve the GitHub Pages host (DNS failure / inaccessible via web fetch).
- Node CI output: 46 passed, 0 failed. Node deprecation notices from transitive/action dependencies remain non-blocking.
- Main run [45195557498](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195557498) on `360ef54a08af2ff7146d2a4052c326fec6968173` passed build, 46 tests, syntax checks and Pages deployment.
- PR #3 CI run [45197892356](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45197892356) passed build, 46 tests and syntax checks; PR #3 merged as `01919e72d3ff1c46b5709b4a96f550db488e6498`. A production Pages deployment for this merge is not yet verified. A follow-up correction replaces Noto Sans with Charis SIL because the first visual attempt did not resolve detached Cyrillic diacritics; this correction is pending PR CI and deployment.
- Main run 45217105821 passed build, 48 tests, syntax checks, Charis font audit, Chromium browser specimen and Pages deployment for `9bc73498cd6e5f1190d508884d48af3a58ce89a2`. Fresh live app and CSS scrapes returned HTTP 200; the deployed stylesheet confirms local Charis 7 WOFF2 and no legacy Charis SIL Google Fonts import.
- PR #10 extends Playwright coverage to Chromium, Firefox and WebKit at desktop and mobile widths; the six browser/viewport checks passed in run 45233413912.

## Remaining acceptance gates
1. **Public hosting — PARTIAL:** Pages deploy succeeded and returned the public URL; direct HTTP/content verification remains because this environment could not resolve the host.
2. **Browser QA — TODO:** Chromium, Firefox, WebKit, mobile viewport, keyboard and screen-reader checks; includes visual confirmation of the new combining-mark typography.
3. **Expert review — BLOCKED:** independent French phonologist and Ukrainian phonetician review IPA conventions and UFPN mappings.
4. **Gold benchmark — BLOCKED:** independently curated/licensed IPA and UFPN references; do not report accuracy scores without them.
5. **Linguistic coverage — PARTIAL:** POS-dependent `-ent`, h-aspiré, morphology, lexical exceptions, liaison/schwa/enchaînement and regional G2P remain incomplete.
6. **IPA conventions — PARTIAL:** resolve `õ` and any other upstream notation only with independent phonetic evidence.

## Readiness
**Partial research prototype with a functioning static browser app and passing hosted build/test/check. Deployed through GitHub Pages (deployment action verified; direct HTTP smoke test pending), not release-ready, and not independently validated for arbitrary French text.**


## Owner-reported typography follow-up
- Font-only changes did not resolve detached Cyrillic marks.
- Branch `fix/deterministic-cyrillic-diacritic-layout` adds explicit visual mark placement in `src/ufpn-display.js` and `styles.css`; tests cover decomposition of stacked marks.
- PR #4 and PR #5 are merged; main run 45201504905 passed build, tests, syntax checks and Pages deployment for `214c65e527b83a565371309599fa2d47251cd6d4`. This has not yet been visually accepted by the owner. Do not call the issue resolved until the deployed page is checked.


## Diacritic spacing refinement
- Owner feedback: marks moved too high and had excessive gap to the base letter.
- Follow-up changes only CSS geometry (`styles.css`): remove top padding from each grapheme wrapper, move above marks closer, and tighten stacked-mark spacing. No mapping or Unicode sequence changes. Awaiting CI/deployment and owner visual check.


## Research-backed diacritic size correction
- Owner reported that diacritic glyphs remained oversized after the spacing correction.
- Reviewed Google Fonts' diacritics design guidance (https://googlefonts.github.io/gf-guide/diacritics.html) and Microsoft's OpenType GPOS documentation (https://learn.microsoft.com/en-us/typography/opentype/spec/gpos). The guidance emphasizes coherent proportions, conventional mark forms, optical attachment, and compact stacked marks; GPOS mark-to-base/mark-to-mark anchors are the native font-level mechanism.
- Code inspection identified a concrete mismatch: marks were bold Manrope at `.62em`, while base letters were Charis SIL. At 22px output that is about 13.6px.
- Branch `fix/typographic-diacritic-scale` changes marks to regular Charis SIL at `.42em` (about 9.2px at 22px). This is a measured proportional adjustment, not a ratio mandated by the sources.
- No changes to canonical combining Unicode, phonetic mappings, clipboard or export.
- PR #7 CI run [45210184497](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45210184497) passed build, tests and syntax checks. Merged as `a5b338077089c2653fd40d05d722d90574583b81`. Main run [45210252551](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45210252551) passed build, tests, syntax checks and Pages deployment. Owner visual acceptance remains pending; no browser screenshot was available, so visual resolution is not claimed.


## Native OpenType shaping correction — PR #8 (2026-11-23)
- Branch: `fix/native-opentype-diacritic-shaping`; PR: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/8
- Root cause: the previous renderer decomposed canonical combining sequences into independent DOM spans, substituted spacing modifier glyphs for selected marks, and positioned them with CSS. That bypassed font shaping and its GPOS mark-to-base/mark-to-mark attachment.
- Fix: `src/ufpn-display.js` now passes the complete NFC-normalized UFPN string to a single text node via `textContent`; manual overlay CSS was removed. Existing `mark`/`mkmk` features remain enabled.
- Regression tests cover stacked combining marks and affricate tie bars. The IPA→UFPN adapter, mapping data, clipboard/export and phonetic semantics are unchanged.
- Research references: https://googlefonts.github.io/gf-guide/diacritics.html ; https://learn.microsoft.com/en-us/typography/opentype/spec/gpos ; https://software.sil.org/charis/release-7-000/
- Verification: PR CI run [45211693977](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45211693977) passed build, 48/48 tests and syntax checks; PR deploy job skipped. Local clone remains blocked by DNS failure. No browser runtime/screenshot QA is available; visual acceptance remains PARTIAL.
- Font caveat: current Google Fonts Charis SIL import remains; official SIL Charis 7.000 WOFF2 was not downloaded or vendored. Do not claim the current SIL package is installed.


## Official SIL Charis 7.000 migration — 2026-11-23
- Feature branch: `fix/vendor-charis-7-diacritics`; based on main `b9fbca4fde027fc57213a205a3c5acf157b7c8f1`.
- Official release archive downloaded in GitHub Actions run [45213736031](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45213736031); SHA-256 `e3237b1303c5d31af8f59b1d1914886c5e873b77c71390e4742fb3bc1c187666` verified.
- Vendored files: `assets/fonts/Charis-Regular.woff2`, `assets/fonts/Charis-Bold.woff2`; exact SIL OFL-1.1 text at `licenses/Charis-OFL.txt`. Font copyright and source details in `THIRD_PARTY_NOTICES.md`.
- `styles.css` now self-hosts Charis 7.000 via `@font-face`; `index.html` preloads Regular. Charis SIL was removed from the Google Fonts import. Other UI fonts remain external.
- `scripts/audit-charis-font.py` checks all 36 UFPN diacritic/prosodic inventory codepoints, mapped mark-to-base/mark-to-mark anchors, and HarfBuzz shaping. CI run 45216293204 passed: 36/36 inventory codepoints, 19 combining marks, 23 mapped clusters, 46 HarfBuzz shaping samples, and active Cyrillic `mark`/`mkmk` anchors.
- The one-time download-and-commit workflow was removed after its successful run. Normal Pages CI now owns repeatable font validation.
- Previous note stating that Charis 7 was not vendored is superseded by this section.
- Readiness: font vendoring and the font/anchor audit are DONE_VERIFIED. Chromium render test passed with `document.fonts.check=true`, computed family `Charis, serif`, and all 23 clusters rendered from the local 312,790-byte Regular WOFF2. Screenshot artifact 14839625822 (run 45216293204) was visually inspected; marks appear attached in the specimen. Firefox/WebKit desktop/mobile automated checks passed in run 45233413912; keyboard/screen-reader, physical-device and owner-side visual confirmation remain PARTIAL.


## Live deployment and browser verification follow-up (2026-11-23)
- Deployed main commit `9bc73498cd6e5f1190d508884d48af3a58ce89a2`; workflow [45217105821](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45217105821) passed test and deploy. Public app and stylesheet returned HTTP 200; CSS references local Charis Regular/Bold WOFF2.
- PR #10 was merged at `87ae7c3566e373633ad53b945ef811951d3f4ea0` after [run 45233413912](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45233413912) passed all six Chromium/Firefox/WebKit desktop/mobile typography checks.
- Current main HEAD is `d4f417ad01785b6d2f4a7413b7930a4aa9427585` (matrix evidence update). Post-merge workflow [45236513836](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45236513836): build, 48 tests, syntax check and Charis audit passed; Playwright browser installation is in progress. Earlier run 45236413859 was superseded/cancelled before browser rendering, not a test failure.
- Automated cross-browser typography is DONE_VERIFIED from PR #10. Remaining separate gates: owner-side visual acceptance, keyboard/screen-reader and physical mobile device QA. Linguistic expert review and an independently curated/licensed gold benchmark remain BLOCKED.

## OpenIPA adapter correction — 2026-11-23
- Feature branch: `fix/openipa-canonical-ipa-adapter`, based on `78478b8e40335fd9988dce7aaec273a332bdd305`.
- Root cause: vendored OpenIPA defines `NASAL_O='õ'` and `FLIPPED_R='ɾ'`; `parseR` uses the latter as its default French `r` output. The project IPA inventory instead encodes broad Metropolitan French `/ɔ̃/` and `/ʁ/`. Without normalization, the UI exposed `⟦õ⟧` and incorrectly rendered ordinary `r` as regional `р̌`.
- The adapter converts OpenIPA output `õ→ɔ̃` and `ε→ɛ`; for `metropolitan-fr`, it maps the upstream lyric-diction `ɾ` convention to broad `/ʁ/`, while `lyric-diction-fr` preserves the intended `[ɾ]` tap. Raw upstream strings remain in `sourceIpa` and trace. The direct IPA→UFPN mapping `[ɾ]` → `р̌` remains unchanged.
- Regression tests cover `bonjour`, `garçon`, and `mer`; end-to-end `bonjour` should render `бɔ̃жух̬̠` without unsupported IPA. CI and deployment are pending.
- This resolves the known OpenIPA symbol mismatch, not general French pronunciation accuracy; independent specialist review and a licensed gold benchmark remain blocked.


## Profile-aware OpenIPA rhotic correction — 2026-11-23
- Primary source: OpenIPA's official site describes the tool as intended for Lyric Diction and explicitly documents flipped French `r` as `[ɾ]` (https://www.openipa.org/).
- The previous unconditional `ɾ→ʁ` adapter rule was too broad: it erased a deliberate lyric-diction pronunciation. The adapter is now profile-aware: Metropolitan uses broad `/ʁ/`; lyric diction preserves `[ɾ]` and UFPN `р̌`.
- `õ→ɔ̃` and `ε→ɛ` broad-IPA normalizations remain; original upstream IPA is preserved in provenance. Tests cover both profiles.
- This corrects the profile semantics; do not treat either output as independently expert-validated pronunciation for every speaker.


## Final verified profile-aware deployment — 2026-11-23
- Main commit: `e10368e3526deeecf773ee11ea8dd9d50e7c4dc5` (PR #13).
- Main workflow [45252517029](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45252517029): build passed; 52/52 tests passed; syntax and Charis 7 audits passed; Chromium, Firefox and WebKit desktop/mobile checks passed; GitHub Pages deployment passed.
- Live app: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Fresh page scrape confirms default Metropolitan `bɔ̃ʒuʁ` → `бɔ̃жух̬̠`; fresh published-source scrape confirms profile-aware `ɾ` handling. Lyric-diction output retains `[ɾ]` → `р̌`, verified by regression tests.
- Remaining independent gates: French/Ukrainian specialist phonetic review, licensed gold benchmark, broader G2P coverage, keyboard/screen-reader and physical-device/owner visual acceptance.


## Expanded Cyrillic inventory and Ukrainian sound table — 2026-11-23

- Feature branch: `feat/extended-cyrillic-and-ukrainian-sound-table`, based on `main` `682767c361715e116628eec4cff29f5c47c70688`.
- Owner requested fewer diacritics and a mandatory explanatory table of UFPN letter → sound → Ukrainian word. The implementation adds single-letter mappings `ү` /y/, `ө` /ø/, `ӹ` /ə/, `њ` /ɲ/, `ң` /ŋ/, and `ғ` /ʁ/; `ӧ` is the UFPN project-specific sign for /œ/ (not a verified Mari letter–sound borrowing), and `/ɥ/` is `ү̯`. Existing `ў` /w/ and `э` /ɛ/ remain.
- New visible searchable web table lists all 37 segments and marks each Ukrainian comparison as exact, contextual allophone, approximate only, or no exact equivalent. It explicitly avoids false examples for French nasal vowels, /ɥ/, /ɲ/, /ŋ/ and /ʁ/.
- Machine-readable mapping schema 1.2.0 now includes Ukrainian example/status/note fields. Tests require complete example metadata. Charis font audit checks all adopted extended-Cyrillic glyphs.
- Sources added: S34 Kazakh phoneme/grapheme correspondences; S35 Serbian `њ` /ɲ/; S36 Hill Mari `ӹ` /ə/; S37 confirms Eastern Mari /œ/ exists but does not establish a Mari `ӧ` grapheme for it. UFPN `ӧ` /œ/ is a project-specific assignment.
- PR #15 and PR #16 are merged. PR #15 table deployment and live verification are complete; W1 is DONE_VERIFIED. U5 remains PARTIAL for independent linguistic and readability review. The latest PR #16 follow-up is in main; its redeployment workflow is still in progress.


## Final continuation handoff — 2026-11-23

- Starting main: `682767c361715e116628eec4cff29f5c47c70688`.
- PR #15 `Use expanded Cyrillic letters and add Ukrainian sound correspondence table` merged as `b914629a5cbc70dc417a8fe535e1a57300f73dba`.
- PR #16 `Preserve velar versus uvular fricative distinction` merged as final main `eac00a1bea2a85dc7ed03a68fbf43f6b9e2f6925`.
- Main workflow 45259255626 deployed PR #15; live scrape confirms the visible/searchable table with all 37 segment rows. PR #16 CI 45259870325 passed 55/55 tests, build, syntax, Charis 7 audit (45 codepoints; 19 marks; 14 mapped clusters; 28 HarfBuzz shaping samples) and all six Chromium/Firefox/WebKit desktop/mobile checks, with 37 table rows verified in every viewport.
- Current main workflow 45260260821: build, 55 tests, syntax and font audit passed; Playwright browser installation is still in progress. PR #16's final Pages redeployment therefore remains pending. The earlier PR #15 table deployment is live.
- Implemented: expanded Cyrillic letters ү /y/, ө /ø/, ӧ /œ/, ӹ /ə/, њ /ɲ/, ң /ŋ/, ғ /ʁ/; `х̬` remains for velar [ɣ]. Basic diacritic use is reduced to the distinctions that still need marks. The live table maps all 37 segments to Ukrainian examples or explicitly states there is no exact Ukrainian equivalent.
- Remaining: U5 linguistic specialist/readability review PARTIAL; Q2 keyboard/screen-reader/physical-device QA PARTIAL; Q3 independent licensed gold IPA/UFPN benchmark BLOCKED. Project remains an experimental research prototype, not an academically validated or release-ready standard.


## Ukrainian articulation guide addition (2026-11-23)
- Branch `feat/ufpn-pronunciation-guides` adds `pronunciationGuideUk` to all 37 phoneme records and renders it in a dedicated **«Як вимовити»** column in the searchable 37-row Ukrainian sound table.
- Guides give concrete articulatory instructions in Ukrainian (tongue, lips, jaw, voicing, airflow and nasal resonance). They distinguish exact/approximate/no Ukrainian equivalents instead of substituting a misleading familiar sound.
- Added a unit test for complete 37/37 guide coverage. PR CI, browser checks, merge and Pages deployment remain pending until verified.


## Provenance correction: `ӧ` /œ/ (2026-11-23)
- S37 EURPhon supports the existence of /œ/ in the Eastern Mari inventory, but does not establish the letter `ӧ` as its grapheme. Reviewed Mari references assign `ӧ` a different vowel value.
- The output mapping `ӧ` → /œ/ is retained as an explicit UFPN design convention to distinguish it from `ө` → /ø/ without adding diacritics. It must not be described as a direct Mari grapheme borrowing.
- The correction is recorded in the mapping metadata, source registry and IPA mapping notes; runtime output is unchanged.

## Verification update after PR #18/#19
- PR #18 merged pronunciation guides for all 37 segments; PR #19 fixed the browser harness and merged.
- PR #19 workflow `45263336209`: build, tests, syntax, Charis font audit and all six browser viewport checks passed.
- Final main push workflow `45263533099`: build, tests, syntax and font audit passed; Playwright installation/browser checks and Pages deployment were still running at last inspection.


## Latest release/deployment checkpoint (2026-11-23)
- `main` is `f078ba880e34361db1863922f2eb2febe502a86f`; PR #18, #19 and #20 are merged.
- PR #19 CI `45263336209` passed build, tests, syntax, font audit and all six Chromium/Firefox/WebKit desktop/mobile checks; browser assertions confirmed the «Як вимовити» column and 37 guided rows.
- Main workflow `45264431136` passed build, tests, syntax and Charis 7 audit; Playwright browser installation/check and Pages deploy were still in progress at last check.
- Live GitHub Pages returned HTTP 200 but still served the previous four-column table. Do not mark D3/W1 deployed until a fresh scrape shows «Як вимовити» and all 37 rows.


- /œ/ pronunciation-guide refinement: the correct cue is [ɛ] with the same front open-mid tongue position plus lip rounding; do not lower the tongue further. A dedicated regression guards the instruction.


## Live deployment verification update (2026-11-23)
- Pages deployment of main `95ec26e6127465d0f3152194c07db1b3dbf089e2` succeeded in workflow `45264961792`.
- Live page verified with HTTP 200: the Ukrainian reference table has five columns including **«Як вимовити»**, exactly 37 sound rows, and all 37 have articulation guidance.
- The later main commit `2606e437bc9003ebd546afd65b2f28ac2612fc65` corrects the /œ/ guide (preserve [ɛ] height, add rounding). Its main workflow `45265379491` passed build/tests/syntax/font audit; browser verification and deployment are still pending at the time of this note. Current live page is therefore the earlier five-column release, not yet the final /œ/ wording refinement.


## Design refinement handoff — 2026-11-23

- Base commit: `81098345c69a3c58d770b95fd63949133fa872d7`.
- Branch: `design/phonetic-workspace-refinement`.
- PR: [#25 — Refine the phonetics workbench UI](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/25).
- Latest branch commit: `19157268124a46121c9c260c3abdb48a9b289ed3`.
- Changed files: `index.html`, `styles.css`, `scripts/charis-browser-render.mjs`, `.github/workflows/pages.yml`, `README.md`, and new `DESIGN.md`.
- No phonetic runtime, IPA/UFPN data, parser, export or dependency changes.

### Verification completed
Workflow [45268570405](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405) passed:
1. `npm run build`.
2. `npm test`: 57 passed, 0 failed.
3. `npm run check`.
4. Python Charis 7 glyph and OpenType anchor audit.
5. Playwright browser checks: Chromium, Firefox and WebKit at 1440×1000, 1024×900, 768×1024 and 390×844. All 12 combinations passed output presence, expected result grid columns, skip-link keyboard focus and no-horizontal-overflow assertions.
6. Uploaded artifact: [browser specimen and four responsive workbench screenshots](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45268570405/artifacts/14864086549).

### Remaining
- Human visual inspection of desktop/laptop/tablet/mobile screenshots is complete (artifact 14865776425). Screen-reader, zoom/reflow and physical-device checks remain PARTIAL.
- PR #25 has been merged as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`. Public deployment remains unverified; main workflow 45272182990 is pending at Playwright browser installation.
- Main workflow `45265871092` had a successful test job but the Pages deploy step failed while fetching the `github-pages` artifact metadata. This is recorded as an external Actions/Pages API blocker; retry deployment after PR merge rather than changing app code speculatively.
- Next acceptance: wait for workflow 45272182990 to complete, verify Pages deployment and inspect the live site at desktop and mobile widths.


### Existing live-site baseline
- Main before this design branch: `81098345c69a3c58d770b95fd63949133fa872d7`; PR #25 merged as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`.
- Last verified live Pages commit: `95ec26e6127465d0f3152194c07db1b3dbf089e2`. The current main /œ/ articulation wording correction is therefore not yet reflected on the public site.
- Historical main workflow `45265871092` passed tests but failed at Pages artifact metadata retrieval. The current post-merge main workflow is `45272182990`; its build, 57/57 tests, syntax and font audit have passed, while browser installation and deployment remain pending.


## 2026-11-23 — PR #25 merged / UI handoff
- Starting main: `81098345c69a3c58d770b95fd63949133fa872d7`.
- PR #25: [Refine the phonetics workbench UI](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/25), merged (squash) as `41f96a1f3fbb8b220931d434626a4edddc3c13c7`. Feature head: `3ee313c31ed8c4a005fd1daea234b1a2817a3d34`.
- Final PR CI [45270636340](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340): SUCCESS. Build, 57/57 tests, syntax, Charis 7/OpenType audit, Playwright install, 12 Chromium/Firefox/WebKit × viewport checks passed. Screenshot artifact: [14865776425](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45270636340/artifacts/14865776425); desktop/laptop/tablet/mobile screenshots manually inspected.
- UI improvements merged; no phonetic engine/data behavior changed. Screen-reader, real-device and zoom/reflow checks remain PARTIAL.
- Next: verify the main-branch Pages workflow triggered by the merge, then fetch the live site and confirm the new UI is deployed. Previous Pages deploy failure was artifact metadata retrieval; do not assume fixed until a fresh main deploy succeeds.
- Linguistic expert review and independently curated/licensed gold benchmark remain blockers for linguistic release validation.


## Authoritative continuation handoff — 2026-11-23

- Starting main for this continuation: `0503cfe0b0450b88a2a4b9bedff5ee594323668d`.
- Current main HEAD: `5ec0ff1e2b456733fffad619f8d88e287a4096f6` (documentation-only on top of tested application commit `39eb12f6712c26c3afb1864ff8fbb8d5dbc78c28`).
- PR #26 merged docs reconciliation; PR #27 merged the six-row OpenIPA fixture coverage/provenance assertions; PR #28 merged accessible source naming and functional skip-link focus.
- PR #27 CI [45277660637](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45277660637): 58/58 tests, build, syntax, font audit and all browser checks passed.
- PR #28 CI [45278479262](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278479262): 58/58 tests, build, syntax, font audit and all 12 Chromium/Firefox/WebKit × viewport checks passed. Each combination verified the source textarea's accessible name and skip-link focus transfer to `main`.
- Main workflow [45278852488](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488): test job SUCCESS — build, 58/58 tests, syntax, Charis 7 audit, browser render and artifact upload passed. Specimen artifact [14869235188](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14869235188).
- Pages deployment FAILED twice due GitHub artifact metadata behavior. First `github-pages` artifact [14867792849](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14867792849) uploaded successfully, but deploy-pages could not resolve its metadata. Re-running only the deploy job created a duplicate artifact [14867374732](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45278852488/artifacts/14867374732); deploy-pages then rejected the run because multiple artifacts named `github-pages` existed. Do not retry this job again.
- A fresh main workflow run is required to publish with one unique Pages artifact. After it succeeds, verify the live site and check the 37-row, five-column table plus current accessibility changes. Last verified live baseline is commit `95ec26e6127465d0f3152194c07db1b3dbf089e2`; current main is not yet confirmed deployed.
- Remaining gates: manual screen-reader/zoom/reflow/physical-device/owner visual QA PARTIAL; independent French/Ukrainian phonetic review BLOCKED; independently curated and licensed gold IPA/UFPN benchmark BLOCKED. The project remains a research prototype, not an academically validated phonetic standard.



## Authoritative current handoff — Pages deployment verified (2026-11-23)

- Verified application/workflow commit: `bba1a66fdb31241e889fe16fe25b2371bb3641fc`; subsequent closeout commits are documentation-only and do not alter the deployed application.
- PR #27 merged the six-row OpenIPA fixture regression coverage and raw IPA provenance assertion. PR CI 45277660637 passed 58/58 tests and browser checks.
- PR #28 merged accessible source naming and functional skip-link focus transfer. PR CI 45278479262 passed 58/58 tests and all 12 Chromium/Firefox/WebKit × viewport checks.
- PR #29 reconciled matrix/audit/handoff evidence.
- PR #30 merged the Pages artifact/deploy job split, so a deploy-only retry no longer uploads a duplicate artifact.
- Main workflow [45281476706](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706): SUCCESS. Test job (58/58, build, syntax, font audit, all browser checks), `pages-artifact` and `deploy` all passed.
- Exactly one Pages artifact [14870605812](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706/artifacts/14870605812) and browser specimen [14870611063](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45281476706/artifacts/14870611063) were uploaded.
- Fresh live scrape 01a20a90-e14f-7024-b6d9-0f5af46dd418 returned HTTP 200 and verified the focusable `main`, labelled French input, 37 table rows and all five expected headers.
- Remaining blockers are not deployment-related: manual screen-reader/zoom/reflow/physical-device/owner visual QA PARTIAL; independent French/Ukrainian phonetic review BLOCKED; independently curated/licensed gold benchmark BLOCKED. The project is a working research prototype, not a validated phonetic standard.


## Owner-approved glide notation update — 2026-11-24
- Feature branch: `feat/ufpn-labial-palatal-glide-grapheme`, based on main `9633b43bad1a74899ac556bfd19f293977c18d61`.
- The owner selected the below-diacritic option for /ɥ/: canonical UFPN is `й̹` (U+0439 U+0339; Ukrainian `й` + COMBINING RIGHT HALF RING BELOW) at Basic, Detailed and Extended levels.
- /ɲ/ remains `њ`. No other mappings changed.
- PR #33 merged as `c76801dbfa9c7bae1009ad3b137c652f033da517`. PR CI 45370163542 passed 59/59 tests, build, syntax, Charis 7 audit and all 12 browser/viewport combinations. Main workflow 45370457031 passed test, Pages artifact and deploy.
- Live scrape `01a20d01-a5ea-70bf-bafe-3e58d7a307bb` returned HTTP 200 and verified the visible /ɥ/ → `й̹` reference-table row. /ɲ/ → `њ` remains unchanged.
- PR #34 is a metadata consistency follow-up: its `featureDimensions.rounding` description and regression assertion are being aligned with the approved composition; no runtime output change.


## Rounding feature registry consistency — 2026-11-24
- Follow-up branch: `fix/rounding-feature-registry-for-y-labial-glide`, based on main after PR #33.
- The machine-readable `featureDimensions.rounding` description now agrees with the adopted /ɥ/ composition `й̹`: dedicated Cyrillic letters encode /y ø œ/, while U+0339 below `й` marks the labial-palatal glide; finer rounding gradience remains evidence-gated.
- Added a regression assertion linking the rounding feature description to `й̹`. No output mapping changed in this follow-up.


## Owner-approved standalone IPA vowel graphemes — 2026-11-24
- Starting main: `4117f10cbd51f034835242491beb1dda3ee1c479`.
- Branch: `feat/retain-ipa-vowel-graphemes`.
- The owner's complete requested set is `œ`, `ɔ`, `ə`, `ɛ`, retained as standalone UFPN graphemes. Their previous substitutes (`ӧ`, `о̆`, `ӹ`, `э`) are removed from the canonical phoneme output/inventory.
- Nasal forms preserve the same base symbols with combining tilde: `œ̃`, `ɔ̃`, `ɛ̃`. `/ɔ̃/` no longer adds the extra breve.
- Tests and docs are updated; CI, merge, and live deployment must still be verified. Existing `й̹` for `/ɥ/` and `њ` for `/ɲ/` remain unchanged.


## Final handoff — standalone IPA vowel graphemes deployed (2026-11-24)
- Starting main: `4117f10cbd51f034835242491beb1dda3ee1c479`.
- PR #35 merged as `4c56c5637831bdbfb12dc1a93b0e104624ab2454`.
- Main workflow [45378841718](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45378841718): SUCCESS. Build, 60/60 tests, syntax, Charis 7 audit, 12 Chromium/Firefox/WebKit viewport combinations, Pages artifact and deploy passed.
- Charis 7: 46 codepoints, 19 combining marks, 13 mapped clusters, 26 HarfBuzz shaping samples; mark anchor inspections passed.
- Live site returned HTTP 200 on scrape `01a20d31-75b2-723e-aad0-aef0e6e8005d`; it displays `bɔ̃ʒuʁ` → `бɔ̃жуғ` and the reference rows for `ɛ`, `œ`, `ɔ`, `ə`, plus `ɛ̃`, `ɔ̃`, `œ̃`. `й̹` and `њ` remain intact.
- Implementation/deployment DONE_VERIFIED. Independent French/Ukrainian phonetic expert review and a licensed gold benchmark remain BLOCKED; screen-reader, zoom/reflow and physical-device QA remain PARTIAL. Project remains an experimental research prototype, not an academically validated standard.
- PR #36 updates one visible caption to accurately call UFPN a hybrid notation; no runtime mapping change.


## Handoff — українська локалізація вебсайту (2026-11-24)
- Робоча гілка: `i18n/ukrainian-only-site-copy`, відгалужена від `main` `6ccf44347925c97155cc7b3fdd4e5cd82c51140c`.
- PR #37: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/37.
- Зміни: український інтерфейс, профілі й рівні UFPN, локалізовані довідкові таблиці/метадані/експорт, українські правила й пояснення OpenIPA, регресійні тести.
- CI run [45383515829](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45383515829) на `d0bc7489618305f3636ad7f61adaa23174220ddb`: 65/65 tests, build, syntax, Charis 7 audit і Chromium/Firefox/WebKit rendering — SUCCESS. Browser artifact `14915013026`.
- Наступні кроки: повторити CI після цього документаційного запису, злити PR #37, дочекатися Pages deployment і перевірити живий сайт на українські написи та відсутність англомовних підписів інтерфейсу.


## Фінальний handoff — українська локалізація вебсайту (2026-11-24)
- PR #37, #38, #39 злито; фінальний `main`: `3b67ef59ca9f012f00dcbf4bc04eb6ce32714778`.
- Main workflow [45386058400](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45386058400) успішно завершив build, 65/65 tests, syntax check, Charis 7 audit, Chromium/Firefox/WebKit rendering, Pages artifact і deployment.
- Live scrape `01a20d5c-3f55-7718-a428-e5656b4332ce`: HTTP 200; контрольний пошук не виявив англомовних підписів чи пояснень інтерфейсу. Примітка /ə/ виправлена на «до звука ə».
- Локалізація інтерфейсу: DONE_VERIFIED. Залишкові латинські рядки — назви OpenIPA/GitHub, IPA/UFPN, TXT/PDF, французькі приклади та латинізований фонетичний результат.
- Фонетичний рушій лишається експериментальним дослідницьким прототипом; незалежна експертна валідація та gold benchmark не входили до цієї задачі.


## Owner-reported reference-panel and explanation-toggle follow-up — 2026-11-24
- PR #41 (branch fix/reference-panels-and-explanation-toggle) addresses the inconsistent presentation of the IPA→UFPN table, 18 phonetic dimensions and grapheme inventory. The three sections now share a single accordion visual pattern, including short descriptions and counts.
- The 18 dimensions are rendered as individual cards with Ukrainian names, values, evidence statuses and UFPN notes rather than a plain bullet list. The adopted grapheme inventory is visually distinguished from unassigned candidates.
- «Показувати розбір вибраного слова» controls only the detail panel below the result cards. It does not alter IPA, UFPN, level selection or the transcription algorithm. The label now states this explicitly and the checkbox exposes the panel relationship/state to assistive technology.
- New regression tests: `tests/reference-ui.test.js`.
- PR #41 was squash-merged into `main` as `f04a7b280b9b1a855ae1faed4c6bf1b08f070998`.
- Workflow `45407617594` passed build, all tests (including the new UI contract tests), syntax, Charis 7/OpenType audit, Playwright installation and UFPN rendering in Chromium, Firefox and WebKit; browser specimen upload succeeded.
- Main workflow `45411777853` completed SUCCESS: build, tests, syntax, Charis 7 audit, Playwright install, Chromium/Firefox/WebKit rendering, Pages artifact and deploy all passed.
- Fresh live scrape using `?deploycheck=45411777853` returned HTTP 200 and confirmed «Показувати розбір вибраного слова», the helper text explaining that transcription is unaffected, and the new card/accordion reference UI (the former plain list is absent).
- W7 is now DONE_VERIFIED. The change is presentation/accessibility only; no phonetic runtime or mappings were modified.

## UI information-density refinement — 2026-11-24
- Branch: `design/remove-interface-noise-2026-11-24`, based on `main` `f04a7b280b9b1a855ae1faed4c6bf1b08f070998`.
- Applied a focused copy/IA pass guided by kill-ai-slop, Impeccable and Taste Skill. Removed decorative ordinal labels and hero kicker, redundant brand microcopy, disabled future-region options, repeated footer GitHub link and static version label.
- Preserved useful distinctions between IPA, UFPN and Latin guide; kept explanatory copy, uncertainty warning, functional controls and source/status links.
- Changed files: `index.html`, `tests/reference-ui.test.js`, `DESIGN.md`, `docs/EXECUTION-MATRIX.md`, `docs/AUDIT.md`, `HANDOFF.md`.
- Acceptance: `npm run build`, `npm test`, `npm run check`, plus browser rendering and inspection at desktop/mobile. No phonetic engine/data behavior should change.
- PR #43: https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/pull/43.
- PR workflow [45417023021](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45417023021): SUCCESS — build, 71/71 tests, syntax, Charis 7/OpenType audit, Chromium/Firefox/WebKit across desktop/laptop/tablet/mobile (12 combinations). Browser artifact [14931722793](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45417023021/artifacts/14931722793); desktop and mobile screenshots manually inspected. No horizontal overflow or result-layout regressions.
- First CI attempt [45416850694](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45416850694) failed because the newly added test contained an invalid regular-expression literal. The error was traced to the assertion itself, corrected to a direct string-presence assertion, and the full workflow rerun passed.
- Current status: DONE_VERIFIED in the PR branch. Pages publication is not applicable until merge; no production deployment is claimed.


## Контентна зрозумілість інтерфейсу — UI-06 (2026-11-24)
- Гілка: `content/ux-copy-clarity-2026-11-24`, відгалужена від main `493f4c9deeeb97857305750873137166ded1f260`.
- Застосовано принципи designer-skills: content strategy, UX writing та information architecture. Це методичне застосування; upstream skills не копіювалися й не встановлювалися в runtime.
- Оновлено назву селектора профілю, назви опцій і пояснення елізії; уточнено роль IPA, UFPN та латинської підказки. Додано доступно пов’язану допоміжну підказку й регресійні тести.
- Змінені файли: `index.html`, `styles.css`, `tests/reference-ui.test.js`, `tests/localization.test.js`, `DESIGN.md`, `docs/EXECUTION-MATRIX.md`, `docs/AUDIT.md`, `HANDOFF.md`.
- Фонетичний рушій, профільні ID, мапінг, рівні UFPN, впевненість, походження та експорт не змінювалися.
- Статус UI-06: PARTIAL до CI, браузерного рендерингу й live-перевірки після merge. Локальний git clone у попередніх сесіях був недоступний через DNS; цього разу зміни зроблено через GitHub API, тому локальні команди Node не виконувалися.

- CI run [45421702699](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45421702699): build passed; tests 73/74. Єдиний failure — застаріла локалізаційна assertion `Латинська підказка` у `tests/localization.test.js`, що суперечила новому напису `Підказка латиницею`. Виправлено комітом `012beb169565c639d24192705e29d233fb0791d6`.
- Повторний CI [45433252768](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433252768): build, 74/74 tests, syntax і Charis 7/OpenType audit — PASS; run скасовано на встановленні Playwright після нових документаційних комітів. Актуальний CI [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) повторно пройшов build, 74/74 tests, syntax та font audit; Playwright installation і рендеринг UFPN у Chromium, Firefox та WebKit завершилися успішно. PR #44 злито в `main` комітом `76f70f6ea6f832523cea72af2cabad7b8dbb8447`. PR workflow [45433450826](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826) завершився SUCCESS: build, 74/74 tests, syntax, Charis 7/OpenType audit, Playwright install, Chromium/Firefox/WebKit rendering; browser specimen artifact [14939324505](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45433450826). PR workflow пропускає `pages-artifact` і `deploy`; після merge необхідно підтвердити main deployment та live HTTP-вміст. Інтеграційний GitHub API у цій сесії не показав main-triggered workflow runs; прямий live fetch недоступний через DNS/network resolution failure. Hosting status залишається PARTIAL, публікацію не оголошувати перевіреною.


## UFPN schwa grapheme update — 2026-11-24
- Owner-approved practical-notation decision: every IPA `/ə/` maps to `ъ` in UFPN Basic, Detailed and Extended. IPA remains unchanged in the IPA result and provenance; the adapter continues to consume IPA only.
- `ъ` is a project-specific vowel grapheme here, not a silent hard sign and not a claim of identity with Bulgarian `/ɤ/`. If profile-driven elision removes `/ə/`, no `ъ` is emitted.
- Mapping data, reference table documentation, UI helper text and regression tests were updated together. Await PR CI, merge, main Pages deploy and live content verification before marking hosting DONE_VERIFIED.
