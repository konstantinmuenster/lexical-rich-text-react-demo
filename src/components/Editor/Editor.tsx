import cx from "classnames";

import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { ActionsPlugin } from "./plugins/Actions";
import { FloatingMenuPlugin } from "./plugins/FloatingMenu";
import { LocalStoragePlugin } from "./plugins/LocalStorage";
import { AutoLinkPlugin } from "./plugins/AutoLink";
import { HistoryStateContext, useHistoryState } from "./context/HistoryState";

export const EDITOR_NAMESPACE = "lexical-editor";

const EDITOR_NODES = [
  AutoLinkNode,
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

type EditorProps = {
  className?: string;
};

export function Editor(props: EditorProps) {
  const content = localStorage.getItem(EDITOR_NAMESPACE);

  return (
    <div
      id="editor-wrapper"
      className={cx(
        props.className,
        "relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2"
      )}
    >
      <HistoryStateContext>
        <LexicalEditor
          config={{
            namespace: EDITOR_NAMESPACE,
            nodes: EDITOR_NODES,
            editorState: content,
            theme: {
              root: "p-4 border-slate-500 border-2 rounded h-auto min-h-[200px] focus:outline-none focus-visible:border-black",
              text: {
                bold: "font-semibold",
                underline: "underline decoration-wavy",
                italic: "italic",
                strikethrough: "line-through",
                underlineStrikethrough: "underlined-line-through",
              },
            },
            onError: (error) => {
              console.log(error);
            },
          }}
        />
      </HistoryStateContext>
    </div>
  );
}

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export function LexicalEditor(props: LexicalEditorProps) {
  const { historyState } = useHistoryState();

  return (
    <LexicalComposer initialConfig={props.config}>
      {/* Official Plugins */}
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <ListPlugin />
      {/* Custom Plugins */}
      <ActionsPlugin />
      <AutoLinkPlugin />
      <FloatingMenuPlugin />
      <LocalStoragePlugin />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  return (
    <div className="absolute top-[1.125rem] left-[1.125rem] opacity-50">
      Start writing...
    </div>
  );
};
