import { users } from "@/lib/mock-data";
import { UserProfilePage } from "@/components/profile/user-profile-page";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = users.find((u) => u.id === id);
  const currentUser = users.find((u) => u.id === '1');

  if (!user || !currentUser) {
    notFound();
  }

  return <UserProfilePage user={user} currentUser={currentUser} />;
}