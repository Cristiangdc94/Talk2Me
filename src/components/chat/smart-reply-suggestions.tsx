
"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
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
  const [isRateLimited, setRateLimited] = useState(false);
  const rateLimitTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (rateLimitTimer.current) {
        clearTimeout(rateLimitTimer.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (messages.length > 0 && !isRateLimited) {
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
    } else if (isRateLimited) {
      setSuggestions([]);
    } else {
      setSuggestions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isRateLimited]);
  
  if (isRateLimited) {
      return null; // Don't show anything if we are rate limited
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
