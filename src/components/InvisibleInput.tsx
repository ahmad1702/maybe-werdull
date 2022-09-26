import React, { useRef } from "react";
import { charIsLetter } from "../utils/utils";

type Props = {
  submitWord: Function;
  currWord: string;
  setCurrWord: React.Dispatch<React.SetStateAction<string>>;
};

const InvisibleInput = ({ submitWord, currWord, setCurrWord }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

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
  return (
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
  );
};

export default InvisibleInput;
