import { motion, useAnimationControls } from "framer-motion";
import { useRef, useState } from "react";
import { BrowserView } from "react-device-detect";
import Alert from "./components/Alert";
import LetterBox from "./components/LetterBox";
import {
  alphKeyboard,
  charIsLetter,
  isValidWord,
  STATIC_NUM_ARRAY,
} from "./utils/utils";

const CORRECT_WORD = "tired";

export type StateType = "neutral" | "incorrect" | "correct" | "guessed";
export interface LetterObj {
  char: string;
  state: StateType;
}

const App = () => {
  const controls = useAnimationControls();
  const ref = useRef<HTMLInputElement>(null);
  const [currWord, setCurrWord] = useState<string>("");
  const [submittedWords, setSubmittedWords] = useState<LetterObj[][]>([]);
  const [fireConfetti, setFireConfetti] = useState<boolean>(false);

  type GuessedLetterType = {
    letter: string;
    state: StateType;
  };
  const [guessedLetters, setGuessedLetters] = useState<GuessedLetterType[]>([]);

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
    if (currWord.length !== 5) return;
    const isValid: boolean = await isValidWord(currWord);
    console.log("isvalid:", isValid);
    if (!isValid) {
      controls.start({
        x: [3, -3, 3, -3, 3, -3, 0],
        // rotate: 360,
        scale: 0.9,
      });
      console.log("WOAHHH CHILL");
      // setInvalidWordAnimation(false);
      return;
    }
    const newWord: LetterObj[] = currWord
      .split("")
      .map((letter: string, i: number) => {
        const targetWord = CORRECT_WORD.split("").map((letter) =>
          letter.toLowerCase()
        );
        let state: StateType = "guessed";
        if (targetWord[i].toLowerCase() === letter.toLowerCase()) {
          state = "correct";
        } else if (targetWord.includes(letter.toLowerCase())) {
          state = "incorrect";
        }

        setGuessedLetters((letters) => [
          ...letters,
          {
            letter: letter.toLowerCase(),
            state: state,
          },
        ]);
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
      // alert("You Wonn!!");
      setFireConfetti(true);
    } else if (isCorrectWord && isLastInRow) {
      setSubmittedWords((arr) => [...arr, newWord]);
      setCurrWord("");
      alert("Boohoo, you lost -_-");
    } else {
      setSubmittedWords((arr) => [...arr, newWord]);
      setCurrWord("");
    }
  };

  const handleKeyboardClick = (char: string) => {
    if (currWord.length >= 5 && char.length === 1) return;
    setCurrWord((word) => word + char);
  };
  const handleBackspace = () => {
    setCurrWord((word) => word.slice(0, word.length - 1));
  };
  const getIndependentLetterStyles = (letter: string): string => {
    const found = guessedLetters.filter((item) => item.letter === letter);
    const states = found.map((item) => item.state);
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
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900">
      {fireConfetti && <Alert />}
      <div className="font-extrabold text-white text-5xl">Werdell</div>
      {/* <div className="mb-5 md:mb-0 md:absolute md:bottom-3 md:right-3 font-extrabold text-slate-400 text-sm">
        By Ahmad Sandid
      </div> */}
      <div className="mb-5 font-extrabold text-slate-400 text-sm">
        By Ahmad Sandid
      </div>
      {submittedWords.map((currArr: LetterObj[], i: number) => (
        <div key={i} className="flex items-center justify-between mb-2">
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
          <motion.div
            animate={controls}
            onAnimationComplete={() => {
              controls.start({ x: 0, scale: 1 });
            }}
            className="flex items-center justify-between mb-2"
          >
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
          </motion.div>
          {STATIC_NUM_ARRAY.slice(0, 5 - submittedWords.length).map((i) => (
            <div key={i} className="flex items-center justify-between mb-2">
              {[0, 1, 2, 3, 4].map((val, j) => (
                <LetterBox char={""} state={"neutral"} isLastInRow={j === 4} />
              ))}
            </div>
          ))}
        </>
      )}
      <div className="mt-5 w-full px-3 md:w-auto">
        {alphKeyboard.map((keyRow: string[], i: number) => (
          <div
            key={i}
            className="flex items-center justify-center mb-1 md:mb-2"
          >
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
                className={`w-8 h-10 md:w-6 md:w-6 md:p-7 cursor-pointer text-white text-2xl font-bold uppercase flex items-center justify-center rounded-md select-none mr-1 md:mr-2 ${getIndependentLetterStyles(
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
      <BrowserView>
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
      </BrowserView>
    </div>
  );
};

export default App;
