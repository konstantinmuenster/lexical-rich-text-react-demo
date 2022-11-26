import cx from "classnames";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { ActionsPlugin } from "./plugins/Actions";
import { HistoryStateContext, useHistoryState } from "./context/HistoryState";

type EditorProps = {
  className?: string;
};

export function Editor(props: EditorProps) {
  return (
    <div id="editor-wrapper" className={cx(props.className, "relative")}>
      <HistoryStateContext>
        <LexicalEditor
          config={{
            namespace: "lexical-editor",
            theme: {
              root: "p-4 border-slate-500 border-2 rounded h-auto min-h-[200px] focus:outline-none focus-visible:border-black",
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
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <ClearEditorPlugin />
      <ActionsPlugin />
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
