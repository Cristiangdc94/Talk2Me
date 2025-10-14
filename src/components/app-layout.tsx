import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";
import { SidebarNav } from "@/components/chat/sidebar-nav";
import { UserNav } from "@/components/chat/user-nav";
import { HeaderActions } from "./header-actions";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8 text-sidebar-primary-foreground" />
            <h1 className="font-logo text-3xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Talk2Me
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center h-14 px-4 border-b bg-background/95 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1" />
          <HeaderActions />
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
