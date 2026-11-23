/**
 * Clean-room, deterministic Metropolitan French G2P fallback.
 * OpenIPA informs the behavioral target only; no upstream code/data is copied.
 */
const VOWELS=new Set([..."aeiouyàâäéèêëîïôöùûüÿœ"]);
const CONSONANTS=new Set([..."bcdfghjklmnpqrstvwxz"]);
const NASAL=[["oin","wɛ̃"],["ain","ɛ̃"],["aim","ɛ̃"],["ein","ɛ̃"],["eim","ɛ̃"],["ien","jɛ̃"],["an","ɑ̃"],["am","ɑ̃"],["en","ɑ̃"],["em","ɑ̃"],["on","ɔ̃"],["om","ɔ̃"],["in","ɛ̃"],["im","ɛ̃"],["yn","ɛ̃"],["ym","ɛ̃"],["un","œ̃"],["um","œ̃"]];
const VOWEL_GROUPS=[["eaux","o"],["eau","o"],["euil","œj"],["euille","œj"],["ueil","œj"],["aille","aj"],["ail","aj"],["eille","ɛj"],["eil","ɛj"],["ou","u"],["oi","wa"],["oy","waj"],["au","o"],["eu","ø"],["œu","ø"],["oeu","ø"],["œ","œ"],["ai","ɛ"],["ei","ɛ"],["ë","ɛ"],["è","ɛ"],["ê","ɛ"],["é","e"],["â","ɑ"],["à","a"],["î","i"],["ï","i"],["ô","o"],["û","y"],["ù","y"]];
const CONSONANT_GROUPS=[["ch","ʃ"],["gn","ɲ"],["ph","f"],["th","t"],["qu","k"],["gu","g"],["ill","ij"]];
const isVowel=c=>!!c&&VOWELS.has(c);
const isConsonant=c=>!!c&&CONSONANTS.has(c);
function silentFinalTail(s,i){const tail=s.slice(i);if(!tail)return false;if(/^(?:s|x|t|d|p|g|z)$/.test(tail))return true;if(/^[bcdfghjklmnpqrstvwxz]+$/.test(tail))return !["c","r","f","l"].includes(tail.at(-1));return false}
const RULE_TEXT={
 "suffix-tion":"Закінчення -tion у типовому читанні дає /sjɔ̃/.",
 "suffix-sion":"Закінчення -sion у типовому читанні дає /zjɔ̃/.",
 "ambiguous-ent":"-ent без морфологічного аналізу неоднозначне: дієслівне закінчення часто німе, а в інших словах можливе /ɑ̃/.",
 "suffix-er":"Кінцеве -er зазвичай читається як /e/.",
 "suffix-ez":"Кінцеве -ez зазвичай читається як /e/.",
 "silent-final-es":"Кінцеве -es у цьому базовому шаблоні не має окремої вимови.",
 "nasal-vowel":"Носова голосна перед приголосним або на кінці слова; винятки залежать від лексеми.",
 "consonant-digraph":"Типове контекстне читання французького буквосполучення.",
 "vowel-digraph":"Типове контекстне читання французького сполучення голосних.",
 "soft-c":"c перед переднім голосним читається як /s/.",
 "hard-c":"c в інших базових позиціях читається як /k/.",
 "soft-g":"g перед переднім голосним читається як /ʒ/.",
 "hard-g":"g в інших базових позиціях читається як /g/.",
 "intervocalic-s":"s між голосними зазвичай озвінчується до /z/.",
 "x-voiced":"x перед голосним у цьому шаблоні передається як /ɡz/.",
 "x-unvoiced":"x у базовому шаблоні передається як /ks/.",
 "u-glide":"u перед наступною голосною може утворювати /ɥ/.",
 "i-glide":"i перед наступною голосною може передавати /j/.",
 "y-glide":"y перед голосною може передавати /j/.",
 "silent-h":"h не має власного звука; h muet/h aspiré потребують окремого лексичного класу.",
 "silent-final-e":"Кінцеве e зазвичай не вимовляється в нейтральній розмовній французькій.",
 "open-e":"e у цьому приголосному оточенні передається як /ɛ/.",
 "schwa-e":"e у цьому базовому шаблоні передається як /ə/; випадіння schwa залежить від контексту.",
 "single-vowel":"Базове читання одиничної голосної графеми.",
 "silent-final-consonant":"Кінцевий приголосний у цьому загальному шаблоні не вимовляється.",
 "double-consonant":"Подвоєння приголосної на письмі зазвичай не означає подвоєного звука.",
 "consonant":"Базове читання приголосної графеми.",
 "lexical-exception":"Відомий лексичний виняток; запис потребує словникового підтвердження.",
 "unknown-symbol":"Символ пропущено: для нього немає правила в цьому рушії."
};
export function transcribeFrenchWordDetailed(input){
 const s=String(input??"").toLocaleLowerCase("fr").normalize("NFC").replace(/[’']/g,"");
 if(!s)return {ipa:"",trace:[]};
 const exceptions={oui:"wi",nuit:"nɥi"};
 if(exceptions[s])return {ipa:exceptions[s],trace:[{start:0,end:s.length,grapheme:s,ipa:exceptions[s],ruleId:"lexical-exception",explanationUk:RULE_TEXT["lexical-exception"]}]};
 let out="",i=0;const trace=[];
 const record=(start,n,ipa,ruleId)=>trace.push({start,end:start+n,grapheme:s.slice(start,start+n),ipa,ruleId,explanationUk:RULE_TEXT[ruleId]||"Контекстне графемно-фонемне правило."});
 const push=(ipa,n,ruleId)=>{const start=i;out+=ipa;i+=n;record(start,n,ipa,ruleId)};
 const skip=(n,ruleId)=>{const start=i;i+=n;record(start,n,"",ruleId)};
 while(i<s.length){
  const rest=s.slice(i),c=s[i],next=s[i+1]||"",after=s[i+2]||"";
  if(rest.startsWith("tion")){push("sjɔ̃",4,"suffix-tion");continue}
  if(rest.startsWith("sion")){push("zjɔ̃",4,"suffix-sion");continue}
  if(rest.startsWith("ent")&&i===s.length-3){push("ɑ̃",3,"ambiguous-ent");continue}
  if(rest.startsWith("er")&&i===s.length-2){push("e",2,"suffix-er");continue}
  if(rest.startsWith("ez")&&i===s.length-2){push("e",2,"suffix-ez");continue}
  if(rest.startsWith("es")&&i===s.length-2){skip(2,"silent-final-es");continue}
  if(rest.startsWith("eaux")){push("o",4,"vowel-digraph");continue}
  if(rest.startsWith("eau")){push("o",3,"vowel-digraph");continue}
  const nasal=NASAL.find(([g])=>rest.startsWith(g)&&!isVowel(s[i+g.length]||"")&&!/[mnh]/.test(s[i+g.length]||""));
  if(nasal){push(nasal[1],nasal[0].length,"nasal-vowel");continue}
  const cg=CONSONANT_GROUPS.find(([g])=>rest.startsWith(g));
  if(cg){let value=cg[1];if(cg[0]==="ill")value=isVowel(s[i-1]||"")?"j":"ij";if(cg[0]==="gu"&&/[eiyéèê]/.test(s[i+2]||""))value="g";push(value,cg[0].length,"consonant-digraph");continue}
  const vg=VOWEL_GROUPS.find(([g])=>rest.startsWith(g));
  if(vg){let value=vg[1];if(["eu","œu","oeu"].includes(vg[0]))value=isConsonant(s[i+vg[0].length]||"")&&!silentFinalTail(s,i+vg[0].length)?"œ":"ø";push(value,vg[0].length,"vowel-digraph");continue}
  if(c==="c"){const soft=/[eiyéèêë]/.test(next);push(soft?"s":"k",1,soft?"soft-c":"hard-c");continue}
  if(c==="g"){const soft=/[eiyéèêë]/.test(next);push(soft?"ʒ":"g",1,soft?"soft-g":"hard-g");continue}
  if(c==="s"){push(isVowel(s[i-1]||"")&&isVowel(next)?"z":"s",1,"intervocalic-s");continue}
  if(c==="x"){push(isVowel(next)?"ɡz":"ks",1,isVowel(next)?"x-voiced":"x-unvoiced");continue}
  if(c==="u"&&isVowel(next)){push("ɥ",1,"u-glide");continue}
  if(c==="i"&&isVowel(next)){push("j",1,"i-glide");continue}
  if(c==="y"&&isVowel(next)){push("j",1,"y-glide");continue}
  if(c==="h"){skip(1,"silent-h");continue}
  if(c==="e"){
   if(i===s.length-1){skip(1,"silent-final-e");continue}
   if(isConsonant(next)&&(isConsonant(after)||i+1===s.length-1)){push("ɛ",1,"open-e");continue}
   push("ə",1,"schwa-e");continue
  }
  if(c==="a"||c==="i"||c==="o"||c==="u"||c==="y"){const v={a:"a",i:"i",o:isConsonant(next)&&!silentFinalTail(s,i+1)?"ɔ":"o",u:"y",y:"i"}[c];push(v,1,"single-vowel");continue}
  if(c==="j"){push("ʒ",1,"consonant");continue}
  if(c==="r"){push("ʁ",1,"consonant");continue}
  if(c==="ç"){push("s",1,"consonant");continue}
  if(c==="k"||c==="q"){push("k",1,"consonant");continue}
  if("fvbdptmnlzw".includes(c)){push(c,1,"consonant");continue}
  if(isConsonant(c)&&i===s.length-1&&!["c","r","f","l"].includes(c)){skip(1,"silent-final-consonant");continue}
  if(isConsonant(c)&&c===next&&c!=="s"){skip(1,"double-consonant");continue}
  if(isConsonant(c)){push(c,1,"consonant");continue}
  skip(1,"unknown-symbol");
 }
 return {ipa:out,trace};
}
export function transcribeFrenchWord(input){return transcribeFrenchWordDetailed(input).ipa;}
