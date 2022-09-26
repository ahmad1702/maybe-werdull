import { motion } from "framer-motion";
import React from "react";
import { GuessedLetterType } from "../App";
import { alphKeyboard } from "../utils/utils";

type Props = {
  submitWord: Function;
  guessedLetters: GuessedLetterType[];
  currWord: string;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
};

const Keyboard = ({
  submitWord,
  guessedLetters,
  currWord,
  setCurrWord,
}: Props) => {
  const handleKeyboardClick = (char: string) => {
    if (currWord.length >= 5 && char.length === 1) return;
    setCurrWord((word) => word + char);
  };
  const handleBackspace = () => {
    setCurrWord((word) => word.slice(0, word.length - 1));
  };
  const getIndependentLetterStyles = (letter: string): string => {
    const found = guessedLetters.filter((item: any) => item.letter === letter);
    const states = found.map((item: any) => item.state);
    if (states.includes("correct")) {
      return "bg-green-700 hover:bg-green-500";
    } else if (states.includes("incorrect")) {
      return "bg-yellow-300/80 hover:bg-yellow-300";
    } else if (states.includes("guessed")) {
      return "bg-slate-800 hover:bg-slate-600";
    } else {
      return "bg-slate-500 hover:bg-slate-400";
    }
  };
  return (
    <div className="mt-5 w-full px-3 md:w-auto">
      {alphKeyboard.map((keyRow: string[], i: number) => (
        <div key={i} className="flex items-center justify-center mb-1 md:mb-2">
          {i === alphKeyboard.length - 1 && (
            <motion.div
              id="enterbutton"
              onClick={() => submitWord()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mr-1 md:mr-2 w-auto px-2 h-10 md:w-auto md:py-7 md:px-3 bg-slate-500 hover:bg-slate-400 cursor-pointer text-white text-xl uppercase font-bold flex items-center justify-center rounded-md select-none `}
            >
              Enter
            </motion.div>
          )}
          {keyRow.map((char: string, j: number) => (
            <motion.div
              onClick={() => handleKeyboardClick(char)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mr-1 md:mr-2 w-10 h-10 md:w-6 md:p-7 cursor-pointer text-white text-2xl font-bold uppercase flex items-center justify-center rounded-md select-none ${getIndependentLetterStyles(
                char
              )}`}
              // ${j === keyRow.length - 1 || "mr-1 md:mr-2"}
            >
              {char}
            </motion.div>
          ))}
          {i === alphKeyboard.length - 1 && (
            <motion.div
              id="backspace"
              onClick={() => handleBackspace()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-auto px-2 h-10 md:w-auto md:py-7 md:px-7 bg-slate-500 hover:bg-slate-400 cursor-pointer text-white text-2xl uppercase font-bold flex items-center justify-center rounded-md select-none `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
