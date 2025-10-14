
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
    <div className="border-b">
      <nav className="flex space-x-4" aria-label="Tabs">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onTabChange(item.id)}
            className={cn(
              'rounded-none border-b-2 border-transparent px-4 py-2 text-base font-medium text-muted-foreground hover:text-primary',
              activeTab === item.id ? 'border-primary text-primary' : ''
            )}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
