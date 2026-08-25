import styles from "./Diagram.module.css";

export function ReactListsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 640 220"
        role="img"
        aria-label="Diagram: a list [B, C, D] has a new item A inserted at the front, becoming [A, B, C, D]. Item B shifts from the first position to the second, but because it keeps a stable key of 'b', React still matches it to the same element and preserves its state, instead of confusing it with the new item."
      >
        <defs>
          <marker id="ls-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <text x="320" y="18" textAnchor="middle" className={styles.caption}>before — list = [B, C, D]</text>

        <g>
          <rect x="40" y="30" width="110" height="56" rx="10" className={styles.boxAccent} />
          <text x="95" y="60" textAnchor="middle" className={styles.label}>B</text>
          <text x="95" y="76" textAnchor="middle" className={styles.sublabel}>key: b</text>
        </g>
        <g>
          <rect x="180" y="30" width="110" height="56" rx="10" className={styles.box} />
          <text x="235" y="60" textAnchor="middle" className={styles.label}>C</text>
          <text x="235" y="76" textAnchor="middle" className={styles.sublabel}>key: c</text>
        </g>
        <g>
          <rect x="320" y="30" width="110" height="56" rx="10" className={styles.box} />
          <text x="375" y="60" textAnchor="middle" className={styles.label}>D</text>
          <text x="375" y="76" textAnchor="middle" className={styles.sublabel}>key: d</text>
        </g>

        <text x="320" y="136" textAnchor="middle" className={styles.caption}>after inserting A at front — list = [A, B, C, D]</text>

        <g>
          <rect x="40" y="150" width="110" height="56" rx="10" className={styles.box} />
          <text x="95" y="180" textAnchor="middle" className={styles.label}>A</text>
          <text x="95" y="196" textAnchor="middle" className={styles.sublabel}>key: a</text>
        </g>
        <g>
          <rect x="180" y="150" width="110" height="56" rx="10" className={styles.boxAccent} />
          <text x="235" y="180" textAnchor="middle" className={styles.label}>B</text>
          <text x="235" y="196" textAnchor="middle" className={styles.sublabel}>key: b</text>
        </g>
        <g>
          <rect x="320" y="150" width="110" height="56" rx="10" className={styles.box} />
          <text x="375" y="180" textAnchor="middle" className={styles.label}>C</text>
          <text x="375" y="196" textAnchor="middle" className={styles.sublabel}>key: c</text>
        </g>
        <g>
          <rect x="460" y="150" width="110" height="56" rx="10" className={styles.box} />
          <text x="515" y="180" textAnchor="middle" className={styles.label}>D</text>
          <text x="515" y="196" textAnchor="middle" className={styles.sublabel}>key: d</text>
        </g>

        <path d="M95 86 C 95 118, 235 118, 235 150" className={styles.arrowAccent} markerEnd="url(#ls-arrow-accent)" />
        <text x="470" y="114" textAnchor="middle" className={styles.caption}>same key → same identity, even after moving</text>
      </svg>
    </div>
  );
}
