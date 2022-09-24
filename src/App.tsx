import { motion } from "framer-motion";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import LetterBox from "./components/LetterBox";
import {
  alphKeyboard,
  charIsLetter,
  isValidWord,
  STATIC_NUM_ARRAY,
} from "./utils/utils";

const CORRECT_WORD = "donor";

export type StateType = "neutral" | "incorrect" | "correct" | "guessed";
export interface LetterObj {
  char: string;
  state: StateType;
}

const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [currWord, setCurrWord] = useState<string>("");

  const [submittedWords, setSubmittedWords] = useState<LetterObj[][]>([]);

  const handleTextChange = (e: any) => {
    if (e.target.value > 5) {
      e.preventDefault();
    } else if (e.target.value === 0) {
      setCurrWord("");
    } else {
      const str: string = e.target.value
        .split("")
        .map((letter: string) => {
          if (charIsLetter(letter)) {
            return letter;
          }
        })
        .join("");
      setCurrWord(str);
    }
  };
  const submitWord = async () => {
    if (submittedWords.length >= 6) return;
    if (currWord.length !== 5) {
      alert("woah");
      return;
    }
    const isValid: boolean = await isValidWord(currWord);
    if (!isValid) {
      console.log("WOAHHH CHILL");
      return;
    }
    const newWord: LetterObj[] = currWord
      .split("")
      .map((letter: string, i: number) => {
        const targetWord = CORRECT_WORD.split("").map((letter) =>
          letter.toLowerCase()
        );
        console.table({ target: targetWord, curr: currWord.split("") });
        let state: StateType = "guessed";
        if (targetWord[i].toLowerCase() === letter.toLowerCase()) {
          state = "correct";
        } else if (targetWord.includes(letter.toLowerCase())) {
          state = "incorrect";
        }
        return {
          char: letter,
          state: state,
        };
      });
    const correctLetters = newWord.filter(
      (letter) => letter.state === "correct"
    );
    const isCorrectWord: boolean = correctLetters.length === 5;
    const isLastInRow: boolean = submittedWords.length === 5;

    if (isCorrectWord) {
      setSubmittedWords((arr) => [...arr, newWord]);
      setCurrWord("");
      alert("You Wonn!!");
    } else if (isCorrectWord && isLastInRow) {
      setSubmittedWords((arr) => [...arr, newWord]);
      setCurrWord("");
      alert("Boohoo, you lost -_-");
    } else {
      setSubmittedWords((arr) => [...arr, newWord]);
      setCurrWord("");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900">
      <div className="font-extrabold text-white text-5xl mb-5">Werdell</div>
      <div className="absolute bottom-3 right-3 font-extrabold text-slate-400 text-sm">
        By Ahmad Sandid
      </div>
      {submittedWords.map((currArr: LetterObj[], i: number) => (
        <div key={i} className="flex justify-between mb-2">
          {submittedWords[i].map((val, j: number) => (
            <LetterBox
              char={val.char.toString().toUpperCase()}
              state={val.state}
              isLastInRow={submittedWords[i].length - 1 === j}
            />
          ))}
        </div>
      ))}
      {submittedWords.length < 6 && (
        <>
          <div className="flex mb-2">
            {[0, 1, 2, 3, 4].map((i) => {
              if (i < currWord.length) {
                return (
                  <LetterBox
                    char={currWord[i].toUpperCase()}
                    state={"neutral"}
                    isLastInRow={i === 4}
                  />
                );
              } else {
                return (
                  <LetterBox
                    char={""}
                    state={"neutral"}
                    isLastInRow={i === 4}
                  />
                );
              }
            })}
          </div>
          {STATIC_NUM_ARRAY.slice(0, 5 - submittedWords.length).map((i) => (
            <div key={i} className="flex mb-2">
              {[0, 1, 2, 3, 4].map((val, j) => (
                <LetterBox
                  char={""}
                  state={"neutral"}
                  isLastInRow={
                    STATIC_NUM_ARRAY.slice(0, 5 - submittedWords.length)
                      .length -
                      1 ===
                    j
                  }
                />
              ))}
            </div>
          ))}
        </>
      )}
      <div className="mt-5">
        {alphKeyboard.map((keyRow: string[], i: number) => (
          <div key={i} className="flex items-center justify-center mb-1 md:mb-2">
            {keyRow.map((char: string, j: number) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-10 md:w-6 md:w-6 md:p-7 bg-slate-500 hover:bg-slate-400 cursor-pointer text-white text-2xl font-bold flex items-center justify-center rounded-md select-none ${
                  j === keyRow.length - 1 || "mr-1 md:mr-2"
                }`}
              >
                {char}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <input
        ref={ref}
        type="text"
        name="value"
        id="value"
        onKeyUp={(e) => e.key === "Enter" && submitWord()}
        value={currWord}
        maxLength={5}
        autoFocus
        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
          e.preventDefault();
          ref?.current?.focus();
        }}
        onAbort={(e) => e.preventDefault()}
        onChange={handleTextChange}
        className="absolute -top-20 bg-neutral-300 rounded-full px-3 py-2 mb-3 outline-2 outline-transparent focus:outline-neutral-400 border-none duration-300"
      />
    </div>
  );
};

export default App;
