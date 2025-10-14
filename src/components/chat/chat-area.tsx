

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, MoreVertical, Trash2, Ban, Info, PhoneMissed, Paperclip, Send, Sparkles, Camera } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";
import { MessageInput } from "@/components/chat/message-input";
import type { Message, User, Notification } from "@/lib/types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { users } from "@/lib/mock-data";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ChatAreaProps {
  chatId: string;
  title: string;
  icon: React.ReactNode;
  initialMessages: Message[];
  currentUser: User;
  chatType: "channel" | "dm";
  showHead?: boolean;
  showVideo?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  hasCameraPermission?: boolean | null;
}

export function ChatArea({
  chatId,
  title,
  icon,
  initialMessages,
  currentUser,
  chatType,
  showHead = true,
  showVideo: showVideoProp,
  videoRef: videoRefProp,
  hasCameraPermission: hasCameraPermissionProp,
}: ChatAreaProps) {
  const { activeChats, addMessage, setNotifications } = useChat();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { toast } = useToast();
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = videoRefProp || internalVideoRef;
  
  const [internalShowVideo, setInternalShowVideo] = useState(false);
  const showVideo = showVideoProp !== undefined ? showVideoProp : internalShowVideo;
  
  const [internalHasCameraPermission, setInternalHasCameraPermission] = useState<boolean | null>(null);
  const hasCameraPermission = hasCameraPermissionProp !== undefined ? hasCameraPermissionProp : internalHasCameraPermission;

  const currentChat = activeChats.find(chat => chat.id === chatId);

  useEffect(() => {
    if (currentChat) {
        setMessages(currentChat.messages);
    }
  }, [currentChat, chatId]);

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages, chatId]);

  useEffect(() => {
    // This effect is for the standalone ChatArea that manages its own state
    if (showVideoProp === undefined && videoRefProp === undefined) {
      if (showVideo) {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setInternalHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error("Error accessing camera:", error);
            setInternalHasCameraPermission(false);
            toast({
              variant: "destructive",
              title: "Acceso a la Cámara Denegado",
              description: "Por favor, habilita los permisos de la cámara en la configuración de tu navegador.",
            });
          }
        };
        getCameraPermission();
      } else {
          if (videoRef.current && videoRef.current.srcObject) {
              const stream = videoRef.current.srcObject as MediaStream;
              stream.getTracks().forEach(track => track.stop());
              videoRef.current.srcObject = null;
          }
      }
    }
  }, [showVideo, toast, showVideoProp, videoRefProp, videoRef]);


  const handleReceiveMessage = (text: string, sender: User, isAutoReply: boolean = false) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'message',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: sender,
    };
    
    const shouldNotify = !activeChats.some(chat => chat.id === chatId);

    if (shouldNotify) {
      const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          type: 'message',
          text: `Tienes un nuevo mensaje de ${sender.name}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chatId: chatId,
          chatType: chatType,
      };
      setNotifications(prev => [newNotification, ...prev]);
    }

    addMessage(chatId, newMessage, shouldNotify);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'message',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
    };
    
    addMessage(chatId, newMessage);

    setTimeout(() => {
        const recipient = users.find(u => u.id === (chatId.startsWith('dm-') ? chatId.substring(3) : ''));
        if (recipient) {
            handleReceiveMessage(`¡Entendido! Gracias por tu mensaje.`, recipient, true);
        }
    }, 1000);
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

  const handleMenuAction = (action: 'Eliminar' | 'Bloquear' | 'Detalles') => {
    let description = '';
    if (action === 'Eliminar') description = `Has eliminado el chat con ${title}.`;
    if (action === 'Bloquear') description = `Has bloqueado a ${title}.`;
    if (action === 'Detalles') description = `Mostrando detalles de ${title}.`;

    toast({
      title: `${action} Chat`,
      description: `${description} (Simulación)`,
    });
  }

  const renderMessageContent = (message: Message, isSentByCurrentUser: boolean) => {
    if (message.type === 'call' && message.callStatus === 'missed') {
      return (
        <div className={cn(
          "flex items-center gap-2 text-sm text-muted-foreground",
          isSentByCurrentUser && "flex-row-reverse"
        )}>
          <PhoneMissed className="h-4 w-4 text-red-500" />
          <span>Llamada perdida a las {message.timestamp}</span>
        </div>
      );
    }

    return (
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
          {isSentByCurrentUser && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-foreground/70">
                <path d="M2.5 8L5.5 11L13.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="flex flex-col h-full bg-background">
      {showHead && (
        <header className="flex items-center justify-between gap-3 p-4 shrink-0 border-b bg-background">
          <div className="flex items-center gap-3">
            {chatType === "dm" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Más opciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => handleMenuAction('Detalles')}>
                    <Info className="mr-2 h-4 w-4" />
                    <span>Detalles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMenuAction('Bloquear')} className="text-destructive">
                    <Ban className="mr-2 h-4 w-4" />
                    <span>Bloquear</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMenuAction('Eliminar')} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {icon}
            <h2 className="text-xl font-headline font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={() => setInternalShowVideo(!showVideo)}>
              <Camera className={cn("h-5 w-5", showVideo && "text-destructive")} />
              <span className="sr-only">{showVideo ? 'Desactivar' : 'Activar'} webcam</span>
            </Button>
          </div>
        </header>
      )}

      <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
        <div className="p-4">
          {showVideo && (
            <div className="mb-4">
              <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
              {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-2">
                  <AlertTitle>Se Requiere Acceso a la Cámara</AlertTitle>
                  <AlertDescription>
                    Por favor, permite el acceso a la cámara para usar esta función.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          <div className="space-y-4">
            {messages.map((message) => {
              const isSentByCurrentUser = message.user.id === currentUser.id;
              
              if (message.type === 'call') {
                return (
                  <div key={message.id} className="flex justify-center">
                    {renderMessageContent(message, isSentByCurrentUser)}
                  </div>
                );
              }

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
                  
                  {renderMessageContent(message, isSentByCurrentUser)}

                  {isSentByCurrentUser && (
                    <UserAvatarWithStatus user={message.user} className="shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
      
      <footer className="p-4 border-t shrink-0">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onCall={handleCall}
          chatType={chatType}
          chatTitle={title}
          messages={messages}
          onSuggestionClick={handleSuggestionClick}
        />
      </footer>
    </div>
  );
}
