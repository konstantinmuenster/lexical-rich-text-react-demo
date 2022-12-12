import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T> | null,
  cb: () => void
) {
  useEffect(() => {
    const element = ref?.current;

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
