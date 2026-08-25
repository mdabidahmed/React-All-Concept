import styles from "./Diagram.module.css";

export function ReactRouterDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 260"
        role="img"
        aria-label="Diagram: a URL path is matched by Routes against a Route definition, which renders the matched element on screen. A nested layout route wraps the page in a persistent shell and renders the matched child through its own Outlet."
      >
        <defs>
          <marker id="rr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="rr-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="10" y="30" width="140" height="60" rx="10" className={styles.box} />
          <text x="80" y="54" textAnchor="middle" className={styles.label}>/profile</text>
          <text x="80" y="71" textAnchor="middle" className={styles.sublabel}>URL in address bar</text>
        </g>
        <g>
          <rect x="190" y="30" width="140" height="60" rx="10" className={styles.boxAccent} />
          <text x="260" y="54" textAnchor="middle" className={styles.label}>Routes</text>
          <text x="260" y="71" textAnchor="middle" className={styles.sublabel}>matches path to route</text>
        </g>
        <g>
          <rect x="370" y="30" width="170" height="60" rx="10" className={styles.box} />
          <text x="455" y="54" textAnchor="middle" className={styles.label}>Route match</text>
          <text x="455" y="71" textAnchor="middle" className={styles.sublabel}>renders matched element</text>
        </g>
        <g>
          <rect x="580" y="30" width="130" height="60" rx="10" className={styles.box} />
          <text x="645" y="54" textAnchor="middle" className={styles.label}>Rendered UI</text>
          <text x="645" y="71" textAnchor="middle" className={styles.sublabel}>shown on screen</text>
        </g>

        <line x1="150" y1="60" x2="186" y2="60" className={styles.arrow} markerEnd="url(#rr-arrow)" />
        <line x1="330" y1="60" x2="366" y2="60" className={styles.arrow} markerEnd="url(#rr-arrow)" />
        <line x1="540" y1="60" x2="576" y2="60" className={styles.arrow} markerEnd="url(#rr-arrow)" />

        <g>
          <rect x="370" y="140" width="340" height="110" rx="10" className={styles.box} />
          <text x="540" y="162" textAnchor="middle" className={styles.label}>Layout route</text>
          <text x="540" y="178" textAnchor="middle" className={styles.sublabel}>persistent header / nav</text>
          <rect x="560" y="196" width="130" height="44" rx="8" className={styles.boxAccent} />
          <text x="625" y="216" textAnchor="middle" className={styles.label}>Outlet</text>
          <text x="625" y="231" textAnchor="middle" className={styles.sublabel}>renders matched child</text>
        </g>

        <path d="M455 90 C 455 120, 540 110, 540 138" className={styles.arrowAccent} markerEnd="url(#rr-arrow-accent)" />
        <text x="500" y="120" textAnchor="middle" className={styles.caption}>nested routes render inside an Outlet</text>
      </svg>
    </div>
  );
}
