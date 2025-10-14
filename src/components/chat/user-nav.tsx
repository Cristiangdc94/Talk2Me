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
import { ChevronUp, LogOut, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  // In a real app, you'd get the current user from an auth context
  const currentUser = users[0];

  const handleLogout = () => {
    // Simulate logout
    Cookies.remove("auth_token");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-auto justify-between p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:h-10"
        >
          <div className="flex items-center gap-2">
            <UserAvatarWithStatus user={currentUser} />
            <div className="text-left group-data-[collapsible=icon]:hidden">
              <p className="font-medium text-sm text-sidebar-foreground">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/70">Online</p>
            </div>
          </div>
          <ChevronUp className="w-4 h-4 text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* This would be the user's email */}
              you@example.com 
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
