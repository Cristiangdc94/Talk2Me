
"use client";

import React from "react";
import { useChat } from "@/hooks/use-chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatLayout } from "./chat-layout";

export function ChatDialog() {
  const { activeChat, closeChat } = useChat();

  const isOpen = activeChat !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeChat();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none p-0 gap-0 border-0">
        <DialogTitle className="sr-only">
          {activeChat?.title || "Chat"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {`Una ventana de chat para ${activeChat?.type === 'channel' ? 'el canal' : 'la conversación con'} ${activeChat?.title}.`}
        </DialogDescription>
        {activeChat && (
          <ChatLayout />
        )}
      </DialogContent>
    </Dialog>
  );
}
