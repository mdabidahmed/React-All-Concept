import styles from "./QuizTimerRing.module.css";

interface QuizTimerRingProps {
  secondsLeft: number;
  totalSeconds: number;
}

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular per-question countdown, turning urgent (red, pulsing) under 10 seconds. */
export function QuizTimerRing({ secondsLeft, totalSeconds }: QuizTimerRingProps) {
  const clamped = Math.max(0, secondsLeft);
  const fraction = clamped / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - fraction);
  const urgent = clamped <= 10;

  return (
    <div
      className={[styles.ring, urgent ? styles.urgent : ""].join(" ")}
      role="timer"
      aria-label={`${clamped} seconds left`}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle className={styles.track} cx="20" cy="20" r={RADIUS} />
        <circle
          className={styles.fill}
          cx="20"
          cy="20"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className={styles.value}>{clamped}</span>
    </div>
  );
}
