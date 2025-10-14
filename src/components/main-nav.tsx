
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MainNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MainNav({ activeTab, onTabChange }: MainNavProps) {
  const navItems = [
    { id: 'news', label: 'Noticias' },
    { id: 'friends', label: 'Amigos' },
    { id: 'coworkers', label: 'Compañeros' },
  ];

  return (
    <div className="bg-sidebar rounded-t-lg p-2">
      <nav className="flex space-x-2" aria-label="Tabs">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onTabChange(item.id)}
            className={cn(
              'flex-1 justify-center rounded-md px-3 py-2 text-base font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              activeTab === item.id ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' : ''
            )}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
