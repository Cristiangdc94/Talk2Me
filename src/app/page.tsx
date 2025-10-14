import { MessageCircle } from "lucide-react";
import { NewsPortal } from "@/components/news/news-portal";

export default function Home() {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-6 rounded-full bg-secondary">
          <MessageCircle className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-headline text-primary">Bienvenido a Talk2Me</h1>
        <p className="max-w-md text-muted-foreground">
          Selecciona un canal o un mensaje directo para empezar. Mientras tanto, ponte al día con las últimas noticias.
        </p>
      </div>
      <NewsPortal />
    </div>
  );
}
