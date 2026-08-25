import styles from "./Diagram.module.css";

export function ReactSuspenseDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 760 150"
        role="img"
        aria-label="Timeline diagram: the component renders and throws a pending promise, Suspense shows the fallback, the promise resolves, and Suspense retries rendering to reveal the real content. A retry re-creates the resource, causing the boundary to suspend again."
      >
        <defs>
          <marker id="rs-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <line x1="40" y1="80" x2="720" y2="80" className={styles.arrow} />

        <circle cx="80" cy="80" r="8" className={styles.node} />
        <text x="80" y="108" textAnchor="middle" className={styles.label}>Render</text>
        <text x="80" y="124" textAnchor="middle" className={styles.sublabel}>needs async data</text>

        <circle cx="230" cy="80" r="8" className={styles.nodeAccent} />
        <text x="230" y="108" textAnchor="middle" className={styles.label}>Throws promise</text>
        <text x="230" y="124" textAnchor="middle" className={styles.sublabel}>signals not ready</text>

        <circle cx="380" cy="80" r="8" className={styles.node} />
        <text x="380" y="108" textAnchor="middle" className={styles.label}>Fallback shown</text>
        <text x="380" y="124" textAnchor="middle" className={styles.sublabel}>Suspense renders it</text>

        <circle cx="530" cy="80" r="8" className={styles.node} />
        <text x="530" y="108" textAnchor="middle" className={styles.label}>Promise resolves</text>
        <text x="530" y="124" textAnchor="middle" className={styles.sublabel}>data is ready</text>

        <circle cx="680" cy="80" r="8" className={styles.nodeAccent} />
        <text x="680" y="108" textAnchor="middle" className={styles.label}>Real content</text>
        <text x="680" y="124" textAnchor="middle" className={styles.sublabel}>Suspense retries render</text>

        <path d="M680 72 C 680 20, 230 20, 230 72" className={styles.arrowAccent} markerEnd="url(#rs-arrow-accent)" />
        <text x="455" y="14" textAnchor="middle" className={styles.caption}>retry re-creates the resource</text>
      </svg>
    </div>
  );
}
