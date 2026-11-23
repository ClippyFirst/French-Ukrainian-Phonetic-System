# French–Ukrainian Phonetic System

Дослідницький вебінструмент: французький текст → IPA → експериментальна українська нотація UFPN та допоміжний Latin guide. **Це ранній прототип, не академічно затверджений стандарт і не повний вимовний словник.**

## Запуск
Node.js 20+ потрібен лише для тестів. Сайт статичний, без runtime-залежностей.

```bash
npm test
npm run check
python3 -m http.server 8000
```

Відкрийте http://localhost:8000. GitHub Pages workflow публікує кореневу директорію після ввімкнення Pages у налаштуваннях репозиторію.

## Зараз працює
- Синхронізовані IPA, UFPN та Latin guide.
- IPA — єдине джерело для обох адаптерів.
- Невеликий provisional seed-лексикон, низьковпевнений графемний fallback.
- Обмежені шаблони liaison та elision.
- Послівні пояснення, provenance, альтернативи й видиме попередження.
- Copy, TXT, browser print-to-PDF, адаптивний інтерфейс.

## Обмеження
Немає повної морфології/POS, дизамбіґуації омографів, повної liaison/schwa/enchaînement моделі, числівників, власних назв, регіональних профілів, аудіо та експертно верифікованого benchmark. Невідомі форми можуть бути неправильними. Не використовуйте результат як авторитетну транскрипцію без перевірки.

## Документація
[Архітектура](ARCHITECTURE.md) · [Фонологія](docs/PHONOLOGY.md) · [UFPN](docs/UKRAINIAN-NOTATION.md) · [IPA mapping](docs/IPA-MAPPING.md) · [Французькі правила](docs/FRENCH-RULES.md) · [Контекст](docs/CONTEXTUAL-PRONUNCIATION.md) · [Джерела](docs/SOURCE-REGISTRY.md) · [Бенчмарки](docs/BENCHMARKS.md) · [Тести](docs/TESTING.md) · [Roadmap](docs/ROADMAP.md) · [Changelog](docs/CHANGELOG.md) · [Матриця](docs/EXECUTION-MATRIX.md) · [Аудит](docs/AUDIT.md) · [Handoff](HANDOFF.md)

## Ліцензія
Ліцензію цього репозиторію поки не обрано. Відсутність LICENSE означає, що права на повторне використання коду не надані автоматично. OpenIPA не копіювався; ліцензійний аналіз — у Source Registry.
