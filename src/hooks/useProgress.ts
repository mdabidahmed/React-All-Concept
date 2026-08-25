import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

/** Shared topic-completion state — see ProgressProvider for the source of truth. */
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
