"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppLayout } from "@/components/app-layout";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  if (pathname === "/login" || pathname === "/signup") {
    return (
      <ThemeProvider>
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
          {children}
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppLayout>{children}</AppLayout>
    </ThemeProvider>
  );
}
