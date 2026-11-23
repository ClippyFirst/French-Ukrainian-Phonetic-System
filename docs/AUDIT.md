# Audit Register

## Старт
main; SHA b7c74e2829d34cd8baa6f418d93e95c1a6a6d6ed; один README heading; PR 0; branch main only; Actions runs 0; не було коду, матриць, тестів або handoff.

## Ризики
- UFPN не є стандартом: експериментальна нотація, потрібна перевірка фонетиста.
- G2P fallback неповний: невідомі форми low confidence.
- Liaison heuristic вузька: не POS/syntax parser.
- Gold benchmark відсутній: accuracy не заявляється.
- OpenIPA AGPL-3.0: clean-room; чужий код/активи не скопійовані.
- git clone заблокований DNS; віддалені коміти через GitHub connector API.

## Незакриті acceptance criteria
Експертна IPA/UFPN перевірка; ліцензований gold corpus; повна морфологія/context; browser/accessibility/mobile QA; live Pages validation; вибір LICENSE власником.
