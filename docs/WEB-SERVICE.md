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
- Deploy поки не завершився: GitHub не знайшов Pages artifact у першій спробі; повторний запуск лише deploy job створив два artifacts з однаковою назвою, які action відхилив як неоднозначні.
- Потрібен новий чистий workflow run на `main` (новий commit запускає його автоматично). Не перезапускати лише невдалий deploy job у межах цього run, бо upload створить другий однойменний artifact.
- Після успішного deploy перевірити environment URL, HTTP 200, завантаження JS/CSS і фактичну роботу застосунку. Поки це не зроблено, публічний URL не вважається підтвердженим.

## Межі

Це статичний дослідницький сервіс, а не production API. Він не має облікових записів, серверного збереження історії, аудіо, TTS, черги пакетної обробки або гарантованої точності. Введений текст не відправляється на сервер застосунку, але браузер завантажує статичні файли з хостингу; Google Fonts підключені зовнішнім CSS імпортом. Результати OpenIPA та UFPN залишаються експериментальними й потребують незалежної фонетичної перевірки.

## Статус перевірки

- Feature CI run 45179583235: build passed, 46/46 tests passed, `npm run check` passed.
- Main CI run 45192430970: build passed, 46/46 tests passed, `npm run check` passed.
- Pages deploy у main run завершився помилкою пошуку artifacts; потрібен чистий новий run.
- Локальний браузерний smoke test та Chromium/Firefox/WebKit accessibility QA ще не виконані.
