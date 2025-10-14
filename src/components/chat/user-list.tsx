
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";

interface UserListProps {
  title: string;
  users: User[];
}

export function UserList({ title, users }: UserListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))}
        {users.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
                No hay nadie en esta lista todavía.
            </p>
        )}
      </CardContent>
    </Card>
  );
}
