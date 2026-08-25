import styles from "./ToggleSwitch.module.css";

interface ToggleSwitchProps {
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  "aria-label"?: string;
}

/** A segmented two-option switch, e.g. Short / Long explanation mode. */
export function ToggleSwitch({
  leftLabel,
  rightLabel,
  checked,
  onChange,
  "aria-label": ariaLabel,
}: ToggleSwitchProps) {
  return (
    <div className={styles.track} role="tablist" aria-label={ariaLabel}>
      <button
        type="button"
        role="tab"
        aria-selected={!checked}
        className={[styles.option, !checked ? styles.selected : ""].join(" ")}
        onClick={() => onChange(false)}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={checked}
        className={[styles.option, checked ? styles.selected : ""].join(" ")}
        onClick={() => onChange(true)}
      >
        {rightLabel}
      </button>
    </div>
  );
}
