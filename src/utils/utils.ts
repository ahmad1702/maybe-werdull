import axios from "axios";
import filter from "leo-profanity";

export const charIsLetter = (char: string) => {
  return /^[a-zA-Z]+$/.test(char);
};

const dictionaryWordIsValid = async (str: string): Promise<boolean> => {
  const url: string | undefined = process.env.REACT_APP_OXFORD_API_URL;
  const id: string | undefined = process.env.REACT_APP_OXFORD_API_ID;
  const key: string | undefined = process.env.REACT_APP_OXFORD_API_KEY;
  if (url && id && key) {
    const res = await axios.get(`${url}/search/q=${str}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        app_id: id,
        app_key: key,
      },
    });
    console.log(res);
  } else {
    console.error("Dicionary info not available");
  }
  return true;
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
  // if (!isValidWord) return await dictionaryWordIsValid(str);
  return true;
};

export const STATIC_NUM_ARRAY: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const alphKeyboard: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
