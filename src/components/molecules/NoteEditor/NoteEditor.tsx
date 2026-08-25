import { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { TextArea } from "../../atoms/TextArea/TextArea";
import styles from "./NoteEditor.module.css";

interface NoteEditorProps {
  value: string;
  onSave: (text: string) => void;
}

/**
 * Displays a saved note with an Edit affordance, or an editable textarea
 * with Save/Cancel while editing. Draft text is local until Save commits it.
 */
export function NoteEditor({ value, onSave }: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [justSaved, setJustSaved] = useState(false);

  function startEditing() {
    setDraft(value);
    setIsEditing(true);
  }

  function cancel() {
    setDraft(value);
    setIsEditing(false);
  }

  function save() {
    onSave(draft.trim());
    setIsEditing(false);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 1800);
  }

  if (isEditing) {
    return (
      <div className={styles.wrapper}>
        <TextArea
          autoFocus
          value={draft}
          placeholder="Write a note for this example — a gotcha, a reminder, your own summary..."
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className={styles.actions}>
          <Button size="sm" variant="primary" onClick={save}>
            Save note
          </Button>
          <Button size="sm" variant="ghost" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {value ? (
        <p className={styles.noteText}>{value}</p>
      ) : (
        <p className={styles.placeholder}>No note yet for this example.</p>
      )}
      <div className={styles.actions}>
        <Button size="sm" variant="secondary" onClick={startEditing}>
          {value ? "Edit note" : "Add note"}
        </Button>
        {justSaved && <span className={styles.savedTag}>Saved</span>}
      </div>
    </div>
  );
}
