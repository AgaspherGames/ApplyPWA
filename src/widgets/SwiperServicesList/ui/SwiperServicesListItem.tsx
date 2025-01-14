import { IonIcon, IonRouterLink } from "@ionic/react";
import React, { forwardRef } from "react";
interface SwiperServicesListItemProps {
  text: string;
  icon: string;
  link: string;
}

const SwiperServicesListItem: React.FC<SwiperServicesListItemProps> = ({icon, link,text}) => {
  return (
    <IonRouterLink
      routerLink={link}
      className="flex flex-col items-center w-full text-center text-inherit"
    >
      <div className="flex flex-col items-center">
        <IonIcon size="large" icon={icon} />
        {text}
      </div>
    </IonRouterLink>
  );
};

export default SwiperServicesListItem;
