import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div className="p-6 rounded-full bg-secondary">
        <MessageCircle className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline text-primary">Bienvenido a Talk2Me</h1>
      <p className="max-w-md text-muted-foreground">
        Selecciona un canal o un mensaje directo de la barra lateral para iniciar una conversación.
        Experimenta una comunicación fluida con mensajería en tiempo real y respuestas inteligentes impulsadas por IA.
      </p>
    </div>
  );
}
