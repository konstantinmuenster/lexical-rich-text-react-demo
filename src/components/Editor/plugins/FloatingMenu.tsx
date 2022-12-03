import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { $getSelection, FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { computePosition } from "@floating-ui/dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { IconButton } from "../../IconButton";

import { $isRangeSelected } from "../utils/$isRangeSelected";
import { useUserInteractions } from "../hooks/useUserInteractions";

type FloatingMenuPosition = { x: number; y: number } | undefined;

type FloatingMenuProps = {
  editor: LexicalEditor;
  shouldShow: boolean;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

function FloatingMenu({ shouldShow, ...props }: FloatingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined);

  useEffect(() => {
    const nativeSelection = window.getSelection();
    const isActiveNativeSelection =
      nativeSelection && nativeSelection?.rangeCount !== 0;

    if (!shouldShow || !ref.current || !isActiveNativeSelection) {
      setPos(undefined);
      return;
    }

    const domRange = nativeSelection.getRangeAt(0);

    computePosition(domRange, ref.current, { placement: "top" })
      .then((pos) => {
        setPos({ x: pos.x, y: pos.y - 10 });
      })
      .catch(() => {
        setPos(undefined);
      });
  }, [shouldShow]);

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      className={`absolute flex items-center justify-between bg-slate-100 border-[1px] border-slate-300 rounded-md p-1 gap-1 ${
        pos?.x && pos.y ? "opacity-1 visible" : "opacity-0 invisible"
      }`}
    >
      <IconButton
        icon="bold"
        aria-label="Format text as bold"
        active={props.isBold}
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      />
      <IconButton
        icon="italic"
        aria-label="Format text as italics"
        active={props.isItalic}
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      />
      <IconButton
        icon="underline"
        aria-label="Format text to underlined"
        active={props.isUnderline}
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      />
      <IconButton
        icon="strike"
        aria-label="Format text with a strikethrough"
        active={props.isStrikethrough}
        onClick={() => {
          props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      />
    </div>
  );
}

const ANCHOR_ELEMENT = document.body;

export function FloatingMenuPlugin() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const { isPointerDown, isKeyDown } = useUserInteractions();
  const [editor] = useLexicalComposerContext();

  const updateFloatingMenu = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing() || isPointerDown || isKeyDown) return;

      if (editor.getRootElement() !== document.activeElement) {
        setShouldShow(false);
        return;
      }

      const selection = $getSelection();

      if ($isRangeSelected(selection)) {
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));
        setIsStrikethrough(selection.hasFormat("strikethrough"));
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    });
  }, [editor, isPointerDown, isKeyDown]);

  // Rerender the floating menu automatically on every state update.
  // Needed to show correct state for active formatting state.
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateFloatingMenu();
    });
  }, [editor, updateFloatingMenu]);

  // Rerender the floating menu on relevant user interactions.
  // Needed to show/hide floating menu on pointer up / key up.
  useEffect(() => {
    updateFloatingMenu();
  }, [isPointerDown, isKeyDown, updateFloatingMenu]);

  return createPortal(
    <FloatingMenu
      editor={editor}
      shouldShow={shouldShow}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isUnderline={isUnderline}
    />,
    ANCHOR_ELEMENT
  );
}
