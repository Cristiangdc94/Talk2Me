

"use client";

import React from "react";
import { useChat } from "@/hooks/use-chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatArea } from "./chat-area";
import { users } from "@/lib/mock-data";

export function ChatDialog() {
  const { activeChat, closeChat } = useChat();

  // This component is no longer used as a full-screen dialog, 
  // but we keep it in case we want to switch back.
  // The new implementation is a floating widget in AppLayout.
  const isOpen = false; 

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeChat();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none p-0 gap-0 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{activeChat?.title || "Chat"}</DialogTitle>
          <DialogDescription>
             {`Una ventana de chat para ${activeChat?.type === 'channel' ? 'el canal' : 'la conversación con'} ${activeChat?.title}.`}
          </DialogDescription>
        </DialogHeader>
        {activeChat && (
           <ChatArea
            key={activeChat.id}
            chatId={activeChat.id}
            title={activeChat.title}
            icon={activeChat.icon}
            initialMessages={activeChat.messages}
            currentUser={users[0]}
            chatType={activeChat.type}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
