import { create } from "zustand";
import { IChat } from "./types";
import { ChatApi } from "../api";

interface ChatState {
  chats: IChat[];
  isFetching: boolean;
  isLoaded: boolean;
  loadChats: () => Promise<void>;
}

export const useChatStore = create<ChatState>()((set) => ({
  chats: [],
  isFetching: false,
  isLoaded: false,
  async loadChats() {
    set({
      isFetching: true,
    });
    const resp = await ChatApi.getChats();
    set({
      chats: resp.data.chats,
      isFetching: false,
      isLoaded: true,
    });
  },
}));
