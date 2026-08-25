import styles from "./Diagram.module.css";

export function UseEffectDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 760 150"
        role="img"
        aria-label="Timeline diagram: render, then paint, then the effect runs. When a dependency changes, React runs cleanup and then re-runs the effect."
      >
        <defs>
          <marker id="ue-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <line x1="40" y1="80" x2="680" y2="80" className={styles.arrow} />

        <circle cx="80" cy="80" r="8" className={styles.node} />
        <text x="80" y="108" textAnchor="middle" className={styles.label}>Render</text>
        <text x="80" y="124" textAnchor="middle" className={styles.sublabel}>component runs</text>

        <circle cx="230" cy="80" r="8" className={styles.node} />
        <text x="230" y="108" textAnchor="middle" className={styles.label}>Paint</text>
        <text x="230" y="124" textAnchor="middle" className={styles.sublabel}>screen updates</text>

        <circle cx="380" cy="80" r="8" className={styles.nodeAccent} />
        <text x="380" y="108" textAnchor="middle" className={styles.label}>Effect runs</text>
        <text x="380" y="124" textAnchor="middle" className={styles.sublabel}>after paint</text>

        <circle cx="530" cy="80" r="8" className={styles.node} />
        <text x="530" y="108" textAnchor="middle" className={styles.label}>Deps change</text>
        <text x="530" y="124" textAnchor="middle" className={styles.sublabel}>next render</text>

        <circle cx="680" cy="80" r="8" className={styles.nodeAccent} />
        <text x="680" y="108" textAnchor="middle" className={styles.label}>Cleanup</text>
        <text x="680" y="124" textAnchor="middle" className={styles.sublabel}>then re-run</text>

        <path d="M680 72 C 680 25, 380 25, 380 72" className={styles.arrowAccent} markerEnd="url(#ue-arrow-accent)" />
        <text x="530" y="16" textAnchor="middle" className={styles.caption}>deps change → rerun effect</text>
      </svg>
    </div>
  );
}
