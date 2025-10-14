
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Noticias' },
    { href: '/friends', label: 'Amigos' },
    { href: '/coworkers', label: 'Compañeros' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-1 rounded-lg p-1 bg-sidebar-accent/50">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          size="sm"
          className={cn(
            'justify-center rounded-md px-3 py-1.5 text-sm font-medium',
            (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
