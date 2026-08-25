import styles from "./Diagram.module.css";

export function ReactClassDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 170"
        role="img"
        aria-label="Lifecycle timeline diagram: Mounting (componentDidMount) runs once, then Updating (componentDidUpdate) can loop back on itself whenever props or state change, and finally Unmounting (componentWillUnmount) runs once as the component is removed."
      >
        <defs>
          <marker id="cl-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <line x1="40" y1="90" x2="680" y2="90" className={styles.arrow} />

        <circle cx="120" cy="90" r="8" className={styles.node} />
        <text x="120" y="118" textAnchor="middle" className={styles.label}>Mounting</text>
        <text x="120" y="134" textAnchor="middle" className={styles.sublabel}>componentDidMount</text>

        <circle cx="380" cy="90" r="8" className={styles.nodeAccent} />
        <text x="380" y="118" textAnchor="middle" className={styles.label}>Updating</text>
        <text x="380" y="134" textAnchor="middle" className={styles.sublabel}>componentDidUpdate</text>

        <circle cx="620" cy="90" r="8" className={styles.node} />
        <text x="620" y="118" textAnchor="middle" className={styles.label}>Unmounting</text>
        <text x="620" y="134" textAnchor="middle" className={styles.sublabel}>componentWillUnmount</text>

        <path d="M360 82 C 340 30, 420 30, 400 82" className={styles.arrowAccent} markerEnd="url(#cl-arrow-accent)" />
        <text x="380" y="20" textAnchor="middle" className={styles.caption}>props/state change → re-render</text>
      </svg>
    </div>
  );
}
