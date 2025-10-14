

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import type { Message, DirectMessage, Notification } from "@/lib/types";
import { channels, directMessages as initialDirectMessages, users, notifications as initialNotifications } from "@/lib/mock-data";
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
  addMessage: (chatId: string, message: Message, incrementUnread?: boolean) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const randomMessages = [
  "¿Qué tal todo?",
  "Te envío el archivo ahora mismo.",
  "¿Nos vemos mañana para el café?",
  "Revisa esto cuando tengas un momento.",
  "¡Me encantó la idea que propusiste!",
  "Confirmado para la reunión de las 3 PM.",
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(initialDirectMessages);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addMessage = useCallback((chatId: string, message: Message, incrementUnread = false) => {
    setDirectMessages(prevDms =>
        prevDms.map(dm => {
            if (dm.id === chatId) {
                const newUnreadCount = incrementUnread ? (dm.unreadCount || 0) + 1 : dm.unreadCount;
                return { ...dm, messages: [...dm.messages, message], unreadCount: newUnreadCount };
            }
            return dm;
        })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        // Pick a random DM that is not the active one
        const availableDms = directMessages.filter(dm => dm.id !== activeChatId);
        if (availableDms.length === 0) return;

        const randomDm = availableDms[Math.floor(Math.random() * availableDms.length)];
        const sender = users.find(u => u.id === randomDm.userId);
        
        if (!sender) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user: sender,
        };

        const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            type: 'message',
            text: `Tienes un nuevo mensaje de ${sender.name}.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            chatId: randomDm.id,
            chatType: 'dm',
        };

        // Add message and notification
        addMessage(randomDm.id, newMessage, true);
        setNotifications(prev => [newNotification, ...prev]);

    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [activeChatId, addMessage, directMessages]);


  const openChat = useCallback((id: string) => {
    setActiveChatId(id);
    // When a chat is opened, mark its messages as read
    setDirectMessages(prevDms =>
      prevDms.map(dm =>
        dm.id === id ? { ...dm, unreadCount: 0 } : dm
      )
    );
     setNotifications(prevNotifs => 
        prevNotifs.filter(notif => notif.chatId !== id)
     );
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
    <ChatContext.Provider value={{ activeChat, openChat, closeChat, activeChatId, directMessages, addMessage, notifications, setNotifications }}>
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
