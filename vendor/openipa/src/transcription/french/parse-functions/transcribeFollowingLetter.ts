import { Phoneme } from '../../../constants/Interfaces';

const getRule = (
  text: string,
  ipa: string,
  followingLettersGroup: string[]
): string => {
  let followingLettersText = '';
  followingLettersGroup.forEach((followingLetters, index) => {
    followingLettersText += `«${followingLetters}»`;
    if (index !== followingLettersGroup.length - 1) {
      followingLettersText += ` або `;
    }
  });
  if (
    followingLettersGroup.length === 1 &&
    text.length === (text.substring(0, 1) + followingLettersGroup[0]).length
  ) {
    return `Сполука «${text}» передає [${ipa}].`;
  }
  if (text.length === 1) {
    return `Літери «${text}» перед сполукою ${followingLettersText} передають [${ipa}].`;
  }
  followingLettersText = '';
  followingLettersGroup.forEach((followingLetters, index) => {
    followingLettersText += `«${followingLetters.substring(
      text.length,
      followingLetters.length
    )}'`;
    if (index !== followingLettersGroup.length - 1) {
      followingLettersText += ` або `;
    }
  });
  return `Сполука «${text}» перед «${followingLettersText}» передає [${ipa}].`;
};

const transcribeFollowingLetter = (
  phoneme: Phoneme,
  letters: string[],
  followingLettersGroup: string[],
  ipa: string,
  text?: string
): Phoneme => {
  followingLettersGroup.forEach((followingLetters) => {
    let comparedLetters = '';
    for (let i = 0; i < followingLetters.length; i++) {
      comparedLetters += letters[i + 1];
    }

    if (comparedLetters === followingLetters) {
      if (text === undefined) text = letters[0] + comparedLetters;
      phoneme = {
        text,
        ipa,
        rule: getRule(text, ipa, followingLettersGroup),
      };
    }
  });
  return phoneme;
};

export default transcribeFollowingLetter;
