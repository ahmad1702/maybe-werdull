import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

type Props = {};

const Alert = (props: Props) => {
  const [fire, setFire] = useState<boolean>(false);

  useEffect(() => {
    let timer = setTimeout(() => setFire((status) => !status), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <div className="h-screen w-full absolute top-0 left-0 z-10 backdrop-blur-sm flex items-center justify-center" />
      <div className="h-screen w-full absolute top-0 left-0 z-30 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            rotate: -360,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            type: "tween",
          }}
          transition={{
            duration: 1,
          }}
          className="relative w-96 h-96 bg-gradient-to-br from-teal-300 to-purple-600 rounded-3xl"
        >
          <ReactCanvasConfetti
            fire={fire}
            className="w-full h-full absolute top-0 right-0"
          />
          <div className="w-full h-full absolute top-0 right-0 z-10 flex items-center justify-center font-extrabold text-white text-4xl">
            You won!!
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Alert;
