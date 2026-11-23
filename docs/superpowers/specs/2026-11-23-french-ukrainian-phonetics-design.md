# Design — French → Ukrainian phonetic web service

## Intent
Дослідницький браузерний сервіс, що приймає французький текст і показує вимову у послідовності French text → OpenIPA source IPA → narrow notation normalization → IPA → UFPN та допоміжний Latin guide. Користувач бачить не лише результат, а й послівні правила, provenance, невизначеність і непідтримані символи.

## Users and outcome
Україномовні користувачі, які вивчають французьку або досліджують передачу французької вимови українською. Основна дія: ввести текст, обрати профіль і рівень UFPN, порівняти синхронні результати, переглянути пояснення та скопіювати/експортувати їх.

## Goals
- Повноцінний статичний вебзастосунок, доступний у сучасному браузері без runtime backend.
- Оригінальний OpenIPA French parser — єдине джерело G2P у поточній інтеграції.
- IPA — inspectable межа між французьким G2P та українською адаптацією.
- Basic / Detailed / Extended UFPN, provenance, rule trace і видимі unsupported IPA.
- Copy, TXT export, browser print-to-PDF і пошуковий UFPN reference.
- GitHub Actions build/test/check і GitHub Pages deployment pipeline.

## Non-goals
- Не гарантувати правильність довільного французького тексту чи незалежний паритет точності з OpenIPA.
- Не створювати backend, акаунти, аналітику або серверне збереження введених користувачем текстів.
- Не вигадувати IPA для невідомих форм і не приховувати unsupported symbols.
- Не імпортувати словники/корпуси без перевірки provenance та ліцензії.
- Не називати UFPN академічним стандартом до незалежного рецензування.

## Architecture
- Static HTML/CSS/ES modules: `index.html`, `styles.css`, `src/app.js`.
- `src/french-g2p.js` адаптує vendored OpenIPA parser; `src/engine.js` зберігає provenance і word-level traces.
- `src/ufpn.js` приймає IPA та повертає UFPN; прямої адаптації французьких графем у UFPN немає.
- `data/ufpn-mapping.json` — machine-readable mapping і schema.
- GitHub Actions перевіряє build/tests/syntax; deploy job обмежений `main`.
- Введений текст обробляється у браузері; backend і server-side persistence відсутні.

## Approaches considered
1. **Static browser app + GitHub Pages — обрано.** Найменша інфраструктура, узгоджується з наявним ESM runtime і Pages workflow, не потребує передавати введений текст на сервер.
2. **Vercel Git deployment.** Технічно можливий, але Git-linked Vercel project для цього репозиторію відсутній; другий deployment target додав би платформу без функціональної потреби.
3. **Backend/API.** Відхилено: parser працює в браузері, backend додав би витрати, обробку приватного тексту та експлуатаційну складність.

## Licensing and provenance
- Власник схвалив AGPL-3.0; репозиторій використовує цю ліцензію.
- Оригінальний OpenIPA French parser і потрібні модулі vendored з upstream revision `266c002d6c03c6b581b2bea74ca39bf1a92a7504`; attribution та AGPL network-source obligations наведені в `THIRD_PARTY_NOTICES.md`.
- Проєктні IPA seed overrides, ручні liaison postprocessors і manual lyric-final-schwa injection видалені з runtime.
- `õ` та інші невирішені upstream conventions не нормалізуються навмання.

## Acceptance
- Build, full test suite and syntax checks pass in hosted CI.
- UI exposes IPA/UFPN/Latin outputs, profiles, UFPN levels, explanations and export actions.
- Unsupported IPA remains visible.
- Public Pages URL resolves to the deployed commit after Pages enablement and reviewed PR merge.
- Browser/mobile/accessibility QA and independent phonetic benchmark remain separate release gates.
