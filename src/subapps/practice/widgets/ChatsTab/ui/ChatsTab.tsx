
import React from "react";
import ChatCard from "./ChatCard";
import { useChatStore } from "@/subapps/practice/entities/chat";
import ChatCardSkeleton from "./ChatCardSkeleton";
interface ChatsTabProps {}

const ChatsTab: React.FC<ChatsTabProps> = () => {
  const { chats, isFetching, isLoaded, loadChats } = useChatStore();

  return (
    <div className="grid gap-4 pb-4">
      {isFetching
        ? [1, 2, 3, 4, 5].map((i) => <ChatCardSkeleton key={i} />)
        : chats.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
    </div>
  );
};

export default ChatsTab;
