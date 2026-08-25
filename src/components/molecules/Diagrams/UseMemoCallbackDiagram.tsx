import styles from "./Diagram.module.css";

export function UseMemoCallbackDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 700 390"
        role="img"
        aria-label="Decision diagram: on render, useMemo checks whether the dependency array changed. If the dependencies are unchanged, it returns the cached value without recomputing. If a dependency changed, it reruns the function and caches the new result. Either way the component receives a value for this render."
      >
        <defs>
          <marker id="umc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="umc-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="250" y="10" width="200" height="54" rx="10" className={styles.box} />
          <text x="350" y="34" textAnchor="middle" className={styles.label}>Render</text>
          <text x="350" y="50" textAnchor="middle" className={styles.sublabel}>deps array evaluated</text>
        </g>
        <line x1="350" y1="64" x2="350" y2="78" className={styles.arrow} markerEnd="url(#umc-arrow)" />

        <polygon points="350,80 460,140 350,200 240,140" className={styles.box} />
        <text x="350" y="134" textAnchor="middle" className={styles.sublabel}>deps array</text>
        <text x="350" y="150" textAnchor="middle" className={styles.sublabel}>changed?</text>

        <path d="M240 140 C 150 170, 150 195, 150 226" className={styles.arrow} markerEnd="url(#umc-arrow)" />
        <text x="175" y="180" className={styles.caption}>no</text>
        <path d="M460 140 C 550 170, 550 195, 550 226" className={styles.arrowAccent} markerEnd="url(#umc-arrow-accent)" />
        <text x="520" y="180" className={styles.caption}>yes</text>

        <g>
          <rect x="20" y="230" width="260" height="60" rx="10" className={styles.box} />
          <text x="150" y="256" textAnchor="middle" className={styles.label}>Reuse cached value</text>
          <text x="150" y="273" textAnchor="middle" className={styles.sublabel}>the function is NOT called again</text>
        </g>
        <g>
          <rect x="420" y="230" width="260" height="60" rx="10" className={styles.boxAccent} />
          <text x="550" y="256" textAnchor="middle" className={styles.label}>Recompute</text>
          <text x="550" y="273" textAnchor="middle" className={styles.sublabel}>function runs again, cache updates</text>
        </g>

        <path d="M150 290 C 150 320, 260 320, 300 328" className={styles.arrow} markerEnd="url(#umc-arrow)" />
        <path d="M550 290 C 550 320, 440 320, 400 328" className={styles.arrow} markerEnd="url(#umc-arrow)" />

        <g>
          <rect x="200" y="330" width="300" height="54" rx="10" className={styles.box} />
          <text x="350" y="354" textAnchor="middle" className={styles.label}>Value used in this render</text>
          <text x="350" y="370" textAnchor="middle" className={styles.sublabel}>either cached or freshly computed</text>
        </g>
      </svg>
    </div>
  );
}
