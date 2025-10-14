import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";

interface UserAvatarWithStatusProps {
  user: User;
  className?: string;
}

export function UserAvatarWithStatus({ user, className }: UserAvatarWithStatusProps) {
  const nameInitial = user.name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <Avatar className={cn("h-10 w-10", className)}>
        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait"/>
        <AvatarFallback>{nameInitial}</AvatarFallback>
      </Avatar>
      <span
        className={cn(
          "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-background",
          user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
        )}
      />
    </div>
  );
}
