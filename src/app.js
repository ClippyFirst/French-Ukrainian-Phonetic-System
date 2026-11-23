import {transcribe,describeSegment} from './engine.js';
import {renderUfpn,UFPN_MAPPING} from './ufpn.js';
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
 for(const key of ['ipa','ufpn','romanized']){const target=$(key+'-output');target.replaceChildren();result.words.forEach((w,i)=>{if(w.kind==='separator'){target.append(document.createTextNode(w[key]));return}const b=document.createElement('button');b.type='button';b.className='word-token'+(w.confidence==='low'?' low-confidence':'');b.dataset.index=i;b.textContent=w[key];b.title=w.text+' → '+w.ipa;b.setAttribute('aria-label',w.text+': '+w[key]+'; '+w.confidence);target.append(b)})}
 $('status').textContent=text.trim()?'Оброблено '+result.words.filter(w=>w.kind==='word').length+' словоформ · '+result.profile+' · UFPN '+level:'Готово до введення';
 $('uncertainty').hidden=!result.warnings.length;$('uncertainty').textContent=result.warnings.length?'Потребують перевірки: '+result.warnings.join(', ')+'. Низька впевненість означає, що вимову не підтверджено словником.':'';
}
function detail(i){const w=result?.words[i];if(!w||w.kind!=='word')return;$('detail-title').textContent=w.text+' → '+w.ipa;$('detail-body').textContent=w.explanation;$('detail-meta').textContent=['UFPN: '+w.ufpn,'Latin guide: '+w.romanized,'Provenance: '+w.source,'Упевненість: '+w.confidence,w.alternatives.length?'Альтернативи: '+w.alternatives.join(' / '):'','Сегменти: '+w.segments.map(s=>s+' — '+describeSegment(s)).join(' · '),w.ufpnUnsupported?.length?'Непідтримані IPA: '+w.ufpnUnsupported.join(', '):''].filter(Boolean).join(' | ');document.querySelectorAll('.word-token').forEach(b=>b.classList.toggle('selected',Number(b.dataset.index)===i))}
async function copy(text){try{await navigator.clipboard.writeText(text);$('status').textContent='Скопійовано'}catch{$('status').textContent='Буфер обміну недоступний у цьому браузері'}}
source.addEventListener('input',render);$('profile').addEventListener('change',render);levelSelect.addEventListener('change',render);
$('clear').addEventListener('click',()=>{source.value='';render();source.focus()});
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{source.value=b.dataset.example;render()}));
document.querySelectorAll('.output').forEach(p=>p.addEventListener('click',e=>{const b=e.target.closest('.word-token');if(b)detail(Number(b.dataset.index))}));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(result?.[b.dataset.copy]||'')));
$('copy-all').addEventListener('click',()=>copy(['French: '+result.text,'IPA: '+result.ipa,'UFPN ('+levelSelect.value+'): '+result.ufpn,'Latin guide: '+result.romanized].join('\n')));
$('export-txt').addEventListener('click',()=>{const blob=new Blob([['French: '+result.text,'IPA: '+result.ipa,'UFPN ('+levelSelect.value+'): '+result.ufpn,'Latin guide: '+result.romanized,'Позначені форми потребують перевірки.'].join('\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='french-ukrainian-phonetics.txt';a.click();URL.revokeObjectURL(url)});
$('export-pdf').addEventListener('click',()=>window.print());$('show-explanations').addEventListener('change',e=>$('explain-panel').hidden=!e.target.checked);
const reference=document.createElement('details');reference.className='ufpn-reference';
const refSummary=document.createElement('summary');refSummary.textContent='Довідник UFPN · фонеми, алофони та фонетичні виміри';reference.append(refSummary);
const refIntro=document.createElement('p');refIntro.textContent='Пошуковий довідник українських відповідників. Варіантні й регіональні форми не вмикаються автоматично без відповідного профілю або вузького IPA.';reference.append(refIntro);
const refSearch=document.createElement('input');refSearch.type='search';refSearch.placeholder='Шукати IPA, UFPN або артикуляцію…';refSearch.setAttribute('aria-label','Пошук у довіднику UFPN');reference.append(refSearch);
const refTable=document.createElement('table');refTable.innerHTML='<thead><tr><th>IPA</th><th>Basic</th><th>Detailed</th><th>Extended</th><th>Опис / статус</th></tr></thead><tbody></tbody>';reference.append(refTable);
const refBody=refTable.querySelector('tbody');
const referenceRows=[...UFPN_MAPPING.phonemes,...UFPN_MAPPING.allophoneMappings];
function renderReference(query=''){
 refBody.replaceChildren();
 for(const item of referenceRows){
  const description=item.descriptionUk||item.description||'';
  const status=item.phonologicalStatus||item.evidenceStatus||'';
  const haystack=[item.ipa,item.basic,item.detailed,item.extended,description,status,(item.sources||[]).join(' ')].join(' ').toLocaleLowerCase();
  if(query&&!haystack.includes(query.toLocaleLowerCase()))continue;
  const tr=document.createElement('tr');
  for(const value of [item.ipa,item.basic,item.detailed,item.extended,description+' · '+status]){
   const td=document.createElement('td');td.textContent=value;tr.append(td);
  }
  refBody.append(tr);
 }
}
refSearch.addEventListener('input',()=>renderReference(refSearch.value.trim()));
renderReference();
const featureDetails=document.createElement('details');featureDetails.className='ufpn-features';
const featureSummary=document.createElement('summary');featureSummary.textContent='Повний перелік фонетичних вимірів';featureDetails.append(featureSummary);
const featureList=document.createElement('ul');
for(const feature of UFPN_MAPPING.featureDimensions){
 const li=document.createElement('li');li.textContent=feature.dimension+': '+feature.values.join(', ')+' — '+feature.status+'. '+feature.ufpn;featureList.append(li);
}
featureDetails.append(featureList);reference.append(featureDetails);
document.querySelector('.workspace').after(reference);

render();
