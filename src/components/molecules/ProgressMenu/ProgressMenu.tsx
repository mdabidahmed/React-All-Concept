import { useEffect, useRef, useState } from "react";
import { useProgress } from "../../../hooks/useProgress";
import styles from "./ProgressMenu.module.css";

/** Navbar trigger + popover summarizing overall topic-completion progress. */
export function ProgressMenu() {
  const { completedCount, total, percent } = useProgress();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  const remaining = total - completedCount;
  const message =
    completedCount === 0
      ? "Complete a topic to start tracking your progress."
      : remaining === 0
        ? "You've completed every topic — nice work!"
        : `Keep going — ${remaining} topic${remaining === 1 ? "" : "s"} left.`;

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.ringWrap}>
          <svg className={styles.ring} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle className={styles.ringTrack} cx="10" cy="10" r={radius} />
            <circle
              className={styles.ringFill}
              cx="10"
              cy="10"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <svg
            className={styles.trophyIcon}
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            aria-hidden="true"
          >
            <path d="M8 21h8M12 17v4M7 4h10v3a5 5 0 0 1-10 0V4Z" />
            <path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4" />
          </svg>
        </span>
        <span className={styles.triggerText}>Your progress</span>
        <svg
          className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.arrow} aria-hidden="true" />
          <p className={styles.summary}>
            {completedCount} of {total} complete.
          </p>
          <p className={styles.message}>{message}</p>
        </div>
      )}
    </div>
  );
}
