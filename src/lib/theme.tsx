"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "light",
  setTheme: () => {},
});

/**
 * Owns the light/dark state for the whole site. Mirrors the design's
 * localStorage("tp-landing-theme") + data-tp-theme on <html> behaviour.
 * An inline script in the root layout applies the stored theme before first
 * paint (no flash); this provider re-syncs on mount and on every toggle.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Adopt the pre-paint value the inline script already wrote to <html>.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-tp-theme") as Theme | null;
    const stored = (localStorage.getItem("tp-landing-theme") as Theme | null) || attr;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-tp-theme", theme);
    try {
      localStorage.setItem("tp-landing-theme", theme);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
