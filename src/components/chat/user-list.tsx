
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";
import { AddContactCard } from "./add-contact-card";

interface UserListProps {
  title: string;
  users: User[];
}

export function UserList({ title, users }: UserListProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 flex-1 auto-rows-min">
        {users.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))}
         <AddContactCard />
        {users.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
                No hay nadie en esta lista todavía.
            </p>
        )}
      </div>
    </div>
  );
}
