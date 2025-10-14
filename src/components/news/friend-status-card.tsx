
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserAvatarWithStatus } from '@/components/chat/user-avatar-with-status';
import type { FriendStatus } from '@/lib/types';

interface FriendStatusCardProps {
  status: FriendStatus;
}

export function FriendStatusCard({ status }: FriendStatusCardProps) {
  return (
    <Card className="h-full w-full bg-card">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
        <UserAvatarWithStatus user={status.user} />
        <div className="grid gap-1">
          <p className="font-semibold">{status.user.name}</p>
          <p className="text-xs text-muted-foreground">{status.timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground/90">{status.statusText}</p>
      </CardContent>
    </Card>
  );
}
