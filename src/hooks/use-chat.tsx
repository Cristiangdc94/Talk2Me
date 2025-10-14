"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Message } from "@/lib/types";
import { channels, directMessages, users } from "@/lib/mock-data";
import { Hash, Lock } from "lucide-react";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";

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
  setActiveChatId: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);

  const setActiveChatId = useCallback((id: string | null) => {
    setActiveChatIdState(id);
  }, []);

  const openChat = useCallback((chat: ChatState) => {
    setActiveChatIdState(chat.id);
  }, []);

  const closeChat = useCallback(() => {
    setActiveChatIdState(null);
  }, []);

  const activeChat = React.useMemo(() => {
    if (!activeChatId) return null;

    const channel = channels.find(c => c.id === activeChatId);
    if (channel) {
      return {
        id: channel.id,
        type: "channel" as const,
        title: channel.name,
        icon: channel.type === "private" ? <Lock className="w-5 h-5 text-muted-foreground" /> : <Hash className="w-5 h-5 text-muted-foreground" />,
        messages: channel.messages,
      };
    }

    const dm = directMessages.find(d => d.id === activeChatId);
    if (dm) {
      const recipient = users.find((u) => u.id === dm.id);
      if (!recipient) return null;
      return {
        id: dm.id,
        type: "dm" as const,
        title: dm.name,
        icon: <UserAvatarWithStatus user={recipient} className="w-8 h-8"/>,
        messages: dm.messages,
      };
    }
    
    return null;
  }, [activeChatId]);


  return (
    <ChatContext.Provider value={{ activeChat, openChat, closeChat, activeChatId, setActiveChatId }}>
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
