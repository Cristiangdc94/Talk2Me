
"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { NotificationList } from "./notification-list";
import { notifications as mockNotifications } from "@/lib/mock-data";
import { ThemeToggle } from "../theme-toggle";
import type { Notification } from "@/lib/types";

const exampleNotifications: Notification[] = [
    { id: 'example-msg', type: 'message', text: 'Ejemplo: Tienes un nuevo mensaje de Alex.', timestamp: 'Ahora', chatId: 'dm-2', chatType: 'dm' },
    { id: 'example-call', type: 'call', text: 'Ejemplo: Llamada perdida de un contacto.', timestamp: 'Ahora', chatId: 'dm-3', chatType: 'dm' },
    { id: 'example-news', type: 'news', text: 'Ejemplo: Hay noticias de tecnología que te podrían interesar.', timestamp: 'Ahora', link: '/' },
];


export function NotificationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * exampleNotifications.length);
        const newNotif: Notification = {
            ...exampleNotifications[randomIndex],
            id: `notif-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setNotifications(prev => [newNotif, ...prev]);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);
  
  const handleNotificationClick = () => {
    setIsOpen(false);
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const notificationCount = notifications.length;

  return (
    <div
      className="fixed z-50 flex items-center gap-2 bottom-8 right-8"
    >
        <div className="bg-primary text-primary-foreground rounded-full shadow-lg">
            <ThemeToggle />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
            <div className="relative">
                <button 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                {isOpen ? <X className="h-7 w-7" /> : <Bell className="h-7 w-7" />}
                </button>
                {!isOpen && notificationCount > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-6 w-6 justify-center rounded-full"
                >
                    {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
                )}
            </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end" sideOffset={15}>
            <NotificationList 
                notifications={notifications} 
                onNotificationClick={handleNotificationClick}
                onClearAll={handleClearAll} 
            />
            </PopoverContent>
        </Popover>
    </div>
  );
}
