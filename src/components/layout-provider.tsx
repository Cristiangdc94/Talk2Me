"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/app-layout";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  
  // Use a state to avoid flash of unstyled content
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing or a loading spinner on the server and initial client render
    return null;
  }

  if (isAuthPage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        {children}
      </main>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
