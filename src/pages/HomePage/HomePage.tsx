import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { topics, categories } from "../../data/topics";
import { Badge } from "../../components/atoms/Badge/Badge";
import { ProgressBar } from "../../components/atoms/ProgressBar/ProgressBar";
import { useProgress } from "../../hooks/useProgress";
import styles from "./HomePage.module.css";

const totalExamples = topics.reduce((sum, topic) => sum + topic.examples.length, 0);

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isComplete, completedCount, total, percent } = useProgress();

  const filteredTopics = useMemo(
    () => (activeCategory ? topics.filter((t) => t.category === activeCategory) : topics),
    [activeCategory],
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>43 topics · {totalExamples} runnable examples</span>
        <h1 className={styles.heroTitle}>
          Learn <span className={styles.heroAccent}>React</span>, one concept at a time
        </h1>
        <p className={styles.heroSubtitle}>
          Pick a topic to see a short or long explanation, five runnable examples you can edit
          and re-run, and space to jot down your own notes — saved locally in your browser.
        </p>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statLabel}>Topics</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{totalExamples}</span>
            <span className={styles.statLabel}>Examples</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{categories.length}</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={[styles.statCard, styles.progressCard].join(" ")}>
            <div className={styles.progressCardTop}>
              <span className={styles.statValue}>{percent}%</span>
              <span className={styles.progressCardCount}>
                {completedCount}/{total} done
              </span>
            </div>
            <ProgressBar percent={percent} label="Overall progress" />
          </div>
        </div>
      </header>

      <div className={styles.filterRow} role="group" aria-label="Filter by category">
        <button
          type="button"
          className={[styles.chip, activeCategory === null ? styles.chipActive : ""].join(" ")}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={[styles.chip, activeCategory === category ? styles.chipActive : ""].join(" ")}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredTopics.map((topic, index) => {
          const complete = isComplete(topic.id);
          return (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className={styles.card}
              style={{ animationDelay: `${Math.min(index, 12) * 25}ms` }}
            >
              {complete && (
                <span className={styles.completeBadge} aria-label="Completed">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              )}
              <Badge tone="accent">{topic.category}</Badge>
              <h2 className={styles.cardTitle}>{topic.title}</h2>
              <p className={styles.cardDescription}>{topic.shortExplanation}</p>
              <span className={styles.cardMeta}>{topic.examples.length} examples</span>
            </Link>
          );
        })}
        {filteredTopics.length === 0 && (
          <p className={styles.empty}>No topics in this category yet.</p>
        )}
      </div>
    </div>
  );
}
