
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";
import { MessageInput } from "@/components/chat/message-input";
import { SmartReplySuggestions } from "@/components/chat/smart-reply-suggestions";
import type { Message, User } from "@/lib/types";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/mock-data";

interface ChatAreaProps {
  chatId: string;
  title: string;
  icon: React.ReactNode;
  initialMessages: Message[];
  currentUser: User;
  chatType: "channel" | "dm";
}

export function ChatArea({
  chatId,
  title,
  icon,
  initialMessages,
  currentUser,
  chatType,
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { toast } = useToast();
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you'd subscribe to Firestore updates here
    // For this demo, we just use the initialMessages and any new ones.
    setMessages(initialMessages);
  }, [chatId, initialMessages]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
    };
    setMessages((prev) => [...prev, newMessage]);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  const handleCall = () => {
    toast({
      title: `Llamando a ${title}...`,
      description: "Esta función es una demostración.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-3 p-4 shrink-0 border-b bg-background">
        {icon}
        <h2 className="text-xl font-headline font-semibold">{title}</h2>
        <div className="flex-1" />
        {chatType === "dm" && (
            <Button variant="ghost" size="icon" onClick={handleCall}>
                <Phone className="w-5 h-5" />
                <span className="sr-only">Llamar a {title}</span>
            </Button>
        )}
      </header>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
          <div className="p-4 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-4 animate-accordion-down">
                <UserAvatarWithStatus user={message.user} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold">{message.user.name}</p>
                    <time className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </time>
                  </div>
                  {message.text && <p className="text-foreground/90">{message.text}</p>}
                  {message.imageUrl && (
                    <div className="mt-2">
                       <Image
                        src={message.imageUrl}
                        alt="Chat image"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover"
                        data-ai-hint="landscape nature"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <footer className="p-4 border-t shrink-0 space-y-2 bg-background">
        {chatType === 'dm' && (
            <SmartReplySuggestions messages={messages} onSuggestionClick={handleSuggestionClick} />
        )}
        <MessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}
