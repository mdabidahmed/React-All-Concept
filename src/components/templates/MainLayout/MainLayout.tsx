import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../organisms/Navbar/Navbar";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { CommandPalette } from "../../organisms/CommandPalette/CommandPalette";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setMobileNavOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.shell}>
      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        onOpenSearch={() => setPaletteOpen(true)}
        onToggleSidebar={() => setMobileNavOpen((open) => !open)}
      />
      <div className={styles.body}>
        <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
        <main id="main-content" className={styles.content}>
          {children}
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
