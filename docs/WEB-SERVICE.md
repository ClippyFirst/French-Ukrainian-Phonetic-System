# Вебсервіс French → Ukrainian Phonetics

## Стан

У репозиторії є клієнтський вебзастосунок: `index.html`, `styles.css`, `src/app.js`, `src/engine.js`, `src/french-g2p.js`, `src/ufpn.js` та дані `data/ufpn-mapping.json`.

Це статичний браузерний застосунок без власного backend/API та без передавання введеного тексту на сервер застосунку. Французький текст обробляється локально у вкладці браузера; браузерний модуль OpenIPA збирається з vendored upstream TypeScript під час build.

## Функції, які вже реалізовані в інтерфейсі

- введення французького тексту й приклади;
- профілі OpenIPA: базовий Metropolitan та lyric diction з upstream liaison/elision hooks;
- паралельний вивід IPA, UFPN і допоміжного Latin guide;
- три рівні UFPN: Basic, Detailed, Extended;
- послівний інтерактивний розбір і пояснення правил OpenIPA;
- позначення невідомих/непідтверджених форм;
- пошук у довіднику UFPN, фонемах, алофонах, фонетичних вимірах і кириличному інвентарі;
- копіювання результатів, TXT export і browser print-to-PDF;
- адаптивна верстка для вузьких екранів.

## Локальний запуск

Потрібен Node.js 20.10+:

```bash
npm run build
npm test
npm run check
python3 -m http.server 8000
```

Відкрити http://localhost:8000. Build створює `src/openipa-french.js` з оригінального OpenIPA parser; цей згенерований файл навмисно не комітиться.

## Хостинг GitHub Pages

GitHub Pages увімкнено для репозиторію; workflow `.github/workflows/pages.yml` запускає build/test/check і виконує deploy лише з `main`.

- PR #1 злито в `main`: `313fc0dfef85afaf413dfc4f91d93019f578ed7d`.
- Main CI run 45192430970 успішно виконав build, 46 тестів і syntax check.
- Clean main workflow run [45192891355](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45192891355) завершився успішно, включно з `actions/deploy-pages@v4`; deployed commit: `422430fe142e8f15e55d8ef2bd1876853b2e209e`.
- GitHub Actions повернув environment URL: https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ .
- Прямий HTTP/content smoke test із цього середовища не вдався через DNS resolution failure / недоступність URL через web fetch. Потрібно окремо перевірити HTTP 200, JS/CSS assets і фактичну роботу інтерфейсу у браузері.

## Межі

Це статичний дослідницький сервіс, а не production API. Він не має облікових записів, серверного збереження історії, аудіо, TTS, черги пакетної обробки або гарантованої точності. Введений текст не відправляється на сервер застосунку, але браузер завантажує статичні файли з хостингу; UFPN використовує локальні офіційні вебшрифти Charis 7.000 (Regular/Bold WOFF2); ліцензія SIL OFL-1.1 включена до `licenses/Charis-OFL.txt` і описана в `THIRD_PARTY_NOTICES.md`. Результати OpenIPA та UFPN залишаються експериментальними й потребують незалежної фонетичної перевірки.

## Статус перевірки

- Feature CI run 45179583235: build passed, 46/46 tests passed, `npm run check` passed.
- Main CI run 45192430970: build passed, 46/46 tests passed, `npm run check` passed.
- PR #2 із початковою спробою виправити кириличні діакритики злито: `360ef54a08af2ff7146d2a4052c326fec6968173`.
- Noto Sans не усунув відрив діакритиків; PR #3 замінив його на Charis SIL і злито в `main`: `01919e72d3ff1c46b5709b4a96f550db488e6498`.
- PR CI [45197892356](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45197892356): build, 46 тестів і syntax check пройшли. Production Pages deployment нового merge commit ще не підтверджений.
- Main run [45195557498](https://github.com/ClippyFirst/French-Ukrainian-Phonetic-System/actions/runs/45195557498) пройшов build, 46 тестів, syntax check і Pages deploy.
- Попереднє Noto Sans оформлення не усунуло відрив діакритиків від кириличних базових літер. Злито follow-up із Charis SIL, що має підтримку кирилиці та OpenType-якорі; PR CI пройшов. Деплой production і візуальне підтвердження ще очікуються.
- Прямий HTTP smoke test і браузерна візуальна перевірка не виконані через недоступність Pages із цього середовища.
- Локальний браузерний smoke test та Chromium/Firefox/WebKit accessibility QA ще не виконані.


## UFPN шрифт і діакритики

Для UFPN локально розповсюджуються офіційні Charis 7.000 Regular і Bold WOFF2 у `assets/fonts/`. CSS використовує сімейство `Charis` через `@font-face`; Regular попередньо завантажується в `index.html`. Інші UI-шрифти залишаються зовнішніми, але Charis більше не залежить від Google Fonts.

Джерело й контрольна сума архіву, ліцензія та атрибуція: `THIRD_PARTY_NOTICES.md`. Скрипт `scripts/audit-charis-font.py` перевіряє всі 36 кодових точок реєстру, якорі GPOS для фактичних UFPN комбінацій і shaping через HarfBuzz. Hosted CI виконує цей аудит і Chromium browser specimen. Run 45216293204 підтвердив `document.fonts.check=true`, завантаження локального `Charis-Regular.woff2` (312,790 bytes) і відображення всіх 23 кластерів; screenshot artifact 14839625822 збережений у GitHub Actions на 7 днів.

Це усуває невизначеність щодо версії та зовнішнього джерела шрифту, але саме по собі не є доказом візуального виправлення. Остаточне приймання потребує перевірки Firefox/WebKit/мобільного браузера та підтвердження власника на його пристрої.


## Навчальний додаток і вбудований UFPN guide

- Головна сторінка має україномовний навчальний блок читання французькою з типовими графемними відповідностями, носовими голосними та регіональними застереженнями, акцентами/дієрезою, кінцевими літерами, schwa, liaison і enchaînement.
- Кнопки прикладів заповнюють основне поле транскриптора; сервіс не надсилає окремих навчальних даних.
- UFPN у навігації веде до HTML-якоря на цій же сторінці. Прийняті графеми відображаються з канонічного mapping JSON, а технічні таблиці доступні через стабільні anchor IDs.
- Основа навчального огляду: source registry S1, S4, S10, S14–S16. Це не повний курс французької та не гарантія правильної вимови для кожного слова.


Додаткове наукове підґрунтя навчального модуля: S38–S44 у [реєстрі джерел](SOURCE-REGISTRY.md). Зокрема, навчальний матеріал не перетворює liaison на універсальне правило, розрізняє liaison та enchaînement, позначає schwa як варіативний і подає /œ̃/–/ɛ̃/ merger як регіонально/соціально неоднорідний процес.


## Production verification — 2026-11-24

- PR #53 merged to main as `ba02467bd7b8c1102bab0ec79d9fff5568acd87d`.
- Main Pages run #380 (`45466573635`) passed the test job (79/79), build, syntax, Charis 7/OpenType audit, Chromium/Firefox/WebKit rendering, Pages artifact upload and deploy.
- Live service smoke test returned HTTP 200. The header links to the in-page French reading module and UFPN guide; the UFPN link is no longer a raw Markdown target.
- The learning add-on is static and educational. No pronunciation engine or data mapping was changed.
