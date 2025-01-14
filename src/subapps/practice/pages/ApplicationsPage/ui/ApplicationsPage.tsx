import React from "react";
import ApplicationPageTabs from "@/subapps/practice/widgets/ApplicationPageTabs";
import { IonContent, IonPage } from "@ionic/react";
interface ApplicationsPageProps {}

const ApplicationsPage: React.FC<ApplicationsPageProps> = () => {
  return (
    <IonPage>
      <IonContent class="ion-padding">
        <ApplicationPageTabs />
      </IonContent>
    </IonPage>
  );
};

export default ApplicationsPage;
