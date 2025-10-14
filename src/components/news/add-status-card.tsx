
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatarWithStatus } from '@/components/chat/user-avatar-with-status';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { User } from '@/lib/types';
import { Send } from 'lucide-react';

interface AddStatusCardProps {
  currentUser: User;
  onAddStatus: (statusText: string) => void;
}

export function AddStatusCard({ currentUser, onAddStatus }: AddStatusCardProps) {
  const [statusText, setStatusText] = useState('');

  const handlePublish = () => {
    if (statusText.trim()) {
      onAddStatus(statusText.trim());
      setStatusText('');
    }
  };

  return (
    <Card className="h-full w-full flex flex-col">
      <CardContent className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <UserAvatarWithStatus user={currentUser} />
          <div>
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">Comparte algo con tus amigos...</p>
          </div>
        </div>
        <Textarea
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
          placeholder="¿Qué estás pensando?"
          className="flex-1 resize-none"
        />
        <Button onClick={handlePublish} disabled={!statusText.trim()}>
          <Send className="mr-2 h-4 w-4" />
          Publicar
        </Button>
      </CardContent>
    </Card>
  );
}
