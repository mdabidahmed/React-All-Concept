import styles from "./Diagram.module.css";

export function DebounceThrottleDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 200"
        role="img"
        aria-label="Diagram: a burst of rapid events. Debouncing waits for the events to stop and fires once after a pause. Throttling fires repeatedly at a fixed interval throughout the burst, regardless of how fast the events happen."
      >
        <text x="40" y="30" className={styles.sublabel}>Rapid events (typing, scrolling, clicking)</text>
        <line x1="40" y1="45" x2="680" y2="45" className={styles.arrow} />
        {[70, 95, 115, 135, 155, 175].map((x) => (
          <circle key={x} cx={x} cy="45" r="5" className={styles.node} />
        ))}

        <text x="40" y="90" className={styles.sublabel}>Debounce — fires once, after the events pause</text>
        <line x1="40" y1="105" x2="680" y2="105" className={styles.arrow} />
        <circle cx="235" cy="105" r="6" className={styles.nodeAccent} />
        <text x="235" y="128" textAnchor="middle" className={styles.caption}>fires here</text>

        <text x="40" y="152" className={styles.sublabel}>Throttle — fires on a fixed interval throughout</text>
        <line x1="40" y1="167" x2="680" y2="167" className={styles.arrow} />
        {[70, 130, 190, 250, 310].map((x) => (
          <circle key={x} cx={x} cy="167" r="6" className={styles.nodeAccent} />
        ))}
      </svg>
    </div>
  );
}
