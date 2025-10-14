import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";
import { SidebarNav } from "@/components/chat/sidebar-nav";
import { UserNav } from "@/components/chat/user-nav";
import { MainNav } from "@/components/main-nav";
import { HeaderActions } from "./header-actions";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background text-foreground">
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
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center h-14 px-4 border-b shrink-0 bg-background">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center w-full">
              <MainNav />
              <div className="flex-1" />
              <HeaderActions />
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-muted/50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
