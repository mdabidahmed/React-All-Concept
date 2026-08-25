/** Whether a quiz question accepts exactly one answer, or one-or-more. */
export type QuizQuestionType = "single" | "multi";

/** A single quiz question. Always exactly 4 options. */
export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  /** Exactly 4 answer choices. */
  options: string[];
  /** 0-based indexes into `options`. Length 1 for "single", 2+ for "multi". */
  correctIndexes: number[];
  /** Shown on the result review after the quiz is submitted. */
  explanation: string;
}

export interface QuizCategoryMeta {
  id: string;
  title: string;
  description: string;
}

/** One completed quiz, persisted to localStorage for dashboard tracking. */
export interface QuizAttempt {
  id: string;
  categoryId: string;
  total: number;
  correct: number;
  percent: number;
  passed: boolean;
  /** ISO timestamp of completion. */
  completedAt: string;
  durationSec: number;
}

export const QUIZ_PASS_PERCENT = 85;
export const QUIZ_SECONDS_PER_QUESTION = 30;
