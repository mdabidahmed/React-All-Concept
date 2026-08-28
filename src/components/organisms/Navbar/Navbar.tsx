import type { MouseEvent } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { ThemeToggle } from "../../molecules/ThemeToggle/ThemeToggle";
import { ProgressMenu } from "../../molecules/ProgressMenu/ProgressMenu";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { useConfirm } from "../../../hooks/useConfirm";
import { useQuizSession } from "../../../hooks/useQuizSession";
import { getSubjectById } from "../../../data/subjects";
import type { Theme } from "../../../hooks/useTheme";
import styles from "./Navbar.module.css";

interface NavbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
}

export function Navbar({
  theme,
  onThemeChange,
  onOpenSearch,
  onToggleSidebar,
  sidebarCollapsed,
  onToggleSidebarCollapse,
}: NavbarProps) {
  const { subject } = useParams<{ subject: string }>();
  const subjectMeta = getSubjectById(subject);
  const navigate = useNavigate();
  const { inProgress, endActiveTest } = useQuizSession();
  const confirm = useConfirm();

  async function handleQuizNavClick(e: MouseEvent) {
    if (!inProgress) return;
    e.preventDefault();
    const confirmed = await confirm({
      title: "Quiz in progress",
      message: "End the current test before leaving? Unanswered questions will count as incorrect.",
      confirmLabel: "End test",
    });
    if (!confirmed) return;
    endActiveTest();
    navigate(`/${subject}/quiz`);
  }

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
        <Link to="/" className={styles.allSubjects} aria-label="All subjects">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </Link>
        <Link to={`/${subject}`} className={styles.brand}>
          <span className={styles.logo}>⚛</span>
          <span className={styles.brandText}>{subjectMeta?.name ?? "Learn"} Concepts</span>
        </Link>
        <IconButton
          label={sidebarCollapsed ? "Expand topics sidebar" : "Collapse topics sidebar"}
          className={styles.sidebarToggle}
          onClick={onToggleSidebarCollapse}
          aria-pressed={sidebarCollapsed}
        >
          <svg
            className={sidebarCollapsed ? styles.sidebarToggleIconCollapsed : ""}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M11 6l-6 6 6 6" />
            <path d="M18 6l-6 6 6 6" />
          </svg>
        </IconButton>
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
        <NavLink
          to={`/${subject}/quiz`}
          onClick={handleQuizNavClick}
          className={({ isActive }) =>
            [styles.quizLink, isActive ? styles.quizLinkActive : ""].join(" ")
          }
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 15a5 5 0 0 0 5-5V4H7v6a5 5 0 0 0 5 5Z" />
            <path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4M12 15v3m-3 3h6" />
          </svg>
          <span className={styles.quizText}>Quiz</span>
        </NavLink>
        <ProgressMenu />
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
