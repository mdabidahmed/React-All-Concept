import { Badge } from "../../atoms/Badge/Badge";
import { ModeToggle } from "../../molecules/ModeToggle/ModeToggle";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
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

  return (
    <section className={styles.panel} aria-label="Explanation">
      <div className={styles.header}>
        <div className={styles.headings}>
          <Badge tone="accent">{topic.category}</Badge>
          <h1 className={styles.title}>{topic.title}</h1>
        </div>
        <ModeToggle mode={mode} onChange={setMode} />
      </div>
      <p className={styles.explanation}>
        {mode === "short" ? topic.shortExplanation : topic.longExplanation}
      </p>
    </section>
  );
}
