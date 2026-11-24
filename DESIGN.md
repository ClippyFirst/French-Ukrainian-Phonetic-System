# Design system — French–Ukrainian Phonetic System

## Product character
An editorial phonetics workbench: calm, precise, readable, and recognisably Ukrainian. The interface should feel like a carefully typeset linguistic instrument, not a generic SaaS dashboard.

## Visual foundations
- Preserve the warm paper background, forest-green action colour, and editorial serif/sans pairing already used by the service.
- Use the self-hosted Charis font for UFPN, extended Cyrillic and combining-mark clusters; preserve the established editorial serif for IPA and Latin guide unless a dedicated font audit justifies a change. Use the UI sans face for controls and explanatory prose.
- Keep the page mostly neutral. Green marks the primary action and meaningful UFPN emphasis; coral is reserved for uncertainty or warnings.
- Prefer clear whitespace, aligned edges, readable text, and a small number of coherent surfaces over decorative gradients, glass effects, or nested cards.
- Keep phonetic outputs visually distinct: IPA is the source-facing reference, UFPN is the primary Ukrainian reading aid, and Latin guide remains explicitly secondary.

## Interaction and accessibility
- Every interactive element must have a visible keyboard focus state and a usable touch target.
- Keep hover and press feedback short and restrained; never make motion necessary to understand a state.
- Respect `prefers-reduced-motion`.
- Maintain readable contrast, especially for metadata and explanatory copy.
- Keep the sound-reference table horizontally navigable on narrow screens without shrinking phonetic glyphs.
- Preserve the skip link, semantic labels, live status announcements, and existing keyboard-operable controls.

## Product constraints
- Visual changes must not alter French G2P, IPA normalization, IPA → UFPN mapping, confidence, provenance, uncertainty handling, or export content.
- Do not invent phonetic claims or hide unsupported IPA.
- Do not add analytics, remote text processing, user accounts, or persistence of entered text.
- Preserve the static HTML/CSS/ES-module architecture and GitHub Pages deployment.

## Upstream design references
The following repositories informed the design review and interaction principles; their skill source files and assets are not vendored into this project:
- [Taste Skill](https://github.com/Leonxlnx/taste-skill) — product-specific visual identity, coherent systems, responsive and browser-first quality checks. MIT.
- [Impeccable](https://github.com/pbakaus/impeccable) — hierarchy, accessibility, visual craft, and preservation of established product truth. Apache-2.0.
- [Emil Kowalski Skills](https://github.com/emilkowalski/skills) — restrained interaction feedback, motion purpose, and reduced-motion awareness. MIT.

This project is AGPL-3.0. These links are design references only; no upstream skill implementation or asset has been copied into the repository.


## Інформаційна дисципліна інтерфейсу — 2026-11-24
- Видимий текст має називати функцію, стан або наступну дію; декоративні номери, службові «kicker»-підписи та дублювання назви продукту не додають цінності й не використовуються.
- Не показувати в робочих контролах недоступні регіональні профілі з написом «незабаром»: перелік містить лише реальні опції.
- Зберігати пояснення, які допомагають розрізнити IPA, UFPN і латинську підказку, а також попередження про межі точності. Це не візуальний шум.
- Нижній колонтитул містить лише довідкові переходи, які не дублюють основну навігацію; номер версії не виводити, доки він не є керованим релізним значенням.
- Перевірка спирається на [kill-ai-slop](https://github.com/yetone/kill-ai-slop) (виявлення шаблонних UI/copy-тригерів), [Impeccable](https://github.com/pbakaus/impeccable) (clarify/distill: усунення повторів) і [Taste Skill](https://github.com/Leonxlnx/taste-skill) (ієрархія, щільність, перевірка в браузері). Репозиторії використано як методичні орієнтири; їхній код/асети не копіювалися.
