'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Send, X, User, Loader2, CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { helpChatbot } from '@/ai/flows/help-chatbot-flow';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function HelpChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: '¡Hola! Soy tu asistente de Talk2Me. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  const handleSend = async () => {
    if (!input.trim() || isPending) return;

    const userMessage = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      try {
        const response = await helpChatbot({
          message: userMessage,
          history: messages,
        });
        setMessages((prev) => [...prev, { role: 'model', content: response.text }]);
      } catch (error) {
        console.error('Error in help chatbot:', error);
        setMessages((prev) => [
          ...prev,
          { role: 'model', content: 'Hubo un error al conectar con el asistente. Inténtalo de nuevo más tarde.' },
        ]);
      }
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary-foreground/10">
          <CircleHelp className="h-5 w-5" />
          <span className="sr-only">Ayuda</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0 border-none shadow-2xl mr-4 mb-2" side="top" align="end">
        <Card className="flex flex-col h-[500px] overflow-hidden">
          <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm font-semibold">Asistente de Ayuda</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden bg-muted/30">
            <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-2 max-w-[85%]",
                      m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg text-sm",
                      m.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border rounded-tl-none"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isPending && (
                  <div className="flex items-start gap-2 max-w-[85%] mr-auto">
                    <div className="p-2 bg-card border rounded-lg rounded-tl-none">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Escribe tu duda..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPending}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}