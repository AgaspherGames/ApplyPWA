import { IonIcon, IonLabel } from "@ionic/react";
import { fileTrayFullOutline, menuOutline } from "ionicons/icons";
import React from "react";
import { ServicesMenu } from "..";
interface ServiceMenuButtonProps {
  onlyIcon?: boolean;
}

const ServiceMenuButton: React.FC<ServiceMenuButtonProps> = ({ onlyIcon }) => {
  return (
    <>
      <IonIcon aria-hidden="true" icon={menuOutline} />
      {!onlyIcon && <IonLabel>Сервисы</IonLabel>}
      <div className="absolute inset-0">
        <button id="open-services-menu" className="w-full h-full"></button>
      </div>
      <ServicesMenu />
    </>
  );
};

export default ServiceMenuButton;
