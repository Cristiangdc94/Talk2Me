

"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { NotificationList } from "./notification-list";
import { ThemeToggle } from "../theme-toggle";
import { useChat } from "@/hooks/use-chat";
import type { Notification } from "@/lib/types";

export function NotificationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, setNotifications, openChat } = useChat();

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
