
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
    
    // Filter coworkers, including the current user for grouping
    const allCoworkers = allUsers.filter(
      (user) => (user.relationship === "coworker" || user.id === '1') && (user.company || user.companyRoles)
    );

    const groupedByCompany = allCoworkers.reduce((acc, user) => {
      const companies = user.companyRoles ? Object.keys(user.companyRoles) : (user.company ? [user.company] : []);
      
      companies.forEach(companyName => {
        if (!acc[companyName]) {
          acc[companyName] = [];
        }
        // Avoid duplicating the user in the same company group
        if (!acc[companyName].find(u => u.id === user.id)) {
          acc[companyName].push(user);
        }
      });
      return acc;
    }, {} as Record<string, User[]>);
    
    setCoworkersByCompany(groupedByCompany);
  }, []);

  return (
    <div className="h-full flex flex-col">
        <div className="p-4 sm:p-6 pb-6 shrink-0 text-center">
            <h2 className="text-4xl font-bold tracking-tight font-headline">Compañeros</h2>
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
