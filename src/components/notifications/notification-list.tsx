
"use client";

import Link from "next/link";
import { Bell, MessageSquare, PhoneMissed, Newspaper, Trash2 } from "lucide-react";
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
import { Button } from "../ui/button";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: () => void;
  onClearAll: () => void;
}

const iconMap = {
  message: <MessageSquare className="h-5 w-5 text-blue-500" />,
  call: <PhoneMissed className="h-5 w-5 text-red-500" />,
  news: <Newspaper className="h-5 w-5 text-green-500" />,
};

const groupNotifications = (notifications: Notification[]) => {
  return notifications.reduce((acc, notification) => {
    const key = notification.link === '/company-news' ? 'company-news' : notification.type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);
};

export function NotificationList({ notifications, onNotificationClick, onClearAll }: NotificationListProps) {
  const groupedNotifications = groupNotifications(notifications);
  const { openChat } = useChat();
  const router = useRouter();

  const groupTitles = {
    message: "Mensajes no leídos",
    call: "Llamadas perdidas",
    news: "Noticias Generales",
    'company-news': "Noticias de Empresa",
  };
  
  const groupOrder = ['message', 'call', 'company-news', 'news'];

  const handleNotificationClick = (item: Notification) => {
    if (item.chatId) {
      openChat(item.chatId);
    } else if (item.link) {
      router.push(item.link);
    }
    onNotificationClick();
  };

  return (
    <Card className="w-80 border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
        <CardTitle className="text-lg font-semibold">Notificaciones</CardTitle>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" onClick={onClearAll} disabled={notifications.length === 0}>
             <Trash2 className="h-4 w-4 mr-1"/>
             Limpiar
           </Button>
           <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {groupOrder.map(type => {
            const items = groupedNotifications[type];
            if (!items || items.length === 0) return null;
            
            return (
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
            )
          })}
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
