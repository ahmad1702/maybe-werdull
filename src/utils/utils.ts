import axios from "axios";
import filter from "leo-profanity";

export const charIsLetter = (char: string) => {
  return /^[a-zA-Z]+$/.test(char);
};

const dictionaryWordIsValid = async (str: string): Promise<boolean> => {
  let isValid: boolean = true;
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${str}`
    );
    console.log("res:", res);
    if (res.status === 200) {
      isValid = true;
    } else if (res.status === 404) {
      isValid = false;
    } else {
      isValid = true;
    }
  } catch (error) {
    isValid = false;
  }
  return isValid;
};
const isProfane = (str: string) => {
  const newStr = filter.clean(str);
  if (newStr.includes("*")) {
    return true;
  } else {
    return false;
  }
};

export const isValidWord = async (str: string): Promise<boolean> => {
  if (isProfane(str)) return false;
  const isValEnglishWord = await dictionaryWordIsValid(str);
  if (!isValEnglishWord) return false;
  return true;
};

export const STATIC_NUM_ARRAY: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const alphKeyboard: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
