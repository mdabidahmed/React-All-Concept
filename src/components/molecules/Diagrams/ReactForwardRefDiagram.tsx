import styles from "./Diagram.module.css";

export function ReactForwardRefDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 760 160"
        role="img"
        aria-label="Diagram: a ref created in the Parent is passed as a prop to Input, forwardRef receives it as a second argument alongside props, and forwards it onto the real input DOM node — so the parent's ref now points at that node."
      >
        <defs>
          <marker id="fr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="fr-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="10" y="70" width="140" height="60" rx="10" className={styles.box} />
          <text x="80" y="94" textAnchor="middle" className={styles.label}>Parent</text>
          <text x="80" y="111" textAnchor="middle" className={styles.sublabel}>const ref = useRef(null)</text>
        </g>

        <g>
          <rect x="190" y="70" width="150" height="60" rx="10" className={styles.box} />
          <text x="265" y="94" textAnchor="middle" className={styles.label}>Input</text>
          <text x="265" y="111" textAnchor="middle" className={styles.sublabel}>ref passed as a prop</text>
        </g>

        <g>
          <rect x="380" y="70" width="170" height="60" rx="10" className={styles.boxAccent} />
          <text x="465" y="94" textAnchor="middle" className={styles.label}>forwardRef</text>
          <text x="465" y="111" textAnchor="middle" className={styles.sublabel}>receives (props, ref)</text>
        </g>

        <g>
          <rect x="590" y="70" width="140" height="60" rx="10" className={styles.box} />
          <text x="660" y="94" textAnchor="middle" className={styles.label}>input</text>
          <text x="660" y="111" textAnchor="middle" className={styles.sublabel}>the real DOM node</text>
        </g>

        <line x1="150" y1="100" x2="186" y2="100" className={styles.arrow} markerEnd="url(#fr-arrow)" />
        <line x1="340" y1="100" x2="376" y2="100" className={styles.arrow} markerEnd="url(#fr-arrow)" />
        <line x1="550" y1="100" x2="586" y2="100" className={styles.arrow} markerEnd="url(#fr-arrow)" />

        <path d="M660 68 C 660 15, 80 15, 80 68" className={styles.arrowAccent} markerEnd="url(#fr-arrow-accent)" />
        <text x="370" y="12" textAnchor="middle" className={styles.caption}>ref.current now points here</text>
      </svg>
    </div>
  );
}
