# Контекстна фонетика та варіативність

| Процес | Що аналізувати | Необхідні дані | Стан |
|---|---|---|---|
| Liaison | obligatory/optional/forbidden, латентна приголосна, lexicalized variation | лексикон, POS, синтаксис, стиль | PARTIAL: вузькі seed-шаблони |
| Enchaînement | перенесення вимовленої кінцевої приголосної до наступного складу | межа слова, голосний onset, syllabification | TODO |
| Élision | contraction, h muet/h aspiré, lexical class | лексичні класи й морфологія | PARTIAL |
| Schwa | realization, deletion, gradient reduction, epenthesis | лексема, кластери, просодія, діалект, стиль, темп | TODO |
| Resyllabification | складові межі на стику слів | сегментний ряд, просодичні межі | TODO |
| Nasal coarticulation | прогресивна/регресивна назалізація | вузький IPA або акустика | TODO |
| Mid-vowel height | loi de position, висота/тривалість, neutralization | лексикон, склад, профіль | TODO |
| Assimilation/lenition | місце, дзвінкість, спосіб | сусідні сегменти, межі, профіль | TODO |
| Prosody | accentual phrase, prominence, boundary tones | синтаксис/дискурс + аудіо | TODO |

## Liaison

Класи obligatory, optional, forbidden корисні для опису, але не є повною детерміністичною граматикою. Корпусне дослідження 27 788 liaison sites показує велику периферію змінних liaison і роль лексичної інформації, частотності та соціостилістичних факторів. [S5]

## Schwa

Не об'єднувати в один процес:
- лексичну alternation /ə/ ~ ∅;
- градієнтну фонетичну редукцію [ə];
- епентетичний schwa;
- excrescent vocoid;
- dialect-specific retention/deletion.

Дослідження південних діалектів на 7 787 випадках і 45 мовцях демонструє роль лексичної частотності, граматичної категорії, сонорності та попередньої приголосної. [S14] Дослідження редукції schwa застерігає від ототожнення фонологічного видалення з акустичним послабленням. [S15]

## Prosody

Французький accentual phrase має фразову організацію виділеності; наголос не можна ставити на кожному слові як у мовах із лексичним наголосом. Тривалість, інтенсивність і F0 залежать від межі фрази та синтаксису. [S7,S22] Тому ˈ, ˌ, ː, ‖, ↗, ↘ у UFPN Extended мають бути лише при наявності просодичної розмітки/аудіо, а не виводитися з пунктуації.

## Межі слів

- liaison додає латентний приголосний;
- enchaînement переносить уже вимовлений кінцевий приголосний до наступного складу;
- élision змінює орфографічну/морфофонологічну форму;
- resyllabification змінює складову організацію без обов'язкового додавання сегмента.

Ці процеси повинні мати різні rule IDs, output spans та provenance.

## Québec profile: affrication and diphthongization

The regional profile now records two evidence-backed but not yet executable processes: coronal-stop affrication [t͡s]/[d͡z] before high front vowels/glides, and lengthening/diphthongization of selected stressed vowels. Neither is applied to Metropolitan French. The latter must remain an annotated sequence/phonetic realization, not a guessed fixed diphthong. [S25–S27]

## Асиміляція місця та дзвінкості

- Не робити /n/→/ŋ/ безумовним правилом: для /n/+велярний stop описано проміжні реалізації [n n͡ŋ] із градієнтним перекриттям жестів. [S29]
- /s/ може озвончуватися, а /z/ оглушуватися регресивно перед проривними через межу слів; ступінь зміни залежить від темпу й просодичної когезії. [S30]
- Basic/Detailed зберігають фонологічний сегмент; Extended відображає с̬, з̥ або н͡нґ лише за наявності narrow IPA/аудіодоказу.
