
"use client";

import React, { useState } from "react";
import { Paperclip, Send, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onCall: () => void;
  chatType: "channel" | "dm";
  chatTitle: string;
}

export function MessageInput({ onSendMessage, onCall, chatType, chatTitle }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="shrink-0">
        <Paperclip className="w-5 h-5" />
        <span className="sr-only">Adjuntar archivo</span>
      </Button>
      {chatType === "dm" && (
        <Button variant="ghost" size="icon" className="shrink-0" onClick={onCall}>
          <Phone className="w-5 h-5" />
          <span className="sr-only">Llamar a {chatTitle}</span>
        </Button>
      )}
      <div className="flex-1 relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe un mensaje..."
          rows={1}
          className="pr-20 min-h-0 resize-none"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-12 bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={handleSend}
          disabled={!text.trim()}
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </div>
    </div>
  );
}
