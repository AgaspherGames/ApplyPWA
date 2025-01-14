import RelLink from "@/shared/components/RelLink";
import { Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
import { IonContent, IonModal } from "@ionic/react";
import React, { useRef } from "react";
interface NoResumeModalProps {
  trigger: string;
}

const NoResumeModal: React.FC<NoResumeModalProps> = ({ trigger }) => {
  const ref = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal
      ref={ref}
      className="ion-application-modal ion-transparent-bg bg-black bg-opacity-40 "
      trigger={trigger}
    >
      <IonContent
        onClick={(e) => {
          ref.current?.dismiss();
          e.stopPropagation();
        }}
        className="ion-transparent-bg overflow-hidden"
      >
        <div className="flex flex-col h-full w-full items-center justify-center text-center p-4">
          <Card className="bg-opacity-100 grid gap-4">
            <Title>Вам необходимо опубликовать как минимум одно резюме</Title>
            <RelLink to={"resume/create"}>
              <CustomButton>Добавить резюме</CustomButton>
            </RelLink>
          </Card>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default NoResumeModal;
