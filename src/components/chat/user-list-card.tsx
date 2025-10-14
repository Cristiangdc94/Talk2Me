
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";
import { Phone } from "lucide-react";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface UserListCardProps {
  user: User;
}

export function UserListCard({ user }: UserListCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleChat = () => {
    router.push(`/dm/${user.id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.status === 'online') {
      toast({
        title: `Llamando a ${user.name}...`,
        description: "Esta función es una demostración.",
      });
    } else {
      toast({
        variant: "destructive",
        title: `No se puede llamar a ${user.name}`,
        description: `El usuario está ${user.status === 'offline' ? 'desconectado' : 'ocupado'}.`,
      });
    }
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
      onClick={handleChat}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <UserAvatarWithStatus user={user} />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user.status === 'online' ? 'En línea' : 
               user.status === 'busy' ? 'Ocupado' :
               user.lastSeen}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleCall}>
          <Phone className="w-5 h-5" />
          <span className="sr-only">Llamar a {user.name}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
