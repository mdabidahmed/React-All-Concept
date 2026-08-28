import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicsForSubject, getCategoriesForSubject } from "../../../data/subjects";
import { SearchBox } from "../../molecules/SearchBox/SearchBox";
import { TopicNavItem } from "../../molecules/TopicNavItem/TopicNavItem";
import { useProgress } from "../../../hooks/useProgress";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  /** Desktop-only: collapses the sidebar to a hidden, zero-width state. */
  collapsed: boolean;
}

export function Sidebar({ mobileOpen, onCloseMobile, collapsed }: SidebarProps) {
  const { subject } = useParams<{ subject: string }>();
  const [query, setQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(() => new Set());
  const { isComplete } = useProgress();
  const isMobileViewport = useMediaQuery("(max-width: 900px)");
  // Off-canvas on mobile: when the drawer is closed, its links sit
  // translated off-screen but would still be reachable via Tab without
  // this — inert removes the whole subtree from the tab order until open.
  const isOffscreen = isMobileViewport && !mobileOpen;
  const isHidden = isOffscreen || (collapsed && !isMobileViewport);

  const topics = useMemo(() => getTopicsForSubject(subject), [subject]);
  const categories = useMemo(() => getCategoriesForSubject(subject), [subject]);

  const grouped = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    const filtered = lowerQuery
      ? topics.filter((t) => t.title.toLowerCase().includes(lowerQuery))
      : topics;

    return categories
      .map((category) => ({
        category,
        items: filtered.filter((t) => t.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [query, topics, categories]);

  function toggleCategory(category: string) {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <>
      {mobileOpen && <div className={styles.backdrop} onClick={onCloseMobile} />}
      <nav
        className={[
          styles.sidebar,
          mobileOpen ? styles.mobileOpen : "",
          collapsed ? styles.collapsed : "",
        ].join(" ")}
        aria-label="Topics"
        inert={isHidden}
      >
        <div className={styles.searchWrap}>
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <div className={styles.groups}>
          {grouped.length === 0 && (
            <p className={styles.empty} role="status" aria-live="polite">
              No topics match "{query}".
            </p>
          )}
          {grouped.map((group) => {
            const isCollapsed = collapsedCategories.has(group.category);
            return (
              <div key={group.category} className={styles.group}>
                <button
                  type="button"
                  className={styles.groupHeader}
                  onClick={() => toggleCategory(group.category)}
                  aria-expanded={!isCollapsed}
                >
                  <svg
                    className={[styles.chevron, isCollapsed ? styles.chevronCollapsed : ""].join(" ")}
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <h3 className={styles.groupTitle}>{group.category}</h3>
                </button>
                {!isCollapsed && (
                  <div className={styles.groupItems}>
                    {group.items.map((topic) => (
                      <TopicNavItem
                        key={topic.id}
                        subject={subject}
                        topic={topic}
                        completed={isComplete(topic.id)}
                        onNavigate={onCloseMobile}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
