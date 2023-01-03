import cx from "classnames";

import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { isValidUrl } from "./utils/url";
import { ActionsPlugin } from "./plugins/Actions";
import { AutoLinkPlugin } from "./plugins/AutoLink";
import { EditLinkPlugin } from "./plugins/EditLink";
import { FloatingMenuPlugin } from "./plugins/FloatingMenu";
import { LocalStoragePlugin } from "./plugins/LocalStorage";
import { OpenLinkPlugin } from "./plugins/OpenLink";
import {
  EditorHistoryStateContext,
  useEditorHistoryState,
} from "./context/EditorHistoryState";

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
      <EditorHistoryStateContext>
        <LexicalEditor
          config={{
            namespace: EDITOR_NAMESPACE,
            nodes: EDITOR_NODES,
            editorState: content,
            theme: {
              root: "p-4 border-slate-500 border-2 rounded h-auto min-h-[200px] focus:outline-none focus-visible:border-black",
              link: "cursor-pointer",
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
      </EditorHistoryStateContext>
    </div>
  );
}

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export function LexicalEditor(props: LexicalEditorProps) {
  const { historyState } = useEditorHistoryState();

  return (
    <LexicalComposer initialConfig={props.config}>
      {/* Official Plugins */}
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={false} />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <ListPlugin />
      <LinkPlugin validateUrl={isValidUrl} />
      {/* Custom Plugins */}
      <ActionsPlugin />
      <AutoLinkPlugin />
      <EditLinkPlugin />
      <FloatingMenuPlugin />
      <LocalStoragePlugin namespace={EDITOR_NAMESPACE} />
      <OpenLinkPlugin />
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
