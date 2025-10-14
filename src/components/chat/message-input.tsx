
"use client";

import React, { useState } from "react";
import { Paperclip, Send, Phone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SmartReplySuggestions } from "./smart-reply-suggestions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { Message } from "@/lib/types";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  onCall: () => void;
  chatType: "channel" | "dm";
  chatTitle: string;
  messages: Message[];
}

export function MessageInput({ 
  onSendMessage, 
  onCall, 
  chatType, 
  chatTitle,
  messages,
  onSuggestionClick,
}: MessageInputProps) {
  const [text, setText] = useState("");
  const [isSuggestionOpen, setSuggestionOpen] = useState(false);

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setSuggestionOpen(false);
  }

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
       <Popover open={isSuggestionOpen} onOpenChange={setSuggestionOpen}>
        <PopoverTrigger asChild>
           <Button variant="ghost" size="icon" className="shrink-0">
            <Sparkles className="h-5 w-5 text-muted-foreground hover:text-purple-500" />
            <span className="sr-only">Generar respuestas inteligentes</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-none p-2">
          <SmartReplySuggestions 
            messages={messages}
            onSuggestionClick={handleSuggestionClick}
          />
        </PopoverContent>
      </Popover>
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
          className="pr-14 min-h-0 resize-none"
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
