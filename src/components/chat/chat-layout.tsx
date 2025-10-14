
"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatArea } from "./chat-area";
import { users } from "@/lib/mock-data";
import { ChatSidebar } from "./chat-sidebar";

export function ChatLayout() {
    const { activeChat } = useChat();

    if (!activeChat) {
        return (
            <div className="flex h-full w-full bg-background">
                <ChatSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Selecciona un chat para empezar a conversar.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full bg-background">
            <ChatSidebar />
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
