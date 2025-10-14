
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { users } from "@/lib/mock-data";
import { LogOut, Settings, User as UserIcon, Newspaper, Circle, Sunrise, Coffee, Sunset } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNewsPreferences } from "@/hooks/use-news-preferences";
import Link from "next/link";
import type { User } from "@/lib/types";

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const { setDialogOpen } = useNewsPreferences();
  
  // Manage user state locally to allow for status changes
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    router.push("/login");
    router.refresh();
  };

  const handleStatusChange = (status: 'online' | 'busy' | 'offline') => {
    setCurrentUser(prevUser => ({ ...prevUser, status }));
    let statusText = '';
    switch(status) {
        case 'online': statusText = 'Conectado'; break;
        case 'busy': statusText = 'Ausente'; break;
        case 'offline': statusText = 'Invisible'; break;
    }
    toast({
        title: "Estado Actualizado",
        description: `Tu estado ahora es ${statusText}.`,
    });
  };

  const statusTextMap: Record<User['status'], string> = {
    online: 'Conectado',
    busy: 'Ausente',
    offline: 'Invisible',
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2 group-data-[collapsible=icon]:justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 p-0 h-auto group-data-[collapsible=icon]:p-2 data-[state=open]:bg-sidebar-accent w-full"
          >
            <UserAvatarWithStatus user={currentUser} />
            <div className="text-left group-data-[collapsible=icon]:hidden flex-1">
              <p className="font-medium text-sm text-sidebar-foreground">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{statusTextMap[currentUser.status]}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mb-2" align="start" side="top" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                tú@ejemplo.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
             <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Circle className="mr-2 h-4 w-4" />
                <span>Establecer Estado</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={currentUser.status} onValueChange={(value) => handleStatusChange(value as User['status'])}>
                  <DropdownMenuRadioItem value="online">
                    <Sunrise className="mr-2 h-4 w-4" />
                    <span>Conectado</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="busy">
                    <Coffee className="mr-2 h-4 w-4" />
                    <span>Ausente</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="offline">
                    <Sunset className="mr-2 h-4 w-4" />
                    <span>Invisible</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Preferencias de Noticias</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="group-data-[collapsible=icon]:hidden">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Ajustes</span>
            </Link>
        </Button>
      </div>
    </div>
  );
}
