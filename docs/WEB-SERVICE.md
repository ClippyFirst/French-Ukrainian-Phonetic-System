# Вебсервіс French → Ukrainian Phonetics

## Стан

У репозиторії вже є клієнтський вебзастосунок: `index.html`, `styles.css`, `src/app.js`, `src/engine.js`, `src/french-g2p.js`, `src/ufpn.js` та дані `data/ufpn-mapping.json`.

Це статичний браузерний застосунок без власного backend/API та без передавання введеного тексту на сервер. Французький текст обробляється локально у вкладці браузера; браузерний модуль OpenIPA збирається з vendored upstream TypeScript під час build.

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

## Хостинг

GitHub Actions workflow `.github/workflows/pages.yml` перевіряє feature branch і PR, але deploy job виконується лише на `main`. Це навмисно: Pages ще не ввімкнено для репозиторію. Перевірка deployment з feature branch 23.11.2026 підтвердила, що build, 46 тестів і syntax check проходять, але `actions/configure-pages@v5` повертає `Get Pages site failed: Not Found`, оскільки GitHub Pages не налаштовано.

Щоб опублікувати сервіс:
1. Відкрити Settings → Pages у репозиторії GitHub.
2. У Build and deployment вибрати **GitHub Actions**.
3. Після цього злити PR #1 у `main` (або вручну запустити workflow на `main` після злиття).
4. Дочекатися успішного deploy job; URL публікації буде показано в environment `github-pages`.

Поки Pages не ввімкнено і deploy не завершився успішно, публічний URL не вважається підтвердженим. Не слід підміняти цей статус припущенням про стандартний URL.

## Межі

Це статичний дослідницький сервіс, а не production API. Він не має облікових записів, серверного збереження історії, аудіо, TTS, черги пакетної обробки або гарантованої точності. Введений текст не відправляється на сервер застосунку, але браузер завантажує статичні файли з хостингу; Google Fonts підключені зовнішнім CSS імпортом. Результати OpenIPA та UFPN залишаються експериментальними й потребують незалежної фонетичної перевірки.

## Статус перевірки

- CI run `45177924718`, commit `0acb2e83a4b5ca9f1530d57a8f6c53ecd9cda310`: build passed, 46/46 tests passed, `npm run check` passed.
- Pages deployment failed at configuration because the repository has no Pages site enabled; upload/deploy steps were skipped.
- Локальний браузерний smoke test та Chromium/Firefox/WebKit accessibility QA ще не виконані.
