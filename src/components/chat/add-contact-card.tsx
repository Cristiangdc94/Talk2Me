"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export function AddContactCard() {
  return (
    <Link href="/add-contact">
      <Card className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
          <UserPlus className="h-6 w-6 text-muted-foreground" />
          <p className="font-semibold text-sm">Añadir Contacto</p>
        </CardContent>
      </Card>
    </Link>
  );
}
