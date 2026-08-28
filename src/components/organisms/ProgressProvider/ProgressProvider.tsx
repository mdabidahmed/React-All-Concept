import { useCallback, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ProgressContext } from "../../../context/ProgressContext";
import { getTopicsForSubject } from "../../../data/subjects";

interface ProgressProviderProps {
  subject: string | undefined;
  children: ReactNode;
}

export function ProgressProvider({ subject, children }: ProgressProviderProps) {
  const storageKey = `rac:completed-topics:${subject ?? "unknown"}`;
  const [completed, setCompleted] = useLocalStorage<string[]>(storageKey, []);
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

  const total = getTopicsForSubject(subject).length;
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
