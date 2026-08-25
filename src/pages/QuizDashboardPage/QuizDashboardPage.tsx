import { useState } from "react";
import { Link } from "react-router-dom";
import { quizCategoryMeta } from "../../data/quiz/categories";
import { getQuizQuestions } from "../../data/quiz";
import { useQuizHistory, type QuizPeriod } from "../../hooks/useQuizHistory";
import { bucketizeAttempts } from "../../utils/quizStats";
import { Badge } from "../../components/atoms/Badge/Badge";
import { QuizCategoryIcon } from "../../components/atoms/QuizCategoryIcon/QuizCategoryIcon";
import { QUIZ_PASS_PERCENT, QUIZ_SECONDS_PER_QUESTION } from "../../types/quiz";
import styles from "./QuizDashboardPage.module.css";

const PERIODS: { id: QuizPeriod; label: string }[] = [
  { id: "day", label: "Daily" },
  { id: "week", label: "Weekly" },
  { id: "month", label: "Monthly" },
];

const USER_NAME = "Md Abid Ahmed";

export function QuizDashboardPage() {
  const [period, setPeriod] = useState<QuizPeriod>("day");
  const { attempts, bestByCategory, statsFor, streak, overall } = useQuizHistory();

  const periodStats = statsFor(period);
  const buckets = bucketizeAttempts(attempts, period);
  const maxBucket = Math.max(1, ...buckets.map((b) => b.count));
  const hasActivity = buckets.some((b) => b.count > 0);
  const initials = USER_NAME.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.identity}>
          <span className={styles.avatar} aria-hidden="true">
            {initials}
          </span>
          <div>
            <p className={styles.eyebrow}>Quiz dashboard</p>
            <h1 className={styles.title}>Welcome back, {USER_NAME}</h1>
          </div>
        </div>
        <p className={styles.subtitle}>
          Test your React knowledge across {quizCategoryMeta.length} categories. Score{" "}
          {QUIZ_PASS_PERCENT}% or higher to pass — track your streak and keep improving.
        </p>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{overall.total}</span>
          <span className={styles.statLabel}>Quizzes taken</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{overall.passed}</span>
          <span className={styles.statLabel}>Passed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{overall.avgPercent}%</span>
          <span className={styles.statLabel}>Average score</span>
        </div>
        <div className={[styles.statCard, styles.streakCard].join(" ")}>
          <span className={styles.statValue}>{streak}</span>
          <span className={styles.statLabel}>Day streak</span>
        </div>
      </div>

      <div className={styles.activityCard}>
        <div className={styles.activityHeader}>
          <h2 className={styles.sectionTitle}>Activity</h2>
          <div className={styles.periodSwitch} role="tablist" aria-label="Activity period">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={period === p.id}
                className={[styles.periodOption, period === p.id ? styles.periodSelected : ""].join(" ")}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.activityStats}>
          <span>
            {periodStats.count} attempt{periodStats.count === 1 ? "" : "s"}
          </span>
          <span>{periodStats.passCount} passed</span>
          <span>{periodStats.avgPercent}% avg</span>
        </div>

        {hasActivity ? (
          <div className={styles.sparkline}>
            {buckets.map((bucket, i) => (
              <div key={`${bucket.label}-${i}`} className={styles.sparkBar}>
                <div
                  className={styles.sparkTrack}
                  title={`${bucket.count} quiz${bucket.count === 1 ? "" : "zes"}`}
                >
                  {bucket.count > 0 && (
                    <div
                      className={styles.sparkFill}
                      style={{ height: `${Math.max(10, (bucket.count / maxBucket) * 100)}%` }}
                    />
                  )}
                </div>
                <span className={styles.sparkLabel}>{bucket.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.sparklineEmpty}>
            <p>No quizzes yet in this period — start one below to begin your streak.</p>
          </div>
        )}
      </div>

      <div className={styles.categoryGrid}>
        {quizCategoryMeta.map((category) => {
          const questionCount = getQuizQuestions(category.id).length;
          const best = bestByCategory.get(category.id);
          const minutes = Math.max(1, Math.round((questionCount * QUIZ_SECONDS_PER_QUESTION) / 60));
          return (
            <div key={category.id} className={styles.categoryCard}>
              <div className={styles.categoryTop}>
                <span className={styles.categoryIcon} aria-hidden="true">
                  <QuizCategoryIcon categoryId={category.id} />
                </span>
                {best && <Badge tone={best.passed ? "success" : "neutral"}>{best.percent}% best</Badge>}
              </div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
              <div className={styles.categoryMeta}>
                <span>{questionCount} questions</span>
                <span>~{minutes} min</span>
              </div>
              <Link to={`/quiz/${category.id}`} className={styles.startButton}>
                {best ? "Retake quiz" : "Start quiz"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
