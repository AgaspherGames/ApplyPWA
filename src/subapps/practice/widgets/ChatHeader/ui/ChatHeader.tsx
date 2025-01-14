import RelLink from "@/shared/components/RelLink";
import { IChat } from "@/subapps/practice/entities/chat";
import { BackButton, Card, Skeleton, Title } from "@agaspher/apply.ui-kit";
import { IonHeader, IonToolbar, useIonRouter } from "@ionic/react";
import React from "react";
interface ChatHeaderProps {
  chat?: IChat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
  const router = useIonRouter();

  if (!chat) {
    return (
      <IonHeader>
        <IonToolbar className="px-4">
          <div className="flex items-center gap-4">
            <BackButton
              back={() => {
                router.goBack();
              }}
              className="static h-8"
            />
            <div className="py-2">
              <Title className="leading-[1.3]">
                <Skeleton className="w-32" />
              </Title>
              <p className="text-sm text-stone-500 leading-none">
                <Skeleton className="w-48" />
              </p>
            </div>
          </div>
        </IonToolbar>

        <Card className="py-3 bg-stone-700 bg-opacity-100 rounded-none">
          <div className="leading-none">
            <p className="text-sm leading-[1.1]">
              <Skeleton className="w-32" />
            </p>
            <p className="text-lg font-medium leading-none">
              <Skeleton className="w-48" />
            </p>
          </div>
        </Card>
      </IonHeader>
    );
  }

  return (
    <IonHeader>
      <IonToolbar className="px-4">
        <div className="flex items-center gap-4">
          <BackButton
            back={() => {
              router.goBack();
            }}
            className="static h-8"
          />
          <RelLink to={`company/${chat.company.id}`}>
            <div className="py-2">
              <Title className="leading-[1.3]">{chat?.company.name}</Title>
              <p className="text-sm text-stone-500 leading-none">
                Последний визит в 12:05
              </p>
            </div>
          </RelLink>
        </div>
      </IonToolbar>
      <RelLink to={`internship/${chat.internship.id}`} >

        <Card className="py-3 bg-stone-700 bg-opacity-100 rounded-none">
          <div className="leading-none">
            <p className="text-sm leading-[1.1]">Отклик на стажировку</p>
            <p className="text-lg font-medium leading-none">
              {chat?.internship.name}
            </p>
          </div>
        </Card>
      </RelLink>
    </IonHeader>
  );
};

export default ChatHeader;
