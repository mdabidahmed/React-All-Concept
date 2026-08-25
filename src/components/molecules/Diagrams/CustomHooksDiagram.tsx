import styles from "./Diagram.module.css";

export function CustomHooksDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 700 260"
        role="img"
        aria-label="Fan-out diagram: one custom hook, useCounter, is called independently by three different components. Each component gets its own independent state from the same shared logic — ComponentA's count is 3, ComponentB's is 0, ComponentC's is 12."
      >
        <defs>
          <marker id="ch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="20" y="95" width="190" height="70" rx="10" className={styles.boxAccent} />
          <text x="115" y="125" textAnchor="middle" className={styles.label}>useCounter()</text>
          <text x="115" y="142" textAnchor="middle" className={styles.sublabel}>built from useState</text>
        </g>

        <g>
          <rect x="420" y="10" width="260" height="60" rx="10" className={styles.box} />
          <text x="550" y="36" textAnchor="middle" className={styles.label}>ComponentA</text>
          <text x="550" y="53" textAnchor="middle" className={styles.sublabel}>count: 3 (own state)</text>
        </g>
        <g>
          <rect x="420" y="100" width="260" height="60" rx="10" className={styles.box} />
          <text x="550" y="126" textAnchor="middle" className={styles.label}>ComponentB</text>
          <text x="550" y="143" textAnchor="middle" className={styles.sublabel}>count: 0 (own state)</text>
        </g>
        <g>
          <rect x="420" y="190" width="260" height="60" rx="10" className={styles.box} />
          <text x="550" y="216" textAnchor="middle" className={styles.label}>ComponentC</text>
          <text x="550" y="233" textAnchor="middle" className={styles.sublabel}>count: 12 (own state)</text>
        </g>

        <path d="M210 115 C 320 100, 320 40, 416 40" className={styles.arrow} markerEnd="url(#ch-arrow)" />
        <path d="M210 130 C 300 130, 300 130, 416 130" className={styles.arrow} markerEnd="url(#ch-arrow)" />
        <path d="M210 145 C 320 160, 320 220, 416 220" className={styles.arrow} markerEnd="url(#ch-arrow)" />

        <text x="350" y="248" textAnchor="middle" className={styles.caption}>same hook, independent state per call</text>
      </svg>
    </div>
  );
}
