import { useContext } from "react";
import { QuizSessionContext } from "../context/QuizSessionContext";

/** Shared state tracking whether a quiz is actively being taken — see QuizSessionProvider. */
export function useQuizSession() {
  const ctx = useContext(QuizSessionContext);
  if (!ctx) throw new Error("useQuizSession must be used within a QuizSessionProvider");
  return ctx;
}
