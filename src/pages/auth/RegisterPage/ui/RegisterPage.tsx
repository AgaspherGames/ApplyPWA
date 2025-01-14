import WelcomeTitle from "@/shared/ui/WelcomeTitle";
import { useKeyboard } from "@/shared/utils/hooks";
import RegisterForm from "@/widgets/auth/RegisterForm";
import { Card } from "@agaspher/apply.ui-kit";
import { IonFooter, IonPage, IonRouterLink, IonText } from "@ionic/react";

import React from "react";
import { twMerge } from "tailwind-merge";
interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const isKeyboardOpen = useKeyboard();
  return (
    <IonPage className="absolute ">
      <img
        className="absolute inset-0 object-cover h-full w-full -z-10"
        src="/images/bg.svg"
      />
      <div className="">
        {!isKeyboardOpen && (
          <div className="px-8 pt-4">
            <WelcomeTitle />
          </div>
        )}
        <div className={"fixed bottom-0 inset-x-0 text-lg"}>
          <Card
            className={twMerge(
              "px-8 pb-16 bg-opacity-20 bg-zinc-500 backdrop-blur-md rounded-t-3xl rounded-b-none",
              isKeyboardOpen &&
                "fixed inset-0 rounded-none flex flex-col items-end"
            )}
          >
            {isKeyboardOpen && <WelcomeTitle />}
            <RegisterForm />
          </Card>
        </div>
      </div>

      <IonFooter className="text-center shadow-none p-4 !bg-transparent">
        <IonText>
          Уже есть аккаунт?{" "}
          <IonRouterLink routerLink="/login">Войти</IonRouterLink>
        </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default RegisterPage;
