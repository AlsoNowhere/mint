import { MintText } from "../../models/mint-nodes/MintText.model";
import { CreateNode } from "../../models/CreateNode.model";

import { INode } from "../../interfaces/INode.interface";

import { TRawContent } from "../../types/TRawContent.type";

// ** This function takes an Array of raw content that the user can more easily define
// ** and returns Mint consumable Nodes.
export const createMintText = (
  initialContent: null | TRawContent | INode | Array<TRawContent | INode>
): Array<INode> => {
  const content: Array<INode> = [];
  const targetContent: Array<TRawContent | INode> = [];

  if (initialContent === null) return content;

  if (!(initialContent instanceof Array)) {
    targetContent.push(initialContent);
  } else {
    targetContent.push(...initialContent);
  }

  for (let x of targetContent as Array<string | INode>) {
    // ** We only accept MintNodes and so here we check if the user has passed in string values.
    // ** Then we replace them with MintTextNodes.
    if (typeof x === "string") {
      content.push(new CreateNode(new MintText(x)));
    } else {
      content.push(x);
    }
  }

  return content;
};
