import styles from "./Diagram.module.css";

export function UseContextDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 720 230"
        role="img"
        aria-label="Diagram comparing two ways to get a value to a deeply nested component. Top row, prop drilling: the value is passed as a prop through App, then Child, then Grandchild, before it finally reaches Consumer. Bottom row, useContext: a Provider at the top supplies the value directly, and Consumer reads it with useContext, skipping the untouched intermediate components entirely."
      >
        <defs>
          <marker id="uc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="uc-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <text x="10" y="16" className={styles.caption}>prop drilling</text>
        <g>
          <rect x="10" y="24" width="120" height="56" rx="10" className={styles.box} />
          <text x="70" y="47" textAnchor="middle" className={styles.label}>App</text>
          <text x="70" y="63" textAnchor="middle" className={styles.sublabel}>creates value</text>
        </g>
        <g>
          <rect x="180" y="24" width="120" height="56" rx="10" className={styles.box} />
          <text x="240" y="47" textAnchor="middle" className={styles.label}>Child</text>
          <text x="240" y="63" textAnchor="middle" className={styles.sublabel}>just passes it on</text>
        </g>
        <g>
          <rect x="350" y="24" width="130" height="56" rx="10" className={styles.box} />
          <text x="415" y="47" textAnchor="middle" className={styles.label}>Grandchild</text>
          <text x="415" y="63" textAnchor="middle" className={styles.sublabel}>just passes it on</text>
        </g>
        <g>
          <rect x="530" y="24" width="150" height="56" rx="10" className={styles.box} />
          <text x="605" y="47" textAnchor="middle" className={styles.label}>Consumer</text>
          <text x="605" y="63" textAnchor="middle" className={styles.sublabel}>finally needs it</text>
        </g>

        <line x1="130" y1="52" x2="176" y2="52" className={styles.arrow} markerEnd="url(#uc-arrow)" />
        <line x1="300" y1="52" x2="346" y2="52" className={styles.arrow} markerEnd="url(#uc-arrow)" />
        <line x1="480" y1="52" x2="526" y2="52" className={styles.arrow} markerEnd="url(#uc-arrow)" />
        <text x="155" y="42" textAnchor="middle" className={styles.sublabel}>value</text>
        <text x="325" y="42" textAnchor="middle" className={styles.sublabel}>value</text>
        <text x="505" y="42" textAnchor="middle" className={styles.sublabel}>value</text>

        <text x="10" y="140" className={styles.caption}>useContext</text>
        <g>
          <rect x="10" y="148" width="120" height="56" rx="10" className={styles.boxAccent} />
          <text x="70" y="171" textAnchor="middle" className={styles.label}>Provider</text>
          <text x="70" y="187" textAnchor="middle" className={styles.sublabel}>supplies value</text>
        </g>
        <g>
          <rect x="180" y="148" width="120" height="56" rx="10" className={styles.box} />
          <text x="240" y="171" textAnchor="middle" className={styles.label}>Child</text>
          <text x="240" y="187" textAnchor="middle" className={styles.sublabel}>untouched</text>
        </g>
        <g>
          <rect x="350" y="148" width="130" height="56" rx="10" className={styles.box} />
          <text x="415" y="171" textAnchor="middle" className={styles.label}>Grandchild</text>
          <text x="415" y="187" textAnchor="middle" className={styles.sublabel}>untouched</text>
        </g>
        <g>
          <rect x="530" y="148" width="150" height="56" rx="10" className={styles.boxAccent} />
          <text x="605" y="171" textAnchor="middle" className={styles.label}>Consumer</text>
          <text x="605" y="187" textAnchor="middle" className={styles.sublabel}>useContext(Ctx)</text>
        </g>

        <path d="M70 146 C 70 100, 605 100, 605 146" className={styles.arrowAccent} markerEnd="url(#uc-arrow-accent)" />
        <text x="337" y="104" textAnchor="middle" className={styles.caption}>reads directly — no props threaded through</text>
      </svg>
    </div>
  );
}
