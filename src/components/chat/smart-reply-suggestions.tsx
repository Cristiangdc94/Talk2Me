
"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getSmartReplySuggestions } from "@/ai/flows/smart-reply-suggestions";
import type { Message } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Bot } from "lucide-react";

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

  useEffect(() => {
    // Fetch suggestions when the popover is opened
    handleFetchSuggestions();
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

  if (isPending) {
    return (
        <div className="flex flex-col items-center gap-2 p-4 text-center">
            <Sparkles className="h-6 w-6 text-purple-500 animate-pulse shrink-0" />
            <p className="text-sm font-medium">Generando sugerencias...</p>
            <div className="w-full space-y-2 mt-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
  }
  
  if (messages.length === 0) {
      return (
        <div className="flex flex-col items-center gap-2 p-4 text-center text-muted-foreground">
            <Bot className="h-6 w-6" />
            <p className="text-sm font-medium">No hay mensajes</p>
            <p className="text-xs">Envía un mensaje para obtener sugerencias.</p>
        </div>
      )
  }

  return (
    <div className="flex flex-col items-center gap-2 p-2">
        <h4 className="font-semibold text-sm">Respuestas Sugeridas</h4>
        <div className="flex flex-col items-center gap-2 w-full">
            {suggestions.map((suggestion, index) => (
            <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onSuggestionClick(suggestion)}
            >
                {suggestion}
            </Button>
            ))}
             {suggestions.length === 0 && !isPending && (
                 <p className="text-xs text-muted-foreground text-center p-2">No se pudieron generar sugerencias. Inténtalo de nuevo.</p>
             )}
        </div>
    </div>
  );
}
