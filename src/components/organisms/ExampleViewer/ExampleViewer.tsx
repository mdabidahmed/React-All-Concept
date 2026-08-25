import { lazy, Suspense, useEffect, useState } from "react";
import { ExampleTabs } from "../../molecules/ExampleTabs/ExampleTabs";
import { NoteEditor } from "../../molecules/NoteEditor/NoteEditor";
import { useNotes } from "../../../hooks/useNotes";
import type { Topic } from "../../../types";
import styles from "./ExampleViewer.module.css";

// The live code sandbox pulls in a syntax highlighter + evaluator; split it
// into its own chunk so the initial app bundle stays small.
const CodeRunner = lazy(() =>
  import("../../molecules/CodeRunner/CodeRunner").then((m) => ({ default: m.CodeRunner })),
);

interface ExampleViewerProps {
  topic: Topic;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function ExampleViewer({ topic }: ExampleViewerProps) {
  const [activeId, setActiveId] = useState(topic.examples[0]?.id ?? "");
  const { getNote, saveNote, hasNote, getUpdatedAt } = useNotes();

  const activeIndex = Math.max(
    0,
    topic.examples.findIndex((example) => example.id === activeId),
  );
  const activeExample = topic.examples[activeIndex] ?? topic.examples[0];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;

      if (/^[1-5]$/.test(e.key)) {
        const index = Number(e.key) - 1;
        if (topic.examples[index]) setActiveId(topic.examples[index].id);
        return;
      }
      if (e.key === "ArrowRight") {
        const next = topic.examples[activeIndex + 1];
        if (next) setActiveId(next.id);
      } else if (e.key === "ArrowLeft") {
        const prev = topic.examples[activeIndex - 1];
        if (prev) setActiveId(prev.id);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [topic.examples, activeIndex]);

  if (!activeExample) return null;

  return (
    <section className={styles.viewer} aria-label="Examples">
      <div className={styles.tabsRow}>
        <h2 className={styles.heading}>Examples</h2>
        <ExampleTabs
          examples={topic.examples}
          activeId={activeExample.id}
          onSelect={setActiveId}
          hasNote={(exampleId) => hasNote(topic.id, exampleId)}
        />
      </div>

      <div className={styles.exampleBody} key={activeExample.id}>
        <div className={styles.summaryRow}>
          <p className={styles.summary}>{activeExample.summary}</p>
          <span className={styles.kbdHint}>
            <kbd>1</kbd>-<kbd>5</kbd> or <kbd>←</kbd><kbd>→</kbd> to switch
          </span>
        </div>

        <Suspense
          fallback={
            <div className={styles.loading}>
              <div className={styles.loadingToolbar}>
                <span className={styles.loadingBar} style={{ width: 90 }} />
              </div>
              <div className={styles.loadingBody}>
                <span className={styles.loadingBar} style={{ width: "70%" }} />
                <span className={styles.loadingBar} style={{ width: "45%" }} />
                <span className={styles.loadingBar} style={{ width: "85%" }} />
                <span className={styles.loadingBar} style={{ width: "30%" }} />
              </div>
            </div>
          }
        >
          <CodeRunner key={`${topic.id}:${activeExample.id}`} code={activeExample.code} />
        </Suspense>

        <NoteEditor
          value={getNote(topic.id, activeExample.id)}
          updatedAt={getUpdatedAt(topic.id, activeExample.id)}
          onSave={(text) => saveNote(topic.id, activeExample.id, text)}
        />
      </div>
    </section>
  );
}
