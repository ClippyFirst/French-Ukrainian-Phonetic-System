import mapping from '../data/ufpn-mapping.json' with { type: 'json' };

const entries = mapping.phonemes;
const BY_IPA = new Map(entries.map(item => [item.ipa, item]));
BY_IPA.set('g', BY_IPA.get('ɡ'));
const IPA_KEYS = [...BY_IPA.keys()].sort((a,b)=>b.length-a.length);
const IPA_MODIFIERS = /[\u0300-\u036f\u1dc0-\u1dff]/u;
const POST_MODIFIERS = new Set(['ʲ','ʷ','ˠ','ʰ','ʱ','ⁿ','ˡ','ˤ','˞','ᵝ','ᵊ','ᶣ','ᵚ','ᵐ','ᵑ']);
const CONTROL = new Set(['ˈ','ˌ','ː','ˑ','.','·','|','‿','‖','[',']','(',')','↗','↘','→',' ']);
const PASS_THROUGH = new Set(['ˈ','ˌ','ː','ˑ','‿','‖','↗','↘','→']);
const LEVELS = new Set(['basic','detailed','extended']);

export const UFPN_MAPPING = mapping;
export const UFPN_INVENTORY = Object.fromEntries(entries.map(item => [item.ipa, item.basic]));

export function tokenizeIpa(ipa) {
  const input = String(ipa ?? '').normalize('NFC');
  const tokens = [];
  for (let i = 0; i < input.length;) {
    const rest = input.slice(i);
    const control = [...CONTROL].sort((a,b)=>b.length-a.length).find(token => rest.startsWith(token));
    if (control) { tokens.push(control); i += control.length; continue; }
    const key = IPA_KEYS.find(token => rest.startsWith(token));
    if (key) {
      let token = key;
      i += key.length;
      while (i < input.length) {
        const cp = String.fromCodePoint(input.codePointAt(i));
        if (!IPA_MODIFIERS.test(cp) && !POST_MODIFIERS.has(cp)) break;
        token += cp; i += cp.length;
      }
      tokens.push(token); continue;
    }
    const cp = String.fromCodePoint(input.codePointAt(i));
    if ((IPA_MODIFIERS.test(cp) || POST_MODIFIERS.has(cp)) && tokens.length) tokens[tokens.length-1] += cp;
    else tokens.push(cp);
    i += cp.length;
  }
  return tokens;
}

function mapToken(token, level, unsupported) {
  if (CONTROL.has(token)) {
    if (token === '.' || token === '·') return level === 'basic' ? '' : '·';
    if (token === '|') return level === 'basic' ? ' ' : '‖';
    if (['[',']','(',')'].includes(token)) return level === 'extended' ? token : '';
    if (PASS_THROUGH.has(token)) return level === 'extended' || (level === 'detailed' && ['ː','ˑ','‿'].includes(token)) ? token : '';
    return token;
  }
  const exact = BY_IPA.get(token);
  if (exact) return exact[level] ?? exact.basic;
  const first = IPA_KEYS.find(key => token.startsWith(key));
  if (first) {
    const rest = token.slice(first.length);
    const base = BY_IPA.get(first)[level] ?? BY_IPA.get(first).basic;
    return base + (level === 'extended' ? rest : '');
  }
  unsupported.push(token);
  return '⟦' + token + '⟧';
}

export function renderUfpn(ipa, level='basic') {
  const selected = LEVELS.has(level) ? level : 'basic';
  const unsupported = [];
  const tokens = tokenizeIpa(ipa);
  const output = tokens.map(token => mapToken(token, selected, unsupported)).join('').normalize('NFC');
  return {text:output,level:selected,tokens,unsupported:[...new Set(unsupported)]};
}
export function adaptIpa(ipa, level='basic') {
  const rendered=renderUfpn(ipa,level);
  return {tokens:rendered.tokens,ufpn:rendered.text,unsupported:rendered.unsupported};
}
export function getUfpnPhoneme(ipa) { return BY_IPA.get(ipa) ?? null; }
