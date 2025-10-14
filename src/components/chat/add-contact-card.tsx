"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export function AddContactCard() {
  return (
    <Link href="/add-contact">
      <Card className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[110px]">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <UserPlus className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-semibold">Añadir Contacto</p>
        </CardContent>
      </Card>
    </Link>
  );
}
