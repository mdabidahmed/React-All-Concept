import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

/**
 * State that is persisted to localStorage under `key` and kept in sync
 * across tabs/windows via the native `storage` event.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));

  const setPersisted = useCallback<SetValue<T>>(
    (next) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      setValue(readStorage(key, initialValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setPersisted];
}
