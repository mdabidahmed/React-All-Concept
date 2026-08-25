import styles from "./Diagram.module.css";

export function ReactPortalsDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 700 250"
        role="img"
        aria-label="Diagram comparing the React component tree, where Modal is logically nested inside Toolbar, with the actual DOM tree, where the portaled Modal renders as a separate branch outside the app root, for example under a modal-root node, while remaining the same component instance."
      >
        <defs>
          <marker id="pt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="pt-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <text x="145" y="14" textAnchor="middle" className={styles.caption}>React tree — logical nesting</text>
        <g>
          <rect x="90" y="24" width="110" height="48" rx="10" className={styles.box} />
          <text x="145" y="43" textAnchor="middle" className={styles.label}>App</text>
          <text x="145" y="60" textAnchor="middle" className={styles.sublabel}>root component</text>
        </g>
        <g>
          <rect x="90" y="96" width="110" height="48" rx="10" className={styles.box} />
          <text x="145" y="115" textAnchor="middle" className={styles.label}>Toolbar</text>
          <text x="145" y="132" textAnchor="middle" className={styles.sublabel}>renders Modal</text>
        </g>
        <g>
          <rect x="90" y="168" width="110" height="48" rx="10" className={styles.boxAccent} />
          <text x="145" y="187" textAnchor="middle" className={styles.label}>Modal</text>
          <text x="145" y="204" textAnchor="middle" className={styles.sublabel}>child of Toolbar</text>
        </g>
        <line x1="145" y1="72" x2="145" y2="94" className={styles.arrow} markerEnd="url(#pt-arrow)" />
        <line x1="145" y1="144" x2="145" y2="166" className={styles.arrow} markerEnd="url(#pt-arrow)" />

        <text x="525" y="14" textAnchor="middle" className={styles.caption}>DOM tree — where it renders</text>
        <g>
          <rect x="470" y="24" width="110" height="48" rx="10" className={styles.box} />
          <text x="525" y="43" textAnchor="middle" className={styles.label}>body</text>
          <text x="525" y="60" textAnchor="middle" className={styles.sublabel}>top of the DOM tree</text>
        </g>
        <g>
          <rect x="390" y="96" width="110" height="48" rx="10" className={styles.box} />
          <text x="445" y="115" textAnchor="middle" className={styles.label}>#root</text>
          <text x="445" y="132" textAnchor="middle" className={styles.sublabel}>App, Toolbar</text>
        </g>
        <g>
          <rect x="560" y="96" width="110" height="48" rx="10" className={styles.box} />
          <text x="615" y="115" textAnchor="middle" className={styles.label}>#modal-root</text>
          <text x="615" y="132" textAnchor="middle" className={styles.sublabel}>separate branch</text>
        </g>
        <g>
          <rect x="560" y="168" width="110" height="48" rx="10" className={styles.boxAccent} />
          <text x="615" y="187" textAnchor="middle" className={styles.label}>Modal</text>
          <text x="615" y="204" textAnchor="middle" className={styles.sublabel}>rendered here</text>
        </g>
        <line x1="497" y1="72" x2="452" y2="94" className={styles.arrow} markerEnd="url(#pt-arrow)" />
        <line x1="553" y1="72" x2="608" y2="94" className={styles.arrow} markerEnd="url(#pt-arrow)" />
        <line x1="615" y1="144" x2="615" y2="166" className={styles.arrow} markerEnd="url(#pt-arrow)" />

        <path d="M200 192 C 320 222, 440 222, 558 192" className={styles.arrowAccent} markerEnd="url(#pt-arrow-accent)" />
        <text x="380" y="238" textAnchor="middle" className={styles.caption}>same component instance, different DOM location</text>
      </svg>
    </div>
  );
}
