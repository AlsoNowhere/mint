import { createMintText } from "../../logic/common/create-mint-text.logic";
import { generateMContext } from "../../logic/mContext/generate-m-context.logic";
import { renderMContext } from "../../logic/mContext/render-m-context.logic";

import { MintNode } from "./MintNode.model";

import { INode } from "../../interfaces/INode.interface";

import { TRawContent } from "../../types/TRawContent.type";

export class MintContext extends MintNode {
  contexts: Record<string, string | Object>;
  collection: Array<INode>;

  constructor(contexts: Record<string, string | Object>, initialContent: TRawContent) {
    super(null, generateMContext, renderMContext);
    this.contexts = contexts;
    const collection = createMintText(initialContent);
    this.collection = collection;
  }

  addChildren() {}
  addProperties() {}
}
