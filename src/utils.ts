import clsx, { ClassValue } from "clsx";
import { twMerge } from "tw-merge";
import { useArray, usePersist } from "react-hanger";
import { useState } from "react";

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const isValidImage = (i: string) =>
  i && i.trim().length > 0 && isValidUrl(i);

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function usePersistedArray<T>(key: string, init: T[]) {
  const ls = window.localStorage.getItem(`persist-cache-${key}`);
  init = ls ? JSON.parse(ls) : [];
  const arr = useArray<T>(init);
  usePersist(key, arr.value);
  return arr;
}

export function usePersistedString(key: string, init: string) {
  const ls = window.localStorage.getItem(`persist-cache-${key}`);
  init = ls ? JSON.parse(ls) : "";
  const state = useState(init);
  usePersist(key, state[0]);
  return state;
}
