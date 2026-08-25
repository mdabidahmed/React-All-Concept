import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...rest }: TextAreaProps) {
  return <textarea className={[styles.textarea, className].filter(Boolean).join(" ")} {...rest} />;
}
