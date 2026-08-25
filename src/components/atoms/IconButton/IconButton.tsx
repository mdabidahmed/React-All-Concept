import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  active?: boolean;
}

export function IconButton({ label, children, active, className, ...rest }: IconButtonProps) {
  const classes = [styles.iconButton, active ? styles.active : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button aria-label={label} title={label} className={classes} {...rest}>
      {children}
    </button>
  );
}
