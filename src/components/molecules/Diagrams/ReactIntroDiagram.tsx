import styles from "./Diagram.module.css";

export function ReactIntroDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 160"
        role="img"
        aria-label="Diagram: props and state flow into a component function, which returns a JSX description; React diffs that description against the real DOM and patches it. When state changes, the component re-runs."
      >
        <defs>
          <marker id="ri-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="ri-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="10" y="70" width="140" height="60" rx="10" className={styles.box} />
          <text x="80" y="94" textAnchor="middle" className={styles.label}>Props &amp; State</text>
          <text x="80" y="111" textAnchor="middle" className={styles.sublabel}>data in</text>
        </g>

        <g>
          <rect x="200" y="70" width="150" height="60" rx="10" className={styles.boxAccent} />
          <text x="275" y="94" textAnchor="middle" className={styles.label}>Component()</text>
          <text x="275" y="111" textAnchor="middle" className={styles.sublabel}>pure function</text>
        </g>

        <g>
          <rect x="400" y="70" width="150" height="60" rx="10" className={styles.box} />
          <text x="475" y="94" textAnchor="middle" className={styles.label}>JSX Output</text>
          <text x="475" y="111" textAnchor="middle" className={styles.sublabel}>declarative UI</text>
        </g>

        <g>
          <rect x="600" y="70" width="110" height="60" rx="10" className={styles.box} />
          <text x="655" y="94" textAnchor="middle" className={styles.label}>Real DOM</text>
          <text x="655" y="111" textAnchor="middle" className={styles.sublabel}>diffed &amp; patched</text>
        </g>

        <line x1="150" y1="100" x2="196" y2="100" className={styles.arrow} markerEnd="url(#ri-arrow)" />
        <line x1="350" y1="100" x2="396" y2="100" className={styles.arrow} markerEnd="url(#ri-arrow)" />
        <line x1="550" y1="100" x2="596" y2="100" className={styles.arrow} markerEnd="url(#ri-arrow)" />

        <path d="M475 68 C 475 18, 275 18, 275 68" className={styles.arrowAccent} markerEnd="url(#ri-arrow-accent)" />
        <text x="375" y="14" textAnchor="middle" className={styles.caption}>state changes → re-run</text>
      </svg>
    </div>
  );
}
