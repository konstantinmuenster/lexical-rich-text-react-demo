import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  $isParagraphNode,
  CLEAR_EDITOR_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { Button } from "../../Button";
import { useHistoryState } from "../context/HistoryState";

export function ActionsPlugin() {
  const [editor] = useLexicalComposerContext();
  const { historyState } = useHistoryState();

  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  // Listen for state updates and update the isEditorEmpty state
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, tags }) => {
      editorState.read(() => {
        const root = $getRoot();
        const children = root.getChildren();

        if (children.length > 1) {
          setIsEditorEmpty(false);
          return;
        }

        if ($isParagraphNode(children[0])) {
          setIsEditorEmpty(children[0].getChildren().length === 0);
        } else {
          setIsEditorEmpty(false);
        }
      });
    });
  }, [editor]);

  return (
    <>
      <div className="flex gap-3 my-4">
        <Button
          disabled={isEditorEmpty}
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          }}
        >
          Clear
        </Button>
        <div className="flex gap-1">
          <Button
            disabled={historyState?.undoStack.length === 0}
            onClick={() => {
              editor.dispatchCommand(UNDO_COMMAND, undefined);
            }}
          >
            Undo
          </Button>
          <Button
            disabled={historyState?.redoStack.length === 0}
            onClick={() => {
              editor.dispatchCommand(REDO_COMMAND, undefined);
            }}
          >
            Redo
          </Button>
        </div>
      </div>
    </>
  );
}
