import { $isRangeSelection, EditorState, RangeSelection } from "lexical";

/**
 * Check if there is a selection that spans across
 * content, i.e. is not empty
 */

export function $isRangeSelected(
  selection: EditorState["_selection"]
): selection is RangeSelection {
  return $isRangeSelection(selection) && !selection.anchor.is(selection.focus);
}
