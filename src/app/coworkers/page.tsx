
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function CoworkersPage() {
  const coworkers = users.filter((user) => user.relationship === 'coworker');
  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      <UserList title="Compañeros de Trabajo" users={coworkers} />
    </div>
  );
}
