

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  isMinimized?: boolean;
  hasUnread?: boolean;
}

interface ChatContextType {
  activeChats: ChatState[];
  openChat: (id: string) => void;
  closeChat: (id: string) => void;
  toggleMinimizeChat: (id: string) => void;
  activeChatIds: string[];
  directMessages: DirectMessage[];
  addMessage: (chatId: string, message: Message, incrementUnread?: boolean) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  removeDirectMessage: (id: string) => void;
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
  const [activeChats, setActiveChats] = useState<ChatState[]>([]);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(initialDirectMessages);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const router = useRouter();

  const activeChatIds = useMemo(() => activeChats.map(c => c.id), [activeChats]);

  const addMessage = useCallback((chatId: string, message: Message, incrementUnread = false) => {
    // Update DMs for sidebar unread count
    setDirectMessages(prevDms =>
        prevDms.map(dm => {
            if (dm.id === chatId) {
                const newUnreadCount = incrementUnread ? (dm.unreadCount || 0) + 1 : dm.unreadCount;
                return { ...dm, messages: [...dm.messages, message], unreadCount: newUnreadCount };
            }
            return dm;
        })
    );
    // Update active chat state
    setActiveChats(prevChats => 
        prevChats.map(chat => {
            if (chat.id === chatId) {
                const newHasUnread = chat.isMinimized ? true : chat.hasUnread;
                return { ...chat, messages: [...chat.messages, message], hasUnread: newHasUnread };
            }
            return chat;
        })
    );
  }, []);

  const removeDirectMessage = useCallback((id: string) => {
    setDirectMessages(prev => prev.filter(dm => dm.id !== id));
    closeChat(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        const availableDms = directMessages.filter(dm => !activeChatIds.includes(dm.id) || activeChats.find(c => c.id === dm.id)?.isMinimized);
        if (availableDms.length === 0) return;

        const randomDm = availableDms[Math.floor(Math.random() * availableDms.length)];
        const sender = users.find(u => u.id === randomDm.userId);
        
        if (!sender) return;

        const isMissedCall = Math.random() < 0.2;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const chatIsOpen = activeChatIds.includes(randomDm.id);

        if (isMissedCall) {
             const newCallMessage: Message = {
                id: `call-${Date.now()}`,
                type: 'call',
                callStatus: 'missed',
                timestamp,
                user: sender,
             };
             if (chatIsOpen) {
                addMessage(randomDm.id, newCallMessage, true);
             } else {
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
             }

        } else {
            const newMessage: Message = {
                id: `msg-${Date.now()}`,
                type: 'message',
                text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
                timestamp,
                user: sender,
            };

            if (chatIsOpen) {
                addMessage(randomDm.id, newMessage, true);
            } else {
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
        }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeChatIds, addMessage, directMessages, activeChats]);

  const openChat = useCallback((id: string) => {
    let existingChat = activeChats.find(c => c.id === id);

    if (existingChat) {
      if (existingChat.isMinimized) {
        setActiveChats(prev => prev.map(c => c.id === id ? { ...c, isMinimized: false, hasUnread: false } : c));
      }
       if (window.location.pathname !== '/') {
        router.push('/');
      }
      return;
    }

    let newChatState: ChatState | null = null;
    
    // Find in channels
    const channel = channels.find(c => c.id === id);
    if (channel) {
        newChatState = {
          id: channel.id,
          type: "channel" as const,
          title: channel.name,
          icon: channel.type === "private" ? <Lock className="w-5 h-5 text-muted-foreground" /> : <Hash className="w-5 h-5 text-muted-foreground" />,
          messages: channel.messages,
        };
    } else {
      // Find in existing DMs or create a new one
      const userId = id.startsWith('dm-') ? id.substring(3) : id;
      let dm = directMessages.find(d => d.userId === userId);
      
      if (!dm) {
        const recipient = users.find(u => u.id === userId);
        if (recipient) {
          const newDm: DirectMessage = {
            id: `dm-${userId}`,
            userId: userId,
            name: recipient.name,
            type: 'private',
            messages: [],
            unreadCount: 0,
          };
          // Add to our mock data list
          setDirectMessages(prev => [...prev, newDm]);
          dm = newDm;
        }
      }

      if (dm) {
        const recipient = users.find(u => u.id === dm!.userId);
        if (recipient) {
            newChatState = {
                id: dm.id,
                type: "dm" as const,
                title: dm.name,
                icon: <UserAvatarWithStatus user={recipient} className="w-8 h-8"/>,
                messages: dm.messages,
            };
        }
      }
    }


    if (newChatState) {
      setActiveChats(prev => {
        if (prev.length >= 3) { // Limit to 3 open chats
          return [...prev.slice(1), { ...newChatState, isMinimized: false, hasUnread: false }];
        }
        return [...prev, { ...newChatState, isMinimized: false, hasUnread: false }];
      });
      if (window.location.pathname !== '/') {
        router.push('/');
      }
    }
    
    // Clear notifications and unread count for this chat
    setDirectMessages(prevDms => prevDms.map(dm => dm.id === id ? { ...dm, unreadCount: 0 } : dm));
    setNotifications(prevNotifs => prevNotifs.filter(notif => notif.chatId !== id));
  }, [activeChats, router, directMessages]);

  const closeChat = useCallback((id: string) => {
    setActiveChats(prevIds => prevIds.filter(chat => chat.id !== id));
  }, []);

  const toggleMinimizeChat = useCallback((id: string) => {
    setActiveChats(prev =>
      prev.map(chat =>
        chat.id === id ? { ...chat, isMinimized: !chat.isMinimized, hasUnread: chat.isMinimized ? false : chat.hasUnread } : chat
      )
    );
  }, []);

  const value = useMemo(() => ({
    activeChats,
    openChat,
    closeChat,
    toggleMinimizeChat,
    activeChatIds,
    directMessages,
    addMessage,
    notifications,
    setNotifications,
    removeDirectMessage,
  }), [activeChats, openChat, closeChat, toggleMinimizeChat, activeChatIds, directMessages, addMessage, notifications, removeDirectMessage]);


  return (
    <ChatContext.Provider value={value}>
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
