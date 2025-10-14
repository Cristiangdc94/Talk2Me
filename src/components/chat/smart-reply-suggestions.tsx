
"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSmartReplySuggestions } from "@/ai/flows/smart-reply-suggestions";
import type { Message } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (rateLimitTimer.current) {
        clearTimeout(rateLimitTimer.current);
      }
    };
  }, []);

  const handleFetchSuggestions = () => {
    if (isRateLimited || isPending || messages.length === 0) {
      return;
    }
    startTransition(async () => {
      try {
        const messageHistory = messages
          .slice(-3)
          .map((m) => `${m.user.name}: ${m.text || "(envió una imagen)"}`)
          .join("\n");

        const result = await getSmartReplySuggestions({ messageHistory });
        setSuggestions(result.suggestions);
      } catch (error: any) {
        console.error("Error al obtener respuestas inteligentes:", error);
        if (error.message && error.message.includes('429')) {
          toast({
            variant: "destructive",
            title: "Límite de Peticiones Alcanzado",
            description: "Has superado la cuota de la API. Por favor, espera un minuto.",
          });
          setRateLimited(true);
          rateLimitTimer.current = setTimeout(() => {
            setRateLimited(false);
          }, 60000);
        }
        setSuggestions([]);
      }
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setSuggestions([]); // Clear suggestions after one is clicked
  };

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

  if (suggestions.length > 0) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSuggestions([])}>
                <Sparkles className="h-5 w-5 text-purple-500" />
            </Button>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {suggestions.map((suggestion, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="shrink-0"
                >
                    {suggestion}
                </Button>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleFetchSuggestions} disabled={isPending || isRateLimited || messages.length === 0}>
            <Sparkles className="h-5 w-5 text-muted-foreground hover:text-purple-500" />
            <span className="sr-only">Generar respuestas inteligentes</span>
        </Button>
    </div>
  );
}
