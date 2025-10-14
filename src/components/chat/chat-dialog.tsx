"use client";

import React from "react";
import { useChat } from "@/hooks/use-chat";
import {
  Dialog,
  DialogContent,
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
        {activeChat && (
          <ChatLayout />
        )}
      </DialogContent>
    </Dialog>
  );
}
