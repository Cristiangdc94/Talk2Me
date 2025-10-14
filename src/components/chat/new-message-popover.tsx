
"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, User, Search } from "lucide-react";
import { users } from "@/lib/mock-data";
import { useChat } from "@/hooks/use-chat";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NewMessagePopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function NewMessagePopover({ children, isOpen, setIsOpen }: NewMessagePopoverProps) {
  const { openChat } = useChat();
  const router = useRouter();

  const contacts = users.filter(
    (user) => (user.relationship === "friend" || user.relationship === "coworker") && user.id !== "1"
  );
  
  const friends = contacts.filter(c => c.relationship === 'friend');
  const coworkers = contacts.filter(c => c.relationship === 'coworker');

  const handleStartChat = (userId: string) => {
    // In a real app, you might need to find or create the direct message channel.
    // For this mock data, we assume a dm channel id format `dm-${userId}`
    const dmId = `dm-${userId}`;
    openChat(dmId);
    setIsOpen(false);
  };
  
  const handleAddContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    router.push('/add-contact');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="right" align="start">
        <div className="p-4">
          <h4 className="font-medium leading-none">Nuevo Mensaje</h4>
          <p className="text-sm text-muted-foreground">
            Selecciona una persona para iniciar una conversación.
          </p>
        </div>
        <ScrollArea className="h-[300px]">
            <div className="p-4 pt-0">
                {friends.length > 0 && (
                    <>
                        <h5 className="text-xs font-semibold text-muted-foreground mb-2">Amigos</h5>
                        <div className="space-y-1">
                            {friends.map(user => (
                                <Button key={user.id} variant="ghost" className="w-full justify-start h-auto p-2" onClick={() => handleStartChat(user.id)}>
                                    <UserAvatarWithStatus user={user} className="w-8 h-8" />
                                    <span className="font-medium">{user.name}</span>
                                </Button>
                            ))}
                        </div>
                    </>
                )}
                 {friends.length > 0 && coworkers.length > 0 && <Separator className="my-2" />}
                {coworkers.length > 0 && (
                    <>
                        <h5 className="text-xs font-semibold text-muted-foreground mb-2">Compañeros</h5>
                        <div className="space-y-1">
                            {coworkers.map(user => (
                                <Button key={user.id} variant="ghost" className="w-full justify-start h-auto p-2" onClick={() => handleStartChat(user.id)}>
                                    <UserAvatarWithStatus user={user} className="w-8 h-8" />
                                    <span className="font-medium">{user.name}</span>
                                </Button>
                            ))}
                        </div>
                    </>
                )}
                 {contacts.length === 0 && (
                    <p className="text-sm text-center text-muted-foreground py-8">No tienes amigos o compañeros añadidos.</p>
                 )}
            </div>
        </ScrollArea>
        <Separator />
        <div className="p-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/add-contact" onClick={() => setIsOpen(false)}>
                    <Search className="mr-2 h-4 w-4" />
                    Buscar a alguien
                </Link>
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
