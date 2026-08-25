import styles from "./Diagram.module.css";

export function ReactTransitionsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 220"
        role="img"
        aria-label="Diagram contrasting plain conditional rendering, where an element is removed instantly with no time to animate, against a delayed unmount: trigger removal, toggle the CSS class, let the transition play, then remove the element from the DOM after the delay."
      >
        <text x="360" y="18" textAnchor="middle" className={styles.caption}>Plain conditional render — no transition</text>
        <line x1="40" y1="55" x2="380" y2="55" className={styles.arrow} />
        <circle cx="100" cy="55" r="8" className={styles.node} />
        <text x="100" y="83" textAnchor="middle" className={styles.label}>Trigger unmount</text>
        <text x="100" y="99" textAnchor="middle" className={styles.sublabel}>isOpen becomes false</text>
        <circle cx="340" cy="55" r="8" className={styles.nodeAccent} />
        <text x="340" y="83" textAnchor="middle" className={styles.label}>Removed instantly</text>
        <text x="340" y="99" textAnchor="middle" className={styles.sublabel}>no time to animate</text>

        <text x="360" y="124" textAnchor="middle" className={styles.caption}>Delayed unmount — the fix</text>
        <line x1="40" y1="160" x2="650" y2="160" className={styles.arrow} />
        <circle cx="100" cy="160" r="8" className={styles.node} />
        <text x="100" y="188" textAnchor="middle" className={styles.label}>Trigger unmount</text>
        <text x="100" y="204" textAnchor="middle" className={styles.sublabel}>isOpen becomes false</text>
        <circle cx="280" cy="160" r="8" className={styles.nodeAccent} />
        <text x="280" y="188" textAnchor="middle" className={styles.label}>Class toggles</text>
        <text x="280" y="204" textAnchor="middle" className={styles.sublabel}>opacity 1 → 0</text>
        <circle cx="460" cy="160" r="8" className={styles.node} />
        <text x="460" y="188" textAnchor="middle" className={styles.label}>Transition plays</text>
        <text x="460" y="204" textAnchor="middle" className={styles.sublabel}>duration elapses</text>
        <circle cx="640" cy="160" r="8" className={styles.nodeAccent} />
        <text x="640" y="188" textAnchor="middle" className={styles.label}>Unmount</text>
        <text x="640" y="204" textAnchor="middle" className={styles.sublabel}>removed after delay</text>
      </svg>
    </div>
  );
}
