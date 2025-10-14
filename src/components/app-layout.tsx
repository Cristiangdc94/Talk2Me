

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/icons';
import { SidebarNav } from '@/components/chat/sidebar-nav';
import { UserNav } from '@/components/chat/user-nav';
import { NotificationWidget } from './notifications/notification-widget';
import { NewsPreferencesProvider } from '@/hooks/use-news-preferences';
import { ChatProvider, useChat, ChatState } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';
import { MainNav } from './main-nav';
import { HeaderActions } from './header-actions';
import { Card, CardHeader, CardContent } from './ui/card';
import { ChatArea } from './chat/chat-area';
import { users } from '@/lib/mock-data';
import { Button } from './ui/button';
import { X, GripVertical, Minus, ArrowUp, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background dark:bg-radial-gradient">
      {children}
    </main>
  );
}

function DraggableChatWidget({ chat, index }: { chat: ChatState, index: number }) {
  const { closeChat, toggleMinimizeChat } = useChat();
  const [position, setPosition] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [showVideo, setShowVideo] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
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
  }, [showVideo, toast]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const staggerOffset = index * 40;
      // Position relative to the main content area (approximated)
      const sidebarWidth = 256; 
      const defaultX = sidebarWidth + 50 + staggerOffset; 
      const defaultY = 100 + staggerOffset;
      setPosition({ x: defaultX, y: defaultY });
    }
  }, [chat.id, index]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (widgetRef.current) {
      const widgetRect = widgetRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - widgetRect.left,
        y: e.clientY - widgetRect.top,
      };
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && widgetRef.current) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (position.x === null || position.y === null) {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <Card className="w-96 h-[32rem] flex flex-col shadow-2xl overflow-hidden bg-card">
        <CardHeader className="flex flex-row items-center justify-between p-2 border-b">
          <div className="flex items-center gap-3 p-2 flex-1">
            {chat.icon}
            <h2 className="font-semibold truncate">{chat.title}</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowVideo(!showVideo)}>
              <Camera className={cn("h-5 w-5", showVideo && "text-destructive")} />
              <span className="sr-only">{showVideo ? 'Desactivar' : 'Activar'} webcam</span>
            </Button>
          </div>
          <div className="flex items-center">
             <div className="cursor-grab active:cursor-grabbing px-2" onMouseDown={handleMouseDown}>
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleMinimizeChat(chat.id)} className="cursor-pointer h-8 w-8">
              <Minus className="h-4 w-4" />
              <span className="sr-only">Minimizar chat</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => closeChat(chat.id)} className="cursor-pointer h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar chat</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className='flex-1 overflow-hidden p-0'>
          <ChatArea
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            icon={chat.icon}
            initialMessages={chat.messages}
            currentUser={users[0]}
            chatType={chat.type}
            showHead={false}
            showVideo={showVideo}
            videoRef={videoRef}
            hasCameraPermission={hasCameraPermission}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ChatManager() {
  const { activeChats } = useChat();

  const openChats = activeChats.filter(chat => !chat.isMinimized);

  if (openChats.length === 0) {
    return null;
  }

  return (
    <>
      {openChats.map((chat, index) => (
        <DraggableChatWidget key={chat.id} chat={chat} index={index} />
      ))}
    </>
  );
}


function MinimizedChatBar() {
  const { activeChats, toggleMinimizeChat } = useChat();
  const minimizedChats = activeChats.filter(chat => chat.isMinimized);

  if (minimizedChats.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 flex justify-center items-end gap-2">
      {minimizedChats.map(chat => (
        <Button
          key={chat.id}
          variant="outline"
          className={cn(
            "h-10 shadow-lg flex items-center gap-2 bg-card",
            chat.hasUnread && "animate-pulse border-primary"
          )}
          onClick={() => toggleMinimizeChat(chat.id)}
        >
          {chat.icon}
          <span className="truncate max-w-28">{chat.title}</span>
          <ArrowUp className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <ThemeProvider>
      <NewsPreferencesProvider>
        <ChatProvider>
          {isAuthPage ? (
            <AuthLayout>{children}</AuthLayout>
          ) : (
            <div className="mx-auto max-w-[1920px] h-full rounded-xl">
              <SidebarProvider>
                <div className="h-full flex bg-background rounded-xl">
                  <div className="border-transparent">
                    <Sidebar>
                      <SidebarHeader className="p-4 flex flex-col gap-4">
                        <div className="flex items-center justify-start gap-4">
                          <h1 className="font-headline text-3xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                            Talk2Me
                          </h1>
                        </div>
                        <UserNav />
                      </SidebarHeader>
                      <SidebarSeparator />
                      <SidebarContent>
                        <SidebarNav />
                      </SidebarContent>
                    </Sidebar>
                  </div>
                  <div className="flex-1">
                    <main className="flex-1 flex flex-col bg-background rounded-r-xl main-content-fade h-full">
                       <header className="flex h-16 items-center justify-start border-b bg-background px-4 shrink-0">
                      </header>
                      <div className="w-full overflow-auto">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
                 {/* Chat widgets and notifications are now outside the main scrollable area */}
                <ChatManager />
                <MinimizedChatBar />
                <NotificationWidget />
              </SidebarProvider>
            </div>
          )}
        </ChatProvider>
      </NewsPreferencesProvider>
    </ThemeProvider>
  );
}
