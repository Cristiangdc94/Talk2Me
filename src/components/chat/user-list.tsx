
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col h-full">
      <Card className="mb-6 shrink-0">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))}
        {showAddContact && <AddContactCard />}
      </div>
    </div>
  );
}
