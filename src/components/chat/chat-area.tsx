
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Check, CheckCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";
import { MessageInput } from "@/components/chat/message-input";
import { SmartReplySuggestions } from "@/components/chat/smart-reply-suggestions";
import type { Message, User } from "@/lib/types";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MessageStatus } from "./message-status";

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

  const assignMessageStatus = (msgs: Message[], currentUserId: string): Message[] => {
    let lastSentMessageId: string | null = null;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].user.id === currentUserId) {
        lastSentMessageId = msgs[i].id;
        break;
      }
    }

    return msgs.map(msg => {
      if (msg.user.id === currentUserId) {
        if (msg.id === lastSentMessageId) {
          return { ...msg, status: 'sent' };
        }
        return { ...msg, status: 'read' };
      }
      return msg;
    });
  };

  useEffect(() => {
    setMessages(assignMessageStatus(initialMessages, currentUser.id));
  }, [chatId, initialMessages, currentUser.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, chatId]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
      status: 'sent',
    };
    setMessages((prev) => assignMessageStatus([...prev, newMessage], currentUser.id));
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

      <div className="flex-1 flex flex-col-reverse overflow-hidden">
        <footer className="p-4 border-t shrink-0 space-y-2 bg-background">
          {chatType === 'dm' && (
              <SmartReplySuggestions messages={messages} onSuggestionClick={handleSuggestionClick} />
          )}
          <MessageInput onSendMessage={handleSendMessage} />
        </footer>
        
        <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
            <div className="p-4 space-y-4">
              {messages.map((message) => {
                const isSentByCurrentUser = message.user.id === currentUser.id;
                return (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex items-end gap-3 w-full",
                      isSentByCurrentUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!isSentByCurrentUser && (
                      <UserAvatarWithStatus user={message.user} className="shrink-0" />
                    )}
                    <div 
                      className={cn(
                        "p-3 rounded-lg max-w-sm md:max-w-md",
                        isSentByCurrentUser 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}
                    >
                       {!isSentByCurrentUser && <p className="font-bold text-xs mb-1">{message.user.name}</p>}
                      {message.text && <p className="text-sm">{message.text}</p>}
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
                      <div className="flex justify-end items-center gap-2 mt-1">
                        <time className={cn(
                          "text-xs", 
                          isSentByCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {message.timestamp}
                        </time>
                        {isSentByCurrentUser && <MessageStatus status={message.status} />}
                      </div>
                    </div>
                    {isSentByCurrentUser && (
                      <UserAvatarWithStatus user={message.user} className="shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
        </ScrollArea>
      </div>

    </div>
  );
}
