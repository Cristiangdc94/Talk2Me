
'use client';

import { useState, useEffect } from "react";
import { CoworkersList } from "@/components/chat/coworkers-list";
import { users } from "@/lib/mock-data";
import { User } from "@/lib/types";

export default function CoworkersPage() {
  const [coworkersByCompany, setCoworkersByCompany] = useState<Record<string, User[]>>({});

  useEffect(() => {
    // Include the current user in the list
    const allUsers = users;
    const currentUser = allUsers.find(u => u.id === '1');
    
    // Filter coworkers, excluding the current user initially for grouping
    const allCoworkers = allUsers.filter(
      (user) => (user.relationship === "coworker" || user.id === '1') && user.company
    );

    const groupedByCompany = allCoworkers.reduce((acc, user) => {
      // User can be in multiple companies if they have roles
      if (user.companyRoles) {
        Object.keys(user.companyRoles).forEach(companyName => {
          if (!acc[companyName]) {
            acc[companyName] = [];
          }
          // Avoid duplicating the user in the same company group
          if (!acc[companyName].find(u => u.id === user.id)) {
            acc[companyName].push(user);
          }
        });
      } else if (user.company) { // Fallback for users with a single company
         if (!acc[user.company]) {
            acc[user.company] = [];
          }
          if (!acc[user.company].find(u => u.id === user.id)) {
             acc[user.company].push(user);
          }
      }
      return acc;
    }, {} as Record<string, User[]>);
    
    setCoworkersByCompany(groupedByCompany);
  }, []);

  return (
    <div className="h-full flex flex-col">
        <div className="p-4 sm:p-6 shrink-0 text-center">
            <h2 className="text-3xl font-bold tracking-tight font-body">Compañeros</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Estos son tus compañeros de trabajo en Talk2Me, organizados por empresa.
            </p>
        </div>
        <CoworkersList
            initialGroupedUsers={coworkersByCompany}
        />
    </div>
  );
}
