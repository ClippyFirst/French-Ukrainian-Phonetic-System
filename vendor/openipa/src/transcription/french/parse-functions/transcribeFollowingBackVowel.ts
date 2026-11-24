import { Phoneme } from '../../../constants/Interfaces';
import IPA from '../../../constants/IPA';
import { isBackVowel } from '../../../util/Helper';

const getRule = (letter: string, ipa: string): string => {
  return `Літера «${letter}» перед заднім голосним передає [${ipa}].`;
};

const transcribeFollowingBackVowel = (
  phoneme: Phoneme,
  letters: string[],
  ipa: IPA
): Phoneme => {
  if (isBackVowel(letters[1])) {
    return {
      text: letters[0],
      ipa,
      rule: getRule(letters[0], ipa),
    };
  }
  return phoneme;
};

export default transcribeFollowingBackVowel;
