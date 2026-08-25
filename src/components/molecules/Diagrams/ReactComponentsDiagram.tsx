import styles from "./Diagram.module.css";

export function ReactComponentsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 640 210"
        role="img"
        aria-label="Composition-tree diagram: a parent App component renders three child components, Header, Body, and Footer, nested inside it. Each box is its own component function; nesting in JSX creates nesting in the rendered component tree."
      >
        <defs>
          <marker id="cp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="250" y="16" width="140" height="56" rx="10" className={styles.boxAccent} />
          <text x="320" y="40" textAnchor="middle" className={styles.label}>App</text>
          <text x="320" y="57" textAnchor="middle" className={styles.sublabel}>parent component</text>
        </g>

        <g>
          <rect x="30" y="140" width="140" height="56" rx="10" className={styles.box} />
          <text x="100" y="164" textAnchor="middle" className={styles.label}>Header</text>
          <text x="100" y="181" textAnchor="middle" className={styles.sublabel}>&lt;Header /&gt;</text>
        </g>
        <g>
          <rect x="250" y="140" width="140" height="56" rx="10" className={styles.box} />
          <text x="320" y="164" textAnchor="middle" className={styles.label}>Body</text>
          <text x="320" y="181" textAnchor="middle" className={styles.sublabel}>&lt;Body /&gt;</text>
        </g>
        <g>
          <rect x="470" y="140" width="140" height="56" rx="10" className={styles.box} />
          <text x="540" y="164" textAnchor="middle" className={styles.label}>Footer</text>
          <text x="540" y="181" textAnchor="middle" className={styles.sublabel}>&lt;Footer /&gt;</text>
        </g>

        <path d="M290 74 C 220 100, 150 110, 100 138" className={styles.arrow} markerEnd="url(#cp-arrow)" />
        <line x1="320" y1="74" x2="320" y2="136" className={styles.arrow} markerEnd="url(#cp-arrow)" />
        <path d="M350 74 C 420 100, 490 110, 540 138" className={styles.arrow} markerEnd="url(#cp-arrow)" />

        <text x="320" y="204" textAnchor="middle" className={styles.caption}>nesting in JSX = nesting in the tree</text>
      </svg>
    </div>
  );
}
