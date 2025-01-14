import useLongPress from "@/shared/utils/useLongPress";
import { IMessage, MessageApi } from "@/subapps/practice/entities/message";
import { Card } from "@agaspher/apply.ui-kit";
import { IonIcon } from "@ionic/react";
import {
  alertOutline,
  checkmark,
  checkmarkDoneOutline,
  checkmarkOutline,
  time,
  timeOutline,
} from "ionicons/icons";
import { DateTime } from "luxon";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
interface MessageCardProps {
  message: IMessage;
  chatId: string;
  openActions: (message: IMessage) => void;
  readMessage: (id: number) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  chatId,
  openActions,
  readMessage,
}) => {
  const timeString = DateTime.fromISO(message.created_at).toFormat("HH:mm");

  let MessageStatusIcon = <IonIcon icon={checkmarkOutline} />;
  if (message.status == "PENDING")
    MessageStatusIcon = <IonIcon icon={timeOutline} />;
  if (message.status == "ERROR")
    MessageStatusIcon = <IonIcon className="text-red-500" icon={alertOutline} />;
  if (message.is_viewed)
    MessageStatusIcon = <IonIcon icon={checkmarkDoneOutline} />;

  const longPressProps =
    message.sender_type == "user" &&
    useLongPress(() => {
      openActions(message);
    });

  useEffect(() => {
    (async () => {
      if (!message.is_viewed && message.sender_type == "company") {
        await MessageApi.viewMessage(chatId, message.id);
        readMessage(message.id);
      }
    })();
  }, []);

  return (
    <Card
      {...longPressProps}
      className={twMerge(
        "max-w-[80%] flex flex-wrap items-end p-2",
        message.sender_type == "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div>
        <p className="break-all">{message.text}</p>
      </div>
      <div className="flex justify-end items-center gap-1 ml-auto pl-2">
        {message.is_edited && (
          <p className="text-xs text-stone-500 text-end">Изменено</p>
        )}
        <p className="text-xs text-stone-500 text-end">{timeString}</p>
        {message.sender_type == "user" && MessageStatusIcon}
      </div>
    </Card>
  );
};

export default MessageCard;
