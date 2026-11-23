# Benchmarks

| Рівень | Обсяг | Ціль проходження | Статус |
|---|---|---|---|
| A | Базові фонеми/графеми | ≥95% phoneme accuracy на незалежному gold set | BLOCKED: gold set відсутній |
| B | Складні графеми, носові, liaison/elision | PER ≤5%, context precision/recall ≥95% | BLOCKED |
| C | Довгі фрази, POS, омографи, числа, імена | PER ≤8% із оцінкою alternatives/uncertainty | BLOCKED |
| D | Розмовна мова, регіональні профілі | окремий gold set, PER ≤10% у кожному | DEFERRED |

Пороги — майбутні acceptance targets, не результати. Gold IPA entries: 0 незалежно верифікованих; UFPN gold labels: 0. PER/WER не обчислювалися. 11 unit tests перевіряють кодові інваріанти, не лінгвістичну точність.

Кожен gold record повинен містити input, profile, IPA, допустимі альтернативи, UFPN, source/version/page/license, context/POS, confidence та reviewer. Не включати вимову, виведену лише з графем.
