import { createContext } from "react";
import type { ToastTone } from "../components/molecules/Toast/Toast";

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
