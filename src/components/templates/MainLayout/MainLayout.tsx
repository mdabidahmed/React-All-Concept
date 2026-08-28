import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Navbar } from "../../organisms/Navbar/Navbar";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { CommandPalette } from "../../organisms/CommandPalette/CommandPalette";
import { ProgressProvider } from "../../organisms/ProgressProvider/ProgressProvider";
import { useTheme } from "../../../hooks/useTheme";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import styles from "./MainLayout.module.css";

export function MainLayout() {
  const { subject } = useParams<{ subject: string }>();
  const { theme, setTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage("rac:sidebar-collapsed", false);
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
      } else if (e.key === "Escape" && mobileNavOpen) {
        setMobileNavOpen(false);
        document.getElementById("mobile-menu-trigger")?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  return (
    <ProgressProvider subject={subject}>
      <div className={styles.shell}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar
          theme={theme}
          onThemeChange={setTheme}
          onOpenSearch={() => setPaletteOpen(true)}
          onToggleSidebar={() => setMobileNavOpen((open) => !open)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebarCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)}
        />
        <div className={styles.body}>
          <Sidebar
            mobileOpen={mobileNavOpen}
            onCloseMobile={() => setMobileNavOpen(false)}
            collapsed={sidebarCollapsed}
          />
          <main id="main-content" tabIndex={-1} className={styles.content}>
            <Outlet />
          </main>
        </div>
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </ProgressProvider>
  );
}
