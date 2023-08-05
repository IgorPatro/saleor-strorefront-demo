import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T | undefined | string, (newValue: T | undefined) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    const item = window.localStorage.getItem(key);
    return item || initialValue;
  });

  const setValue = (newValue: any) => {
    setStoredValue(newValue);

    window.localStorage.setItem(key, newValue);
  };

  return [storedValue, setValue];
};
