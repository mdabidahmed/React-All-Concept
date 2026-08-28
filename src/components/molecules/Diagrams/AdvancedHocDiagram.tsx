import styles from "./Diagram.module.css";

export function AdvancedHocDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: composing three HOCs — withA, withB, withC — around a base Component. Each wrapper nests the next, so the final tree has three extra wrapper layers around the original component."
      >
        <defs>
          <marker id="hocp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <rect x="20" y="20" width="680" height="150" rx="10" className={styles.box} />
        <text x="360" y="42" textAnchor="middle" className={styles.label}>withA(withB(withC(Component)))</text>

        <rect x="45" y="60" width="610" height="90" rx="8" className={styles.boxAccent} />
        <text x="360" y="78" textAnchor="middle" className={styles.sublabel}>withA — outermost wrapper</text>

        <rect x="70" y="88" width="500" height="50" rx="8" className={styles.box} />
        <text x="320" y="106" textAnchor="middle" className={styles.sublabel}>withB — middle wrapper</text>

        <rect x="95" y="112" width="330" height="20" rx="6" className={styles.boxAccent} />
        <text x="260" y="126" textAnchor="middle" className={styles.label}>Component</text>

        <text x="360" y="163" textAnchor="middle" className={styles.caption}>three wrapper layers deep — each one harder to trace than a hook call</text>
      </svg>
    </div>
  );
}
