"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/contexts/language-context";
import { ThemeProvider, useThemeContext } from "@/lib/contexts/theme-context";

function ThemedToaster() {
  const { theme } = useThemeContext();
  return <Toaster richColors position="top-center" theme={theme} />;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
        <ThemedToaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
