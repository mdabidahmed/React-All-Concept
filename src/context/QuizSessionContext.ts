import { createContext } from "react";

export interface QuizSessionContextValue {
  /** True while a quiz question is actively being answered (not the intro/result screens). */
  inProgress: boolean;
  /** Ends the current attempt early (unanswered questions count as incorrect) and records it. No-op if nothing is in progress. */
  endActiveTest: () => void;
  /** Called by the active quiz screen to register/unregister itself. Not for general use. */
  registerActiveTest: (endTest: (() => void) | null) => void;
}

export const QuizSessionContext = createContext<QuizSessionContextValue | null>(null);
