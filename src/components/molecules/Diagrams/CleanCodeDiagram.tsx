import styles from "./Diagram.module.css";

export function CleanCodeDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: one large component that fetches data, computes values, and renders UI all in one place, versus the same logic split into a small custom hook plus a small, focused presentational component."
      >
        <defs>
          <marker id="cc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="20" y="35" width="230" height="120" rx="10" className={styles.box} />
          <text x="135" y="58" textAnchor="middle" className={styles.label}>One big component</text>
          <text x="135" y="78" textAnchor="middle" className={styles.sublabel}>fetch + compute + render</text>
          <text x="135" y="96" textAnchor="middle" className={styles.sublabel}>+ side effects, all mixed</text>
          <text x="135" y="114" textAnchor="middle" className={styles.sublabel}>together</text>
          <text x="135" y="136" textAnchor="middle" className={styles.caption}>hard to test in isolation</text>
        </g>

        <line x1="260" y1="95" x2="300" y2="95" className={styles.arrow} markerEnd="url(#cc-arrow)" />

        <g>
          <rect x="330" y="30" width="180" height="55" rx="8" className={styles.boxAccent} />
          <text x="420" y="53" textAnchor="middle" className={styles.label}>useUserData()</text>
          <text x="420" y="70" textAnchor="middle" className={styles.sublabel}>pure logic, own tests</text>
        </g>

        <g>
          <rect x="330" y="105" width="180" height="55" rx="8" className={styles.box} />
          <text x="420" y="128" textAnchor="middle" className={styles.label}>UserCard</text>
          <text x="420" y="145" textAnchor="middle" className={styles.sublabel}>renders props only</text>
        </g>

        <text x="420" y="185" textAnchor="middle" className={styles.caption}>each piece is small enough to test alone</text>
      </svg>
    </div>
  );
}
