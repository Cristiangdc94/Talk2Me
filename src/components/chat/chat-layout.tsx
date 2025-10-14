

"use client";

import { useChat } from "@/hooks/use-chat";
import { ChatArea } from "./chat-area";
import { users } from "@/lib/mock-data";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  Send,
  Trash2,
  Users,
  Search,
  Plus,
} from "lucide-react";
import { Input } from "../ui/input";
import { directMessages, channels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { UserAvatarWithStatus } from "./user-avatar-with-status";

export function ChatLayout() {
  const { activeChat, openChat, closeChat, activeChatId } = useChat();

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          Selecciona un chat para empezar a conversar.
        </p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
      <ResizablePanel defaultSize={20} minSize={15}>
        <TooltipProvider delayDuration={0}>
          <div className="flex h-full flex-col">
            <div className="flex items-center p-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Nuevo Chat</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Nuevo Chat
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar" className="pl-8" />
                </div>
              </form>
            </div>
            <Tabs defaultValue="all" className="flex-1 overflow-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">Todo</TabsTrigger>
                <TabsTrigger value="unread">No leídos</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0 p-4">
                <div className="flex flex-col gap-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => openChat(channel.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors hover:bg-muted",
                        activeChatId === channel.id && "bg-muted"
                      )}
                    >
                      # {channel.name}
                    </button>
                  ))}
                  {directMessages.map((dm) => {
                    const user = users.find((u) => u.id === dm.userId);
                    return (
                      <button
                        key={dm.id}
                        onClick={() => openChat(dm.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors hover:bg-muted",
                          activeChatId === dm.id && "bg-muted"
                        )}
                      >
                        <UserAvatarWithStatus
                          user={user!}
                          className="h-6 w-6"
                        />
                        <div className="flex-1">
                          <p className="truncate font-medium">{dm.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {dm.messages[dm.messages.length - 1]?.text}
                          </p>
                        </div>
                        {dm.unreadCount && (
                          <Badge variant="destructive">{dm.unreadCount > 9 ? "+9" : dm.unreadCount}</Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="m-0"></TabsContent>
            </Tabs>
          </div>
        </TooltipProvider>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <ChatArea
          key={activeChat.id}
          chatId={activeChat.id}
          title={activeChat.title}
          icon={activeChat.icon}
          initialMessages={activeChat.messages}
          currentUser={users[0]}
          chatType={activeChat.type}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
