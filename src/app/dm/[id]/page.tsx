import { ChatArea } from "@/components/chat/chat-area";
import { directMessages, users } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";

export default async function DirectMessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // The id from params might not have the 'dm-' prefix, so we find by userId.
  const dm = directMessages.find((d) => d.userId === id);
  const recipient = users.find((u) => u.id === id);
  const currentUser = users[0];

  if (!dm || !recipient) {
    notFound();
  }

  return (
    <ChatArea
      chatId={dm.id}
      title={dm.name}
      icon={<UserAvatarWithStatus user={recipient} className="w-8 h-8"/>}
      initialMessages={dm.messages}
      currentUser={currentUser}
      chatType="dm"
    />
  );
}