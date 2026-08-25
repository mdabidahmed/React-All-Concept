import { Link } from "react-router-dom";
import type { Topic } from "../../../types";
import styles from "./TopicFooterNav.module.css";

interface TopicFooterNavProps {
  previous: Topic | null;
  next: Topic | null;
}

export function TopicFooterNav({ previous, next }: TopicFooterNavProps) {
  return (
    <nav className={styles.footer} aria-label="Topic navigation">
      {previous ? (
        <Link to={`/topics/${previous.id}`} className={[styles.navLink, styles.prev].join(" ")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className={styles.navText}>
            <span className={styles.navLabel}>Previous</span>
            <span className={styles.navTitle}>{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span className={styles.spacer} />
      )}

      <Link to="/" className={styles.allTopics}>
        All topics
      </Link>

      {next ? (
        <Link to={`/topics/${next.id}`} className={[styles.navLink, styles.next].join(" ")}>
          <svg className={styles.sparkle} width="46" height="46" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.4 4.2L18 8l-4.6 1.8L12 14l-1.4-4.2L6 8l4.6-1.8L12 2z" />
          </svg>
          <span className={styles.navText}>
            <span className={styles.navLabel}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l1.4 4.2L18 8l-4.6 1.8L12 14l-1.4-4.2L6 8l4.6-1.8L12 2z" />
              </svg>
              Nice work — up next
            </span>
            <span className={styles.navTitle}>{next.title}</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span className={styles.spacer} />
      )}
    </nav>
  );
}
