
import { PeopleLayout } from "@/components/chat/people-layout";
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function FriendsPage() {
  const friends = users.filter((user) => user.relationship === 'friend');
  return <PeopleLayout listComponent={<UserList title="Amigos" users={friends} />} />;
}
