import { IMessage } from "@/subapps/practice/entities/message";
import MessageCard, {
  MessageCardSkeleton,
} from "@/subapps/practice/features/MessageCard";
import { Skeleton } from "@agaspher/apply.ui-kit";
import { useIonActionSheet, useIonAlert } from "@ionic/react";
import { DateTime } from "luxon";
import React from "react";

function dateFormat(date: string) {
  return DateTime.fromISO(date).toFormat("d MMMM yyyy", {
    locale: "ru",
  });
}

interface MessagesListProps {
  messages: IMessage[];
  chatId: string;
  loaded?: boolean;
  editMessage: (message: IMessage) => void;
  readMessage: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  chatId,
  loaded,
  editMessage,
  readMessage,
  deleteMessage,
}) => {
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();

  function messageActionSheet(message: IMessage) {
    present({
      header: "Дополнительно",

      buttons: [
        {
          text: "Скопировать",
          data: {
            action: "copy",
          },
          handler() {
            navigator.clipboard.writeText(message.text);
          },
        },
        {
          text: "Редактировать",
          data: {
            action: "edit",
          },
          handler() {
            editMessage(message);
          },
        },
        {
          text: "Удалить",
          role: "destructive",
          data: {
            action: "delete",
          },
          cssClass: "!text-red-500 !bg-red-950 !bg-opacity-30",
          handler() {
            presentAlert({
              header: "Вы уверены, что хотите удалить сообщение?",
              subHeader: "",
              cssClass: "!rounded-xl",
              message:
                "После удаления, сообщение будет не доступно для всех участников чата.",
              buttons: [
                {
                  text: "Отмена",
                  cssClass: "!text-white",
                },
                {
                  text: "Удалить",
                  cssClass: "!text-red-500",
                  async handler() {
                    deleteMessage(message.id)
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
    });
  }

  if (!loaded) {
    return (
      <div className="grid gap-4 pb-4">
        <p className="text-stone-500 w-full text-center">
          <Skeleton className="w-32 mx-auto" />
        </p>
        <MessageCardSkeleton />
        <MessageCardSkeleton />
        <MessageCardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid gap-4 pb-4">
      {messages.map((message, index) => {
        const messageDate = dateFormat(message.created_at);
        const prevMessageDate = dateFormat(
          messages[index - 1 >= 0 ? index - 1 : 0].created_at
        );

        return (
          <>
            {(messageDate !== prevMessageDate || index == 0) && (
              <p
                key={messageDate}
                className="text-stone-500 w-full text-center"
              >
                {messageDate}
              </p>
            )}
            <MessageCard
              readMessage={readMessage}
              openActions={messageActionSheet}
              chatId={chatId}
              key={message.id}
              message={message}
            />
          </>
        );
      })}
    </div>
  );
};

export default MessagesList;
