

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Newspaper,
  Users,
  Briefcase,
  ChevronDown,
  User,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChatSidebar } from "./chat-sidebar";
import { useState, useEffect } from "react";
import { SidebarSeparator } from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const mainNavLinks = [
    { href: "/friends", label: "Amigos", icon: Users },
    { href: "/coworkers", label: "Compañeros", icon: Briefcase },
  ];

export function SidebarNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isNewsSectionOpen, setIsNewsSectionOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isNewsActive = pathname === "/" || pathname.startsWith("/foryou") || pathname.startsWith("/company-news");
    setIsNewsSectionOpen(isNewsActive);
  }, [pathname]);


  if (!isMounted) {
    return (
        <div className="flex flex-col gap-2">
            <SidebarGroup>
                <SidebarGroupLabel className="font-headline text-xl">Menú</SidebarGroupLabel>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
                <SidebarGroupLabel className="font-headline text-xl">Chats</SidebarGroupLabel>
            </SidebarGroup>
        </div>
    );
  }


  return (
    <div className="flex flex-col gap-2">
      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">
          Menú
        </SidebarGroupLabel>
        <SidebarMenu>
           <Collapsible open={isNewsSectionOpen} onOpenChange={setIsNewsSectionOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        isActive={isNewsSectionOpen}
                        className="justify-between"
                        tooltip="Noticias"
                    >
                        <div className="flex items-center gap-2">
                            <Newspaper />
                            <span>Noticias</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenu className="pl-6 pb-1">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="General">
                        <Link href="/">
                          <Newspaper className="w-4 h-4 mr-2" />
                          <span>General</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/company-news'} tooltip="Empresa">
                        <Link href="/company-news">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>Empresa</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/foryou'} tooltip="Para tí">
                        <Link href="/foryou">
                          <User className="w-4 h-4 mr-2" />
                          <span>Para tí</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
           </Collapsible>

          {mainNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />
      
      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">
          Chats
        </SidebarGroupLabel>
      </SidebarGroup>
      <ChatSidebar />

    </div>
  );
}
