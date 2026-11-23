/**
 * Clean-room, deterministic, context-sensitive Metropolitan French G2P fallback.
 * OpenIPA is a behavioral reference only; no upstream source or database is copied.
 * Lexical and POS-sensitive exceptions must live in the reviewed lexicon.
 */
const VOWELS = new Set([...\"aeiouyàâäéèêëîïôöùûüÿœ\"]);
const CONSONANTS = new Set([...\"bcdfghjklmnpqrstvwxz\"]);
const NASAL = [
 [\"oin\",\"wɛ̃\"],[\"ain\",\"ɛ̃\"],[\"aim\",\"ɛ̃\"],[\"ein\",\"ɛ̃\"],[\"eim\",\"ɛ̃\"],
 [\"ien\",\"jɛ̃\"],[\"an\",\"ɑ̃\"],[\"am\",\"ɑ̃\"],[\"en\",\"ɑ̃\"],[\"em\",\"ɑ̃\"],
 [\"on\",\"ɔ̃\"],[\"om\",\"ɔ̃\"],[\"in\",\"ɛ̃\"],[\"im\",\"ɛ̃\"],[\"yn\",\"ɛ̃\"],
 [\"ym\",\"ɛ̃\"],[\"un\",\"œ̃\"],[\"um\",\"œ̃\"]
];
const VOWEL_GROUPS = [
 [\"eaux\",\"o\"],[\"eau\",\"o\"],[\"euil\",\"œj\"],[\"euille\",\"œj\"],[\"ueil\",\"œj\"],
 [\"aille\",\"aj\"],[\"ail\",\"aj\"],[\"eille\",\"ɛj\"],[\"eil\",\"ɛj\"],
 [\"ou\",\"u\"],[\"oi\",\"wa\"],[\"oy\",\"waj\"],[\"au\",\"o\"],
 [\"eu\",\"ø\"],[\"œu\",\"ø\"],[\"oeu\",\"ø\"],[\"œ\",\"œ\"],
 [\"ai\",\"ɛ\"],[\"ei\",\"ɛ\"],[\"ë\",\"ɛ\"],[\"è\",\"ɛ\"],[\"ê\",\"ɛ\"],[\"é\",\"e\"],
 [\"â\",\"ɑ\"],[\"à\",\"a\"],[\"î\",\"i\"],[\"ï\",\"i\"],[\"ô\",\"o\"],[\"û\",\"y\"],[\"ù\",\"y\"]
];
const CONSONANT_GROUPS = [[\"ch\",\"ʃ\"],[\"gn\",\"ɲ\"],[\"ph\",\"f\"],[\"th\",\"t\"],[\"qu\",\"k\"],[\"gu\",\"g\"],[\"ill\",\"ij\"]];
const isVowel = c => !!c && VOWELS.has(c);
const isConsonant = c => !!c && CONSONANTS.has(c);
function isSilentFinalTail(s, i) {
 const tail=s.slice(i);
 if(!tail) return false;
 if(/^(?:s|x|t|d|p|g|z)$/.test(tail)) return true;
 if(/^[bcdfghjklmnpqrstvwxz]+$/.test(tail)) return ![\"c\",\"r\",\"f\",\"l\"].includes(tail.at(-1));
 return false;
}
export function transcribeFrenchWord(input) {
 let s=String(input??\"\").toLocaleLowerCase(\"fr\").normalize(\"NFC\").replace(/[’']/g,\"\");
 let out=\"\",i=0;
 const push=(v,n)=>{out+=v;i+=n};
 while(i<s.length) {
  const rest=s.slice(i),c=s[i],next=s[i+1]||\"\",after=s[i+2]||\"\";
  if(rest.startsWith(\"tion\")){push(\"sjɔ̃\",4);continue}
  if(rest.startsWith(\"sion\")){push(\"zjɔ̃\",4);continue}
  if(rest.startsWith(\"ent\")&&i===s.length-3){push(\"ɑ̃\",3);continue}
  if(rest.startsWith(\"er\")&&i===s.length-2){push(\"e\",2);continue}
  if(rest.startsWith(\"ez\")&&i===s.length-2){push(\"e\",2);continue}
  if(rest.startsWith(\"es\")&&i===s.length-2){i+=2;continue}
  if(rest.startsWith(\"eaux\")){push(\"o\",4);continue}
  if(rest.startsWith(\"eau\")){push(\"o\",3);continue}
  const nasal=NASAL.find(([g])=>rest.startsWith(g)&&!isVowel(s[i+g.length]||\"\")&&(s[i+g.length]||\"\")!==\"h\");
  if(nasal){push(nasal[1],nasal[0].length);continue}
  const cg=CONSONANT_GROUPS.find(([g])=>rest.startsWith(g));
  if(cg){
   let value=cg[1],n=cg[0].length;
   if(cg[0]===\"ill\") value=isVowel(s[i-1]||\"\")?\"j\":\"ij\";
   if(cg[0]===\"gu\"&&/[eiyéèê]/.test(s[i+2]||\"\")) value=\"g\";
   push(value,n);continue;
  }
  const vg=VOWEL_GROUPS.find(([g])=>rest.startsWith(g));
  if(vg){
   let value=vg[1],n=vg[0].length;
   if(vg[0]===\"eu\"||vg[0]===\"œu\"||vg[0]===\"oeu\") value=isConsonant(s[i+n]||\"\")&&!isSilentFinalTail(s,i+n)?\"œ\":\"ø\";
   push(value,n);continue;
  }
  if(c===\"c\"){push(/[eiyéèêë]/.test(next)?\"s\":\"k\",1);continue}
  if(c===\"g\"){push(/[eiyéèêë]/.test(next)?\"ʒ\":\"g\",1);continue}
  if(c===\"s\"){push(isVowel(s[i-1]||\"\")&&isVowel(next)?\"z\":\"s\",1);continue}
  if(c===\"x\"){push(isVowel(next)?\"ɡz\":\"ks\",1);continue}
  if(c===\"u\"&&isVowel(next)){push(\"ɥ\",1);continue}
  if((c===\"i\"||c===\"y\")&&isVowel(next)){push(\"j\",1);continue}
  if(c===\"y\"){push(\"i\",1);continue}
  if(c===\"j\"){push(\"ʒ\",1);continue}
  if(c===\"r\"){push(\"ʁ\",1);continue}
  if(c===\"h\"){i++;continue}
  if(c===\"e\"){
   if(i===s.length-1){i++;continue}
   if(isConsonant(next)&&isConsonant(after)){push(\"ɛ\",1);continue}
   push(\"ə\",1);continue;
  }
  if(c===\"a\"){push(\"a\",1);continue}
  if(c===\"i\"){push(\"i\",1);continue}
  if(c===\"o\"){push(isConsonant(next)&&!isSilentFinalTail(s,i+1)?\"ɔ\":\"o\",1);continue}
  if(c===\"u\"){push(\"y\",1);continue}
  if(c===\"w\"){push(\"w\",1);continue}
  if(c===\"ç\"){push(\"s\",1);continue}
  if(c===\"k\"||c===\"q\"){push(\"k\",1);continue}
  if(\"fvbdptmnlz\".includes(c)){push(c,1);continue}
  if(isConsonant(c)&&i===s.length-1&&! [\"c\",\"r\",\"f\",\"l\"].includes(c)){i++;continue}
  if(isConsonant(c)&&c===next&&c!==\"s\"){i++;continue}
  if(isConsonant(c)){push(c,1);continue}
  i++;
 }
 return out;
}