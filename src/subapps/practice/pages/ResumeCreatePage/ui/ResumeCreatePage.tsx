import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import ResumeCreateForm from "@/subapps/practice/features/ResumeCreateForm";
interface ResumeCreatePageProps {}

const ResumeCreatePage: React.FC<ResumeCreatePageProps> = () => {
  return (
    <IonPage>
      <IonContent>
        <ResumeCreateForm />
      </IonContent>
    </IonPage>
  );
};

export default ResumeCreatePage;
