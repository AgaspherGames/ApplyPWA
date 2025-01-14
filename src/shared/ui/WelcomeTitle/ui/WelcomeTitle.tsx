import { IonText } from "@ionic/react";
import React from "react";
interface WelcomeTitleProps {}

const WelcomeTitle: React.FC<WelcomeTitleProps> = () => {
  return (
    <IonText>
      <div className="flex items-center mb-8 ">
        <h1 className=" text-3xl xs:text-4xl font-bold xs:mt-4 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300  to-green-500">
          Добро пожаловать в{" "}
          <span
            className="text-transparent bg-clip-text  
 bg-green-500
  font-extrabold drop-shadow-glow"
          >
            Apply
          </span>
        </h1>
      </div>
    </IonText>
  );
};

export default WelcomeTitle;
