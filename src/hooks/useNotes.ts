import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { NoteKey, NotesRecord } from "../types";

const NOTES_STORAGE_KEY = "rac:notes";

function makeKey(topicId: string, exampleId: string): NoteKey {
  return `${topicId}::${exampleId}`;
}

/**
 * CRUD access to per-example notes, all persisted under a single
 * localStorage record keyed by "topicId::exampleId".
 */
export function useNotes() {
  const [notes, setNotes] = useLocalStorage<NotesRecord>(NOTES_STORAGE_KEY, {});

  const getNote = useCallback(
    (topicId: string, exampleId: string) => notes[makeKey(topicId, exampleId)]?.text ?? "",
    [notes],
  );

  const saveNote = useCallback(
    (topicId: string, exampleId: string, text: string) => {
      const key = makeKey(topicId, exampleId);
      setNotes((prev) => {
        if (!text.trim()) {
          const { [key]: _removed, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [key]: { topicId, exampleId, text, updatedAt: new Date().toISOString() },
        };
      });
    },
    [setNotes],
  );

  const hasNote = useCallback(
    (topicId: string, exampleId: string) => Boolean(notes[makeKey(topicId, exampleId)]?.text.trim()),
    [notes],
  );

  return { getNote, saveNote, hasNote };
}
