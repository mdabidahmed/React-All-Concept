import styles from "./Diagram.module.css";

export function ReactEventsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: the event handling cycle. A user event fires, the handler function runs, it updates state, and the component re-renders with the new UI — leaving it ready for the next event."
      >
        <defs>
          <marker id="ev-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="ev-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="10" y="40" width="150" height="60" rx="10" className={styles.box} />
          <text x="85" y="64" textAnchor="middle" className={styles.label}>Event fires</text>
          <text x="85" y="81" textAnchor="middle" className={styles.sublabel}>user clicks</text>
        </g>

        <g>
          <rect x="190" y="40" width="150" height="60" rx="10" className={styles.boxAccent} />
          <text x="265" y="64" textAnchor="middle" className={styles.label}>Handler runs</text>
          <text x="265" y="81" textAnchor="middle" className={styles.sublabel}>onClick(event)</text>
        </g>

        <g>
          <rect x="390" y="40" width="150" height="60" rx="10" className={styles.box} />
          <text x="465" y="64" textAnchor="middle" className={styles.label}>State updates</text>
          <text x="465" y="81" textAnchor="middle" className={styles.sublabel}>setValue(...)</text>
        </g>

        <g>
          <rect x="570" y="40" width="140" height="60" rx="10" className={styles.box} />
          <text x="640" y="64" textAnchor="middle" className={styles.label}>Re-render</text>
          <text x="640" y="81" textAnchor="middle" className={styles.sublabel}>new UI painted</text>
        </g>

        <line x1="160" y1="70" x2="186" y2="70" className={styles.arrow} markerEnd="url(#ev-arrow)" />
        <line x1="340" y1="70" x2="386" y2="70" className={styles.arrow} markerEnd="url(#ev-arrow)" />
        <line x1="540" y1="70" x2="566" y2="70" className={styles.arrow} markerEnd="url(#ev-arrow)" />

        <path d="M640 102 C 640 155, 85 155, 85 102" className={styles.arrowAccent} markerEnd="url(#ev-arrow-accent)" />
        <text x="362" y="172" textAnchor="middle" className={styles.caption}>ready for the next event</text>
      </svg>
    </div>
  );
}
