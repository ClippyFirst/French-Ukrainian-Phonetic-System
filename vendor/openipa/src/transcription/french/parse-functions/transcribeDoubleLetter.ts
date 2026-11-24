import { Phoneme } from '../../../constants/Interfaces';

const getDoubleLetterRule = (letter: string, ipa: string): string => {
  return `Подвоєні літери «${
    letter + letter
  }» передають один приголосний [${ipa}].`;
};

const transcribeDoubleLetter = (
  phoneme: Phoneme,
  letters: string[],
  ipa?: string
): Phoneme => {
  if (letters[0] === letters[1]) {
    if (ipa === undefined) ipa = letters[0];
    return {
      text: letters[0] + letters[1],
      ipa,
      rule: getDoubleLetterRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeDoubleLetter;
