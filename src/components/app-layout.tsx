

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/icons';
import { SidebarNav } from '@/components/chat/sidebar-nav';
import { UserNav } from '@/components/chat/user-nav';
import { NotificationWidget } from './notifications/notification-widget';
import { NewsPreferencesProvider } from '@/hooks/use-news-preferences';
import { ChatProvider, useChat } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';
import { MainNav } from './main-nav';
import { HeaderActions } from './header-actions';
import { Card, CardContent, CardHeader } from './ui/card';
import { ChatArea } from './chat/chat-area';
import { users } from '@/lib/mock-data';
import { Button } from './ui/button';
import { X } from 'lucide-react';

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

function ChatWidget() {
  const { activeChat, closeChat } = useChat();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset position when a new chat is opened
    setPosition({ x: 0, y: 0 });
  }, [activeChat?.id]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (widgetRef.current) {
      const widgetRect = widgetRef.current.getBoundingClientRect();
      const initialLeft = widgetRect.left + window.scrollX;
      const initialTop = widgetRect.top + window.scrollY;

      dragOffset.current = {
        x: e.clientX - initialLeft,
        y: e.clientY - initialTop,
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
      const parentRect = widgetRef.current.parentElement?.getBoundingClientRect();
      if(parentRect) {
        const newX = e.clientX - dragOffset.current.x - parentRect.left;
        const newY = e.clientY - dragOffset.current.y - parentRect.top;
        setPosition({ x: newX, y: newY });
      }
    }
  };
  

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!activeChat) {
    return null;
  }

  return (
    <div 
      ref={widgetRef}
      className="fixed bottom-8 right-[calc(8rem+2rem)] z-50"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`, 
        left: 'auto', 
        top: 'auto'
      }}
    >
       <Card className="w-96 h-[32rem] flex flex-col shadow-2xl">
        <CardHeader 
          className="flex flex-row items-center justify-between p-2 border-b cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
           <div className="flex items-center gap-3 p-2">
            {activeChat.icon}
            <h2 className="font-semibold">{activeChat.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeChat} className="cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar chat</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          <ChatArea
            key={activeChat.id}
            chatId={activeChat.id}
            title={activeChat.title}
            icon={activeChat.icon}
            initialMessages={activeChat.messages}
            currentUser={users[0]}
            chatType={activeChat.type}
            showHead={false}
          />
        </CardContent>
      </Card>
    </div>
  )
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
                      <SidebarHeader className="p-4">
                        <div className="flex items-center gap-2">
                          <h1 className="font-headline text-3xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                            Talk2Me
                          </h1>
                        </div>
                      </SidebarHeader>
                      <SidebarSeparator />
                      <SidebarContent>
                        <SidebarNav />
                      </SidebarContent>
                      <SidebarSeparator />
                      <SidebarFooter>
                        <UserNav />
                      </SidebarFooter>
                    </Sidebar>
                  </div>
                  <div className="relative flex-1">
                    <main className="flex-1 flex flex-col bg-background rounded-r-xl main-content-fade h-full">
                       <header className="flex h-16 items-center justify-start border-b bg-background px-4 shrink-0 md:hidden">
                         <SidebarTrigger />
                      </header>
                      <div className="w-full overflow-auto">
                        {children}
                      </div>
                    </main>
                    <ChatWidget />
                    <NotificationWidget />
                  </div>
                </div>
              </SidebarProvider>
            </div>
          )}
        </ChatProvider>
      </NewsPreferencesProvider>
    </ThemeProvider>
  );
}
