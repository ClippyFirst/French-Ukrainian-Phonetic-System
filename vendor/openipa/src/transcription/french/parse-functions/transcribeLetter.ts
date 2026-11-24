import { Phoneme } from '../../../constants/Interfaces';

const getRule = (text: string, ipa: string): string => {
  return `Літери «${text}» передають [${ipa}].`;
};

const getRuleSilent = (text: string): string => {
  return `Літери «${text}» не вимовляються й не відображаються у транскрипції.`;
};

const transcribeLetter = (
  phoneme: Phoneme,
  letters: string[],
  letter: string,
  ipa: string
): Phoneme => {
  if (ipa === '') {
    if (letters[0] === letter) {
      return {
        text: letters[0],
        ipa: ipa,
        rule: getRuleSilent(letters[0]),
      };
    }
  }
  if (letters[0] === letter) {
    return {
      text: letters[0],
      ipa: ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeLetter;
