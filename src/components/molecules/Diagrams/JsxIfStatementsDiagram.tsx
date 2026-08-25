import styles from "./Diagram.module.css";

export function JsxIfStatementsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 700 200"
        role="img"
        aria-label="Diagram: a condition branches into two outcomes. When truthy, the true-branch JSX renders; when falsy, the false-branch JSX (or nothing, for the && pattern) renders instead."
      >
        <defs>
          <marker id="jif-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="jif-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="20" y="70" width="160" height="60" rx="10" className={styles.box} />
          <text x="100" y="96" textAnchor="middle" className={styles.label}>condition</text>
          <text x="100" y="113" textAnchor="middle" className={styles.sublabel}>e.g. isPaid</text>
        </g>

        <g>
          <rect x="440" y="20" width="220" height="60" rx="10" className={styles.boxAccent} />
          <text x="550" y="46" textAnchor="middle" className={styles.label}>truthy</text>
          <text x="550" y="63" textAnchor="middle" className={styles.sublabel}>renders the true-branch JSX</text>
        </g>

        <g>
          <rect x="440" y="120" width="220" height="60" rx="10" className={styles.box} />
          <text x="550" y="146" textAnchor="middle" className={styles.label}>falsy</text>
          <text x="550" y="163" textAnchor="middle" className={styles.sublabel}>renders the false branch (or nothing)</text>
        </g>

        <path d="M182 92 C 300 92, 340 50, 436 50" className={styles.arrowAccent} markerEnd="url(#jif-arrow-accent)" />
        <path d="M182 108 C 300 108, 340 150, 436 150" className={styles.arrow} markerEnd="url(#jif-arrow)" />

        <text x="350" y="194" textAnchor="middle" className={styles.caption}>cond ? A : B — or cond &amp;&amp; A</text>
      </svg>
    </div>
  );
}
