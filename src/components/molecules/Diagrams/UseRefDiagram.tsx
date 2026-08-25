import styles from "./Diagram.module.css";

export function UseRefDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 230"
        role="img"
        aria-label="Two parallel tracks from the same event. Top track: calling setState schedules a re-render, so the UI shows the new value. Bottom track: mutating ref.current stores the new value in place, but does not schedule a re-render, so the UI keeps showing the old value until something else triggers a render."
      >
        <defs>
          <marker id="urf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <text x="10" y="16" className={styles.caption}>setState → triggers a re-render</text>
        <line x1="50" y1="56" x2="650" y2="56" className={styles.arrow} markerEnd="url(#urf-arrow)" />
        <circle cx="90" cy="56" r="8" className={styles.node} />
        <text x="90" y="82" textAnchor="middle" className={styles.label}>Event</text>
        <text x="90" y="98" textAnchor="middle" className={styles.sublabel}>e.g. onClick</text>
        <circle cx="360" cy="56" r="8" className={styles.nodeAccent} />
        <text x="360" y="82" textAnchor="middle" className={styles.label}>setValue(v)</text>
        <text x="360" y="98" textAnchor="middle" className={styles.sublabel}>schedules an update</text>
        <circle cx="630" cy="56" r="8" className={styles.nodeAccent} />
        <text x="630" y="82" textAnchor="middle" className={styles.label}>Re-render</text>
        <text x="630" y="98" textAnchor="middle" className={styles.sublabel}>UI shows the new value</text>

        <text x="10" y="136" className={styles.caption}>ref.current = v → no re-render</text>
        <line x1="50" y1="176" x2="650" y2="176" className={styles.arrow} markerEnd="url(#urf-arrow)" />
        <circle cx="90" cy="176" r="8" className={styles.node} />
        <text x="90" y="202" textAnchor="middle" className={styles.label}>Event</text>
        <text x="90" y="218" textAnchor="middle" className={styles.sublabel}>e.g. onClick</text>
        <circle cx="360" cy="176" r="8" className={styles.node} />
        <text x="360" y="202" textAnchor="middle" className={styles.label}>ref.current = v</text>
        <text x="360" y="218" textAnchor="middle" className={styles.sublabel}>mutated in place</text>
        <circle cx="630" cy="176" r="8" className={styles.node} />
        <text x="630" y="202" textAnchor="middle" className={styles.label}>No re-render</text>
        <text x="630" y="218" textAnchor="middle" className={styles.sublabel}>UI still shows the old value</text>
      </svg>
    </div>
  );
}
