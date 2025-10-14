
"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { NotificationList } from "./notification-list";
import { notifications as mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

export function NotificationWidget() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const notificationCount = mockNotifications.length;
  
  useEffect(() => {
    // Set initial position on the client-side after mount
    setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        setPosition(prev => ({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        }));
      }
    };
  
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.cursor = 'default';
      }
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (widgetRef.current) {
      isDraggingRef.current = true;
      const rect = widgetRef.current.getBoundingClientRect();
      dragStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.body.style.cursor = 'grabbing';
    }
  };
  
  const handleNotificationClick = () => {
    setIsOpen(false);
  };
  
  if (notificationCount === 0) return null;

  return (
    <div
      ref={widgetRef}
      className={cn("fixed z-50 flex items-center gap-2", isDraggingRef.current && "select-none")}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
        <div className="bg-primary text-primary-foreground rounded-full shadow-lg">
            <ThemeToggle />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
            <div className="relative cursor-grab active:cursor-grabbing" onMouseDown={(e) => e.stopPropagation()}>
                <button 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={handleMouseDown}
                >
                {isOpen ? <X className="h-7 w-7" /> : <Bell className="h-7 w-7" />}
                </button>
                {!isOpen && notificationCount > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-6 w-6 justify-center rounded-full"
                >
                    {notificationCount}
                </Badge>
                )}
            </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end" sideOffset={15}>
            <NotificationList notifications={mockNotifications} onNotificationClick={handleNotificationClick} />
            </PopoverContent>
        </Popover>
    </div>
  );
}
