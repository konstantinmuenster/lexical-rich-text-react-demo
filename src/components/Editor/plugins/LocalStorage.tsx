import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useDebounce } from "../hooks/useDebounce";

export function LocalStoragePlugin() {
  const [editor] = useLexicalComposerContext();

  const content = localStorage.getItem(editor._config.namespace);
  const debouncedContent = useDebounce(content, 500);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Don't update if nothing changed
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

        const serializedState = JSON.stringify(editorState);
        localStorage.setItem(editor._config.namespace, serializedState);
      }
    );
  }, [debouncedContent, editor]);

  return null;
}
