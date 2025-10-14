
"use client";

import { CheckCheck } from "lucide-react";

interface MessageStatusProps {
  status?: 'sent' | 'read';
}

export function MessageStatus({ status }: MessageStatusProps) {
  if (status === 'read') {
    return <CheckCheck className="h-4 w-4 text-blue-500" />;
  }
  // For 'sent' or undefined, show default check
  return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
}
