import { Card } from "@agaspher/apply.ui-kit";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
interface ProfileMenuTabProps {
  closeFn: () => void;
  children: React.ReactNode;
}

const ProfileMenuTab: React.FC<ProfileMenuTabProps> = ({
  children,
  closeFn,
}) => {
  return (
    <Card className="rounded-3xl">
      <div className="relative z-10">{children}</div>
      <IonIcon
        className="absolute right-4 top-3 w-5 h-5 z-10"
        onClick={closeFn}
        size=""
        icon={close}
      ></IonIcon>
    </Card>
  );
};

export default ProfileMenuTab;
