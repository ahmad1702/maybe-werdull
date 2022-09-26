import { motion, useAnimationControls } from "framer-motion";
import { useRef, useState } from "react";
import { BrowserView } from "react-device-detect";
import Alert from "./components/Alert";
import InvisibleInput from "./components/InvisibleInput";
import Keyboard from "./components/Keyboard";
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
export type GuessedLetterType = {
  letter: string;
  state: StateType;
};

const App = () => {
  const controls = useAnimationControls();

  const [currWord, setCurrWord] = useState<string>("");
  const [submittedWords, setSubmittedWords] = useState<LetterObj[][]>([]);
  const [fireConfetti, setFireConfetti] = useState<boolean>(false);

  const [guessedLetters, setGuessedLetters] = useState<GuessedLetterType[]>([]);

  const submitWord = async () => {
    if (submittedWords.length >= 6) return;
    if (currWord.length !== 5) return;
    const isValid: boolean = await isValidWord(currWord);
    console.log("isvalid:", isValid);
    if (!isValid) {
      controls.start({
        x: [3, -3, 3, -3, 3, -3, 0],
        scale: 0.9,
      });
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

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900">
      {fireConfetti && <Alert />}
      <div className="font-extrabold text-white text-5xl">Werdull</div>
      <div className="mb-5 font-extrabold text-slate-400 text-sm">
        By Ahmad Sandid
      </div>
      {submittedWords.map((_: LetterObj[], i: number) => (
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
      <Keyboard
        submitWord={submitWord}
        currWord={currWord}
        setCurrWord={setCurrWord}
        guessedLetters={guessedLetters}
      />
      <BrowserView>
        <InvisibleInput
          currWord={currWord}
          setCurrWord={setCurrWord}
          submitWord={submitWord}
        />
      </BrowserView>
    </div>
  );
};

export default App;
