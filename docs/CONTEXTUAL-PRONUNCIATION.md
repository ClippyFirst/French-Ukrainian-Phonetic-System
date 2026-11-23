# Контекстна вимова

Реалізовано лише обмежену підмножину:
- elision prefixes: j', l', d', n', s', m', t', c', qu';
- liaison для невеликого набору словникових форм із latent consonant перед голосною;
- пунктуація блокує liaison heuristic;
- кілька h aspiré слів блокують heuristic.

Це НЕ повна класифікація liaison obligatoire/facultative/interdite. Немає синтаксичного аналізу, POS, повного списку h muet/h aspiré, enchaînement, повної schwa deletion чи syllabification. UT Austin дає навчальний поділ на три типи liaison (S4). Надалі правила мають мати rule ID, profile, source, input span, IPA output та confidence.
