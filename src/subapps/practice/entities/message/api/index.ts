import http from "@/shared/api";
import { IMessage } from "../model/types";

export const MessageApi = {
  getMessages(chatId: string) {
    return http.get<IMessage[]>(`/user/chat/${chatId}/message`);
  },
  postMessage(chatId: string, text: string) {
    return http.post(`/user/chat/${chatId}/message`, { text });
  },
  editMessage(chatId: string, messageId: number, text: string) {
    return http.put(`/user/chat/${chatId}/message/${messageId}`, { text });
  },
  viewMessage(chatId: string, messageId: number) {
    return http.post(`/user/chat/${chatId}/message/${messageId}`);
  },
  deleteMessage(chatId: string, messageId: number) {
    return http.delete(`/user/chat/${chatId}/message/${messageId}`);
  },
};
