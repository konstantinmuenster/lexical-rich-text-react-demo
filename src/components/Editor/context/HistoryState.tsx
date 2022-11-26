import { createContext, ReactNode, useContext, useMemo } from "react";

import {
  createEmptyHistoryState,
  HistoryState,
} from "@lexical/react/LexicalHistoryPlugin";

type HistoryStateContext = {
  historyState?: HistoryState;
};

const Context = createContext<HistoryStateContext>({});

export const HistoryStateContext = ({ children }: { children: ReactNode }) => {
  const h = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={h}>{children}</Context.Provider>;
};

export const useHistoryState = (): HistoryStateContext => {
  return useContext(Context);
};
