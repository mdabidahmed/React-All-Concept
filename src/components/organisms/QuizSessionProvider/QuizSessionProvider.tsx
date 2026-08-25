import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { QuizSessionContext } from "../../../context/QuizSessionContext";

export function QuizSessionProvider({ children }: { children: ReactNode }) {
  const [inProgress, setInProgress] = useState(false);
  const endTestRef = useRef<(() => void) | null>(null);

  const registerActiveTest = useCallback((endTest: (() => void) | null) => {
    endTestRef.current = endTest;
    setInProgress(endTest !== null);
  }, []);

  const endActiveTest = useCallback(() => {
    endTestRef.current?.();
  }, []);

  const value = useMemo(
    () => ({ inProgress, endActiveTest, registerActiveTest }),
    [inProgress, endActiveTest, registerActiveTest],
  );

  return <QuizSessionContext.Provider value={value}>{children}</QuizSessionContext.Provider>;
}
