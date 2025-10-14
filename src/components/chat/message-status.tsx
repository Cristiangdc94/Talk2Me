
"use client";

import { CheckCheck } from "lucide-react";

interface MessageStatusProps {
  status?: 'read';
}

export function MessageStatus({ status }: MessageStatusProps) {
  if (status === 'read') {
    return <CheckCheck className="h-4 w-4 text-blue-500" />;
  }
  return null;
}
