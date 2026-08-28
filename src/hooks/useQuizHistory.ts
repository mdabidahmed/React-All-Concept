import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import type { QuizAttempt } from "../types/quiz";

export type QuizPeriod = "day" | "week" | "month";

const DAY_MS = 24 * 60 * 60 * 1000;
const PERIOD_MS: Record<QuizPeriod, number> = {
  day: DAY_MS,
  week: DAY_MS * 7,
  month: DAY_MS * 30,
};

function withinMs(iso: string, ms: number): boolean {
  return Date.now() - new Date(iso).getTime() <= ms;
}

/** Local, persisted history of completed quiz attempts, plus derived stats for the dashboard. */
export function useQuizHistory() {
  const { subject } = useParams<{ subject: string }>();
  const storageKey = `rac:quiz-attempts:${subject ?? "unknown"}`;
  const [attempts, setAttempts] = useLocalStorage<QuizAttempt[]>(storageKey, []);

  const recordAttempt = useCallback(
    (attempt: Omit<QuizAttempt, "id">): QuizAttempt => {
      const withId: QuizAttempt = {
        ...attempt,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      };
      setAttempts((prev) => [...prev, withId]);
      return withId;
    },
    [setAttempts],
  );

  const bestByCategory = useMemo(() => {
    const map = new Map<string, QuizAttempt>();
    for (const attempt of attempts) {
      const current = map.get(attempt.categoryId);
      if (!current || attempt.percent > current.percent) map.set(attempt.categoryId, attempt);
    }
    return map;
  }, [attempts]);

  const statsFor = useCallback(
    (period: QuizPeriod) => {
      const inWindow = attempts.filter((a) => withinMs(a.completedAt, PERIOD_MS[period]));
      const count = inWindow.length;
      const passCount = inWindow.filter((a) => a.passed).length;
      const avgPercent =
        count === 0 ? 0 : Math.round(inWindow.reduce((sum, a) => sum + a.percent, 0) / count);
      return { count, passCount, avgPercent };
    },
    [attempts],
  );

  const streak = useMemo(() => {
    if (attempts.length === 0) return 0;
    const days = new Set(attempts.map((a) => new Date(a.completedAt).toDateString()));
    let count = 0;
    const cursor = new Date();
    while (days.has(cursor.toDateString())) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [attempts]);

  const overall = useMemo(() => {
    const total = attempts.length;
    const passed = attempts.filter((a) => a.passed).length;
    const avgPercent =
      total === 0 ? 0 : Math.round(attempts.reduce((sum, a) => sum + a.percent, 0) / total);
    return { total, passed, avgPercent };
  }, [attempts]);

  return { attempts, recordAttempt, bestByCategory, statsFor, streak, overall };
}
