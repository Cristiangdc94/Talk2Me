"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatArea } from "./chat-area";
import { channels, directMessages, users } from "@/lib/mock-data";
import { Button } from "../ui/button";
import { Hash, Lock, User } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

export function ChatLayout() {
    const { activeChat, activeChatId, setActiveChatId } = useChat();

    if (!activeChat) {
        return null;
    }

    const handleChatSelect = (id: string) => {
        setActiveChatId(id);
    };

    return (
        <div className="flex h-full w-full">
            <div className="w-64 border-r bg-muted/40 p-2 flex flex-col gap-2">
                <h2 className="text-lg font-semibold tracking-tight p-2">Chats</h2>
                <ScrollArea>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground px-2 pt-2">Canales</p>
                        {channels.map((channel) => (
                            <Button
                                key={channel.id}
                                variant={activeChatId === channel.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => handleChatSelect(channel.id)}
                            >
                                {channel.type === "private" ? <Lock className="mr-2 h-4 w-4" /> : <Hash className="mr-2 h-4 w-4" />}
                                {channel.name}
                            </Button>
                        ))}
                        <p className="text-sm font-medium text-muted-foreground px-2 pt-4">Mensajes Directos</p>
                        {directMessages.map((dm) => (
                             <Button
                                key={dm.id}
                                variant={activeChatId === dm.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => handleChatSelect(dm.id)}
                            >
                               <User className="mr-2 h-4 w-4" />
                               {dm.name}
                            </Button>
                        ))}
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
