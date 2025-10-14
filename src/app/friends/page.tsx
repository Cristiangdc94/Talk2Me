
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function FriendsPage() {
  const friends = users.filter((user) => user.relationship === 'friend');
  return <UserList title="Amigos" users={friends} />;
}
