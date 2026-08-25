import styles from "./Diagram.module.css";

export function UseStateDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: the useState render cycle. The component renders and reads the current value, useState returns a value and setter, calling the setter schedules a re-render, and the component renders again with the new value — looping back to the start."
      >
        <defs>
          <marker id="us-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="us-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="10" y="40" width="110" height="60" rx="10" className={styles.box} />
          <text x="65" y="64" textAnchor="middle" className={styles.label}>Render</text>
          <text x="65" y="81" textAnchor="middle" className={styles.sublabel}>reads value: 0</text>
        </g>

        <g>
          <rect x="150" y="40" width="160" height="60" rx="10" className={styles.boxAccent} />
          <text x="230" y="64" textAnchor="middle" className={styles.label}>useState(0)</text>
          <text x="230" y="81" textAnchor="middle" className={styles.sublabel}>→ [value, setValue]</text>
        </g>

        <g>
          <rect x="340" y="40" width="190" height="60" rx="10" className={styles.box} />
          <text x="435" y="64" textAnchor="middle" className={styles.label}>setValue(v =&gt; v+1)</text>
          <text x="435" y="81" textAnchor="middle" className={styles.sublabel}>on click</text>
        </g>

        <g>
          <rect x="560" y="40" width="140" height="60" rx="10" className={styles.box} />
          <text x="630" y="64" textAnchor="middle" className={styles.label}>Re-render</text>
          <text x="630" y="81" textAnchor="middle" className={styles.sublabel}>value: 1</text>
        </g>

        <line x1="120" y1="70" x2="146" y2="70" className={styles.arrow} markerEnd="url(#us-arrow)" />
        <line x1="310" y1="70" x2="336" y2="70" className={styles.arrow} markerEnd="url(#us-arrow)" />
        <line x1="530" y1="70" x2="556" y2="70" className={styles.arrow} markerEnd="url(#us-arrow)" />

        <path d="M630 102 C 630 155, 65 155, 65 102" className={styles.arrowAccent} markerEnd="url(#us-arrow-accent)" />
        <text x="347" y="172" textAnchor="middle" className={styles.caption}>schedules the next render</text>
      </svg>
    </div>
  );
}
