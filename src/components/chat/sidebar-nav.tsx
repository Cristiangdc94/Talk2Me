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

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <SidebarGroup>
        <SidebarGroupLabel className="font-headline">Channels</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus />
          <span className="sr-only">Create Channel</span>
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
        <SidebarGroupLabel className="font-headline">Direct Messages</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus />
          <span className="sr-only">New Message</span>
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
