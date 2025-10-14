
'use client';

import { CoworkersList } from "@/components/chat/coworkers-list";
import { users } from "@/lib/mock-data";
import { User } from "@/lib/types";

export default function CoworkersPage() {
  // Process data directly instead of using useEffect for static mock data
  const allUsers = users;
  const allCoworkers = allUsers.filter(
    (user) => (user.relationship === "coworker" || user.id === '1') && (user.company || user.companyRoles)
  );

  const groupedByCompany = allCoworkers.reduce((acc, user) => {
    const companies = user.companyRoles ? Object.keys(user.companyRoles) : (user.company ? [user.company] : []);
    
    companies.forEach(companyName => {
      if (!acc[companyName]) {
        acc[companyName] = [];
      }
      if (!acc[companyName].find(u => u.id === user.id)) {
        acc[companyName].push(user);
      }
    });
    return acc;
  }, {} as Record<string, User[]>);

  return (
    <div className="h-full flex flex-col">
        <div className="p-4 sm:p-6 pb-6 shrink-0 text-center">
            <h2 className="text-4xl font-bold tracking-tight font-headline">Compañeros</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Estos son tus compañeros de trabajo en Talk2Me, organizados por empresa.
            </p>
        </div>
        <CoworkersList
            initialGroupedUsers={groupedByCompany}
        />
    </div>
  );
}
