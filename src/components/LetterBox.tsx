import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LetterObj, StateType } from "../App";

interface LetterBoxProps extends LetterObj {
    key?: string | number;
    isLastInRow: boolean;
};
type letterBoxStyle = {
    bgcolor: string;
}
const LetterBox = ({ char, state, isLastInRow }: LetterBoxProps) => {
    const boxStyles: Record<StateType, letterBoxStyle> = {
        neutral: {
            bgcolor: 'bg-slate-700',
        },
        incorrect: {
            bgcolor: 'bg-yellow-300/80',
        },
        correct: {
            bgcolor: 'bg-green-700'
        },
        guessed: {
            bgcolor: 'bg-slate-400'
        }
    }
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => setIsActive(val => !val), [char])

    return (
        <motion.div
            animate={{
                rotate: isActive ? 90 : 0
            }}
            className={`h-16 w-16 rounded-2xl flex items-center justify-center text-4xl font-bold text-white ${isLastInRow || ('mr-2')} ${boxStyles[state].bgcolor}`}
        >
            <motion.div
                animate={{
                    rotate: isActive ? -90 : 0
                }}
            >
                {char}
            </motion.div>
        </motion.div >
    );
};

export default LetterBox;