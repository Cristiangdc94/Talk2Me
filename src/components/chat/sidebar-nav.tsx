
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Hash, Lock, Plus, User, Phone, Briefcase, Smile } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { channels, directMessages, users } from "@/lib/mock-data";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function SidebarNav() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const [isNewMessageOpen, setNewMessageOpen] = useState(false);

  const friends = users.filter((u) => u.relationship === 'friend');
  const coworkers = users.filter((u) => u.relationship === 'coworker');

  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: "Esta función es una demostración.",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <CreateChannelDialog open={isCreateChannelOpen} onOpenChange={setCreateChannelOpen} />
      {/* A similar dialog can be created for new messages */}
      {/* <NewMessageDialog open={isNewMessageOpen} onOpenChange={setNewMessageOpen} /> */}

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">Canales</SidebarGroupLabel>
        <SidebarGroupAction asChild>
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus />
            <span className="sr-only">Crear Canal</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {channels.map((channel) => (
            <SidebarMenuItem key={channel.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/channel/${channel.id}`}
                tooltip={channel.name}
              >
                <Link href={`/channel/${channel.id}`}>
                  {channel.type === 'private' ? <Lock /> : <Hash />}
                  <span>{channel.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">Mensajes Directos</SidebarGroupLabel>
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
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/dm/${dm.id}`}
                  tooltip={dm.name}
                >
                  <Link href={`/dm/${dm.id}`}>
                    <User />
                    <span>{dm.name}</span>
                  </Link>
                </SidebarMenuButton>
              <SidebarMenuAction
                onClick={(e) => handleCall(e, dm.name)}
                aria-label={`Llamar a ${dm.name}`}
              >
                <Phone />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">Amigos</SidebarGroupLabel>
        <SidebarGroupAction asChild>
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus />
            <span className="sr-only">Añadir Amigo</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {friends.map((friend) => (
            <SidebarMenuItem key={friend.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/dm/${friend.id}`}
                tooltip={friend.name}
              >
                <Link href={`/dm/${friend.id}`}>
                  <Smile />
                  <span>{friend.name}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction
                onClick={(e) => handleCall(e, friend.name)}
                aria-label={`Llamar a ${friend.name}`}
              >
                <Phone />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="font-headline text-xl">Compañeros de trabajo</SidebarGroupLabel>
        <SidebarGroupAction asChild>
          <button onClick={() => setCreateChannelOpen(true)}>
            <Plus />
            <span className="sr-only">Añadir Compañero</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {coworkers.map((coworker) => (
            <SidebarMenuItem key={coworker.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/dm/${coworker.id}`}
                tooltip={coworker.name}
              >
                <Link href={`/dm/${coworker.id}`}>
                  <Briefcase />
                  <span>{coworker.name}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction
                onClick={(e) => handleCall(e, coworker.name)}
                aria-label={`Llamar a ${coworker.name}`}
              >
                <Phone />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

    </div>
  );
}
