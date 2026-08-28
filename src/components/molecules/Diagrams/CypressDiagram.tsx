import styles from "./Diagram.module.css";

export function CypressDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: a Cypress test drives a real browser step by step — visiting a page, finding an element, clicking or typing into it, then asserting on the result — all against the actual running app."
      >
        <defs>
          <marker id="cy-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <rect x="20" y="20" width="680" height="150" rx="10" className={styles.box} />
        <text x="360" y="42" textAnchor="middle" className={styles.sublabel}>a real browser window, running the real app</text>

        <rect x="45" y="60" width="140" height="55" rx="8" className={styles.boxAccent} />
        <text x="115" y="83" textAnchor="middle" className={styles.label}>cy.visit()</text>
        <text x="115" y="100" textAnchor="middle" className={styles.sublabel}>load the page</text>

        <rect x="215" y="60" width="140" height="55" rx="8" className={styles.boxAccent} />
        <text x="285" y="83" textAnchor="middle" className={styles.label}>cy.get()</text>
        <text x="285" y="100" textAnchor="middle" className={styles.sublabel}>find an element</text>

        <rect x="385" y="60" width="140" height="55" rx="8" className={styles.boxAccent} />
        <text x="455" y="83" textAnchor="middle" className={styles.label}>.click() / .type()</text>
        <text x="455" y="100" textAnchor="middle" className={styles.sublabel}>act like a user</text>

        <rect x="555" y="60" width="120" height="55" rx="8" className={styles.box} />
        <text x="615" y="83" textAnchor="middle" className={styles.label}>assert</text>
        <text x="615" y="100" textAnchor="middle" className={styles.sublabel}>check the result</text>

        <line x1="185" y1="87" x2="211" y2="87" className={styles.arrow} markerEnd="url(#cy-arrow)" />
        <line x1="355" y1="87" x2="381" y2="87" className={styles.arrow} markerEnd="url(#cy-arrow)" />
        <line x1="525" y1="87" x2="551" y2="87" className={styles.arrow} markerEnd="url(#cy-arrow)" />

        <text x="360" y="150" textAnchor="middle" className={styles.caption}>tests a real user flow end-to-end, not an isolated function</text>
      </svg>
    </div>
  );
}
