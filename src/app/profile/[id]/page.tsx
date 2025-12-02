
import { users } from "@/lib/mock-data";
import { UserProfilePage } from "@/components/profile/user-profile-page";
import { notFound } from "next/navigation";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);
  const currentUser = users.find((u) => u.id === '1');

  if (!user || !currentUser) {
    notFound();
  }

  return <UserProfilePage user={user} currentUser={currentUser} />;
}
