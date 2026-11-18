"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/contexts/language-context";
import { ThemeProvider } from "@/lib/contexts/theme-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
