import {transcribe,describeSegment} from './engine.js';
import {renderUfpn,UFPN_MAPPING} from './ufpn.js';
import {renderUfpnDisplay} from './ufpn-display.js';
const $=id=>document.getElementById(id),source=$('source');let result;
const levelLabel=document.createElement('label');levelLabel.textContent='Деталізація UFPN';
const levelSelect=document.createElement('select');levelSelect.id='ufpn-level';
levelSelect.setAttribute('aria-label','Рівень деталізації української фонетичної нотації');
for(const [value,label] of [['basic','Basic · читабельно'],['detailed','Detailed · склади й довгота'],['extended','Extended · вузька фонетика']]){
 const option=document.createElement('option');option.value=value;option.textContent=label;levelSelect.append(option);
}
levelLabel.append(levelSelect);document.querySelector('.workspace > .bar').append(levelLabel);
function render(){
 const text=source.value,level=levelSelect.value;result=transcribe(text,{profile:$('profile').value});
 for(const w of result.words){if(w.kind==='separator'){w.ufpn=w.text;continue}if(w.ipa==='???'){w.ufpn='???';w.ufpnUnsupported=['???'];continue}const adapted=renderUfpn(w.ipa,level);w.ufpn=adapted.text;w.ufpnUnsupported=adapted.unsupported}
 result.ufpn=result.words.map(w=>w.ufpn).join('');$('char-count').textContent=text.length+' символів';
 for(const key of ['ipa','ufpn','romanized']){const target=$(key+'-output');target.replaceChildren();result.words.forEach((w,i)=>{if(w.kind==='separator'){target.append(document.createTextNode(w[key]));return}const b=document.createElement('button');b.type='button';b.className='word-token'+(w.confidence==='low'?' low-confidence':'');b.dataset.index=i;if(key==='ufpn')renderUfpnDisplay(b,w[key]);else b.textContent=w[key];b.title=w.text+' → '+w.ipa;b.setAttribute('aria-label',w.text+': '+w[key]+'; '+w.confidence);target.append(b)})}
 $('status').textContent=text.trim()?'Оброблено '+result.words.filter(w=>w.kind==='word').length+' словоформ · '+result.profile+' · UFPN '+level:'Готово до введення';
 $('uncertainty').hidden=!result.warnings.length;$('uncertainty').textContent=result.warnings.length?'Потребують перевірки: '+result.warnings.join(', ')+'. Низька впевненість означає, що вимову не підтверджено словником.':'';
}
function detail(i){const w=result?.words[i];if(!w||w.kind!=='word')return;$('detail-title').textContent=w.text+' → '+w.ipa;$('detail-body').textContent=w.explanation+(w.ruleTrace?.length?'\n\n'+w.ruleTrace.map(r=>r.grapheme+' → '+(r.ipa||'∅')+' — '+r.ruleId+': '+r.explanationUk).join('\n'):'');$('detail-meta').textContent=['UFPN: '+w.ufpn,'Latin guide: '+w.romanized,'Provenance: '+w.source,'Упевненість: '+w.confidence,w.alternatives.length?'Альтернативи: '+w.alternatives.join(' / '):'','Сегменти: '+w.segments.map(s=>s+' — '+describeSegment(s)).join(' · '),w.ufpnUnsupported?.length?'Непідтримані IPA: '+w.ufpnUnsupported.join(', '):''].filter(Boolean).join(' | ');document.querySelectorAll('.word-token').forEach(b=>b.classList.toggle('selected',Number(b.dataset.index)===i))}
async function copy(text){try{await navigator.clipboard.writeText(text);$('status').textContent='Скопійовано'}catch{$('status').textContent='Буфер обміну недоступний у цьому браузері'}}
source.addEventListener('input',render);$('profile').addEventListener('change',render);levelSelect.addEventListener('change',render);
$('clear').addEventListener('click',()=>{source.value='';render();source.focus()});
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{source.value=b.dataset.example;render()}));
document.querySelectorAll('.output').forEach(p=>p.addEventListener('click',e=>{const b=e.target.closest('.word-token');if(b)detail(Number(b.dataset.index))}));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(result?.[b.dataset.copy]||'')));
$('copy-all').addEventListener('click',()=>copy(['French: '+result.text,'IPA: '+result.ipa,'UFPN ('+levelSelect.value+'): '+result.ufpn,'Latin guide: '+result.romanized].join('\n')));
$('export-txt').addEventListener('click',()=>{const blob=new Blob([['French: '+result.text,'IPA: '+result.ipa,'UFPN ('+levelSelect.value+'): '+result.ufpn,'Latin guide: '+result.romanized,'Позначені форми потребують перевірки.'].join('\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='french-ukrainian-phonetics.txt';a.click();URL.revokeObjectURL(url)});
$('export-pdf').addEventListener('click',()=>window.print());$('show-explanations').addEventListener('change',e=>$('explain-panel').hidden=!e.target.checked);
const reference=document.createElement('section');reference.id='ukrainian-sound-reference';reference.className='ufpn-reference';
const refTitle=document.createElement('h2');refTitle.textContent='Буква — звук — українське слово';reference.append(refTitle);
const refIntro=document.createElement('p');refIntro.textContent='У таблиці показано, чи можна почути цей самий звук у нормативній українській вимові. «Контекстний» означає позиційний алофон; «наближений» — схожий, але не тотожний звук. Якщо точного відповідника немає, ми так і пишемо — без вигаданих прикладів.';reference.append(refIntro);
const refSearch=document.createElement('input');refSearch.type='search';refSearch.placeholder='Шукати літеру, IPA або українське слово…';refSearch.setAttribute('aria-label','Пошук у таблиці українських звукових відповідників');reference.append(refSearch);
const ukrTable=document.createElement('table');ukrTable.className='ukrainian-sound-table';ukrTable.innerHTML='<thead><tr><th>Літера UFPN</th><th>Звук (IPA)</th><th>Де почути в українській</th><th>Відповідність</th></tr></thead><tbody></tbody>';reference.append(ukrTable);
const ukrBody=ukrTable.querySelector('tbody');
const statusLabels={EXACT:'Точний звук',CONTEXTUAL:'У певній позиції',APPROXIMATE:'Лише наближення',NONE:'Немає точного відповідника'};
function renderReference(query=''){
 ukrBody.replaceChildren();
 for(const item of UFPN_MAPPING.phonemes){
  const haystack=[item.basic,item.ipa,item.ukrainianExample,item.ukrainianExampleNote,item.ukrainianExampleStatus].join(' ').toLocaleLowerCase();
  if(query&&!haystack.includes(query.toLocaleLowerCase()))continue;
  const tr=document.createElement('tr');
  const values=[item.basic,item.ipa,item.ukrainianExample+(item.ukrainianExampleNote?' — '+item.ukrainianExampleNote:''),statusLabels[item.ukrainianExampleStatus]||item.ukrainianExampleStatus];
  for(const [index,value] of values.entries()){const td=document.createElement('td');td.textContent=value;if(index===3)td.dataset.status=item.ukrainianExampleStatus;tr.append(td)}
  ukrBody.append(tr);
 }
}
refSearch.addEventListener('input',()=>renderReference(refSearch.value.trim()));
renderReference();
const technicalDetails=document.createElement('details');technicalDetails.className='ufpn-technical';
const technicalSummary=document.createElement('summary');technicalSummary.textContent='Технічна таблиця IPA → Basic / Detailed / Extended';technicalDetails.append(technicalSummary);
const refTable=document.createElement('table');refTable.className='ipa-mapping-table';refTable.innerHTML='<thead><tr><th>IPA</th><th>Basic</th><th>Detailed</th><th>Extended</th><th>Опис / статус</th></tr></thead><tbody></tbody>';technicalDetails.append(refTable);
const refBody=refTable.querySelector('tbody');
const referenceRows=[...UFPN_MAPPING.phonemes,...UFPN_MAPPING.allophoneMappings];
function renderTechnicalReference(){
 refBody.replaceChildren();
 for(const item of referenceRows){
  const description=item.descriptionUk||item.description||'';
  const status=item.phonologicalStatus||item.evidenceStatus||'';
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
 const li=document.createElement('li');li.textContent=feature.dimension+': '+feature.values.join(', ')+' — '+feature.status+'. '+feature.ufpn;featureList.append(li);
}
featureDetails.append(featureList);reference.append(featureDetails);
const graphemeDetails=document.createElement('details');const graphemeSummary=document.createElement('summary');graphemeSummary.textContent='Розширений кириличний інвентар';graphemeDetails.append(graphemeSummary);
const graphemeList=document.createElement('ul');for(const item of UFPN_MAPPING.graphemeInventory.adopted){const li=document.createElement('li');li.textContent=item.grapheme+' — '+item.ipa.join(', ')+' ('+item.origin+'): '+item.rationale;graphemeList.append(li)}for(const item of UFPN_MAPPING.graphemeInventory.candidates){const li=document.createElement('li');li.textContent=item.grapheme+' — не призначено: '+item.rationale;graphemeList.append(li)}graphemeDetails.append(graphemeList);reference.append(graphemeDetails);
document.querySelector('.workspace').after(reference);

render();
