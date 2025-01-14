export interface IMessage {
  id: number;
  chat_id: string;
  sender_id: string;
  sender_type: MessageSenderType;
  type: MessageType;
  text: string;
  is_viewed: boolean;
  is_edited: boolean;
  created_at: string;
  status?: MessageStatus;
}

export type MessageType = "COVER_LETTER" | "MESSAGE" | "INVITE" | "REJECT";
export type MessageSenderType = "user" | "company";
export type MessageStatus = "PENDING" | "ERROR";
