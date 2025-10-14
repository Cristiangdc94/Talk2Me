"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Hash, Lock, Plus, User } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { channels, directMessages } from "@/lib/mock-data";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useState } from "react";

export function SidebarNav() {
  const pathname = usePathname();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessageOpen, setNewMessageOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <CreateChannelDialog open={isCreateChannelOpen} onOpenChange={setCreateChannelOpen} />
      {/* A similar dialog can be created for new messages */}
      {/* <NewMessageDialog open={isNewMessageOpen} onOpenChange={setNewMessageOpen} /> */}

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-base">Canales</SidebarGroupLabel>
        <SidebarGroupAction asChild>
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus />
            <span className="sr-only">Crear Canal</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {channels.map((channel) => (
            <SidebarMenuItem key={channel.id}>
              <Link href={`/channel/${channel.id}`} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/channel/${channel.id}`}
                  tooltip={channel.name}
                >
                  <a>
                    {channel.type === 'private' ? <Lock /> : <Hash />}
                    <span>{channel.name}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-base">Mensajes Directos</SidebarGroupLabel>
        <SidebarGroupAction asChild>
           {/* For now, this will also open the create channel dialog as a placeholder */}
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus />
            <span className="sr-only">Nuevo Mensaje</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {directMessages.map((dm) => (
            <SidebarMenuItem key={dm.id}>
              <Link href={`/dm/${dm.id}`} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/dm/${dm.id}`}
                  tooltip={dm.name}
                >
                  <a>
                    <User />
                    <span>{dm.name}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
