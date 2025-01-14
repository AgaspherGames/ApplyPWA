import { Card, Title } from "@agaspher/apply.ui-kit";
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
interface OffersPageProps {}

const OffersPage: React.FC<OffersPageProps> = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="p-4">
          <Card>
            <Title>Frontend developer</Title>
            <div>
              <p>AgaspherGames</p>
            </div>
          </Card>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OffersPage;
