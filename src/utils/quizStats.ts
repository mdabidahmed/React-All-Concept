import type { QuizAttempt } from "../types/quiz";
import type { QuizPeriod } from "../hooks/useQuizHistory";

export interface QuizBucket {
  label: string;
  count: number;
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Buckets attempts into a short recent timeline for the dashboard sparkline. */
export function bucketizeAttempts(attempts: QuizAttempt[], period: QuizPeriod): QuizBucket[] {
  const now = new Date();

  if (period === "day") {
    const buckets: QuizBucket[] = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(day.getDate() - i);
      const key = day.toDateString();
      const count = attempts.filter((a) => new Date(a.completedAt).toDateString() === key).length;
      buckets.push({ label: WEEKDAY_LABELS[day.getDay()], count });
    }
    return buckets;
  }

  if (period === "week") {
    const buckets: QuizBucket[] = [];
    for (let i = 5; i >= 0; i--) {
      const end = new Date(now);
      end.setDate(end.getDate() - i * 7);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      const startMs = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
      const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999).getTime();
      const count = attempts.filter((a) => {
        const t = new Date(a.completedAt).getTime();
        return t >= startMs && t <= endMs;
      }).length;
      buckets.push({ label: `W${6 - i}`, count });
    }
    return buckets;
  }

  const buckets: QuizBucket[] = [];
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const count = attempts.filter((a) => {
      const t = new Date(a.completedAt);
      return t.getFullYear() === month.getFullYear() && t.getMonth() === month.getMonth();
    }).length;
    buckets.push({ label: MONTH_LABELS[month.getMonth()], count });
  }
  return buckets;
}
