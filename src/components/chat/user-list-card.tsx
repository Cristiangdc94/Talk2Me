
"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";

interface UserListCardProps {
  user: User;
}

export function UserListCard({ user }: UserListCardProps) {
  const { toast } = useToast();
  const handleCall = () => {
    toast({
      title: `Llamando a ${user.name}...`,
      description: "Esta función es una demostración.",
    });
  };

  return (
    <Card className="h-full flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex-1 flex flex-col items-center justify-center p-4">
        <UserAvatarWithStatus user={user} className="w-20 h-20 mb-4" />
        <p className="font-bold text-lg">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      <CardFooter className="p-2 border-t">
        <div className="flex w-full gap-2">
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <Link href={`/dm/${user.id}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensaje
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCall}>
            <Phone className="h-4 w-4" />
            <span className="sr-only">Llamar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
