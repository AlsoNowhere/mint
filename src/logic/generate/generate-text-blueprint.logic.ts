import { TextBlueprint } from "../../models/blueprint/TextBlueprint.model";
import { MintText } from "../../models/mint-nodes/MintText.model";

import { TGenerate } from "../../types/TGenerate.type";

export const generateTextBlueprint: TGenerate = ({
  node,
  scope,
  parentBlueprint,
  _rootScope,
}) => {
  // ** This Function can only be accessed by a MintText so tell TS that here.
  const mintText = node.mintNode as MintText;

  // ** Create the TextNode in JS.
  const textNode = document.createTextNode("");

  const { textValue } = mintText;

  return new TextBlueprint({
    mintNode: mintText,
    element: textNode,
    textValue,
    scope,
    parentBlueprint,
    _rootScope,
  });
};
