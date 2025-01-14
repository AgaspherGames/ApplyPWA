import ResumeForm from "@/subapps/practice/features/ResumeForm";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
interface ResumePageProps {}

const ResumePage: React.FC<ResumePageProps> = () => {
  return (
    <IonPage>
      <IonContent>
        <ResumeForm />
      </IonContent>
    </IonPage>
  );
};

export default ResumePage;
