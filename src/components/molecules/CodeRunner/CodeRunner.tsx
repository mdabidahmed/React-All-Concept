import { useState } from "react";
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
import { Button } from "../../atoms/Button/Button";
import styles from "./CodeRunner.module.css";

const liveScope = {
  React: ReactNamespace,
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

  const isEdited = source !== code;

  return (
    <LiveProvider code={source} scope={liveScope} noInline enableTypeScript theme={themes.nightOwl}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
        </div>
        <div className={styles.toolbarActions}>
          {isEdited && <span className={styles.editedTag}>Edited</span>}
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
  );
}
