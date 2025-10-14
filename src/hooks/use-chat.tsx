

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Message, DirectMessage } from "@/lib/types";
import { channels, directMessages as initialDms, users } from "@/lib/mock-data";
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
  openChat: (id: string) => void;
  closeChat: () => void;
  activeChatId: string | null;
  directMessages: DirectMessage[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(initialDms);

  const openChat = useCallback((id: string) => {
    setActiveChatId(id);
  }, []);

  const closeChat = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const activeChat = useMemo(() => {
    if (!activeChatId) return null;

    if (activeChatId.startsWith('channel-')) {
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
    }

    if (activeChatId.startsWith('dm-')) {
        const dm = directMessages.find(d => d.id === activeChatId);
        if (dm) {
          const recipient = users.find((u) => u.id === dm.userId);
          if (!recipient) return null;
          return {
            id: dm.id,
            type: "dm" as const,
            title: dm.name,
            icon: <UserAvatarWithStatus user={recipient} className="w-8 h-8"/>,
            messages: dm.messages,
          };
        }
    }
    
    return null;
  }, [activeChatId, directMessages]);


  return (
    <ChatContext.Provider value={{ activeChat, openChat, closeChat, activeChatId, directMessages }}>
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
