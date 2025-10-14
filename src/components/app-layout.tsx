import React from 'react';
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

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full bg-muted">
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
        <div className="flex flex-1 flex-col overflow-hidden">
           <header className="flex h-16 items-center justify-start border-b bg-background px-4 shrink-0 rounded-tr-lg md:hidden">
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
    </SidebarProvider>
  );
}
