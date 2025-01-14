import { ChatApi, IChat } from "@/subapps/practice/entities/chat";
import { IMessage, MessageApi } from "@/subapps/practice/entities/message";
import { IonContent, IonFooter, IonPage } from "@ionic/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import { useUserStore } from "@/entities/user";
import MessagesList from "@/subapps/practice/widgets/MessagesList";
import MessageInput from "@/subapps/practice/features/MessageInput";
import { useAsync } from "@/shared/utils/hooks";
import ChatHeader from "@/subapps/practice/widgets/ChatHeader";
import { MessageInputHandles } from "@/subapps/practice/features/MessageInput/ui/MessageInput";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const { user } = useUserStore();

  const contentRef = useRef<HTMLIonContentElement>(null);
  const inputRef = useRef<MessageInputHandles>(null);

  const [chat, setChat] = useState<IChat>();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageToEdit, setMessageToEdit] = useState<IMessage | undefined>();

  const loadDataRequest = useAsync(loadData);
  const sendMessageRequest = useAsync(sendMessage);
  const editMessageRequest = useAsync(editMessage);
  const deleteMessageRequest = useAsync(deleteMessage);

  const ChatRequest = useAsync(async () => {
    const chatResponse = await ChatApi.getChat(chatId);
    setChat(chatResponse.data);
    return;
  });
  const MessagesRequest = useAsync(async () => {
    const messagesResponse = await MessageApi.getMessages(chatId);
    setMessages(messagesResponse.data);
  });

  function scrollToBottom() {
    contentRef.current?.scrollToBottom();
    return "";
  }

  async function loadData() {
    await Promise.all([ChatRequest.call(), MessagesRequest.call()]);
    scrollToBottom();
  }

  async function sendMessage() {
    setText("");
    const id = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        chat_id: chatId,
        created_at: new Date().toISOString(),
        id,
        is_edited: false,
        is_viewed: false,
        sender_id: user?.id || "",
        sender_type: "user",
        text,
        type: "MESSAGE",
        status: "PENDING",
      },
    ]);
    scrollToBottom();

    try {
      const resp = await MessageApi.postMessage(chatId, text);
    } catch (error) {
      setMessages((p) =>
        p.map((message) => {
          if (message.id == id) {
            return {
              ...message,
              status: "ERROR",
            };
          }
          return message;
        })
      );

      throw error;
    }
    await MessagesRequest.call();

    // resp.onError()
  }

  async function editMessage() {
    if (!messageToEdit) return;
    const messageId = messageToEdit?.id;
    setText("");
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id == messageId
          ? {
              ...msg,
              text,
              id: 0,
            }
          : msg
      )
    );
    setMessageToEdit(undefined);
    await MessageApi.editMessage(chatId, messageId, text);
    await MessagesRequest.call();
  }

  function startEditMessage(message: IMessage) {
    setMessageToEdit(message);
  }

  async function deleteMessage(id: number) {
    setMessages((p) => p.filter((m) => m.id != id));
    await MessageApi.deleteMessage(chatId, id);
  }

  const readMessage = useCallback((id: number) => {
    setMessages((p) =>
      p.map((m) => (m.id == id ? { ...m, is_viewed: true } : m))
    );
  }, []);

  const disabled = useMemo(() => {
    if (messageToEdit) return false;
    return messages.length !== 0 && chat?.application_id.status != "invite";
  }, [messages, messageToEdit]);

  useEffect(() => {
    loadDataRequest.call();
  }, []);

  useEffect(() => {
    if (!messageToEdit) return;
    setText(messageToEdit.text);
    inputRef.current?.hoverInput();
  }, [messageToEdit]);

  return (
    <IonPage>
      <ChatHeader chat={chat} />
      <IonContent ref={contentRef} class="ion-padding h-[100dvh]">
        <MessagesList
          deleteMessage={deleteMessageRequest.call}
          readMessage={readMessage}
          editMessage={startEditMessage}
          loaded={!!(MessagesRequest.status != "pending" || messages.length)}
          chatId={chatId}
          messages={messages}
        />
        {scrollToBottom()}
      </IonContent>
      <IonFooter>
        <MessageInput
          disabled={disabled}
          ref={inputRef}
          onSend={
            messageToEdit ? editMessageRequest.call : sendMessageRequest.call
          }
          setText={setText}
          text={text}
        />
      </IonFooter>
    </IonPage>
  );
};

export default ChatPage;
