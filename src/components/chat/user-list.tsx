
import { UserListCard } from "@/components/chat/user-list-card";
import { AddContactCard } from "@/components/chat/add-contact-card";
import type { User } from "@/lib/types";

interface UserListProps {
  title: string;
  description: string;
  users: User[];
  showAddContact?: boolean;
}

export function UserList({
  title,
  description,
  users,
  showAddContact = false,
}: UserListProps) {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="shrink-0">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))}
        {showAddContact && <AddContactCard />}
      </div>
    </div>
  );
}
