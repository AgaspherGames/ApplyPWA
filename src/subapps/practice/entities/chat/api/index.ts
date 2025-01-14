import http from "@/shared/api";
import { IChat, IChatsResponse } from "..";

export const ChatApi = {
  getChats() {
    return http.get<IChatsResponse>(`/user/chat`);
  },
  getChat(chatId: string) {
    return http.get<IChat>(`/user/chat/${chatId}`);
  },
};
