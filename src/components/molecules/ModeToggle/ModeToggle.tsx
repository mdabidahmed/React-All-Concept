import { ToggleSwitch } from "../../atoms/ToggleSwitch/ToggleSwitch";
import type { ExplanationMode } from "../../../types";

interface ModeToggleProps {
  mode: ExplanationMode;
  onChange: (mode: ExplanationMode) => void;
}

/** Switches a topic's explanation between "short" and "long". */
export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <ToggleSwitch
      aria-label="Explanation length"
      leftLabel="Short"
      rightLabel="Long"
      checked={mode === "long"}
      onChange={(isLong) => onChange(isLong ? "long" : "short")}
    />
  );
}
