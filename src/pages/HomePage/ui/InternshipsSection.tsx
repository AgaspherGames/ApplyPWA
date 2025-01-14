import { IonIcon, useIonRouter } from "@ionic/react";
import React, { useContext } from "react";
import "./HomePage.css";
import { Card, Title } from "@agaspher/apply.ui-kit";
import { checkmark } from "ionicons/icons";
import { MotionValue, motion, useTransform } from "framer-motion";
import { RangeContext } from "./ScrollSection";

interface InternshipsSectionProps {
  scrollY: MotionValue<number>;
}

const InternshipsSection: React.FC<InternshipsSectionProps> = ({ scrollY }) => {
  const router = useIonRouter();

  const range = useContext(RangeContext);

  const y = useTransform(scrollY, range, [200, 0, -200]);
  const scale = useTransform(scrollY, range, [0, 1, 0]);
  const rocketRotation = useTransform(scrollY, range, [
    "-75deg",
    "0deg",
    "75deg",
  ]);
  const rocketTranslate = useTransform(scrollY, range, [
    "50% 50%",
    "0% 0%",
    "-50% -50%",
  ]);
  const likeRotation = useTransform(scrollY, range, [
    "-55deg",
    "0deg",
    "55deg",
  ]);
  const fireRotation = useTransform(scrollY, range, [
    "-25deg",
    "0deg",
    "25deg",
  ]);
  const background = useTransform(scrollY, range, [
    "#1c1917",
    "#0c0a09",
    "#1c1917",
  ]);
  const opacity = useTransform(scrollY, range, [-0.1, 1, -0.1]);

  return (
    <motion.div
      onClick={() => {
        router.push("/practice/home");
      }}
      style={{ background }}
      className="h-full flex flex-col bg-stone-950 snap-end"
    >
      <motion.div className=" bg-stone-900 h-2/3 rounded-b-[100%] w-[200%] -translate-x-[25%] overflow-hidden z-10">
        <div className="h-full w-[100vw] relative mx-auto">
          <div className="absolute -z-10 w-full h-full text-stone-800 grid grid-cols-5 grid-rows-7">
            {Array(35)
              .fill("")
              .map((_, ind) => (
                <motion.div
                  key={ind}
                  initial={{
                    scale: 0,
                  }}
                  exit={{
                    scale: 0,
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: 1,
                  }}
                  style={{ opacity }}
                  transition={{
                    duration: 1,
                    delay: ind * 0.03,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.75, 1],
                  }}
                  className="inline-flex items-center justify-center w-full h-full"
                >
                  <IonIcon className=" w-12 h-12 " icon={checkmark} />
                </motion.div>
              ))}
          </div>

          <div className=" w-max ">
            <Card className="absolute overflow-visible left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit bg-green-600 bg-opacity-0">
              <motion.div
                style={{
                  scale,
                  rotate: rocketRotation,
                  translate: rocketTranslate,
                }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  repeatDelay: 1,
                  duration: 1,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 0.8,
                }}
                className=" absolute -left-4 -top-28  -z-10 "
              >
                <motion.div
                  animate={{
                    translate: ["-1.5% -1.5%", "1.5% 1.5%", "-1.5% -1.5%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className=""
                >
                  <motion.div
                    animate={{
                      rotate: ["0deg", "-2deg", "0deg"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                    }}
                    className=""
                  >
                    <img
                      src="/icons/3d/rocket.png"
                      className="w-52 h-52 -scale-x-100 "
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  scale: 0,
                }}
                exit={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  repeatDelay: 1,
                  duration: 1,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 0,
                }}
              >
                <Title className="text-center text-[42px] w-max font-black ">
                  Быстрый старт <br /> карьеры
                </Title>
              </motion.div>
              <motion.div
                style={{ scale, rotate: likeRotation }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  repeatDelay: 1,
                  duration: 1,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 0.3,
                }}
                className=" absolute -right-3 -bottom-28"
              >
                <motion.div
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  animate={{
                    rotate: ["-4deg", "4deg", "-4deg"],
                  }}
                >
                  <img src="/icons/3d/like.png" className="w-48 h-48" />
                </motion.div>
              </motion.div>
            </Card>
            <motion.div
              style={{ scale, rotate: fireRotation }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                repeatDelay: 1,
                duration: 1,
                delay: 0.5,
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
              className=" absolute -left-12 -bottom-6"
            >
              <motion.div
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                animate={{
                  rotate: ["4deg", "-4deg", "4deg"],
                }}
              >
                <img src="/icons/3d/fire.png" className="w-48 h-48" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ translateY: y, opacity }}
        className="text-center flex flex-col items-center justify-center flex-1 "
      >
        <Title className="text-4xl ">Apply Стажировки</Title>
        <p className="text-2xl mt-6 text-stone-400">
          Проходите стажировки в компаниях, покажите всем свои возможности
        </p>
      </motion.div>
    </motion.div>
  );
};

export default InternshipsSection;
