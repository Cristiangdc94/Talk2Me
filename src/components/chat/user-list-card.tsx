
"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, MoreVertical, ShieldAlert, Trash2, Ban } from "lucide-react";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { useToast } from "@/hooks/use-toast";
import type { User, CompanyRole } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface UserListCardProps {
  user: User;
  currentUserRole?: CompanyRole;
  userRole?: CompanyRole;
}

export function UserListCard({ user, currentUserRole, userRole }: UserListCardProps) {
  const { toast } = useToast();
  
  const privilegedRoles: CompanyRole[] = ['Administrador', 'CEO', 'Jefe de proyecto'];
  const canDelete = currentUserRole && privilegedRoles.includes(currentUserRole);
  const isCurrentUser = user.id === '1';

  const handleCall = () => {
    toast({
      title: `Llamando a ${user.name}...`,
      description: "Esta función es una demostración.",
    });
  };

  const handleIgnore = () => {
    toast({
      title: "Usuario Ignorado",
      description: `Has ignorado a ${user.name}.`,
    });
  };

  const handleDelete = () => {
    toast({
      variant: "destructive",
      title: "Usuario Eliminado",
      description: `${user.name} ha sido eliminado de tu lista de contactos.`,
    });
  };

  const handleBlock = () => {
    toast({
      variant: "destructive",
      title: "Usuario Bloqueado",
      description: `Has bloqueado a ${user.name}.`,
    });
  };

  return (
    <Card className="h-full flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1 relative group">
      {userRole && (
        <Badge variant="secondary" className="absolute top-2 right-2 z-10">
          {userRole}
        </Badge>
      )}
      {!isCurrentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Más opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleIgnore}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>Ignorar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBlock}>
              <Ban className="mr-2 h-4 w-4" />
              <span>Bloquear</span>
            </DropdownMenuItem>
            {canDelete && (
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <CardHeader className="flex-1 flex flex-col items-center justify-center p-4">
        <UserAvatarWithStatus user={user} className="w-20 h-20 mb-4" />
        <p className="font-bold text-lg">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      
      {!isCurrentUser && (
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
      )}
    </Card>
  );
}
