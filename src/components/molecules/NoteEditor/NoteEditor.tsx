import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { formatRelativeTime } from "../../../utils/time";
import styles from "./NoteEditor.module.css";

interface NoteEditorProps {
  value: string;
  updatedAt: string | null;
  onSave: (text: string) => void;
}

const MAX_LENGTH = 2000;

function NoteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M14 4v5h5M8 13h8M8 17h5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

/**
 * Displays a saved note with an Edit affordance, or an editable
 * auto-growing textarea with Save/Cancel while editing. Draft text is
 * local until Save commits it.
 */
export function NoteEditor({ value, updatedAt, onSave }: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [justSaved, setJustSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el || !isEditing) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 96)}px`;
  }, [draft, isEditing]);

  useEffect(() => {
    if (!justSaved) return;
    const id = window.setTimeout(() => setJustSaved(false), 2200);
    return () => window.clearTimeout(id);
  }, [justSaved]);

  function startEditing() {
    setDraft(value);
    setIsEditing(true);
    setJustSaved(false);
  }

  function cancel() {
    setDraft(value);
    setIsEditing(false);
  }

  function save() {
    onSave(draft.trim());
    setIsEditing(false);
    setJustSaved(true);
  }

  const isEmpty = !value;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>
          <NoteIcon />
          Your note
        </span>
        <span className={styles.headerStatus} role="status" aria-live="polite">
          {justSaved ? (
            <span className={styles.savedTag}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Saved
            </span>
          ) : (
            !isEditing &&
            !isEmpty &&
            updatedAt && <span className={styles.timestamp}>Updated {formatRelativeTime(updatedAt)}</span>
          )}
        </span>
      </div>

      {isEditing ? (
        <div className={styles.editArea}>
          <TextArea
            ref={textareaRef}
            autoFocus
            value={draft}
            maxLength={MAX_LENGTH}
            aria-label="Note for this example"
            placeholder="Write a note — a gotcha, a reminder, your own summary..."
            className={styles.textarea}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
            }}
          />
          <div className={styles.editFooter}>
            <span className={styles.charCount}>
              {draft.length}/{MAX_LENGTH}
            </span>
            <div className={styles.actions}>
              <Button size="sm" variant="ghost" onClick={cancel}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={save}>
                Save note
              </Button>
            </div>
          </div>
        </div>
      ) : isEmpty ? (
        <button type="button" className={styles.emptyState} onClick={startEditing}>
          <span className={styles.emptyIcon}>
            <NoteIcon />
          </span>
          <span className={styles.emptyText}>
            <strong>Add a note</strong> for this example
          </span>
        </button>
      ) : (
        <div className={styles.noteBlock}>
          <p className={styles.noteText}>{value}</p>
          <div className={styles.actions}>
            <Button size="sm" variant="secondary" onClick={startEditing}>
              <PencilIcon />
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
