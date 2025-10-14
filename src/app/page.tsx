import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div className="p-6 rounded-full bg-secondary">
        <MessageCircle className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline text-primary">Welcome to Talk2Me</h1>
      <p className="max-w-md text-muted-foreground">
        Select a channel or a direct message from the sidebar to start a conversation.
        Experience seamless communication with real-time messaging and AI-powered smart replies.
      </p>
    </div>
  );
}
