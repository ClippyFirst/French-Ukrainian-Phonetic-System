import mapping from '../data/ufpn-mapping.json' with { type: 'json' };

const $ = id => document.getElementById(id);
const inventory = $('inventory-cards');
const originUk = {
 'Cyrillic hard sign (project-specific UFPN use)':'Проєктне використання кириличного твердого знака',
 'IPA symbol retained (Latin-derived IPA letter)':'Збережений символ МФА',
 'IPA symbol retained (Latin-derived IPA ligature)':'Збережений символ МФА',
 'Kazakh Cyrillic':'Казахська кирилиця',
 'Serbian Cyrillic':'Сербська кирилиця',
 'Belarusian Cyrillic':'Білоруська кирилиця'
};
const soundUk = {
 'ъ':'Центральний середній голосний',
 'ɛ':'Передній напіввідкритий неогублений голосний',
 'œ':'Передній напіввідкритий огублений голосний',
 'ɔ':'Задній напіввідкритий огублений голосний',
 'ғ':'Дзвінкий увулярний фрикативний',
 'ң':'Велярний носовий',
 'њ':'Піднебінний носовий',
 'ө':'Передній напівзакритий огублений голосний',
 'ў':'Губно-велярний апроксимант',
 'ү':'Передній високий огублений голосний'
};
for (const item of mapping.graphemeInventory.adopted) {
 const card=document.createElement('article');card.className='grapheme-card';
 const symbol=document.createElement('strong');symbol.className='grapheme-symbol';symbol.textContent=item.grapheme;
 const info=document.createElement('div');info.className='grapheme-info';
 const ipa=document.createElement('b');ipa.textContent='IPA: '+item.ipa.join(', ');
 const origin=document.createElement('small');origin.textContent=originUk[item.origin]||item.origin;
 const meaning=document.createElement('p');meaning.textContent=soundUk[item.grapheme]||item.value||item.rationale;
 info.append(ipa,origin,meaning);card.append(symbol,info);inventory.append(card);
}
const rows=$('phoneme-rows');
function renderRows(query='') {
 rows.replaceChildren();let count=0;
 for(const item of mapping.phonemes) {
  const values=[item.ipa,item.basic,item.descriptionUk,item.articulation,(item.examples||[]).join(' '),item.pronunciationGuideUk,item.ukrainianExample,item.ukrainianExampleNote];
  if(query&&!values.join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()))continue;
  const tr=document.createElement('tr');
  for(const value of [item.ipa,item.basic,item.descriptionUk,(item.examples||[]).join(', '),[item.pronunciationGuideUk,item.ukrainianExample,item.ukrainianExampleNote].filter(Boolean).join(' ')]) {
   const td=document.createElement('td');td.textContent=value||'—';tr.append(td);
  }
  rows.append(tr);count++;
 }
 $('phoneme-count').textContent='Показано '+count+' із '+mapping.phonemes.length+' сегментних записів. Українські аналогії можуть бути точними, контекстними або лише наближеними.';
}
$('phoneme-search').addEventListener('input',()=>renderRows($('phoneme-search').value.trim()));
renderRows();
