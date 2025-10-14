
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Newspaper,
  Users,
  Briefcase,
  Search,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNewsPreferences } from "@/hooks/use-news-preferences";
import { SidebarTrigger } from "./ui/sidebar";

const navLinks = [
  { href: "/", label: "Noticias", icon: Newspaper },
  { href: "/friends", label: "Amigos", icon: Users },
  { href: "/coworkers", label: "Compañeros", icon: Briefcase },
  { href: "/add-contact", label: "Buscar", icon: Search },
];

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={cn("justify-start", {
        "font-bold": isActive,
      })}
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}

export function Header() {
  const { setDialogOpen } = useNewsPreferences();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 shrink-0">
       <div className="flex items-center gap-2">
         <SidebarTrigger className="md:hidden" />
         <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Ajustes</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Preferencias de Noticias</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
