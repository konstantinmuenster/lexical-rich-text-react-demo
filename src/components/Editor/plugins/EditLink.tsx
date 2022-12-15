import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
} from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { computePosition } from "@floating-ui/dom";

import { IconButton } from "../../IconButton";

import { useClickOutside } from "../hooks/useClickOutside";
import { $getSharedLinkTarget } from "../utils/$getSharedLinkTarget";

type EditLinkMenuPosition = { x: number; y: number } | undefined;

export const TOGGLE_EDIT_LINK_MENU: LexicalCommand<undefined> = createCommand();

export function EditLinkPlugin() {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [pos, setPos] = useState<EditLinkMenuPosition>(undefined);
  const [domRange, setDomRange] = useState<Range | undefined>(undefined);
  const [hasLink, setHasLink] = useState(false);

  const [editor] = useLexicalComposerContext();

  const resetState = useCallback(() => {
    setValue("");
    setError(false);
    setPos(undefined);
    setDomRange(undefined);
    editor.focus();
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_EDIT_LINK_MENU,
      () => {
        const nativeSel = window.getSelection();
        const isCollapsed =
          nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;

        if (!!pos?.x || !!pos?.y || !ref.current || !nativeSel || isCollapsed) {
          resetState();
          return false;
        }

        const domRange = nativeSel.getRangeAt(0);

        computePosition(domRange, ref.current, { placement: "bottom" })
          .then((pos) => {
            setPos({ x: pos.x, y: pos.y + 10 });
            setDomRange(domRange);
            editor.getEditorState().read(() => {
              const selection = $getSelection();
              const linkTarget = $getSharedLinkTarget(selection);
              setHasLink(!!linkTarget);
            });
          })
          .catch(() => {
            resetState();
          });

        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, pos, resetState]);

  useEffect(() => {
    if (pos?.x && pos?.y) {
      let initialUrl = "";

      editor.getEditorState().read(() => {
        const selection = $getSelection();
        initialUrl = $getSharedLinkTarget(selection) ?? "";
      });

      setValue(initialUrl);
      inputRef.current?.focus();
    }
  }, [pos, editor]);

  useClickOutside(ref, () => {
    resetState();
  });

  const handleSetLink = () => {
    if (!value) return;

    const isLinkSet = editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: value,
      target: "_blank",
    });

    if (isLinkSet) resetState();
    else setError(true);
  };

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    resetState();
  };

  return (
    <>
      <FakeSelection range={domRange} />
      <div
        ref={ref}
        style={{ top: pos?.y, left: pos?.x }}
        aria-hidden={!pos?.x || !pos?.y}
        className={`absolute flex items-center justify-between bg-slate-100 border-[1px] ${
          error ? "border-red-600" : "border-slate-300"
        } rounded-md p-1 gap-1 ${
          pos?.x && pos.y ? "opacity-1 visible" : "opacity-0 invisible"
        }`}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-2 py-1 text-xs bg-transparent border-none outline-none"
          placeholder="Enter URL"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSetLink();
              return;
            }

            if (e.key === "Escape") {
              e.preventDefault();
              resetState();
              return;
            }
          }}
        />
        {hasLink ? (
          <IconButton icon="trash" onClick={handleRemoveLink} />
        ) : null}
        <IconButton icon="check" disabled={!value} onClick={handleSetLink} />
      </div>
    </>
  );
}

/**
 * Renders a fake selection when the input element is focused.
 * This is to have some visual feedback to see where the link will be inserted.
 */

function FakeSelection({ range }: { range: Range | undefined }) {
  if (!range) return null;

  const domRect = range.getBoundingClientRect();
  return createPortal(
    <div
      className="absolute bg-slate-200 -z-[1]"
      style={{
        left: domRect.left,
        width: domRect.width,
        top: domRect.top - 2,
        height: domRect.height + 4,
      }}
    />,
    document.body
  );
}
