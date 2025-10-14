
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function FriendsPage() {
  const friends = users.filter(
    (user) => user.relationship === "friend" && user.id !== "1"
  );
  return (
    <div className="h-full p-4 sm:p-6">
      <UserList
        title="Amigos"
        description="Aquí puedes encontrar a todos tus amigos."
        users={friends}
        showAddContact
      />
    </div>
  );
}
