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

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8 text-sidebar-primary dark:text-sidebar-primary" />
            <h1 className="font-headline text-3xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
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
        <header className="flex items-center h-7 px-4">
          <SidebarTrigger className="md:hidden" />
        </header>
        <main className="flex-1 overflow-auto px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
