import { Phoneme } from '../../../constants/Interfaces';

const getRule = (text: string, ipa: string): string => {
  return `За загальним правилом літери «${text}» передають [${ipa}].`;
};

const transcribeDefault = (letters: string[], ipa: string): Phoneme => {
  return {
    text: letters[0],
    ipa: ipa,
    rule: getRule(letters[0], ipa),
  };
};

export default transcribeDefault;
