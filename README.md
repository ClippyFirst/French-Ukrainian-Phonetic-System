# French–Ukrainian Phonetic System

Дослідницький вебінструмент: французький текст → IPA → експериментальна українська нотація UFPN та допоміжний Latin guide. Це прототип, не академічно затверджений стандарт і не повний вимовний словник.

## Запуск

Node.js 20+ потрібен для тестів; сайт статичний, без runtime-залежностей.

```bash
npm test
npm run check
python3 -m http.server 8000
```

Відкрийте http://localhost:8000. GitHub Pages workflow публікує кореневу директорію після налаштування Pages.

## Зараз працює
- Синхронізовані IPA, UFPN та Latin guide.
- IPA — єдиний вхід для UFPN adapter.
- UFPN має Basic / Detailed / Extended режими.
- Mapping містить 37 сегментних одиниць, 15 allophone mappings, 24 діакритичні/просодичні маркери й 13 вимірів фонетичних характеристик.
- Невідомі IPA символи не губляться: позначаються й потрапляють у список unsupported.
- Регіональні Québec affrication/diphthongization та cross-word assimilation описані окремо й не застосовуються до Metropolitan French за замовчуванням.
- Попередній seed-лексикон, low-confidence fallback, вузькі liaison/elision шаблони.
- Послівні пояснення, provenance, copy, TXT і browser print-to-PDF.

## Обмеження
Немає повної морфології/POS, дизамбіґуації омографів, повної liaison/schwa/enchaînement моделі, числівників, власних назв, регіональних G2P профілів, аудіо й експертно верифікованого benchmark. Невідомі форми можуть бути неправильними. UFPN експериментальна й потребує незалежної перевірки.

## Документація
[Архітектура](ARCHITECTURE.md) · [Фонологія](docs/PHONOLOGY.md) · [UFPN](docs/UKRAINIAN-NOTATION.md) · [IPA mapping](docs/IPA-MAPPING.md) · [Правила](docs/FRENCH-RULES.md) · [Контекст](docs/CONTEXTUAL-PRONUNCIATION.md) · [Джерела](docs/SOURCE-REGISTRY.md) · [Бенчмарки](docs/BENCHMARKS.md) · [Тести](docs/TESTING.md) · [Матриця](docs/EXECUTION-MATRIX.md) · [Аудит](docs/AUDIT.md) · [Handoff](HANDOFF.md)

## Ліцензія
Ліцензію репозиторію поки не обрано. OpenIPA не копіювався; див. Source Registry.
