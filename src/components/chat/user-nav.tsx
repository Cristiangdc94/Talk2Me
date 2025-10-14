
"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { users } from "@/lib/mock-data";
import { LogOut, Settings, User, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNewsPreferences } from "@/hooks/use-news-preferences";

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const { setDialogOpen } = useNewsPreferences();
  // In a real app, you'd get the current user from an auth context
  const currentUser = users[0];

  const handleLogout = () => {
    // Simulate logout
    Cookies.remove("auth_token");
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    router.push("/login");
    router.refresh();
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
              <p className="text-xs text-sidebar-foreground/70">En línea</p>
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Preferencias de Noticias</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Ajustes</span>
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
        <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Ajustes</span>
        </Button>
      </div>
    </div>
  );
}
