import type { ReactElement } from "react";
import styles from "./Toast.module.css";

export type ToastTone = "success" | "info" | "error";

export interface ToastItem {
  id: string;
  message: string;
  tone: ToastTone;
  leaving?: boolean;
}

const ICONS: Record<ToastTone, ReactElement> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-5M12 8h.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  ),
};

interface ToastViewportProps {
  toasts: ToastItem[];
}

export function ToastViewport({ toasts }: ToastViewportProps) {
  if (toasts.length === 0) return null;
  return (
    <div className={styles.viewport} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={[styles.toast, toast.leaving ? styles.leaving : ""].join(" ")}>
          <span className={[styles.icon, styles[toast.tone]].join(" ")} aria-hidden="true">
            {ICONS[toast.tone]}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
