import styles from "./Diagram.module.css";

export function ContainerPatternDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: a container component owns state and data fetching, then passes plain props down to a presentational component that only renders UI from those props."
      >
        <defs>
          <marker id="cp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="40" y="45" width="260" height="100" rx="10" className={styles.boxAccent} />
          <text x="170" y="72" textAnchor="middle" className={styles.label}>UserListContainer</text>
          <text x="170" y="90" textAnchor="middle" className={styles.sublabel}>fetches data, owns state</text>
          <text x="170" y="106" textAnchor="middle" className={styles.sublabel}>the "how it works"</text>
        </g>

        <g>
          <rect x="420" y="45" width="260" height="100" rx="10" className={styles.box} />
          <text x="550" y="72" textAnchor="middle" className={styles.label}>UserList</text>
          <text x="550" y="90" textAnchor="middle" className={styles.sublabel}>renders props only, no state</text>
          <text x="550" y="106" textAnchor="middle" className={styles.sublabel}>the "how it looks"</text>
        </g>

        <line x1="300" y1="95" x2="416" y2="95" className={styles.arrow} markerEnd="url(#cp-arrow)" />
        <text x="358" y="85" textAnchor="middle" className={styles.sublabel}>props</text>

        <text x="360" y="168" textAnchor="middle" className={styles.caption}>logic and rendering stay separate — easier to reuse and test each half</text>
      </svg>
    </div>
  );
}
