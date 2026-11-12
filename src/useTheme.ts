import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Also read by the inline script in index.html, so the first paint has the right theme. */
export const THEME_STORAGE_KEY = "reading-list:theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): Theme {
  return window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Follows the system setting until the reader picks a theme with the toggle.
 * Picking the same theme as the system clears the choice, so the app follows
 * the system again.
 */
export function useTheme() {
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const [storedTheme, setStoredTheme] = useState<Theme | null>(getStoredTheme);
  const theme = storedTheme ?? systemTheme;

  useEffect(() => {
    const query = window.matchMedia?.(DARK_QUERY);
    if (!query) return;
    const handleChange = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? "dark" : "light");
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const choice = next === systemTheme ? null : next;
    setStoredTheme(choice);
    try {
      if (choice) {
        localStorage.setItem(THEME_STORAGE_KEY, choice);
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // Blocked storage: the theme still changes for this visit.
    }
  }

  return { theme, toggleTheme };
}
