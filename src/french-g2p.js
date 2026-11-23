/**
 * Adapter around the vendored OpenIPA French transcription engine.
 * Upstream source is preserved under vendor/openipa and AGPL-3.0.
 */
import parseFrench from './openipa-french.js';

const parserOptions = (options = {}) => ({
  shouldAnalyzeLiason: { label: '', value: options.liaison === true },
  shouldAnalyzeElision: {
    label: '',
    value: options.elision === true || options.profile === 'lyric-diction-fr',
  },
});

const normalizeOpenIpa = (value) => String(value ?? '').replaceAll('ε', 'ɛ');

export function transcribeFrenchText(text, options = {}) {
  return parseFrench(String(text ?? '').normalize('NFC'), parserOptions(options));
}

export function transcribeFrenchTextDetailed(input, options = {}) {
  const text = String(input ?? '').normalize('NFC').toLocaleLowerCase('fr');
  const result = transcribeFrenchText(text, options);
  const trace = [];
  let cursor = 0;

  for (const line of result.lines) {
    for (const word of line.words) {
      for (const phoneme of word.syllables) {
        const graphemeText = String(phoneme.text ?? '');
        const boundary = graphemeText === ' ' && String(phoneme.ipa ?? '').includes('‿');
        let start;
        let end;
        if (boundary) {
          // OpenIPA attaches liaison to the preceding word using a zero-width space token.
          start = cursor;
          end = cursor;
        } else {
          start = graphemeText ? text.indexOf(graphemeText, cursor) : cursor;
          if (start < 0) start = cursor;
          end = Math.min(text.length, start + graphemeText.length);
          cursor = Math.max(cursor, end);
        }
        trace.push({
          start,
          end,
          boundary,
          grapheme: text.slice(start, end),
          ipa: normalizeOpenIpa(phoneme.ipa),
          sourceIpa: phoneme.ipa,
          ruleId: 'openipa-rule',
          rule: phoneme.rule,
          explanationUk: 'Оригінальне пояснення правила OpenIPA (англійською): ' + phoneme.rule,
          source: 'OpenIPA',
        });
      }
    }
  }

  return {
    text,
    trace,
    ipa: trace.map((phoneme) => phoneme.ipa).join(''),
    sourceIpa: trace.map((phoneme) => phoneme.sourceIpa).join(''),
    source: 'OpenIPA French transcription engine',
    profile: options.profile || 'openipa-lyric-diction',
  };
}

export function transcribeFrenchWordDetailed(input, options = {}) {
  return transcribeFrenchTextDetailed(input, options);
}

export function transcribeFrenchWord(input, options = {}) {
  return transcribeFrenchWordDetailed(input, options).ipa;
}
