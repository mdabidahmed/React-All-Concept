import { Link } from "react-router-dom";
import { topics } from "../../data/topics";
import { Badge } from "../../components/atoms/Badge/Badge";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>React, one concept at a time</h1>
        <p>
          Pick a topic to see a short or long explanation, five runnable examples you can edit
          and re-run, and space to jot down your own notes — saved locally in your browser.
        </p>
      </header>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className={styles.card}>
            <Badge tone="accent">{topic.category}</Badge>
            <h2 className={styles.cardTitle}>{topic.title}</h2>
            <p className={styles.cardDescription}>{topic.shortExplanation}</p>
            <span className={styles.cardMeta}>{topic.examples.length} examples</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
