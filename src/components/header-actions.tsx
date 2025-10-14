"use client";

import { Newspaper, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNewsPreferences } from "@/hooks/use-news-preferences";
import { ThemeToggle } from "./theme-toggle";

export function HeaderActions() {
  const { setDialogOpen } = useNewsPreferences();

  return (
    <div className="flex items-center">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Ajustes</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Preferencias de Noticias</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
