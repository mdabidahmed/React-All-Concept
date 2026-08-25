import type { Example } from "../../../types";
import styles from "./ExampleTabs.module.css";

interface ExampleTabsProps {
  examples: Example[];
  activeId: string;
  onSelect: (id: string) => void;
  hasNote: (exampleId: string) => boolean;
}

/** Lets the user switch between a topic's (up to 5) examples. */
export function ExampleTabs({ examples, activeId, onSelect, hasNote }: ExampleTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Examples">
      {examples.map((example, index) => {
        const selected = example.id === activeId;
        return (
          <button
            key={example.id}
            role="tab"
            aria-selected={selected}
            className={[styles.tab, selected ? styles.selected : ""].join(" ")}
            onClick={() => onSelect(example.id)}
          >
            <span className={styles.index}>{index + 1}</span>
            <span className={styles.label}>{example.title}</span>
            {hasNote(example.id) && (
              <span className={styles.noteDot} title="Has a saved note" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}
