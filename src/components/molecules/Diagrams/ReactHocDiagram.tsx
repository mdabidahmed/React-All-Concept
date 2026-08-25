import styles from "./Diagram.module.css";

export function ReactHocDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: MyComponent goes into the withSomething function, which returns an Enhanced Component — a wrapper containing the original MyComponent plus extra props, markup, or conditional logic added around it."
      >
        <defs>
          <marker id="hoc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="20" y="65" width="140" height="60" rx="10" className={styles.box} />
          <text x="90" y="89" textAnchor="middle" className={styles.label}>MyComponent</text>
          <text x="90" y="106" textAnchor="middle" className={styles.sublabel}>plain component</text>
        </g>

        <g>
          <rect x="200" y="65" width="170" height="60" rx="10" className={styles.boxAccent} />
          <text x="285" y="89" textAnchor="middle" className={styles.label}>withSomething()</text>
          <text x="285" y="106" textAnchor="middle" className={styles.sublabel}>the HOC function</text>
        </g>

        <g>
          <rect x="410" y="35" width="290" height="120" rx="10" className={styles.box} />
          <text x="555" y="58" textAnchor="middle" className={styles.label}>Enhanced Component</text>
          <text x="555" y="74" textAnchor="middle" className={styles.sublabel}>returned by the HOC</text>
          <rect x="460" y="95" width="190" height="48" rx="8" className={styles.boxAccent} />
          <text x="555" y="115" textAnchor="middle" className={styles.label}>MyComponent</text>
          <text x="555" y="131" textAnchor="middle" className={styles.sublabel}>wrapped as-is</text>
        </g>

        <line x1="160" y1="95" x2="196" y2="95" className={styles.arrow} markerEnd="url(#hoc-arrow)" />
        <line x1="370" y1="95" x2="406" y2="95" className={styles.arrow} markerEnd="url(#hoc-arrow)" />

        <text x="555" y="175" textAnchor="middle" className={styles.caption}>extra props, markup, or logic wraps the original</text>
      </svg>
    </div>
  );
}
