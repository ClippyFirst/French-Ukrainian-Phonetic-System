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

const flatten = (result) =>
  result.lines.flatMap((line) =>
    line.words.flatMap((word) => word.syllables),
  );

// OpenIPA's source enum uses Greek epsilon (ε) for IPA open-mid front [ɛ].
// Preserve the upstream form in sourceIpa while exposing standard IPA [ɛ]
// to the project's canonical IPA -> UFPN adapter. Other upstream symbols,
// including [õ] and [ɾ], are intentionally not guessed or rewritten.
const normalizeOpenIpa = (value) => String(value ?? '').replaceAll('ε', 'ɛ');

export function transcribeFrenchText(text, options = {}) {
  return parseFrench(String(text ?? '').normalize('NFC'), parserOptions(options));
}

export function transcribeFrenchWordDetailed(input, options = {}) {
  const text = String(input ?? '').normalize('NFC').toLocaleLowerCase('fr');
  const syllables = flatten(transcribeFrenchText(text, options));
  let cursor = 0;
  const trace = syllables.map((phoneme) => {
    const graphemeText = String(phoneme.text ?? '');
    let start = graphemeText ? text.indexOf(graphemeText, cursor) : cursor;
    if (start < 0) start = cursor;
    const end = Math.min(text.length, start + graphemeText.length);
    cursor = Math.max(cursor, end);
    return {
      start,
      end,
      grapheme: text.slice(start, end),
      ipa: normalizeOpenIpa(phoneme.ipa),
      sourceIpa: phoneme.ipa,
      ruleId: 'openipa-rule',
      rule: phoneme.rule,
      explanationUk: 'Оригінальне пояснення правила OpenIPA (англійською): ' + phoneme.rule,
      source: 'OpenIPA',
    };
  });

  return {
    ipa: syllables.map((phoneme) => normalizeOpenIpa(phoneme.ipa)).join(''),
    sourceIpa: syllables.map((phoneme) => phoneme.ipa).join(''),
    trace,
    source: 'OpenIPA French transcription engine',
    profile: options.profile || 'openipa-lyric-diction',
  };
}

export function transcribeFrenchWord(input, options = {}) {
  return transcribeFrenchWordDetailed(input, options).ipa;
}
