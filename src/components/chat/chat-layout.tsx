
"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatArea } from "./chat-area";
import { channels, directMessages, users } from "@/lib/mock-data";
import { Button } from "../ui/button";
import { Hash, Lock, User, Phone, MoreVertical, Archive, Ban, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColor = {
    online: "text-green-500",
    busy: "text-red-500",
    offline: "text-muted-foreground",
};

export function ChatLayout() {
    const { activeChat, activeChatId, openChat } = useChat();
    const { toast } = useToast();

    if (!activeChat) {
        return null;
    }

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


    return (
        <div className="flex h-full w-full bg-background">
            <div className="w-72 border-r bg-muted/50 p-2 flex flex-col gap-2">
                <h2 className="text-lg font-semibold tracking-tight p-2">Chats</h2>
                <ScrollArea>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm font-medium text-muted-foreground px-2 pt-2">Canales</p>
                        {channels.map((channel) => (
                            <Button
                                key={channel.id}
                                variant={activeChatId === channel.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => openChat(channel.id)}
                            >
                                {channel.type === "private" ? <Lock className="mr-2 h-4 w-4" /> : <Hash className="mr-2 h-4 w-4" />}
                                {channel.name}
                            </Button>
                        ))}
                        <p className="text-sm font-medium text-muted-foreground px-2 pt-4">Mensajes Directos</p>
                        {directMessages.map((dm) => {
                             const user = users.find((u) => u.id === dm.userId);
                             if (!user) return null;
                            return (
                                <div key={dm.id} className="relative group">
                                    <Button
                                        variant={activeChatId === dm.id ? "secondary" : "ghost"}
                                        className="w-full justify-start h-auto p-2"
                                        onClick={() => openChat(dm.id)}
                                    >
                                        <UserAvatarWithStatus user={user} className="w-8 h-8" />
                                        <div className="flex-1 flex justify-between items-center ml-2">
                                            <span className={cn("font-medium truncate", statusColor[user.status])}>{dm.name}</span>
                                            {dm.unreadCount && dm.unreadCount > 0 && (
                                                <Badge variant="destructive" className="h-5 min-w-[1.25rem] justify-center text-xs">
                                                {dm.unreadCount > 9 ? "+9" : dm.unreadCount}
                                                </Badge>
                                            )}
                                        </div>
                                    </Button>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-auto flex items-center opacity-0 group-hover:opacity-100 gap-1">
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
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </div>
            <div className="flex-1">
                <ChatArea
                    key={activeChat.id} // Add key to force re-render on chat change
                    chatId={activeChat.id}
                    title={activeChat.title}
                    icon={activeChat.icon}
                    initialMessages={activeChat.messages}
                    currentUser={users[0]}
                    chatType={activeChat.type}
                />
            </div>
        </div>
    );
}
