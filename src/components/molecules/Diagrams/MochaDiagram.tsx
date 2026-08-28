import styles from "./Diagram.module.css";

export function MochaDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: Jest is a single all-in-one package providing the test runner, assertions, and mocking together. Mocha is only the test runner, and needs Chai for assertions and Sinon for mocking added separately."
      >
        <text x="180" y="26" textAnchor="middle" className={styles.sublabel}>Jest — all-in-one</text>
        <rect x="60" y="40" width="240" height="110" rx="10" className={styles.boxAccent} />
        <text x="180" y="90" textAnchor="middle" className={styles.label}>runner + assertions</text>
        <text x="180" y="110" textAnchor="middle" className={styles.label}>+ mocking</text>
        <text x="180" y="130" textAnchor="middle" className={styles.sublabel}>one package, works out of the box</text>

        <text x="540" y="26" textAnchor="middle" className={styles.sublabel}>Mocha — bring your own tools</text>
        <rect x="420" y="40" width="90" height="50" rx="8" className={styles.box} />
        <text x="465" y="70" textAnchor="middle" className={styles.label}>Mocha</text>

        <rect x="520" y="40" width="90" height="50" rx="8" className={styles.box} />
        <text x="565" y="62" textAnchor="middle" className={styles.label}>Chai</text>
        <text x="565" y="78" textAnchor="middle" className={styles.sublabel}>assertions</text>

        <rect x="620" y="40" width="90" height="50" rx="8" className={styles.box} />
        <text x="665" y="62" textAnchor="middle" className={styles.label}>Sinon</text>
        <text x="665" y="78" textAnchor="middle" className={styles.sublabel}>mocks/spies</text>

        <rect x="420" y="110" width="290" height="40" rx="8" className={styles.boxAccent} />
        <text x="565" y="135" textAnchor="middle" className={styles.sublabel}>three separate packages, picked and wired together</text>
      </svg>
    </div>
  );
}
