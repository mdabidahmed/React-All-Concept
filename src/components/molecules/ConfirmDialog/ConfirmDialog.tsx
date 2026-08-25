import { useEffect, useRef } from "react";
import { Button } from "../../atoms/Button/Button";
import type { ConfirmOptions } from "../../../context/ConfirmContext";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ options, onConfirm, onCancel }: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.icon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <h2 id="confirm-dialog-title" className={styles.title}>
          {options.title}
        </h2>
        <p id="confirm-dialog-message" className={styles.message}>
          {options.message}
        </p>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onCancel}>
            {options.cancelLabel ?? "Cancel"}
          </Button>
          <Button variant="primary" onClick={onConfirm} ref={confirmRef}>
            {options.confirmLabel ?? "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
