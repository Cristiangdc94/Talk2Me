
import { PeopleLayout } from "@/components/chat/people-layout";
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function CoworkersPage() {
  const coworkers = users.filter((user) => user.relationship === 'coworker');
  return <PeopleLayout listComponent={<UserList title="Compañeros de Trabajo" users={coworkers} />} />;
}
