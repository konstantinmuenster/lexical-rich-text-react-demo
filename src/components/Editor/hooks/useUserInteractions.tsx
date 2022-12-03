import { useEffect, useState } from "react";

/**
 * Detect if the user currently presses a mouse button or key.
 */

export function useUserInteractions() {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);

  useEffect(() => {
    const handlePointerUp = () => {
      setIsPointerDown(false);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    const handlePointerDown = () => {
      setIsPointerDown(true);
      document.addEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = () => {
      setIsKeyDown(false);
      document.removeEventListener("keyup", handleKeyUp);
    };

    const handleKeyDown = () => {
      setIsKeyDown(true);
      document.addEventListener("keyup", handleKeyUp);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { isPointerDown, isKeyDown };
}
