
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Noticias' },
    { href: '/friends', label: 'Amigos' },
    { href: '/coworkers', label: 'Compañeros' },
  ];

  return (
    <nav className="flex items-center space-x-2" aria-label="Tabs">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          className={cn(
            'justify-center rounded-md px-3 py-2 text-sm font-medium',
            pathname === item.href
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
