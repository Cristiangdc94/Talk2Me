
'use client';

import { useState, useEffect } from "react";
import { CoworkersList } from "@/components/chat/coworkers-list";
import { users } from "@/lib/mock-data";
import { User } from "@/lib/types";

export default function CoworkersPage() {
  const [coworkersByCompany, setCoworkersByCompany] = useState<Record<string, User[]>>({});

  useEffect(() => {
    const allCoworkers = users.filter(
      (user) => user.relationship === "coworker" && user.id !== "1"
    );

    const groupedByCompany = allCoworkers.reduce((acc, user) => {
      const companyName = user.company || "Otros";
      if (!acc[companyName]) {
        acc[companyName] = [];
      }
      acc[companyName].push(user);
      return acc;
    }, {} as Record<string, User[]>);
    
    setCoworkersByCompany(groupedByCompany);
  }, []);

  return (
    <div className="h-full flex flex-col">
        <div className="p-4 sm:p-6 shrink-0">
            <h2 className="text-2xl font-semibold tracking-tight">Compañeros</h2>
            <p className="text-sm text-muted-foreground">
                Estos son tus compañeros de trabajo en Talk2Me, organizados por empresa.
            </p>
        </div>
        <CoworkersList
            initialGroupedUsers={coworkersByCompany}
        />
    </div>
  );
}
