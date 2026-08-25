import { useMemo, useState } from "react";
import { topics, categories } from "../../../data/topics";
import { SearchBox } from "../../molecules/SearchBox/SearchBox";
import { TopicNavItem } from "../../molecules/TopicNavItem/TopicNavItem";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const [query, setQuery] = useState("");

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
  }, [query]);

  return (
    <nav className={styles.sidebar} aria-label="Topics">
      <SearchBox value={query} onChange={setQuery} />
      <div className={styles.groups}>
        {grouped.length === 0 && <p className={styles.empty}>No topics match "{query}".</p>}
        {grouped.map((group) => (
          <div key={group.category} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.category}</h3>
            <div className={styles.groupItems}>
              {group.items.map((topic) => (
                <TopicNavItem key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
