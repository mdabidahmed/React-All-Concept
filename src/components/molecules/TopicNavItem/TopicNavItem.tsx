import { NavLink } from "react-router-dom";
import type { Topic } from "../../../types";
import styles from "./TopicNavItem.module.css";

interface TopicNavItemProps {
  topic: Topic;
  completed?: boolean;
  onNavigate?: () => void;
}

export function TopicNavItem({ topic, completed, onNavigate }: TopicNavItemProps) {
  return (
    <NavLink
      to={`/topics/${topic.id}`}
      onClick={onNavigate}
      className={({ isActive }) => [styles.item, isActive ? styles.active : ""].join(" ")}
    >
      {completed ? (
        <svg
          className={styles.check}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-label="Completed"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <span className={styles.dot} aria-hidden="true" />
      )}
      <span className={styles.title}>{topic.title}</span>
    </NavLink>
  );
}
