import styles from "./Diagram.module.css";

export function JestDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 200"
        role="img"
        aria-label="Diagram: Jest's structure — a describe block groups related tests, each test (or it) block checks one behavior, and inside it one or more expect assertions compare the actual result to the expected one."
      >
        <rect x="20" y="20" width="680" height="160" rx="10" className={styles.box} />
        <text x="360" y="42" textAnchor="middle" className={styles.label}>describe("sum", () =&gt; {"{"} ... {"}"})</text>

        <rect x="45" y="58" width="630" height="112" rx="8" className={styles.boxAccent} />
        <text x="360" y="80" textAnchor="middle" className={styles.sublabel}>test("adds 1 + 2 to equal 3", () =&gt; {"{"} ... {"}"})</text>

        <rect x="70" y="92" width="580" height="60" rx="8" className={styles.box} />
        <text x="360" y="116" textAnchor="middle" className={styles.label}>expect(sum(1, 2)).toBe(3)</text>
        <text x="360" y="136" textAnchor="middle" className={styles.sublabel}>compares the actual result to the expected one</text>
      </svg>
    </div>
  );
}
