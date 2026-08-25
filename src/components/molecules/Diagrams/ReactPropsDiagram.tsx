import styles from "./Diagram.module.css";

export function ReactPropsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 420 270"
        role="img"
        aria-label="Diagram: data flows one way, down from Parent to Child via props. The only way information travels back up is when the child calls a function the parent passed down as a callback prop, such as onSelect."
      >
        <defs>
          <marker id="pr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="pr-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="130" y="16" width="160" height="60" rx="10" className={styles.boxAccent} />
          <text x="210" y="42" textAnchor="middle" className={styles.label}>Parent</text>
          <text x="210" y="59" textAnchor="middle" className={styles.sublabel}>owns the state</text>
        </g>

        <g>
          <rect x="130" y="192" width="160" height="60" rx="10" className={styles.box} />
          <text x="210" y="218" textAnchor="middle" className={styles.label}>Child</text>
          <text x="210" y="235" textAnchor="middle" className={styles.sublabel}>receives via props</text>
        </g>

        <line x1="170" y1="78" x2="170" y2="190" className={styles.arrow} markerEnd="url(#pr-arrow)" />
        <text x="150" y="128" textAnchor="end" className={styles.label}>props</text>
        <text x="150" y="144" textAnchor="end" className={styles.sublabel}>data flows down</text>

        <line x1="250" y1="190" x2="250" y2="78" className={styles.arrowAccent} markerEnd="url(#pr-arrow-accent)" />
        <text x="270" y="128" textAnchor="start" className={styles.label}>onSelect()</text>
        <text x="270" y="144" textAnchor="start" className={styles.sublabel}>event flows up</text>

        <text x="210" y="258" textAnchor="middle" className={styles.caption}>data down via props, events up via callback props</text>
      </svg>
    </div>
  );
}
