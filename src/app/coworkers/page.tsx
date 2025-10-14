
import { UserList } from "@/components/chat/user-list";
import { users } from "@/lib/mock-data";

export default function CoworkersPage() {
  const coworkers = users.filter(
    (user) => user.relationship === "coworker" && user.id !== "1"
  );
  return (
    <div className="h-full p-4 sm:p-6">
      <UserList
        title="Compañeros"
        description="Estos son tus compañeros de trabajo en Talk2Me."
        users={coworkers}
      />
    </div>
  );
}
