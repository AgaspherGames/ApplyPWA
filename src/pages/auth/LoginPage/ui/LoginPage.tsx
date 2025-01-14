import LoginWithGoogle from "@/features/LoginWithGoogle";
import WelcomeTitle from "@/shared/ui/WelcomeTitle";
import { useKeyboard } from "@/shared/utils/hooks";
import LoginForm from "@/widgets/auth/LoginForm";
import { Card } from "@agaspher/apply.ui-kit";
import { motion } from "framer-motion";
import { IonFooter, IonPage, IonRouterLink, IonText } from "@ionic/react";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import RegisterForm from "@/widgets/auth/RegisterForm";
interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const isKeyboardOpen = useKeyboard();
  const [tab, setTab] = useState<"login" | "register">("login");
  return (
    <IonPage className="absolute ">
      <motion.img
        animate={tab}
        variants={{
          login: {
            translateX: "0%",
          },
          register: {
            translateX: "-50%",
          },
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          bounce: 0.1,
        }}
        className="absolute inset-0 object-cover h-full min-w-[200vw] -z-10"
        src="/images/bg-big.svg"
      />

      <div className="">
        {!isKeyboardOpen && (
          <div className="px-8 pt-4">
            <WelcomeTitle />
          </div>
        )}

        <div className={"fixed bottom-0 inset-x-0 text-lg"}>
          {!isKeyboardOpen && (
            <div className="w-full text-center px-8">
              <motion.div>
                <LoginWithGoogle />
              </motion.div>
              <motion.p className="my-2 text-stone-400">Или</motion.p>
            </div>
          )}
          <Card
            className={twMerge(
              "px-8 relative pb-16 bg-opacity-20 bg-zinc-500 backdrop-blur-md rounded-t-3xl rounded-b-none transition-all",
              isKeyboardOpen &&
                "fixed inset-0 rounded-none flex flex-col items-end"
            )}
          >
            {isKeyboardOpen && <WelcomeTitle />}
            <div className="relative w-full">
              <motion.div
                animate={tab}
                variants={{
                  login: {
                    translateX: "0%",
                    opacity: 1,
                    position: "relative",
                  },
                  register: {
                    translateX: "-100%",
                    opacity: 0,
                    position: "absolute",
                  },
                }}
                transition={{
                  mass: 1,
                }}
                className="top-0 w-full"
              >
                <LoginForm />
              </motion.div>
              <motion.div
                animate={tab}
                variants={{
                  register: {
                    translateX: "0%",
                    opacity: 1,
                    position: "relative",
                  },
                  login: {
                    translateX: "100%",
                    opacity: 0,
                    position: "absolute",
                  },
                }}
                initial={{
                  translateX: "100%",
                  opacity: 0,
                  position: "absolute",
                }}
                className="top-0 w-full"
                transition={{
                  mass: 1,
                }}
              >
                <RegisterForm />
              </motion.div>
            </div>
          </Card>
        </div>
      </div>

      <IonFooter className="text-center shadow-none p-4 !bg-transparent">
        <div className="relative ">
          <IonText className="opacity-0">.</IonText>
          <motion.div
            animate={tab}
            variants={{
              login: {
                translateX: "0vw",
                opacity: 1,
                zIndex: 1,
              },
              register: {
                translateX: "-50vw",
                zIndex: 0,
                opacity: 0,
              },
            }}
            className="absolute top-0 inset-x-0"
          >
            <IonText className="mx-auto">
              Еще нет аккаунта?{" "}
              <IonRouterLink
                onClick={() => {
                  setTab("register");
                }}
              >
                Зарегистрироваться
              </IonRouterLink>
            </IonText>
          </motion.div>
          <motion.div
            animate={tab}
            variants={{
              register: {
                translateX: "0vw",
                opacity: 1,
                zIndex: 1,
              },
              login: {
                translateX: "50vw",
                opacity: 0,
                zIndex: 0,
              },
            }}
            initial={{
              translateX: "50vw",
              opacity: 0,
              zIndex: 0,
            }}
            className="absolute top-0 inset-x-0"
          >
            <IonText className="mx-auto">
              Уже есть аккаунт?{" "}
              <IonRouterLink
                onClick={() => {
                  setTab("login");
                }}
              >
                Войти
              </IonRouterLink>
            </IonText>
          </motion.div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
