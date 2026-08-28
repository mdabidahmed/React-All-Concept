import styles from "./Diagram.module.css";

export function TestingPyramidDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 210"
        role="img"
        aria-label="Diagram: the testing pyramid. A wide base of many fast unit tests, a narrower middle layer of fewer integration tests, and a small top layer of a few slow end-to-end tests."
      >
        <polygon points="360,20 460,80 260,80" className={styles.boxAccent} />
        <text x="360" y="55" textAnchor="middle" className={styles.label}>E2E</text>
        <text x="360" y="70" textAnchor="middle" className={styles.sublabel}>few, slow, realistic</text>

        <polygon points="260,85 460,85 520,140 200,140" className={styles.box} />
        <text x="360" y="107" textAnchor="middle" className={styles.label}>Integration tests</text>
        <text x="360" y="123" textAnchor="middle" className={styles.sublabel}>fewer, check pieces together</text>

        <polygon points="200,145 520,145 590,195 130,195" className={styles.boxAccent} />
        <text x="360" y="165" textAnchor="middle" className={styles.label}>Unit tests</text>
        <text x="360" y="181" textAnchor="middle" className={styles.sublabel}>many, fast, isolated</text>
      </svg>
    </div>
  );
}
