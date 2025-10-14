
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Newspaper,
  Users,
  Briefcase,
  MessageSquare,
  Settings,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const navLinks = [
  { href: '/', label: 'Noticias', icon: Newspaper },
  { href: '/friends', label: 'Amigos', icon: Users },
  { href: '/coworkers', label: 'Compañeros', icon: Briefcase },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/settings', label: 'Ajustes', icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {navLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
          return (
            <Tooltip key={link.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    isActive && 'bg-accent text-accent-foreground'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {link.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
