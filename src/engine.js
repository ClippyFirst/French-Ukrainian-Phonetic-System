/** IPA is the sole input to both orthographic adapters. Prototype, not a complete French G2P engine. */
import {renderUfpn as renderUfpnAdapter, adaptIpa as adaptIpaAdapter, UFPN_INVENTORY, UFPN_MAPPING} from './ufpn.js';
import {transcribeFrenchWord,transcribeFrenchWordDetailed,transcribeFrenchTextDetailed} from './french-g2p.js';
export const INVENTORY=UFPN_INVENTORY;
export const LATIN_GUIDE={p:'p',b:'b',t:'t',d:'d',k:'k',g:'g','ɡ':'g',f:'f',v:'v',s:'s',z:'z','ʃ':'sh','ʒ':'zh',m:'m',n:'n','ɲ':'ny','ŋ':'ng',l:'l','ʁ':'rh',j:'y','ɥ':'ü',w:'w',i:'i',e:'é','ɛ':'è',a:'a',y:'ü','ø':'ö','œ':'œ',u:'ou',o:'ó','ɔ':'ò','ə':'ə','ɑ̃':'an','ɛ̃':'in','ɔ̃':'on','œ̃':'un','χ':'kh','ɣ':'gh','ʁ̞':'rh','ʀ':'rr','ɾ':'r̆','r':'r','ɹ':'r','x':'kh','t͡s':'ts','d͡z':'dz','t͜s':'ts','d͜z':'dz','n͡ŋ':'n-ng','s̬':'s-voiced','z̥':'z-devoiced','ː':':','ˑ':':','‿':'-','‖':'||','↗':'-rise','↘':'-fall','[':'[',']':']'};
const entry=(ipa,extra={})=>({ipa,confidence:'medium',source:'project-seed-unverified',...extra});
export const LEXICON={bonjour:entry('bɔ̃.ʒuʁ'),merci:entry('mɛʁ.si'),français:entry('fʁɑ̃.sɛ'),française:entry('fʁɑ̃.sɛz'),paris:entry('pa.ʁi'),femme:entry('fam'),monsieur:entry('mə.sjø'),beaucoup:entry('bo.ku'),"aujourd'hui":entry('o.ʒuʁ.dɥi'),chien:entry('ʃjɛ̃'),pain:entry('pɛ̃'),vin:entry('vɛ̃'),bon:entry('bɔ̃'),dans:entry('dɑ̃'),maison:entry('mɛ.zɔ̃'),livre:entry('livʁ'),chat:entry('ʃa'),fille:entry('fij'),soleil:entry('sɔ.lɛj'),eau:entry('o'),eaux:entry('o'),les:entry('le',{liaison:'z'}),des:entry('de',{liaison:'z'}),mes:entry('me',{liaison:'z'}),ces:entry('se',{liaison:'z'}),nous:entry('nu',{liaison:'z'}),vous:entry('vu',{liaison:'z'}),ils:entry('il',{liaison:'z'}),elles:entry('ɛl',{liaison:'z'}),un:entry('œ̃',{confidence:'low',source:'variant-sensitive',alternatives:['ɛ̃'],liaison:'n'}),une:entry('yn'),et:entry('e'),est:entry('ɛ',{confidence:'low',source:'context-sensitive',alternatives:['e']}),être:entry('ɛtʁ'),je:entry('ʒə'),tu:entry('ty'),il:entry('il'),elle:entry('ɛl'),de:entry('də'),le:entry('lə'),la:entry('la'),au:entry('o'),aux:entry('o',{liaison:'z'}),en:entry('ɑ̃'),on:entry('ɔ̃'),oui:entry('wi'),non:entry('nɔ̃'),très:entry('tʁɛ',{liaison:'z'}),petit:entry('pə.ti'),petite:entry('pə.tit'),grand:entry('ɡʁɑ̃',{liaison:'t'}),grande:entry('ɡʁɑ̃d'),homme:entry('ɔm'),ami:entry('a.mi'),amie:entry('a.mi'),amis:entry('a.mi'),école:entry('e.kɔl'),université:entry('y.ni.vɛʁ.si.te'),musique:entry('my.zik'),cœur:entry('kœʁ'),heure:entry('œʁ'),sœur:entry('sœʁ'),rue:entry('ʁy'),rouge:entry('ʁuʒ'),bleu:entry('blø'),deux:entry('dø'),neuf:entry('nœf'),avec:entry('a.vɛk'),pour:entry('puʁ'),comment:entry('kɔ.mɑ̃'),parlez:entry('paʁ.le'),parle:entry('paʁl',{confidence:'low',source:'context-sensitive',alternatives:['paʁlə']}),aime:entry('ɛm'),aimer:entry('e.me'),aimez:entry('e.me'),appelle:entry('a.pɛl'),arrivent:entry('a.ʁiv'),près:entry('pʁɛ'),voudrais:entry('vu.dʁɛ'),café:entry('ka.fe'),plaît:entry('plɛ'),amour:entry('a.muʁ'),"j'":entry('ʒ',{source:'elision-prefix'}),"l'":entry('l',{source:'elision-prefix'}),"d'":entry('d',{source:'elision-prefix'}),"n'":entry('n',{source:'elision-prefix'}),"s'":entry('s',{source:'elision-prefix'}),"m'":entry('m',{source:'elision-prefix'}),"t'":entry('t',{source:'elision-prefix'}),"c'":entry('s',{source:'elision-prefix'}),"qu'":entry('k',{source:'elision-prefix'})};
function fallbackWord(word){return transcribeFrenchWord(word)}
const tokensOf=ipa=>{const keys=Object.keys(INVENTORY).sort((a,b)=>b.length-a.length),raw=ipa.replace(/[.ˈˌ|]/g,'');const out=[];for(let i=0;i<raw.length;){const t=keys.find(k=>raw.startsWith(k,i));if(t){out.push(t);i+=t.length}else{out.push(raw[i++])}}return out};
const map=(tokens,table)=>tokens.map(t=>table[t]??(/^\s+$/u.test(t)?t:'⟦'+t+'⟧')).join('');
const VOWEL=/^[aeiouyàâäéèêëîïôöùûüÿœ]/i,ALLOWED=new Set(['les','des','mes','ces','aux','un','mon','ton','son','nos','vos','leurs']),FORBIDDEN=new Set(['et']),H_ASPIRE=new Set(['haricot','héros','haine','honte','hasard','hache','hamac']);
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
  const entry=LEXICON[key];
  const parserTrace=parsedText.trace.filter(item=>
   (item.boundary&&item.start===partEnd)||
   (!item.boundary&&item.start>=partStart&&item.end<=partEnd)
  );
  const boundaryTrace=parserTrace.filter(item=>item.boundary);
  const parserIpa=parserTrace.map(item=>item.ipa).join('');
  const parserSourceIpa=parserTrace.map(item=>item.sourceIpa).join('');
  const g2p=entry?null:(parserIpa?{ipa:parserIpa,sourceIpa:parserSourceIpa,trace:parserTrace}:transcribeFrenchWordDetailed(key,{profile}));
  let ipa=entry?.ipa||g2p.ipa;
  let sourceIpa=entry?.ipa||g2p.sourceIpa||g2p.ipa;
  if(entry&&boundaryTrace.length){ipa+=boundaryTrace.map(item=>item.ipa).join('');sourceIpa+=boundaryTrace.map(item=>item.sourceIpa).join('');}
  const confidence=entry?.confidence||'low';
  const source=entry?.source||'openipa-french-engine';
  let explanation=entry?'Попередній словниковий запис; потрібна незалежна фахова верифікація.':'Транскрипція оригінальним rule-based рушієм OpenIPA; якість для довільного слова не є незалежно верифікованою.';
  const alternatives=entry?.alternatives||[];
  const ruleTrace=entry?[{start:0,end:raw.length,grapheme:raw,ipa,ruleId:'lexicon-entry',explanationUk:'Словниковий запис; джерело й незалежна перевірка ще мають бути додані.'},...boundaryTrace]:g2p.trace;
  let liaisonApplied=boundaryTrace.some(item=>item.ipa);
  if(entry&&profile==='lyric-diction-fr'&&/(?:e|es)$/i.test(key)&&!new Set(['les','des','mes','tes','ses','ces']).has(key)&&!ipa.endsWith('ə')){
   ipa+='ə';sourceIpa+='ə';
   const pos=key.endsWith('es')?raw.length-2:raw.length-1;
   ruleTrace.push({start:pos,end:pos+1,grapheme:raw[pos],ipa:'ə',ruleId:'lyric-final-schwa',explanationUk:'У профілі вокальної дикції кінцеве німе e реалізується як /ə/ за лексичними та поетичними умовами.'});
  }
  let previous=null;
  for(let j=words.length-1;j>=0;j--){
   if(words[j].kind==='separator'&&/[^\s]/u.test(words[j].text))break;
   if(words[j].kind==='word'){previous=words[j];break;}
  }
  if(profile!=='lyric-diction-fr'&&previous&&VOWEL.test(raw)&&!H_ASPIRE.has(key)&&ALLOWED.has(previous.text.toLocaleLowerCase('fr'))&&!FORBIDDEN.has(previous.text.toLocaleLowerCase('fr'))){
   const latent=LEXICON[previous.text.toLocaleLowerCase('fr')]?.liaison;
   if(latent){
    previous.ipa+=latent;previous.sourceIpa=(previous.sourceIpa||previous.ipa)+latent;previous.liaisonApplied=true;
    previous.explanation+=' Liaison ['+latent+'] у підтриманому шаблоні.';
    previous.segments=tokensOf(previous.ipa);previous.ufpn=renderUfpnAdapter(previous.ipa,'basic').text;previous.romanized=map(previous.segments,LATIN_GUIDE);
   }
  }
  if(liaisonApplied)explanation+=' Застосовано liaison за правилами OpenIPA.';
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
