"use client";

import React, { createContext, useContext, useState } from "react";

interface NewsPreferencesContextType {
  preferences: string[];
  setPreferences: React.Dispatch<React.SetStateAction<string[]>>;
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsPreferencesContext = createContext<NewsPreferencesContextType | undefined>(undefined);

export function NewsPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <NewsPreferencesContext.Provider value={{ preferences, setPreferences, isDialogOpen, setDialogOpen }}>
      {children}
    </NewsPreferencesContext.Provider>
  );
}

export function useNewsPreferences() {
  const context = useContext(NewsPreferencesContext);
  if (context === undefined) {
    throw new Error("useNewsPreferences must be used within a NewsPreferencesProvider");
  }
  return context;
}
