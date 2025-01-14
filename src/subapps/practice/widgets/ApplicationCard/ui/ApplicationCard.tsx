import RelLink from "@/shared/components/RelLink";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import {
  ApplicationApi,
  IApplication,
} from "@/subapps/practice/entities/application";
import { APPLICATION_STATUS } from "@/subapps/practice/shared/utils/StatusUtils";
import { Card, CustomButton, Title } from "@agaspher/apply.ui-kit";
import {
  IonAvatar,
  IonIcon,
  IonLabel,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";
import React, { useMemo } from "react";
interface ApplicationCardProps {
  application: IApplication;
  update: () => Promise<any>;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  update,
}) => {
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className={APPLICATION_STATUS[application.status].color}>
          {APPLICATION_STATUS[application.status].text}
        </p>
        <IonIcon
          onClick={() =>
            present({
              header: "Дополнительно",
              buttons: [
                {
                  text: "Удалить",
                  role: "destructive",
                  data: {
                    action: "delete",
                  },
                  cssClass: "!text-red-500 !bg-red-950 !bg-opacity-30",
                  handler() {
                    presentAlert({
                      header: "Вы уверены, что хотите удалить данный отклик?",
                      subHeader: "",
                      cssClass: "!rounded-xl",
                      message:
                        "После удаления, вы не сможете восстановить его.",
                      buttons: [
                        {
                          text: "Отмена",
                          cssClass: "!text-white",
                        },
                        {
                          text: "Удалить",
                          cssClass: "!text-red-500",
                          async handler() {
                            await ApplicationApi.deleteApplications(
                              application.id
                            );
                            await update();
                          },
                        },
                      ],
                    });
                  },
                },
                {
                  text: "Отмена",
                  role: "cancel",
                  data: {
                    action: "cancel",
                  },
                },
              ],
            })
          }
          icon={ellipsisVerticalOutline}
          role="button"
        />
      </div>
      <div className="my-4">
        <Title>{application.internship.name}</Title>
        <div className="flex items-center my-1 gap-1 ">
          <IonAvatar class="w-6 h-6">
            <img
              className="aspect-square"
              src={getFileLink(application.company.avatar, "avatar")}
              alt=""
            />
          </IonAvatar>
          <IonLabel className="">{application.company.name}</IonLabel>
        </div>
      </div>
      <div>
        <p>{new Date(application.created_at).toLocaleDateString()}</p>
      </div>
      <RelLink to={`chat/${application.chat_id}`}>
        <CustomButton className="w-full mt-4">Открыть чат</CustomButton>
      </RelLink>
    </Card>
  );
};

export default ApplicationCard;
