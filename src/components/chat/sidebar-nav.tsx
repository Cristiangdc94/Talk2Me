
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Hash,
  Lock,
  Plus,
  Phone,
  Newspaper,
  Users,
  Briefcase,
  Search,
  ChevronDown,
  User,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { PopoverTrigger } from "@/components/ui/popover";
import { channels as initialChannels, directMessages, users } from "@/lib/mock-data";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SidebarSeparator } from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { NewMessagePopover } from "./new-message-popover";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import type { Channel } from "@/lib/types";
import { Badge } from "../ui/badge";

const mainNavLinks = [
    { href: "/friends", label: "Amigos", icon: Users },
    { href: "/coworkers", label: "Compañeros", icon: Briefcase },
  ];

export function SidebarNav() {
  const pathname = usePathname();
  const { toast } = useToast();
  const { openChat, activeChatId } = useChat();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessagePopoverOpen, setNewMessagePopoverOpen] = useState(false);
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [isMounted, setIsMounted] = useState(false);
  const [isNewsSectionOpen, setIsNewsSectionOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isNewsActive = pathname === "/" || pathname.startsWith("/foryou") || pathname.startsWith("/company-news");
    setIsNewsSectionOpen(isNewsActive);
  }, [pathname]);


  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: "Esta función es una demostración.",
    });
  };

  const handleChannelClick = (channelId: string) => {
     openChat(channelId);
  }

  const handleDMClick = (dmId: string) => {
     openChat(dmId);
  }

  if (!isMounted) {
    return (
        <div className="flex flex-col gap-2">
            <SidebarGroup>
                <SidebarGroupLabel className="font-headline text-xl">Menú</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
                <SidebarGroupLabel className="font-headline text-xl">Canales</SidebarGroupLabel>
                <SidebarMenu>
                    {Array.from({ length: 3 }).map((_, i) => <SidebarMenuSkeleton key={i} showIcon />)}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
                <SidebarGroupLabel className="font-headline text-xl">Mensajes Directos</SidebarGroupLabel>
                <SidebarMenu>
                    {Array.from({ length: 4 }).map((_, i) => <SidebarMenuSkeleton key={i} showIcon />)}
                </SidebarMenu>
            </SidebarGroup>
        </div>
    );
  }


  return (
    <div className="flex flex-col gap-2">
      <CreateChannelDialog
        open={isCreateChannelOpen}
        onOpenChange={setCreateChannelOpen}
      />

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
          Canales
        </SidebarGroupLabel>
        <SidebarGroupAction asChild>
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Crear Canal</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {channels.map((channel) => (
            <SidebarMenuItem key={channel.id}>
              <SidebarMenuButton
                onClick={() => handleChannelClick(channel.id)}
                isActive={activeChatId === channel.id}
                tooltip={channel.name}
              >
                {channel.type === "private" ? <Lock /> : <Hash />}
                <span>{channel.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">
          Mensajes Directos
        </SidebarGroupLabel>
        <NewMessagePopover isOpen={isNewMessagePopoverOpen} setIsOpen={setNewMessagePopoverOpen}>
          <PopoverTrigger asChild>
            <SidebarGroupAction asChild>
              <button>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Nuevo Mensaje</span>
              </button>
            </SidebarGroupAction>
          </PopoverTrigger>
        </NewMessagePopover>
        <SidebarMenu>
           {!isMounted
            ? Array.from({ length: 4 }).map((_, i) => <SidebarMenuSkeleton key={i} showIcon />)
            : directMessages.map((dm) => {
              const user = users.find((u) => u.id === dm.userId);
              if (!user) return null;
              const statusColor = {
                online: "text-green-500",
                busy: "text-red-500",
                offline: "text-muted-foreground",
              };
              return (
                <SidebarMenuItem key={dm.id}>
                  <SidebarMenuButton
                    onClick={() => handleDMClick(dm.id)}
                    isActive={activeChatId === dm.id}
                    tooltip={dm.name}
                    className="justify-between"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <UserAvatarWithStatus user={user} className="w-6 h-6" />
                      <span className={cn("truncate", statusColor[user.status])}>{dm.name}</span>
                      {dm.unreadCount && dm.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 min-w-[1.25rem] justify-center text-xs">
                          {dm.unreadCount > 9 ? "+9" : dm.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuAction
                    onClick={(e) => handleCall(e, dm.name)}
                    aria-label={`Llamar a ${dm.name}`}
                  >
                    <Phone />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
