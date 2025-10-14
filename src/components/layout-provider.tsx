"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppLayout } from "@/components/app-layout";
import { NewsPreferencesProvider } from "@/hooks/use-news-preferences";

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

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (!mounted) {
    return null;
  }
  
  if (isAuthPage) {
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
      <NewsPreferencesProvider>
        <AppLayout>{children}</AppLayout>
      </NewsPreferencesProvider>
    </ThemeProvider>
  );
}
