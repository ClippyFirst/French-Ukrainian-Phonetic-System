/** IPA is the sole input to both orthographic adapters. Prototype, not a complete French G2P engine. */
import {renderUfpn as renderUfpnAdapter, adaptIpa as adaptIpaAdapter, UFPN_INVENTORY, UFPN_MAPPING} from './ufpn.js';
import {transcribeFrenchWordDetailed,transcribeFrenchTextDetailed} from './french-g2p.js';
export const INVENTORY=UFPN_INVENTORY;
export const LATIN_GUIDE={p:'p',b:'b',t:'t',d:'d',k:'k',g:'g','ɡ':'g',f:'f',v:'v',s:'s',z:'z','ʃ':'sh','ʒ':'zh',m:'m',n:'n','ɲ':'ny','ŋ':'ng',l:'l','ʁ':'rh',j:'y','ɥ':'ü',w:'w',i:'i',e:'é','ɛ':'è',a:'a',y:'ü','ø':'ö','œ':'œ',u:'ou',o:'ó','ɔ':'ò','ə':'ə','ɑ̃':'an','ɛ̃':'in','ɔ̃':'on','œ̃':'un','χ':'kh','ɣ':'gh','ʁ̞':'rh','ʀ':'rr','ɾ':'r̆','r':'r','ɹ':'r','x':'kh','t͡s':'ts','d͡z':'dz','t͜s':'ts','d͜z':'dz','n͡ŋ':'n-ng','s̬':'s-voiced','z̥':'z-devoiced','ː':':','ˑ':':','‿':'-','‖':'||','↗':'-rise','↘':'-fall','[':'[',']':']'};
const tokensOf=ipa=>{const keys=Object.keys(INVENTORY).sort((a,b)=>b.length-a.length),raw=ipa.replace(/[.ˈˌ|]/g,'');const out=[];for(let i=0;i<raw.length;){const t=keys.find(k=>raw.startsWith(k,i));if(t){out.push(t);i+=t.length}else{out.push(raw[i++])}}return out};
const map=(tokens,table)=>tokens.map(t=>table[t]??(/^\s+$/u.test(t)?t:'⟦'+t+'⟧')).join('');
export function transcribe(text,options={}){
 const profile=options.profile||'metropolitan-fr';
 const normalized=String(text??'').normalize('NFC');
 const matches=[...normalized.matchAll(/aujourd[’']hui|(?:qu|[jlnsmtdc])[’']|[\p{L}]+(?:[’'][\p{L}]+)*|[\p{N}]+|[^\p{L}\p{N}]+/giu)];
 const parsedText=transcribeFrenchTextDetailed(normalized,{
  profile,
  liaison:profile==='lyric-diction-fr',
  elision:profile==='lyric-diction-fr'
 });
 const words=[];
 for(const match of matches){
  const raw=match[0],partStart=match.index??0,partEnd=partStart+raw.length;
  if(/^\p{N}+$/u.test(raw)){
   words.push({kind:'word',text:raw,ipa:'???',ufpn:'???',romanized:'???',segments:[],confidence:'low',source:'unsupported-number',explanation:'Числівники ще не підтримуються.',alternatives:[],profile,liaisonApplied:false});
   continue;
  }
  if(!/^\p{L}/u.test(raw)){
   words.push({kind:'separator',text:raw,ipa:raw,ufpn:raw,romanized:raw,segments:[]});
   continue;
  }
  const key=raw.toLocaleLowerCase('fr').replace(/[’]/g,"'");
  const parserTrace=parsedText.trace.filter(item=>
   (item.boundary&&item.start===partEnd)||
   (!item.boundary&&item.start>=partStart&&item.end<=partEnd)
  ).map(item=>({...item,start:item.start-partStart,end:item.end-partStart}));
  const boundaryTrace=parserTrace.filter(item=>item.boundary);
  const parserIpa=parserTrace.map(item=>item.ipa).join('');
  const parserSourceIpa=parserTrace.map(item=>item.sourceIpa).join('');
  const g2p=parserIpa?{ipa:parserIpa,sourceIpa:parserSourceIpa,trace:parserTrace}:transcribeFrenchWordDetailed(key,{profile});
  const ipa=g2p.ipa;
  const sourceIpa=g2p.sourceIpa||g2p.ipa;
  const confidence='low';
  const source='openipa-french-engine';
  const explanation='Транскрипція оригінальним rule-based рушієм OpenIPA; незалежна точність довільного слова не виміряна.';
  const alternatives=[];
  const ruleTrace=g2p.trace;
  const liaisonApplied=boundaryTrace.some(item=>item.ipa);
  const segments=tokensOf(ipa);
  words.push({kind:'word',text:raw,ipa,sourceIpa,ufpn:renderUfpnAdapter(ipa,'basic').text,romanized:map(segments,LATIN_GUIDE),segments,confidence,source,explanation,alternatives,ruleTrace,profile,liaisonApplied});
 }
 return{text:normalized,profile,words,ipa:words.map(w=>w.ipa).join(''),ufpn:words.map(w=>w.ufpn).join(''),romanized:words.map(w=>w.romanized).join(''),warnings:[...new Set(words.filter(w=>w.kind==='word'&&w.confidence==='low').map(w=>w.text))]};
}
export function adaptIpa(ipa,level='basic'){const adapted=adaptIpaAdapter(ipa,level);return{...adapted,romanized:map(tokensOf(ipa),LATIN_GUIDE)}}
export function describeSegment(s){
 const special=({'ʁ':'Французький увулярний ротичний; не українське [р].','y':'Передній високий огублений голосний: язик як для [і], губи округлені.','ø':'Передній напівзакритий огублений голосний.','œ':'Передній напіввідкритий огублений голосний.','ɥ':'Огублений передній палатальний апроксимант.','ɑ̃':'Низький задній носовий голосний.','ɛ̃':'Передній носовий голосний; у частини мовців зливається з /œ̃/.','ɔ̃':'Задній огублений носовий голосний.','œ̃':'Передній огублений носовий голосний; у багатьох мовців злитий з /ɛ̃/.','ʀ':'Увулярний тремтливий варіант; окремий графічний знак ще не затверджено.','t͡s':'Глухий альвеолярний африкат; Québec French profile, не Metropolitan default.','d͡z':'Дзвінкий альвеолярний африкат; Québec French profile, не Metropolitan default.','t͜s':'Глухий альвеолярний африкат; варіант розташування tie-bar.','d͜z':'Дзвінкий альвеолярний африкат; варіант розташування tie-bar.','n͡ŋ':'Градієнтне перекриття коронального та велярного носових жестів.','s̬':'Озвончене /s/ у регресивній асиміляції.','z̥':'Оглушене /z/ у регресивній асиміляції.'})[s];
 if(special)return special;
 const record=UFPN_MAPPING.phonemes.find(x=>x.ipa===s)||UFPN_MAPPING.allophoneMappings.find(x=>x.ipa===s);
 return record?.descriptionUk||'Фонологічний сегмент; точна реалізація залежить від контексту й мовця.';
}
