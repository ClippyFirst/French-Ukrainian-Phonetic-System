# Французькі правила вимови

Поточний G2P fallback у src/engine.js залишається евристичним longest-match набором. Він не є повною французькою G2P моделлю. Невідомі форми мають low confidence; невстановлені числівники повертають ???.

## Правила, які треба розвивати
- орфографічні відповідності та позиційні правила голосних;
- фінальні приголосні й морфологічні закінчення;
- liaison із лексичним статусом, POS та синтаксисом;
- enchaînement та resyllabification;
- élision та h muet/h aspiré;
- schwa: lexical alternation, deletion, gradient reduction, epenthesis;
- mid-vowel height та loi de position;
- омографи, словозміна, числа, абревіатури, власні назви й запозичення.

## Важливо
Не зводити h aspiré до вимовного [h]: у звичайній французькій це насамперед морфофонологічний клас, що блокує liaison/élision. Не виводити liaison лише за сусідством слів: корпусні дані показують лексичні та стильові обмеження. Schwa deletion не тотожне акустичній редукції. Див. docs/CONTEXTUAL-PRONUNCIATION.md та docs/SOURCE-REGISTRY.md.

Усі French rules мають видавати IPA з rule ID, span, profile, alternatives, confidence та source provenance. UFPN адаптер не читає французькі графеми.
