
"use client";

import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageStatusProps {
  status?: 'sent' | 'read';
}

export function MessageStatus({ status }: MessageStatusProps) {
  if (!status) {
    return null;
  }

  if (status === 'read') {
    return <CheckCheck className="h-4 w-4 text-blue-500" />;
  }

  return <Check className="h-4 w-4 text-primary-foreground/70" />;
}
