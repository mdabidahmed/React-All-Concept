import { Badge } from "../../atoms/Badge/Badge";
import { Button } from "../../atoms/Button/Button";
import { RichText } from "../../atoms/RichText/RichText";
import { ModeToggle } from "../../molecules/ModeToggle/ModeToggle";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useProgress } from "../../../hooks/useProgress";
import { useToast } from "../../../hooks/useToast";
import type { Topic } from "../../../types";
import styles from "./ExplanationPanel.module.css";

interface ExplanationPanelProps {
  topic: Topic;
}

export function ExplanationPanel({ topic }: ExplanationPanelProps) {
  const [mode, setMode] = useLocalStorage<"short" | "long">(
    `rac:mode:${topic.id}`,
    "short",
  );
  const { isComplete, toggleComplete } = useProgress();
  const { showToast } = useToast();
  const complete = isComplete(topic.id);
  const Diagram = topic.diagram;

  function handleToggleComplete() {
    toggleComplete(topic.id);
    showToast(complete ? "Marked as not started" : "Nice work — topic completed!", "success");
  }

  return (
    <section className={styles.panel} aria-label="Explanation">
      <div className={styles.header}>
        <div className={styles.headings}>
          <div className={styles.badgeRow}>
            <Badge tone="accent" className={styles.headerBadge}>
              {topic.category}
            </Badge>
            {complete && (
              <Badge tone="success" className={styles.headerBadge}>
                Completed
              </Badge>
            )}
          </div>
          <h1 className={styles.title}>{topic.title}</h1>
        </div>
        <div className={styles.headerActions}>
          <ModeToggle mode={mode} onChange={setMode} />
          <Button
            size="sm"
            variant={complete ? "secondary" : "primary"}
            onClick={handleToggleComplete}
            aria-pressed={complete}
            className={styles.completeButton}
          >
            {complete ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Completed
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Mark as complete
              </>
            )}
          </Button>
        </div>
      </div>
      <RichText
        className={styles.explanation}
        text={mode === "short" ? topic.shortExplanation : topic.longExplanation}
      />
      {Diagram && <Diagram />}
    </section>
  );
}
