
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function FriendsPage() {
  const friends = users.filter((user) => user.relationship === 'friend');
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        <UserList title="Amigos" users={friends} />
      </div>
    </div>
  );
}
