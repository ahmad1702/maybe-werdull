import { AnimationControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LetterObj, StateType } from "../App";

interface LetterBoxProps extends LetterObj {
    key?: string | number;
    isLastInRow: boolean;
    invalidWordAnimation?: boolean;
    setInvalidWordAnimation?: React.Dispatch<React.SetStateAction<boolean>>;
};
type letterBoxStyle = {
    bgcolor: string;
}
type LetterAnimationVariant = 'normalcontainer' | 'normal' | 'shake';
const LetterBox = ({ char, state, isLastInRow, invalidWordAnimation, setInvalidWordAnimation }: LetterBoxProps) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const [currVariant, setCurrVariant] = useState<LetterAnimationVariant>('normalcontainer')
    const animVariants: Record<LetterAnimationVariant, any> = {
        normalcontainer: {
            rotate: isActive ? 90 : 0
        },
        normal: {
            rotate: isActive ? -90 : 0
        },
        shake: {
            x: [
                3,
                -3,
                3,
                -3,
                3,
                -3,
                0
            ],
            // rotate: 360,
            scale: 0.9,
        },
    }
    useEffect(() => {
        console.log('event')
        // if (!(invalidWordAnimation && setInvalidWordAnimation)) return;
        if (invalidWordAnimation === true) {
            console.log('hi')
            setCurrVariant('shake')
        }
    }, [invalidWordAnimation])

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

    useEffect(() => setIsActive(val => !val), [char])

    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 100
    }

    const handleFinishAnimation = () => {
        if (currVariant === 'shake') {
            setCurrVariant('normalcontainer')
        }
        if (setInvalidWordAnimation) {
            setInvalidWordAnimation(false)
        }
    }

    return (
        <motion.div
            transition={spring}
            animate={currVariant}
            variants={animVariants}
            onAnimationComplete={handleFinishAnimation}
            className={`h-16 w-16 rounded-2xl flex items-center justify-center text-4xl font-bold text-white ${isLastInRow || ('mr-2')} ${boxStyles[state].bgcolor}`}
        >
            <motion.div
                animate={'normal'}
                variants={animVariants}
                transition={spring}
            >
                {char}
            </motion.div>
        </motion.div >
    );
};

export default LetterBox;