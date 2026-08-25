import { NavLink } from "react-router-dom";
import type { Topic } from "../../../types";
import styles from "./TopicNavItem.module.css";

interface TopicNavItemProps {
  topic: Topic;
}

export function TopicNavItem({ topic }: TopicNavItemProps) {
  return (
    <NavLink
      to={`/topics/${topic.id}`}
      className={({ isActive }) => [styles.item, isActive ? styles.active : ""].join(" ")}
    >
      <span className={styles.title}>{topic.title}</span>
      <span className={styles.count}>{topic.examples.length}</span>
    </NavLink>
  );
}
