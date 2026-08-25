import { useCallback, useRef, useState, type ReactNode } from "react";
import { ToastViewport, type ToastItem, type ToastTone } from "../../molecules/Toast/Toast";
import { ToastContext } from "../../../context/ToastContext";

const DISMISS_AFTER_MS = 2600;
const LEAVE_ANIMATION_MS = 180;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = String(nextId.current++);
    setToasts((prev) => [...prev, { id, message, tone }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, LEAVE_ANIMATION_MS);
    }, DISMISS_AFTER_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}
