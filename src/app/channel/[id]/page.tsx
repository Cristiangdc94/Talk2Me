import { ChatArea } from "@/components/chat/chat-area";
import { channels, users } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Hash, Lock } from "lucide-react";

export default function ChannelPage({ params }: { params: { id: string } }) {
  const channel = channels.find((c) => c.id === params.id);
  const currentUser = users[0];

  if (!channel) {
    notFound();
  }

  const icon =
    channel.type === "private" ? (
      <Lock className="w-5 h-5 text-muted-foreground" />
    ) : (
      <Hash className="w-5 h-5 text-muted-foreground" />
    );

  return (
    <ChatArea
      chatId={channel.id}
      title={channel.name}
      icon={icon}
      initialMessages={channel.messages}
      currentUser={currentUser}
      chatType="channel"
    />
  );
}
