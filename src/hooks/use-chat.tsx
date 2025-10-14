

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import type { Message, DirectMessage, Notification, User } from "@/lib/types";
import { channels, directMessages as initialDirectMessages, users, notifications as initialNotifications } from "@/lib/mock-data";
import { Hash, Lock } from "lucide-react";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";

export interface ChatState {
  id: string;
  type: "channel" | "dm";
  title: string;
  icon: React.ReactNode;
  messages: Message[];
}

interface ChatContextType {
  activeChats: ChatState[];
  openChat: (id: string) => void;
  closeChat: (id: string) => void;
  activeChatIds: string[];
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
  const [activeChatIds, setActiveChatIds] = useState<string[]>([]);
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
        const availableDms = directMessages.filter(dm => !activeChatIds.includes(dm.id));
        if (availableDms.length === 0) return;

        const randomDm = availableDms[Math.floor(Math.random() * availableDms.length)];
        const sender = users.find(u => u.id === randomDm.userId);
        
        if (!sender) return;

        const isMissedCall = Math.random() < 0.2; // 20% chance of being a missed call
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isMissedCall) {
             const newCallMessage: Message = {
                id: `call-${Date.now()}`,
                type: 'call',
                callStatus: 'missed',
                timestamp,
                user: sender,
             };
             const newNotification: Notification = {
                id: `notif-${Date.now()}`,
                type: 'call',
                text: `Llamada perdida de ${sender.name}.`,
                timestamp,
                chatId: randomDm.id,
                chatType: 'dm',
             };
             addMessage(randomDm.id, newCallMessage, true);
             setNotifications(prev => [newNotification, ...prev]);

        } else {
            const newMessage: Message = {
                id: `msg-${Date.now()}`,
                type: 'message',
                text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                timestamp,
                user: sender,
            };

            const newNotification: Notification = {
                id: `notif-${Date.now()}`,
                type: 'message',
                text: `Tienes un nuevo mensaje de ${sender.name}.`,
                timestamp,
                chatId: randomDm.id,
                chatType: 'dm',
            };

            addMessage(randomDm.id, newMessage, true);
            setNotifications(prev => [newNotification, ...prev]);
        }

    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [activeChatIds, addMessage, directMessages]);


  const openChat = useCallback((id: string) => {
    setActiveChatIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds;
      }
      return [...prevIds, id];
    });

    setDirectMessages(prevDms =>
      prevDms.map(dm =>
        dm.id === id ? { ...dm, unreadCount: 0 } : dm
      )
    );
     setNotifications(prevNotifs => 
        prevNotifs.filter(notif => notif.chatId !== id)
     );
  }, []);

  const closeChat = useCallback((id: string) => {
    setActiveChatIds(prevIds => prevIds.filter(chatId => chatId !== id));
  }, []);

  const activeChats = useMemo(() => {
    if (!activeChatIds.length) return [];

    return activeChatIds.map(id => {
      if (id.startsWith('channel-')) {
          const channel = channels.find(c => c.id === id);
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

      if (id.startsWith('dm-')) {
          const dm = directMessages.find(d => d.id === id);
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
    }).filter((chat): chat is ChatState => chat !== null);
  }, [activeChatIds, directMessages]);


  return (
    <ChatContext.Provider value={{ activeChats, openChat, closeChat, activeChatIds, directMessages, addMessage, notifications, setNotifications }}>
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
