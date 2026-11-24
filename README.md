# French–Ukrainian Phonetic System

Дослідницький вебсервіс: французький текст → IPA → експериментальна українська нотація UFPN та допоміжний Latin guide. Це не переклад, а спроба показати вимову. Прототип не є академічно затвердженим стандартом і не є повним вимовним словником.

## Вебсервіс

У репозиторії є браузерний застосунок із введенням тексту, трьома синхронними форматами (IPA / UFPN / Latin guide), трьома рівнями деталізації UFPN, профілями OpenIPA, послівним розбором, пошуковим довідником, копіюванням і TXT/PDF експортом.

[Опис функцій, локальний запуск і публікація GitHub Pages](docs/WEB-SERVICE.md).

## Запуск локально

Node.js 20.10+ потрібен для збірки й тестів. Перший запуск збірки завантажує зафіксовану версію esbuild через npx; браузерний runtime зовнішніх залежностей не має.

```bash
npm run build
npm test
npm run check
python3 -m http.server 8000
```

Відкрийте http://localhost:8000. GitHub Pages увімкнено; deployment run 45192891355 успішно опублікував сайт за адресою https://clippyfirst.github.io/French-Ukrainian-Phonetic-System/ . Прямий HTTP/browser smoke test ще потребує перевірки; подробиці — у [WEB-SERVICE.md](docs/WEB-SERVICE.md).

## Зараз працює

- Синхронізовані IPA, UFPN та Latin guide.
- IPA — єдиний вхід для UFPN adapter.
- UFPN має Basic / Detailed / Extended режими та гібридний інвентар: кириличні `ў`, `ү`, `ө`, `њ`, `ң`, `ғ` та збережені IPA-графеми `ɛ`, `œ`, `ɔ` та проєктна кирилична графема `ъ` для IPA `/ə/`; /ɥ/ записується авторською композицією `й̹`, а /ɲ/ — окремою літерою `њ`; у сервісі є таблиця «літера — звук — українське слово».
- Візуальне розміщення діакритик у вебінтерфейсі виконується окремим шаром CSS/DOM; копіювання й експорт зберігають канонічні combining Unicode sequences.
- UFPN не обмежена українською абеткою: `ў` = /w/, `в` = /v/; `ы` та `ё` поки не призначені.
- Mapping містить 37 сегментних одиниць, 15 allophone mappings, 36 діакритичних/просодичних маркерів і 18 вимірів фонетичних характеристик.
- Невідомі IPA символи не губляться: позначаються й потрапляють у список unsupported.
- Регіональні Québec affrication/diphthongization та cross-word assimilation описані окремо й не застосовуються до Metropolitan French за замовчуванням.
- Французький G2P використовує оригінальний rule-based parser OpenIPA (AGPL-3.0), з його letter rules, lexical exceptions, liaison/elision options та rule explanations. Усі французькі слова проходять через оригінальний OpenIPA parser без проєктних словникових override; його IPA надходить безпосередньо до IPA → UFPN адаптера.
- OpenIPA первісно орієнтований на вокальну/ліричну дикцію; його schwa, liaison та elision правила не слід трактувати як повну модель спонтанного Metropolitan French. POS-залежна морфологія та повний контекстний аналіз залишаються обмеженнями upstream рушія.
- Послівні пояснення, provenance, copy, TXT і browser print-to-PDF.
- Пошуковий довідник UFPN з таблицями фонем/алофонів і 18 фонетичними вимірами.

## Обмеження

Немає повної морфології/POS, дизамбіґуації омографів, повної liaison/schwa/enchaînement моделі, числівників, власних назв, регіональних G2P профілів, аудіо й експертно верифікованого benchmark. Невідомі форми можуть бути неправильними. UFPN експериментальна й потребує незалежної перевірки.

## Дизайн

Візуальні принципи та правила доступності: [DESIGN.md](DESIGN.md). Інтерфейс зберігає статичну архітектуру; дизайн-зміни не змінюють фонетичний рушій.

## Документація

[Вебсервіс і хостинг](docs/WEB-SERVICE.md) · [OpenIPA comparison](docs/OPENIPA-COMPARISON.md) · [Архітектура](ARCHITECTURE.md) · [Фонологія](docs/PHONOLOGY.md) · [UFPN](docs/UKRAINIAN-NOTATION.md) · [IPA mapping](docs/IPA-MAPPING.md) · [Правила](docs/FRENCH-RULES.md) · [Контекст](docs/CONTEXTUAL-PRONUNCIATION.md) · [Джерела](docs/SOURCE-REGISTRY.md) · [Бенчмарки](docs/BENCHMARKS.md) · [Тести](docs/TESTING.md) · [Матриця](docs/EXECUTION-MATRIX.md) · [Аудит](docs/AUDIT.md) · [Handoff](HANDOFF.md)

## Ліцензія

Проєкт поширюється за AGPL-3.0. Частина французького G2P рушія взята з [OpenIPA](https://github.com/hfellerhoff/openipa); див. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) та [LICENSE](LICENSE).
