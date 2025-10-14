
"use client";

import React from "react";
import {
  Hash,
  Lock,
  Plus,
  Phone,
  MoreVertical,
  Archive,
  Ban,
  Trash2,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { PopoverTrigger } from "@/components/ui/popover";
import { channels as initialChannels, users } from "@/lib/mock-data";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { NewMessagePopover } from "./new-message-popover";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import type { Channel } from "@/lib/types";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface ChatSidebarProps {
    isInsideMainSidebar?: boolean;
}

export function ChatSidebar({ isInsideMainSidebar = false }: ChatSidebarProps) {
  const { toast } = useToast();
  const { openChat, activeChatId, directMessages } = useChat();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessagePopoverOpen, setNewMessagePopoverOpen] = useState(false);
  const [channels] = useState<Channel[]>(initialChannels);

  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: "Esta función es una demostración.",
    });
  };

  const handleArchive = (userName: string) => {
    toast({
      title: 'Chat Archivado',
      description: `Tu conversación con ${userName} ha sido archivada.`,
    });
  };

  const handleBlock = (userName: string) => {
    toast({
      variant: 'destructive',
      title: 'Usuario Bloqueado',
      description: `Has bloqueado a ${userName}. No recibirás más mensajes de este usuario.`,
    });
  };

  const handleDelete = (userName: string) => {
    toast({
      variant: 'destructive',
      title: 'Amigo Eliminado',
      description: `${userName} ha sido eliminado de tu lista de amigos.`,
    });
  };

  const handleChannelClick = (channelId: string) => {
     openChat(channelId);
  }

  const handleDMClick = (dmId: string) => {
     openChat(dmId);
  }

  const Wrapper = isInsideMainSidebar ? React.Fragment : 'div';
  const wrapperProps = isInsideMainSidebar ? {} : { className: "w-72 border-r bg-muted/50 flex flex-col" };

  return (
    <Wrapper {...wrapperProps}>
        <CreateChannelDialog
            open={isCreateChannelOpen}
            onOpenChange={setCreateChannelOpen}
        />
        <SidebarGroup>
            <SidebarGroupLabel className={cn("font-headline text-xl", !isInsideMainSidebar && "p-4 pb-0")}>
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

        {isInsideMainSidebar && <div className="mt-2" />}

        <SidebarGroup>
            <SidebarGroupLabel className={cn("font-headline text-xl", !isInsideMainSidebar && "p-4 pb-0")}>
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
            {directMessages.map((dm) => {
                const user = users.find((u) => u.id === dm.userId);
                if (!user) return null;
                const statusColor = {
                    online: "text-green-500",
                    busy: "text-red-500",
                    offline: "text-muted-foreground",
                };
                return (
                    <SidebarMenuItem key={dm.id} className="group/d-item">
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
                    
                    {isInsideMainSidebar ? (
                         <SidebarMenuAction
                            onClick={(e) => handleCall(e, dm.name)}
                            aria-label={`Llamar a ${dm.name}`}
                        >
                            <Phone />
                        </SidebarMenuAction>
                    ) : (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-auto flex items-center opacity-0 group-hover/d-item:opacity-100 gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenuItem onClick={() => handleArchive(dm.name)}>
                                        <Archive className="mr-2 h-4 w-4" />
                                        <span>Archivar chat</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBlock(dm.name)}>
                                        <Ban className="mr-2 h-4 w-4" />
                                        <span>Bloquear</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(dm.name)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Eliminar amigo</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                    </SidebarMenuItem>
                );
                })}
            </SidebarMenu>
        </SidebarGroup>
    </Wrapper>
  );
}
