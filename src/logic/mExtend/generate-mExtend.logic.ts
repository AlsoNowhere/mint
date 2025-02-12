import { assignProps } from "../common/assign-props.logic";

import { TShouldExit } from "../../types/TShouldExit.type";
import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";

export const generateMExtend: TonGenerate<{ extension: string | Object }> = ({
  extension,
  orderedProps,
  props,
  parentScope,
  scope,
}) => {
  // ** Here we use the "mExtend" tool to extract an Object from the scope and extend the
  // ** attributes used in the Render of that Element.
  const _extension: Object =
    typeof extension === "string" ? parentScope[extension] : extension;

  //<@ REMOVE FOR PRODUCTION
  if (!(_extension instanceof Object)) {
    throw new Error(
      "Render -- Element -- mExtend -- Something other than an Object was set on mExtend."
    );
  }
  //@>

  // ** Set the values here.
  for (let [key, value] of Object.entries(_extension)) {
    //<@ REMOVE FOR PRODUCTION
    if (key === "mExtend") {
      throw new Error(
        "Render -- Element -- mExtend -- Property of mExtend found on extension object. This will cause a cyclicular error."
      );
    }
    //@>

    orderedProps.push(key);
    props[key] = value;
  }

  assignProps(scope, Object.keys(_extension), _extension, parentScope);

  return {
    condition: false,
    value: undefined,
  } as TShouldExit;
};
