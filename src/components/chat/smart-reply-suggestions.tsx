"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSmartReplySuggestions } from "@/ai/flows/smart-reply-suggestions";
import type { Message } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

interface SmartReplySuggestionsProps {
  messages: Message[];
  onSuggestionClick: (suggestion: string) => void;
}

export function SmartReplySuggestions({
  messages,
  onSuggestionClick,
}: SmartReplySuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (messages.length > 0) {
      startTransition(async () => {
        try {
          // Format the last 3 messages for context
          const messageHistory = messages
            .slice(-3)
            .map((m) => `${m.user.name}: ${m.text || "(sent an image)"}`)
            .join("\n");
            
          const result = await getSmartReplySuggestions({ messageHistory });
          setSuggestions(result.suggestions);
        } catch (error) {
          console.error("Failed to get smart replies:", error);
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
    }
  }, [messages]);

  if (isPending) {
    return (
        <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse shrink-0" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
        </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-accent shrink-0" />
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="shrink-0"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
