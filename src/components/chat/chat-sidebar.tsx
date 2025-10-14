

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Hash,
  Lock,
  Plus,
  Phone,
  X,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { channels as initialChannels, users } from '@/lib/mock-data';
import { CreateChannelDialog } from './create-channel-dialog';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/use-chat';
import { UserAvatarWithStatus } from './user-avatar-with-status';
import type { Channel } from '@/lib/types';
import { Badge } from '../ui/badge';
import { NewMessagePopover } from './new-message-popover';
import { PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

export function ChatSidebar() {
  const { toast } = useToast();
  const { openChat, activeChatIds, directMessages, removeDirectMessage } = useChat();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessageOpen, setNewMessageOpen] = useState(false);
  const [channels] = useState<Channel[]>(initialChannels);

  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: 'Esta función es una demostración.',
    });
  };

  const handleRemoveDM = (event: React.MouseEvent, dmId: string) => {
    event.preventDefault();
    event.stopPropagation();
    removeDirectMessage(dmId);
     toast({
      title: "Conversación eliminada",
      description: "La conversación ha sido eliminada de tu lista.",
    });
  };

  return (
    <>
      <CreateChannelDialog
        open={isCreateChannelOpen}
        onOpenChange={setCreateChannelOpen}
      />
      <SidebarGroup>
        <SidebarGroupLabel>Canales</SidebarGroupLabel>
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
                onClick={() => openChat(channel.id)}
                isActive={activeChatIds.includes(channel.id)}
                tooltip={channel.name}
              >
                {channel.type === 'private' ? <Lock /> : <Hash />}
                <span>{channel.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Mensajes Directos</SidebarGroupLabel>
        <NewMessagePopover isOpen={isNewMessageOpen} setIsOpen={setNewMessageOpen}>
          <SidebarGroupAction asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute right-3 top-3.5 h-5 w-5 p-0">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Nuevo Mensaje</span>
              </Button>
            </PopoverTrigger>
          </SidebarGroupAction>
        </NewMessagePopover>
        <SidebarMenu>
          {directMessages.map((dm) => {
            const user = users.find((u) => u.id === dm.userId);
            if (!user) return null;
            
            return (
              <SidebarMenuItem key={dm.id}>
                <SidebarMenuButton
                  onClick={() => openChat(dm.id)}
                  isActive={activeChatIds.includes(dm.id)}
                  tooltip={dm.name}
                  className="group"
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute left-1"
                    onClick={(e) => handleRemoveDM(e, dm.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2 overflow-hidden w-full pl-6">
                    <UserAvatarWithStatus user={user} className="w-6 h-6" />
                    <span className='truncate'>
                      {dm.name}
                    </span>
                    {dm.unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="h-5 min-w-[1.25rem] justify-center text-xs ml-auto"
                      >
                        {dm.unreadCount > 9 ? '+9' : dm.unreadCount}
                      </Badge>
                    )}
                  </div>
                </SidebarMenuButton>
                {user.status !== 'offline' && (
                  <SidebarMenuAction
                    onClick={(e) => handleCall(e, dm.name)}
                    aria-label={`Llamar a ${dm.name}`}
                  >
                    <Phone />
                  </SidebarMenuAction>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
