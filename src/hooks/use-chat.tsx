"use client";

import React, { createContext, useContext, useState } from "react";
import type { Message } from "@/lib/types";

interface ChatState {
  id: string;
  type: "channel" | "dm";
  title: string;
  icon: React.ReactNode;
  messages: Message[];
}

interface ChatContextType {
  activeChat: ChatState | null;
  openChat: (chat: ChatState) => void;
  closeChat: () => void;
  activeChatId: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChat, setActiveChat] = useState<ChatState | null>(null);

  const openChat = (chat: ChatState) => {
    setActiveChat(chat);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <ChatContext.Provider value={{ activeChat, openChat, closeChat, activeChatId: activeChat?.id || null }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
