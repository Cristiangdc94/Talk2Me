import { ChatArea } from "@/components/chat/chat-area";
import { directMessages, users } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";

export default function DirectMessagePage({ params }: { params: { id: string } }) {
  // The id from params might not have the 'dm-' prefix, so we find by userId.
  const dm = directMessages.find((d) => d.userId === params.id);
  const recipient = users.find((u) => u.id === params.id);
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
