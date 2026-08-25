import styles from "./Diagram.module.css";

export function ReactFormsSubmitDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 760 160"
        role="img"
        aria-label="Timeline diagram: the form submits, preventDefault cancels the page reload, the handler validates and reads state, then hands the data off. An invalid submission returns early instead of continuing."
      >
        <defs>
          <marker id="fsub-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <line x1="40" y1="80" x2="660" y2="80" className={styles.arrow} />

        <circle cx="80" cy="80" r="8" className={styles.node} />
        <text x="80" y="108" textAnchor="middle" className={styles.label}>onSubmit fires</text>
        <text x="80" y="124" textAnchor="middle" className={styles.sublabel}>click or Enter</text>

        <circle cx="280" cy="80" r="8" className={styles.nodeAccent} />
        <text x="280" y="108" textAnchor="middle" className={styles.label}>preventDefault()</text>
        <text x="280" y="124" textAnchor="middle" className={styles.sublabel}>cancels the reload</text>

        <circle cx="480" cy="80" r="8" className={styles.node} />
        <text x="480" y="108" textAnchor="middle" className={styles.label}>Validate state</text>
        <text x="480" y="124" textAnchor="middle" className={styles.sublabel}>bail out if invalid</text>

        <circle cx="660" cy="80" r="8" className={styles.nodeAccent} />
        <text x="660" y="108" textAnchor="middle" className={styles.label}>Hand off data</text>
        <text x="660" y="124" textAnchor="middle" className={styles.sublabel}>API call / callback</text>

        <path d="M480 72 C 480 25, 80 25, 80 72" className={styles.arrowAccent} markerEnd="url(#fsub-arrow-accent)" />
        <text x="280" y="16" textAnchor="middle" className={styles.caption}>invalid → return early</text>
      </svg>
    </div>
  );
}
