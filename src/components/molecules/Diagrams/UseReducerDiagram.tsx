import styles from "./Diagram.module.css";

export function UseReducerDiagram() {
  return (
    <div className={styles.wrap}>
      <span className={styles.eyebrow}>Visual overview</span>
      <svg
        className={styles.svg}
        viewBox="0 0 640 320"
        role="img"
        aria-label="Cycle diagram: an event handler calls dispatch with an action, the reducer function computes the next state from the current state and that action, the component re-renders with the new state, and the cycle repeats on the next dispatched action."
      >
        <defs>
          <marker id="ur-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
          </marker>
          <marker id="ur-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className={styles.arrowHeadAccent} />
          </marker>
        </defs>

        <g>
          <rect x="40" y="20" width="200" height="70" rx="10" className={styles.box} />
          <text x="140" y="50" textAnchor="middle" className={styles.label}>dispatch(action)</text>
          <text x="140" y="68" textAnchor="middle" className={styles.sublabel}>called from an event handler</text>
        </g>

        <g>
          <rect x="400" y="20" width="200" height="70" rx="10" className={styles.boxAccent} />
          <text x="500" y="50" textAnchor="middle" className={styles.label}>reducer(state, action)</text>
          <text x="500" y="68" textAnchor="middle" className={styles.sublabel}>pure function → next state</text>
        </g>

        <g>
          <rect x="400" y="220" width="200" height="70" rx="10" className={styles.box} />
          <text x="500" y="250" textAnchor="middle" className={styles.label}>New state</text>
          <text x="500" y="268" textAnchor="middle" className={styles.sublabel}>returned by the reducer</text>
        </g>

        <g>
          <rect x="40" y="220" width="200" height="70" rx="10" className={styles.box} />
          <text x="140" y="250" textAnchor="middle" className={styles.label}>Component re-renders</text>
          <text x="140" y="268" textAnchor="middle" className={styles.sublabel}>reads the updated state</text>
        </g>

        <line x1="240" y1="55" x2="396" y2="55" className={styles.arrow} markerEnd="url(#ur-arrow)" />
        <line x1="500" y1="94" x2="500" y2="216" className={styles.arrow} markerEnd="url(#ur-arrow)" />
        <line x1="400" y1="255" x2="244" y2="255" className={styles.arrow} markerEnd="url(#ur-arrow)" />
        <line x1="140" y1="216" x2="140" y2="94" className={styles.arrowAccent} markerEnd="url(#ur-arrow-accent)" />

        <text x="152" y="160" className={styles.caption}>next dispatch,</text>
        <text x="152" y="174" className={styles.caption}>on the next event</text>
      </svg>
    </div>
  );
}
