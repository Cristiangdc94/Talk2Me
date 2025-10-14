"use client";

import React from 'react';
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
import { ChatDialog } from './chat/chat-dialog';
import { NotificationWidget } from './notifications/notification-widget';
import { NewsPreferencesProvider } from '@/hooks/use-news-preferences';
import { ChatProvider } from '@/hooks/use-chat';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      {children}
    </main>
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
            <div className="mx-auto max-w-[1920px] h-full rounded-xl overflow-hidden">
              <SidebarProvider>
                <div className="h-full flex bg-muted rounded-xl overflow-hidden">
                  <Sidebar>
                    <SidebarHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <AppLogo className="w-8 h-8 text-sidebar-primary dark:text-sidebar-primary" />
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
                  <div className="flex-1 flex flex-col overflow-hidden rounded-tl-xl rounded-bl-xl">
                     <header className="flex h-16 items-center justify-start border-b bg-background px-4 shrink-0 md:hidden">
                       <SidebarTrigger />
                    </header>
                    <main className="flex-1 overflow-auto bg-background">
                      <div className="w-full h-full">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
                <ChatDialog />
                <NotificationWidget />
              </SidebarProvider>
            </div>
          )}
        </ChatProvider>
      </NewsPreferencesProvider>
    </ThemeProvider>
  );
}
