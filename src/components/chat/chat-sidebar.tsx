

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Hash,
  Lock,
  Plus,
  Phone,
  Newspaper,
  Users,
  Briefcase,
  ChevronDown,
  User,
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
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { channels as initialChannels, users } from '@/lib/mock-data';
import { CreateChannelDialog } from './create-channel-dialog';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/use-chat';
import { NewMessagePopover } from './new-message-popover';
import { UserAvatarWithStatus } from './user-avatar-with-status';
import type { Channel } from '@/lib/types';
import { Badge } from '../ui/badge';

export function ChatSidebar() {
  const { toast } = useToast();
  const { openChat, activeChatIds, directMessages } = useChat();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessagePopoverOpen, setNewMessagePopoverOpen] = useState(false);
  const [channels] = useState<Channel[]>(initialChannels);

  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: 'Esta función es una demostración.',
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
        <NewMessagePopover
          isOpen={isNewMessagePopoverOpen}
          setIsOpen={setNewMessagePopoverOpen}
        >
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
              online: 'text-green-500',
              busy: 'text-red-500',
              offline: 'text-muted-foreground',
            };
            return (
              <SidebarMenuItem key={dm.id}>
                <SidebarMenuButton
                  onClick={() => openChat(dm.id)}
                  isActive={activeChatIds.includes(dm.id)}
                  tooltip={dm.name}
                >
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <UserAvatarWithStatus user={user} className="w-6 h-6" />
                    <span className={cn('truncate', statusColor[user.status])}>
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
    </>
  );
}
