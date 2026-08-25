/** Explanation length the user can toggle between on a topic page. */
export type ExplanationMode = "short" | "long";

/** A single runnable code sample belonging to a topic. */
export interface Example {
  id: string;
  title: string;
  /** One-line summary shown in the example tab/list. */
  summary: string;
  /** JSX/TSX source rendered by the live code runner. Must expose a default-exported-like
   * component named `App` via react-live's `render(<App />)` convention. */
  code: string;
}

/** A learning topic, e.g. "useState", "Props & Composition". */
export interface Topic {
  id: string;
  title: string;
  category: string;
  shortExplanation: string;
  longExplanation: string;
  examples: Example[];
}

/** A user-authored note attached to one example within one topic. */
export interface Note {
  topicId: string;
  exampleId: string;
  text: string;
  updatedAt: string;
}

/** Key used to namespace a note inside the notes record. */
export type NoteKey = `${string}::${string}`;

export type NotesRecord = Record<NoteKey, Note>;
