import { useContext } from "react";
import { ConfirmContext } from "../context/ConfirmContext";

/** Async, app-styled replacement for `window.confirm` — see ConfirmProvider. */
export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within a ConfirmProvider");
  return ctx.confirm;
}
