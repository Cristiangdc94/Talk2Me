"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/app-layout";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        {children}
      </main>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
