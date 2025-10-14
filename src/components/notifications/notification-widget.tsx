
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
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const notificationCount = mockNotifications.length;

  useEffect(() => {
    // Set initial position only on the client-side
    setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };
    
    const handleMouseLeave = () => {
      setIsDragging(false);
       document.body.style.cursor = 'default';
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      dragStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
      document.body.style.cursor = 'grabbing';
    }
  };
  
  if (notificationCount === 0) return null;

  return (
    <div
      ref={widgetRef}
      className={cn("fixed z-50 flex items-center gap-2", isDragging && "select-none")}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
        <div className="bg-background/80 backdrop-blur-sm rounded-full">
            <ThemeToggle />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
            <div className="relative cursor-grab active:cursor-grabbing" onMouseDown={(e) => e.stopPropagation()}>
                <button 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleMouseDown(e);
                    }}
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
            <NotificationList notifications={mockNotifications} />
            </PopoverContent>
        </Popover>
    </div>
  );
}
