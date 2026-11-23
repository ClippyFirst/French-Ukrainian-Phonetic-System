# Benchmarks

| Рівень | Обсяг | Acceptance target | Результат |
|---|---|---|---|
| A | базові сегменти та UFPN adapter invariants | 100% mapping/schema invariants; окремо ≥95% phoneme accuracy на gold set | adapter tests автоматизовані; gold accuracy NOT MEASURED |
| B | середні/носові голосні, liaison, elision, schwa, assimilation | PER ≤5%, context precision/recall ≥95% | BLOCKED: gold set 0 |
| C | омографи, POS, довгі речення, числа, імена, редукція | PER ≤8%, альтернативи оцінюються окремо | BLOCKED |
| D | спонтанне мовлення, Québec affrication/diphthongization та регіональні профілі | speaker-balanced gold set; PER ≤10% у кожному профілі | DEFERRED |

Метрики: PER, WER, liaison class accuracy, syllabification/resyllabification accuracy, частка непідтверджених сегментів, IPA→UFPN adaptation accuracy, міжекспертна узгодженість, coverage.

Попередні 11 engine tests і нові UFPN adapter tests перевіряють програмні інваріанти, а не лінгвістичну точність. Незалежного gold set немає. PER/WER не обчислювалися. Пороги — acceptance criteria, не виміряні результати.


## UFPN grapheme update
The mapping now uses `ў` for /w/ and `э` for /ɛ, ɛ̃/. These are notation-design decisions, not accuracy claims. The licensed gold IPA/UFPN set remains empty; no PER/WER claim is made.
