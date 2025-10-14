"use client";

import React from "react";
import { useChat } from "@/hooks/use-chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatArea } from "./chat-area";
import { users } from "@/lib/mock-data";

export function ChatDialog() {
  const { activeChat, closeChat } = useChat();
  const currentUser = users[0]; // In a real app, this would come from an auth context

  const isOpen = activeChat !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeChat();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none p-0 gap-0 border-0">
        {activeChat && (
          <ChatArea
            chatId={activeChat.id}
            title={activeChat.title}
            icon={activeChat.icon}
            initialMessages={activeChat.messages}
            currentUser={currentUser}
            chatType={activeChat.type}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
