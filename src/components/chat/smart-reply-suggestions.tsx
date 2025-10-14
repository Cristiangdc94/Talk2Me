
"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSmartReplySuggestions } from "@/ai/flows/smart-reply-suggestions";
import type { Message, User } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { users } from "@/lib/mock-data";

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
  const [isRateLimited, setRateLimited] = useState(false);
  const rateLimitTimer = useRef<NodeJS.Timeout | null>(null);
  const currentUser = users[0]; // In a real app, this would come from an auth context

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (rateLimitTimer.current) {
        clearTimeout(rateLimitTimer.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const shouldFetchSuggestions = 
      messages.length > 0 && 
      !isRateLimited &&
      lastMessage?.user.id !== currentUser.id;

    if (shouldFetchSuggestions) {
      startTransition(async () => {
        try {
          // Format the last 3 messages for context
          const messageHistory = messages
            .slice(-3)
            .map((m) => `${m.user.name}: ${m.text || "(envió una imagen)"}`)
            .join("\n");
            
          const result = await getSmartReplySuggestions({ messageHistory });
          setSuggestions(result.suggestions);
        } catch (error: any) {
          console.error("Error al obtener respuestas inteligentes:", error);
          if (error.message && error.message.includes('429')) {
            console.warn("Límite de tasa alcanzado. Desactivando sugerencias temporalmente.");
            setRateLimited(true);
            setSuggestions([]);

            // Set a timer to re-enable suggestions after 60 seconds
            rateLimitTimer.current = setTimeout(() => {
              setRateLimited(false);
              console.log("Temporizador de límite de tasa finalizado. Reactivando sugerencias.");
            }, 60000); 
          } else {
            setSuggestions([]);
          }
        }
      });
    } else if (!shouldFetchSuggestions) {
      setSuggestions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isRateLimited, currentUser.id]);
  
  if (isRateLimited && suggestions.length === 0) {
      return null; // Don't show anything if we are rate limited and have no suggestions
  }

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
