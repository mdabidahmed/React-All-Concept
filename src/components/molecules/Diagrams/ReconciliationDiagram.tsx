import styles from "./Diagram.module.css";

export function ReconciliationDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 210"
        role="img"
        aria-label="Diagram: when the element type and key at a position stay the same across renders, React updates that node in place and keeps its state. When the type changes, React unmounts the old node and mounts a brand new one, resetting its state."
      >
        <text x="20" y="26" className={styles.sublabel}>Previous render</text>
        <text x="20" y="120" className={styles.sublabel}>Next render</text>

        <rect x="20" y="35" width="190" height="55" rx="8" className={styles.box} />
        <text x="115" y="58" textAnchor="middle" className={styles.label}>{"<Panel key=\"a\">"}</text>
        <text x="115" y="75" textAnchor="middle" className={styles.sublabel}>count: 3</text>

        <rect x="20" y="130" width="190" height="55" rx="8" className={styles.boxAccent} />
        <text x="115" y="153" textAnchor="middle" className={styles.label}>{"<Panel key=\"a\">"}</text>
        <text x="115" y="170" textAnchor="middle" className={styles.sublabel}>count: 3 (kept)</text>

        <line x1="115" y1="92" x2="115" y2="128" className={styles.arrow} />
        <text x="250" y="112" textAnchor="middle" className={styles.caption}>same type + key</text>
        <text x="250" y="128" textAnchor="middle" className={styles.caption}>→ update in place</text>

        <rect x="470" y="35" width="210" height="55" rx="8" className={styles.box} />
        <text x="575" y="58" textAnchor="middle" className={styles.label}>{"<VideoPlayer>"}</text>
        <text x="575" y="75" textAnchor="middle" className={styles.sublabel}>playing: true</text>

        <rect x="470" y="130" width="210" height="55" rx="8" className={styles.boxAccent} />
        <text x="575" y="153" textAnchor="middle" className={styles.label}>{"<Image>"}</text>
        <text x="575" y="170" textAnchor="middle" className={styles.sublabel}>fresh mount, reset state</text>

        <line x1="575" y1="92" x2="575" y2="128" className={styles.arrow} />
        <text x="400" y="112" textAnchor="middle" className={styles.caption}>different type</text>
        <text x="400" y="128" textAnchor="middle" className={styles.caption}>→ unmount + remount</text>
      </svg>
    </div>
  );
}
