"use client";

import Link from "next/link";
import { Bell, MessageSquare, PhoneMissed, Newspaper } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Notification, User } from "@/lib/types";
import { useChat } from "@/hooks/use-chat";
import { useRouter } from "next/navigation";
import { channels, directMessages, users } from "@/lib/mock-data";
import { Hash, Lock } from "lucide-react";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: () => void;
}

const iconMap = {
  message: <MessageSquare className="h-5 w-5 text-blue-500" />,
  call: <PhoneMissed className="h-5 w-5 text-red-500" />,
  news: <Newspaper className="h-5 w-5 text-green-500" />,
};

const groupNotifications = (notifications: Notification[]) => {
  return notifications.reduce((acc, notification) => {
    const key = notification.type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);
};

export function NotificationList({ notifications, onNotificationClick }: NotificationListProps) {
  const groupedNotifications = groupNotifications(notifications);
  const { openChat } = useChat();
  const router = useRouter();

  const groupTitles = {
    message: "Mensajes no leídos",
    call: "Llamadas perdidas",
    news: "Noticias para ti",
  };

  const handleNotificationClick = (item: Notification) => {
    if (item.chatId && item.chatType) {
      if (item.chatType === 'channel') {
        const channel = channels.find(c => c.id === item.chatId);
        if (channel) {
          openChat({
            id: channel.id,
            type: "channel",
            title: channel.name,
            icon: channel.type === "private" ? <Lock className="w-5 h-5 text-muted-foreground" /> : <Hash className="w-5 h-5 text-muted-foreground" />,
            messages: channel.messages,
          });
        }
      } else if (item.chatType === 'dm') {
         const dm = directMessages.find(d => d.id === item.chatId);
         if (dm) {
            const recipient = users.find((u) => u.id === dm.userId);
            if(recipient) {
                 openChat({
                    id: dm.id,
                    type: "dm",
                    title: dm.name,
                    icon: <UserAvatarWithStatus user={recipient} className="w-8 h-8"/>,
                    messages: dm.messages,
                });
            }
         }
      }
    } else if (item.link) {
      router.push(item.link);
    }
    onNotificationClick();
  };

  return (
    <Card className="w-80 border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
        <CardTitle className="text-lg font-semibold">Notificaciones</CardTitle>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {Object.entries(groupedNotifications).map(([type, items]) => (
            <div key={type} className="p-4 border-b">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {groupTitles[type as keyof typeof groupTitles]} ({items.length})
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                   <button
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className="flex w-full text-left items-start gap-3 hover:bg-accent rounded-md p-2 -m-2"
                  >
                    <div className="mt-1">{iconMap[item.type as keyof typeof iconMap]}</div>
                    <p className="text-sm text-foreground/90">{item.text}</p>
                   </button>
                ))}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No tienes notificaciones nuevas.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
