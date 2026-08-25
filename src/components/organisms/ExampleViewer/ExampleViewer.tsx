import { lazy, Suspense, useState } from "react";
import { ExampleTabs } from "../../molecules/ExampleTabs/ExampleTabs";
import { NoteEditor } from "../../molecules/NoteEditor/NoteEditor";
import { Spinner } from "../../atoms/Spinner/Spinner";
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

export function ExampleViewer({ topic }: ExampleViewerProps) {
  const [activeId, setActiveId] = useState(topic.examples[0]?.id ?? "");
  const { getNote, saveNote, hasNote } = useNotes();

  const activeExample =
    topic.examples.find((example) => example.id === activeId) ?? topic.examples[0];

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

      <p className={styles.summary}>{activeExample.summary}</p>

      <Suspense fallback={<div className={styles.loading}><Spinner label="Loading code runner" /></div>}>
        <CodeRunner key={`${topic.id}:${activeExample.id}`} code={activeExample.code} />
      </Suspense>

      <div className={styles.noteSection}>
        <h3 className={styles.noteHeading}>Your note</h3>
        <NoteEditor
          value={getNote(topic.id, activeExample.id)}
          onSave={(text) => saveNote(topic.id, activeExample.id, text)}
        />
      </div>
    </section>
  );
}
