import { createContext } from "react";

export interface ProgressContextValue {
  isComplete: (topicId: string) => boolean;
  toggleComplete: (topicId: string) => void;
  completedCount: number;
  total: number;
  percent: number;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);
