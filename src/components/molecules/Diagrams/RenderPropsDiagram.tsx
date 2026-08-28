import styles from "./Diagram.module.css";

export function RenderPropsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 190"
        role="img"
        aria-label="Diagram: a MouseTracker component tracks internal state, then calls the function passed as its render prop with that data, and renders whatever that function returns."
      >
        <defs>
          <marker id="rp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
        </defs>

        <g>
          <rect x="20" y="55" width="190" height="70" rx="10" className={styles.box} />
          <text x="115" y="82" textAnchor="middle" className={styles.label}>MouseTracker</text>
          <text x="115" y="99" textAnchor="middle" className={styles.sublabel}>owns {"{ x, y }"} state</text>
        </g>

        <g>
          <rect x="255" y="55" width="220" height="70" rx="10" className={styles.boxAccent} />
          <text x="365" y="82" textAnchor="middle" className={styles.label}>render(x, y)</text>
          <text x="365" y="99" textAnchor="middle" className={styles.sublabel}>the function passed as a prop</text>
        </g>

        <g>
          <rect x="520" y="55" width="180" height="70" rx="10" className={styles.box} />
          <text x="610" y="82" textAnchor="middle" className={styles.label}>UI output</text>
          <text x="610" y="99" textAnchor="middle" className={styles.sublabel}>consumer decides this</text>
        </g>

        <line x1="210" y1="90" x2="251" y2="90" className={styles.arrow} markerEnd="url(#rp-arrow)" />
        <line x1="475" y1="90" x2="516" y2="90" className={styles.arrow} markerEnd="url(#rp-arrow)" />

        <text x="360" y="160" textAnchor="middle" className={styles.caption}>data flows out via a function prop, not via a wrapper component</text>
      </svg>
    </div>
  );
}
