import { Link } from "react-router-dom";
import { ThemeToggle } from "../../molecules/ThemeToggle/ThemeToggle";
import { IconButton } from "../../atoms/IconButton/IconButton";
import type { Theme } from "../../../hooks/useTheme";
import styles from "./Navbar.module.css";

interface NavbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
}

export function Navbar({ theme, onThemeChange, onOpenSearch, onToggleSidebar }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <IconButton
          id="mobile-menu-trigger"
          label="Toggle topics menu"
          className={styles.menuButton}
          onClick={onToggleSidebar}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </IconButton>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>⚛</span>
          <span className={styles.brandText}>React All Concepts</span>
        </Link>
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.searchTrigger} onClick={onOpenSearch}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className={styles.searchText}>Search topics</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </button>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
        <a
          className={styles.repoLink}
          href="https://github.com/mdabidahmed/react-all-concept"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
