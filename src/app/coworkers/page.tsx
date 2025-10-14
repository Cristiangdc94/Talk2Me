
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function CoworkersPage() {
  const coworkers = users.filter((user) => user.relationship === 'coworker');
  return <UserList title="Compañeros de Trabajo" users={coworkers} />;
}
