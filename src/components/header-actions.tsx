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

  // This component is now effectively empty, but we keep it to avoid breaking imports.
  // The functionality has been moved to UserNav.
  return null;
}
