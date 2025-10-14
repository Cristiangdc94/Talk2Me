"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Hash,
  Lock,
  Plus,
  User,
  Phone,
  Newspaper,
  Users,
  Briefcase,
  Search,
  ChevronDown,
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
import { channels, directMessages, users } from "@/lib/mock-data";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { SidebarSeparator } from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { UserAvatarWithStatus } from "./user-avatar-with-status";

const mainNavLinks = [
  { href: "/friends", label: "Amigos", icon: Users },
  { href: "/coworkers", label: "Compañeros", icon: Briefcase },
  { href: "/add-contact", label: "Buscar", icon: Search },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { toast } = useToast();
  const { openChat, activeChatId } = useChat();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);

  const isNewsSectionActive = useMemo(() => pathname === "/" || pathname.startsWith("/foryou"), [pathname]);

  const handleCall = (event: React.MouseEvent, userName: string) => {
    event.preventDefault();
    event.stopPropagation();
    toast({
      title: `Llamando a ${userName}...`,
      description: "Esta función es una demostración.",
    });
  };

  const handleChannelClick = (channel: (typeof channels)[0]) => {
     openChat({
      id: channel.id,
      type: "channel",
      title: channel.name,
      icon: channel.type === "private" ? <Lock className="w-5 h-5 text-muted-foreground" /> : <Hash className="w-5 h-5 text-muted-foreground" />,
      messages: channel.messages,
    });
  }

  const handleDMClick = (dm: (typeof directMessages)[0]) => {
    const recipient = users.find((u) => u.id === dm.id);
    if (!recipient) return;
     openChat({
      id: dm.id,
      type: "dm",
      title: dm.name,
      icon: <UserAvatarWithStatus user={recipient} className="w-8 h-8"/>,
      messages: dm.messages,
    });
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
           <Collapsible defaultOpen={isNewsSectionActive}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        isActive={isNewsSectionActive}
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
                        <Link href="/"><span>General</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/foryou'} tooltip="Para tí">
                        <Link href="/foryou"><span>Para tí</span></Link>
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
            <Plus />
            <span className="sr-only">Crear Canal</span>
          </button>
        </SidebarGroupAction>
        <SidebarMenu>
          {channels.map((channel) => (
            <SidebarMenuItem key={channel.id}>
              <SidebarMenuButton
                onClick={() => handleChannelClick(channel)}
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
                onClick={() => handleDMClick(dm)}
                isActive={activeChatId === dm.id}
                tooltip={dm.name}
              >
                <User />
                <span>{dm.name}</span>
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
    </div>
  );
}
