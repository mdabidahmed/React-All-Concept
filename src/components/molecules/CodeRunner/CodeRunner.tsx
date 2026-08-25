import { useEffect, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";
import {
  createContext,
  useState as useStateHook,
  useEffect as useEffectHook,
  useContext as useContextHook,
  useReducer as useReducerHook,
  useMemo as useMemoHook,
  useCallback as useCallbackHook,
  useRef as useRefHook,
} from "react";
import * as ReactNamespace from "react";
import * as ReactDOMNamespace from "react-dom";
import { createPortal } from "react-dom";
import { Button } from "../../atoms/Button/Button";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { useToast } from "../../../hooks/useToast";
import styles from "./CodeRunner.module.css";

const liveScope = {
  React: ReactNamespace,
  ReactDOM: ReactDOMNamespace,
  createPortal,
  useState: useStateHook,
  useEffect: useEffectHook,
  useContext: useContextHook,
  useReducer: useReducerHook,
  useMemo: useMemoHook,
  useCallback: useCallbackHook,
  useRef: useRefHook,
  createContext,
};

interface CodeRunnerProps {
  code: string;
}

/**
 * Editable live code sandbox: an editable source panel plus a rendered
 * preview. "Run" remounts the preview (useful to restart timers/intervals);
 * "Reset" discards local edits and restores the example's original code.
 *
 * Render this with a `key` derived from the active example's id — that way
 * switching examples naturally remounts a fresh CodeRunner instead of
 * needing an effect to resync internal state with the `code` prop.
 */
export function CodeRunner({ code }: CodeRunnerProps) {
  const [source, setSource] = useState(code);
  const [previewKey, setPreviewKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const { showToast } = useToast();

  const isEdited = source !== code;

  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFullscreen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(source);
      showToast("Code copied to clipboard", "success");
    } catch {
      showToast("Couldn't copy — try selecting the code manually", "error");
    }
  }

  return (
    <>
      {fullscreen && <div className={styles.backdrop} onClick={() => setFullscreen(false)} />}
      <div className={[styles.container, fullscreen ? styles.fullscreen : ""].join(" ")}>
        <LiveProvider code={source} scope={liveScope} noInline enableTypeScript theme={themes.nightOwl}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.dot} aria-hidden="true" />
            </div>
            <div className={styles.toolbarActions}>
              {isEdited && <span className={styles.editedTag}>Edited</span>}
              <IconButton label="Copy code" onClick={handleCopy} className={styles.toolbarIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
              </IconButton>
              <IconButton
                label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                onClick={() => setFullscreen((f) => !f)}
                className={styles.toolbarIcon}
                active={fullscreen}
              >
                {fullscreen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3v4a2 2 0 0 1-2 2H3M21 8h-4a2 2 0 0 1-2-2V3M3 16h4a2 2 0 0 1 2 2v4M16 21v-4a2 2 0 0 1 2-2h4" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                )}
              </IconButton>
              <Button size="sm" variant="ghost" onClick={() => setSource(code)} disabled={!isEdited}>
                Reset
              </Button>
              <Button size="sm" variant="primary" onClick={() => setPreviewKey((k) => k + 1)}>
                ▶ Run
              </Button>
            </div>
          </div>

          <div className={styles.editorPane}>
            <LiveEditor onChange={setSource} className={styles.editor} />
          </div>

          <div className={styles.previewLabel}>Preview</div>
          <div className={styles.previewPane} key={previewKey}>
            <LivePreview />
            <LiveError className={styles.error} />
          </div>
        </LiveProvider>
      </div>
    </>
  );
}
