import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

type Props = {};

const IMAGE_LINKS = [
  'https://media2.giphy.com/media/kHmVOy84g8G6my09fu/giphy.gif',
  'https://media1.giphy.com/media/SABpzb2ivrS0g4Hgbb/giphy.gif',
  'https://media2.giphy.com/media/xTiTnnokzDlnhJKGwo/200.gif',
  'https://media2.giphy.com/media/Jt4y4zi519V6asgGhA/200.gif',
  'https://i.gifer.com/3vPB.gif',
  'https://c.tenor.com/b9n0ETpHvs8AAAAM/whoah-cant-believe-it.gif',
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ezgif-com-resize-1-1589826087.gif?crop=0.9375xw:1xh;center,top&resize=480:*',
  'https://c.tenor.com/umerIZbHzPcAAAAC/carlton-happy-dance.gif',
  'https://c.tenor.com/VNJrWFYJ3FYAAAAC/orange-juice-dance-dancing.gif',
  'https://c.tenor.com/SZnPddUUOMUAAAAd/orange-justice-fortnite-dance.gif',
]

const Alert = (props: Props) => {
  const [fire, setFire] = useState<boolean>(false);

  useEffect(() => {
    let timer = setTimeout(() => setFire((status) => !status), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const randomImgLink = IMAGE_LINKS[Math.floor(Math.random() * IMAGE_LINKS.length)];
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
          className="relative w-[80vw] md:w-[40vw] h-[60vh] bg-gradient-to-br from-teal-300 to-purple-600 rounded-3xl"
        >
          <ReactCanvasConfetti
            fire={fire}
            className="w-full h-full absolute top-0 right-0"
          />
          <div className="w-full h-full absolute top-0 right-0 z-10 flex flex-col items-center justify-center text-white">
            <div className="font-extrabold text-5xl mb-3">You won!!</div>
            <img className="w-[80%] h-[60%] object-cover rounded-2xl overflow-hidden" src={randomImgLink} />
          </div>
        </motion.div>
      </div >
    </>
  );
};

export default Alert;
