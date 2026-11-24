import {transcribe,describeSegment} from './engine.js';
import {renderUfpn,UFPN_MAPPING} from './ufpn.js';
import {renderUfpnDisplay} from './ufpn-display.js';

const featureDimensionUk={
 'Vowel height/aperture':'Висота й відкритість голосного',
 'Vowel frontness/backness/centrality':'Передність, задність і центральність голосного',
 'Lip rounding':'Огублення губ',
 'Vowel/consonant nasality':'Носовість голосних і приголосних',
 'Segmental duration':'Тривалість сегмента',
 'Vowel trajectory':'Зміна якості голосного',
 'Consonant place of articulation':'Місце творення приголосного',
 'Consonant manner':'Спосіб творення приголосного',
 'Voicing and phonation':'Дзвінкість і тип фонації',
 'Secondary articulation':'Вторинна артикуляція',
 'Segmental processes':'Сегментні процеси',
 'Prosody and voice dynamics':'Просодія та динаміка голосу',
 'Sociophonetic variation':'Соціофонетична варіативність',
 'Aspiration and stop release':'Придих і випуск зімкненого',
 'Syllabicity of consonants/glides':'Складотворчість приголосних і ковзних',
 'Segment length and gemination':'Тривалість сегмента й подвоєння',
 'Speech fluency and disfluency':'Плавність і порушення плавності мовлення',
 'Speech rate and reduction':'Темп мовлення та редукція'
};
const featureValueUk={
 close:'високий (закритий)', 'close-mid':'напівзакритий', 'open-mid':'напіввідкритий', open:'відкритий',
 front:'передній', central:'центральний', back:'задній', advanced:'висунутий уперед', retracted:'відсунений назад',
 rounded:'огублений', unrounded:'неогублений', 'more-rounded':'сильніше огублений', 'less-rounded':'слабше огублений',
 'phonemic nasal vowel':'фонемний носовий голосний', 'gradient progressive/regressive nasalization':'градієнтна прогресивна / регресивна назалізація', 'nasal consonant':'носовий приголосний',
 short:'короткий', 'half-long':'напівдовгий', long:'довгий', 'phrase-final lengthening':'подовження наприкінці фрази',
 monophthong:'монофтонг', diphthong:'дифтонг', triphthong:'трифтонг', centralizing:'централізація', closing:'звуження',
 bilabial:'губно-губний', labiodental:'губно-зубний', dental:'зубний', alveolar:'альвеолярний', postalveolar:'післяальвеолярний', palatal:'палатальний', velar:'велярний', uvular:'увулярний', glottal:'гортанний',
 stop:'проривний', fricative:'фрикативний', approximant:'апроксимант', tap:'одноударний', trill:'тремтливий', nasal:'носовий', lateral:'боковий', affricate:'африкат',
 voiced:'дзвінкий', voiceless:'глухий', 'partial voicing':'часткова дзвінкість', 'partial devoicing':'часткове оглушення', breathy:'придиховий', creaky:'скрипучий',
 palatalized:'палаталізований', labialized:'лабіалізований', velarized:'веляризований', pharyngealized:'фарингалізований',
 assimilation:'асиміляція', coarticulation:'коартикуляція', deletion:'випадіння', epenthesis:'епентеза', elision:'елізія', liaison:'зв’язування', 'enchaînement':'зчеплення слів', resyllabification:'перескладовування', affrication:'африкація', lenition:'ослаблення',
 prominence:'виділеність', 'rhythmic grouping':'ритмічне групування', 'pitch contour':'контур висоти тону', 'boundary tones':'граничні тони', tempo:'темп', intensity:'інтенсивність', 'voice quality':'якість голосу',
 regional:'регіональний', social:'соціальний', age:'віковий', register:'регістр', style:'стиль', 'speaker-specific':'індивідуальний для мовця',
 unaspirated:'без придиху', aspirated:'з придихом', unreleased:'без чутного вибуху', 'nasal release':'носовий випуск', 'lateral release':'боковий випуск',
 syllabic:'складотворчий', 'non-syllabic':'нескладотворчий', resyllabified:'перенесений до іншого складу',
 singleton:'одиничний приголосний', geminate:'подвоєний приголосний', 'emphatic lengthening':'емфатичне подовження', 'boundary-induced lengthening':'подовження на межі',
 pause:'пауза', 'filled pause':'заповнена пауза', repetition:'повтор', repair:'самовиправлення', hesitation:'вагання', restart:'повторний початок',
 careful:'ретельний', normal:'звичайний', fast:'швидкий', compressed:'стислий', reduced:'редукований'
};
const featureStatusUk={
 PARTIALLY_ENCODED:'Закодовано частково', ANNOTATION_ONLY:'Лише анотування', RESEARCH_ONLY:'Лише для досліджень',
 EXTENDED_ONLY:'Лише в розширеному записі', PARTIAL_RESEARCH_REGISTRY:'Частковий дослідницький реєстр',
 PROFILE_METADATA:'Метадані профілю', EXTENDED_AUDIO_ONLY:'Розширений запис лише за аудіоданими',
 EXTENDED_OR_ANALYSIS_ONLY:'Лише розширений запис або аналітичні дані', AUDIO_ANNOTATION_ONLY:'Лише аудіоанотування',
 AUDIO_OR_STYLE_METADATA:'Метадані аудіо або стилю'
};
const featureUfpnUk={
 'vowel-height':'Позначки якості голосного в базовому й докладному записі.',
 'vowel-place':'Основна графема та додаткові знаки розширеного запису.',
 rounding:'Окремі кириличні літери передають /y/ і /ø/; графему œ збережено для /œ/; й̹ (U+0339 під й) передає лабіально-палатальний апроксимант /ɥ/. Тонші ступені огублення зберігаються лише за наявності вузької транскрипції або аудіоданих.',
 nasality:'Тильда позначає фонемні носові голосні; у розширеному записі — лише підтверджену коартикуляцію.',
 duration:'ˑ/ː у докладному й розширеному записі — лише коли ці знаки є у вхідній транскрипції.',
 diphthongization:'Послідовність звуків і сполучна дужка / перехід у розширеному записі; потрібні профіль або аудіодані.',
 'consonant-place':'Основна графема та явні метадані місця творення; не кожне місце має окрему українську літеру.',
 'consonant-manner':'Відповідники сегментів, алофонів і складені африкати зі сполучною дужкою.',
 phonation:'◌̬/◌̥ у розширеному записі; придихова та скрипуча фонація лишаються метаданими, доки немає французьких доказів.',
 'secondary-articulation':'Стандартні модифікатори МФА в розширеному записі.',
 'phonological-processes':'Метадані правил, альтернативи, походження та окремі позначки розширеного запису.',
 prosody:'ˈ ˌ ‖ ↗ ↘ і додаткові метадані; потрібні аудіодані.',
 variation:'Ідентифікатори профілів та альтернативи; варіанти не зводяться до одного типового.',
 'aspiration-release':'ʰ, ◌̚, ⁿ, ˡ у розширеному записі; типова французька вимова не має придиху — позначаються лише спостережені випадки.',
 syllabicity:'◌̩ та ◌̯ у розширеному або докладному записі, якщо ці ознаки надані.',
 gemination:'ː/ˑ і вирівнювання сегментів; потрібні аудіо- або лексичні докази.',
 'speech-fluency':'Окремий шар часового анотування; не кодується діакритиками сегментів.',
 'speech-rate':'Метадані профілю й контексту; впливають на звук ə та зв’язування та коартикуляцію, але не мають одного окремого знака.'
};
const inventoryOriginUk={
 'IPA symbol retained (Latin-derived IPA letter)':'Збережений символ МФА (літера латинського походження)',
 'IPA symbol retained (Latin-derived IPA ligature)':'Збережений символ МФА (лігатура латинського походження)',
 'Kazakh Cyrillic':'Казахська кирилиця', 'Serbian Cyrillic':'Сербська кирилиця',
 'Belarusian Cyrillic':'Білоруська кирилиця', 'Russian and Belarusian Cyrillic':'Російська й білоруська кирилиця'
};
const inventoryRationaleUk={
 'ə':'Зберігаємо точну графему МФА як самостійну основу UFPN; не замінюємо її сторонньою кириличною голосною.',
 'ɛ':'Зберігаємо точну графему МФА як самостійну основу UFPN; носовість позначаємо комбінованою тильдою.',
 'œ':'Зберігаємо точну графему МФА як самостійну основу UFPN; носовість позначаємо комбінованою тильдою.',
 'ɔ':'Зберігаємо точну графему МФА як самостійну основу UFPN; носовість позначаємо комбінованою тильдою.',
 'ғ':'Казахська Ғ має усталене значення дзвінкого увулярного фрикативного /ʁ/; це усуває потребу в колишньому поєднанні діакритик над х.',
 'ң':'Казахська Ң — окрема літера для велярного носового /ŋ/.',
 'њ':'Сербська Њ — окрема літера для /ɲ/, на відміну від українського нь, що передає /nʲ/.',
 'ө':'Казахська Ө має усталене значення переднього огубленого /ø/ напівзакритого підняття й безпосередньо відповідає французькому /ø/.',
 'ў':'Білоруська ў — відома нескладова графема у з фонетично засвідченою реалізацією типу [w]. Аналізи білоруської мови різняться щодо статусу цього звука; UFPN запозичує графему для французького /w/, не переносячи білоруських фонологічних правил.',
 'ү':'Казахська Ү має усталене значення переднього огубленого /y/ високого підняття й безпосередньо відповідає французькому /y/.',
 'ы':'[ɨ] — високий центральний неогублений голосний; французький /ə/ — змінний центральний голосний середнього підняття, тому це не тотожні звуки.',
 'ё':'Зазвичай передає йотований звук або залежить від контексту; це не стабільний однофонемний знак для /ø/ чи /œ/.'
};
const phonologyStatusUk={
 CORE:'Основна фонема', MARGINAL:'Маргінальна фонема', VARIABLE:'Варіативна реалізація',
 PERIPHERAL:'Периферійна фонема', VARIANT_OR_PERIPHERAL:'Варіантна або периферійна реалізація',
 LITERATURE_SUPPORTED_NOT_EXPERT_REVIEWED:'Підтримано фаховою літературою; незалежної експертної перевірки ще немає',
 PARTIAL_MANNER_NOT_ENCODED:'Спосіб творення враховано частково, але не закодовано'
};
const localizeTechnicalText=value=>String(value??'').replaceAll('provenance','походження').replaceAll('tie-bar placement','розташування сполучної дужки').replaceAll('schwa','звук ə');
const $=id=>document.getElementById(id),source=$('source');let result;
const levelLabel=document.createElement('label');levelLabel.textContent='Деталізація UFPN';
const levelSelect=document.createElement('select');levelSelect.id='ufpn-level';
levelSelect.setAttribute('aria-label','Рівень деталізації української фонетичної нотації');
for(const [value,label] of [['basic','Базовий · зручний для читання'],['detailed','Докладний · склади й довгота'],['extended','Розширений · вузька фонетика']]){
 const option=document.createElement('option');option.value=value;option.textContent=label;levelSelect.append(option);
}
levelLabel.append(levelSelect);document.querySelector('.workspace > .bar').append(levelLabel);
function render(){
 const text=source.value,level=levelSelect.value;result=transcribe(text,{profile:$('profile').value});
 for(const w of result.words){if(w.kind==='separator'){w.ufpn=w.text;continue}if(w.ipa==='???'){w.ufpn='???';w.ufpnUnsupported=['???'];continue}const adapted=renderUfpn(w.ipa,level);w.ufpn=adapted.text;w.ufpnUnsupported=adapted.unsupported}
 result.ufpn=result.words.map(w=>w.ufpn).join('');$('char-count').textContent=text.length+' символів';
 for(const key of ['ipa','ufpn','romanized']){const target=$(key+'-output');target.replaceChildren();result.words.forEach((w,i)=>{if(w.kind==='separator'){target.append(document.createTextNode(w[key]));return}const b=document.createElement('button');b.type='button';b.className='word-token'+(w.confidence==='low'?' low-confidence':'');b.dataset.index=i;if(key==='ufpn')renderUfpnDisplay(b,w[key]);else b.textContent=w[key];b.title=w.text+' → '+w.ipa;b.setAttribute('aria-label',w.text+': '+w[key]+'; впевненість: '+({low:'низька',medium:'середня',high:'висока'}[w.confidence]||w.confidence));target.append(b)})}
 $('status').textContent=text.trim()?'Оброблено '+result.words.filter(w=>w.kind==='word').length+' словоформ · '+({ 'metropolitan-fr':'основний профіль', 'lyric-diction-fr':'профіль вокальної дикції' }[result.profile]||'профіль OpenIPA')+' · UFPN '+({basic:'базовий',detailed:'докладний',extended:'розширений'}[level]):'Готово до введення';
 $('uncertainty').hidden=!result.warnings.length;$('uncertainty').textContent=result.warnings.length?'Потребують перевірки: '+result.warnings.join(', ')+'. Низька впевненість означає, що вимову не підтверджено словником.':'';
}
function detail(i){const w=result?.words[i];if(!w||w.kind!=='word')return;$('detail-title').textContent=w.text+' → '+w.ipa;$('detail-body').textContent=w.explanation+(w.ruleTrace?.length?'\n\n'+w.ruleTrace.map(r=>r.grapheme+' → '+(r.ipa||'∅')+' — '+'Правило OpenIPA: '+r.explanationUk).join('\n'):'');$('detail-meta').textContent=['UFPN: '+w.ufpn,'Латинська підказка: '+w.romanized,'Джерело: '+(w.source==='openipa-french-engine'?'рушій транскрипції OpenIPA':w.source==='unsupported-number'?'числівник, який поки не підтримується':w.source),'Упевненість: '+({low:'низька',medium:'середня',high:'висока'}[w.confidence]||w.confidence),w.alternatives.length?'Альтернативи: '+w.alternatives.join(' / '):'','Сегменти: '+w.segments.map(s=>s+' — '+describeSegment(s)).join(' · '),w.ufpnUnsupported?.length?'Непідтримані IPA: '+w.ufpnUnsupported.join(', '):''].filter(Boolean).join(' | ');document.querySelectorAll('.word-token').forEach(b=>b.classList.toggle('selected',Number(b.dataset.index)===i))}
async function copy(text){try{await navigator.clipboard.writeText(text);$('status').textContent='Скопійовано'}catch{$('status').textContent='Буфер обміну недоступний у цьому браузері'}}
source.addEventListener('input',render);$('profile').addEventListener('change',render);levelSelect.addEventListener('change',render);
$('clear').addEventListener('click',()=>{source.value='';render();source.focus()});
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{source.value=b.dataset.example;render()}));
document.querySelectorAll('.output').forEach(p=>p.addEventListener('click',e=>{const b=e.target.closest('.word-token');if(b)detail(Number(b.dataset.index))}));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(result?.[b.dataset.copy]||'')));
$('copy-all').addEventListener('click',()=>copy(['Французький текст: '+result.text,'IPA: '+result.ipa,'UFPN ('+({basic:'базовий',detailed:'докладний',extended:'розширений'}[levelSelect.value])+'): '+result.ufpn,'Латинська підказка: '+result.romanized].join('\n')));
$('export-txt').addEventListener('click',()=>{const blob=new Blob([['Французький текст: '+result.text,'IPA: '+result.ipa,'UFPN ('+({basic:'базовий',detailed:'докладний',extended:'розширений'}[levelSelect.value])+'): '+result.ufpn,'Латинська підказка: '+result.romanized,'Позначені форми потребують перевірки.'].join('\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='french-ukrainian-phonetics.txt';a.click();URL.revokeObjectURL(url)});
$('export-pdf').addEventListener('click',()=>window.print());$('show-explanations').addEventListener('change',e=>$('explain-panel').hidden=!e.target.checked);
const reference=document.createElement('section');reference.id='ukrainian-sound-reference';reference.className='ufpn-reference';
const refTitle=document.createElement('h2');refTitle.textContent='Буква — звук — українське слово';reference.append(refTitle);
const refIntro=document.createElement('p');refIntro.textContent='Колонка «Як вимовити» пояснює артикуляцію кожного звука. Далі показано, чи можна почути його в нормативній українській вимові. «Контекстний» означає позиційний алофон; «наближений» — схожий, але не тотожний звук. Якщо точного відповідника немає, ми так і пишемо — без вигаданих прикладів.';reference.append(refIntro);
const refSearch=document.createElement('input');refSearch.type='search';refSearch.placeholder='Шукати літеру, IPA або українське слово…';refSearch.setAttribute('aria-label','Пошук у таблиці українських звукових відповідників');reference.append(refSearch);
const ukrTable=document.createElement('table');ukrTable.className='ukrainian-sound-table';ukrTable.innerHTML='<thead><tr><th>Літера UFPN</th><th>Звук (IPA)</th><th>Як вимовити</th><th>Де почути в українській</th><th>Відповідність</th></tr></thead><tbody></tbody>';reference.append(ukrTable);
const ukrBody=ukrTable.querySelector('tbody');
const statusLabels={EXACT:'Точний звук',CONTEXTUAL:'У певній позиції',APPROXIMATE:'Лише наближення',NONE:'Немає точного відповідника'};
function renderReference(query=''){
 ukrBody.replaceChildren();
 for(const item of UFPN_MAPPING.phonemes){
  const haystack=[item.basic,item.ipa,item.pronunciationGuideUk,item.ukrainianExample,item.ukrainianExampleNote,item.ukrainianExampleStatus].join(' ').toLocaleLowerCase();
  if(query&&!haystack.includes(query.toLocaleLowerCase()))continue;
  const tr=document.createElement('tr');
  const values=[item.basic,item.ipa,item.pronunciationGuideUk||'Інструкція ще не додана.',item.ukrainianExample+(item.ukrainianExampleNote?' — '+item.ukrainianExampleNote:''),statusLabels[item.ukrainianExampleStatus]||item.ukrainianExampleStatus];
  for(const [index,value] of values.entries()){const td=document.createElement('td');td.textContent=value;if(index===3)td.dataset.status=item.ukrainianExampleStatus;tr.append(td)}
  ukrBody.append(tr);
 }
}
refSearch.addEventListener('input',()=>renderReference(refSearch.value.trim()));
renderReference();
const technicalDetails=document.createElement('details');technicalDetails.className='ufpn-technical';
const technicalSummary=document.createElement('summary');technicalSummary.textContent='Довідкова таблиця IPA → базовий / докладний / розширений';technicalDetails.append(technicalSummary);
const refTable=document.createElement('table');refTable.className='ipa-mapping-table';refTable.innerHTML='<thead><tr><th>IPA</th><th>Базовий</th><th>Докладний</th><th>Розширений</th><th>Опис / статус</th></tr></thead><tbody></tbody>';technicalDetails.append(refTable);
const refBody=refTable.querySelector('tbody');
const referenceRows=[...UFPN_MAPPING.phonemes,...UFPN_MAPPING.allophoneMappings];
function renderTechnicalReference(){
 refBody.replaceChildren();
 for(const item of referenceRows){
  const description=localizeTechnicalText(item.descriptionUk||item.description||'');
  const rawStatus=item.phonologicalStatus||item.evidenceStatus||'';const status=phonologyStatusUk[rawStatus]||featureStatusUk[rawStatus]||rawStatus;
  const tr=document.createElement('tr');
  for(const [index,value] of [item.ipa,item.basic,item.detailed,item.extended,description+' · '+status].entries()){
   const td=document.createElement('td');
   if(index>=1&&index<=3)renderUfpnDisplay(td,value);else td.textContent=value;
   tr.append(td);
  }
  refBody.append(tr);
 }
}
renderTechnicalReference();reference.append(technicalDetails);
const featureDetails=document.createElement('details');featureDetails.className='ufpn-features';
const featureSummary=document.createElement('summary');featureSummary.textContent='Повний перелік фонетичних вимірів';featureDetails.append(featureSummary);
const featureList=document.createElement('ul');
for(const feature of UFPN_MAPPING.featureDimensions){
 const li=document.createElement('li');li.textContent=(featureDimensionUk[feature.dimension]||feature.dimension)+': '+feature.values.map(value=>featureValueUk[value]||value).join(', ')+' — '+(featureStatusUk[feature.status]||feature.status)+'. '+(featureUfpnUk[feature.id]||localizeTechnicalText(feature.ufpn));featureList.append(li);
}
featureDetails.append(featureList);reference.append(featureDetails);
const graphemeDetails=document.createElement('details');const graphemeSummary=document.createElement('summary');graphemeSummary.textContent='Графемний склад UFPN';graphemeDetails.append(graphemeSummary);
const graphemeList=document.createElement('ul');for(const item of UFPN_MAPPING.graphemeInventory.adopted){const li=document.createElement('li');li.textContent=item.grapheme+' — '+item.ipa.join(', ')+' ('+(inventoryOriginUk[item.origin]||item.origin)+'): '+(inventoryRationaleUk[item.grapheme]||localizeTechnicalText(item.rationale));graphemeList.append(li)}for(const item of UFPN_MAPPING.graphemeInventory.candidates){const li=document.createElement('li');li.textContent=item.grapheme+' — не призначено: '+(inventoryRationaleUk[item.grapheme]||localizeTechnicalText(item.rationale));graphemeList.append(li)}graphemeDetails.append(graphemeList);reference.append(graphemeDetails);
document.querySelector('.workspace').after(reference);

render();
