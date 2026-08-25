import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "rac:theme";

/**
 * Persisted theme preference, applied to the document root as
 * `data-theme`. "system" removes the attribute so index.css's
 * prefers-color-scheme media query takes over.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEY, "system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = theme;
    }
  }, [theme]);

  return { theme, setTheme };
}
