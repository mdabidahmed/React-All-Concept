import { useCallback, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ProgressContext } from "../../../context/ProgressContext";
import { topics } from "../../../data/topics";

const STORAGE_KEY = "rac:completed-topics";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useLocalStorage<string[]>(STORAGE_KEY, []);
  const completedSet = useMemo(() => new Set(completed), [completed]);

  const isComplete = useCallback((topicId: string) => completedSet.has(topicId), [completedSet]);

  const toggleComplete = useCallback(
    (topicId: string) => {
      setCompleted((prev) =>
        prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId],
      );
    },
    [setCompleted],
  );

  const total = topics.length;
  const completedCount = completedSet.size;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <ProgressContext.Provider
      value={{ isComplete, toggleComplete, completedCount, total, percent }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
