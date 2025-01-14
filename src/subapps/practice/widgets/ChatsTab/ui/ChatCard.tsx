import RelLink from "@/shared/components/RelLink";
import { getFileLink } from "@/shared/utils/FIleLinkUtil";
import { IChat } from "@/subapps/practice/entities/chat";
import { Card, Title } from "@agaspher/apply.ui-kit";
import { IonAvatar } from "@ionic/react";
import { DateTime } from "luxon";
import React from "react";
interface ChatCardProps {
  chat: IChat;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  const timeString =
    chat.last_message &&
    DateTime.fromISO(chat.last_message.created_at).toFormat("HH:mm");
  return (
    <RelLink to={`chat/${chat.id}`}>
      <Card className="flex gap-4 items-center">
        <div className="">
          <IonAvatar className="w-12 h-12">
            <img
              src={getFileLink(chat.company.avatar, "avatar")}
              className="aspect-square"
              alt=""
            />
          </IonAvatar>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-sm text-stone-500 leading-[1.2]">
              {chat.company.name}
            </p>
            <p className="text-sm text-stone-500 leading-[1.2]">{timeString}</p>
          </div>
          <Title className="">{chat.internship.name}</Title>

          <p className="text-stone-500 line-clamp-1 max-w-full break-all">
            {chat.last_message && chat.last_message.text}
          </p>
        </div>
      </Card>
    </RelLink>
  );
};

export default ChatCard;
