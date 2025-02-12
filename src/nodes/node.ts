import { createMintText } from "../logic/common/create-mint-text.logic";

import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { CreateNode } from "../models/CreateNode.model";

import { IProps } from "../interfaces/IProps.interface";

import { MINT_WARN } from "../data/constants.data";

import { TRawContent } from "../types/TRawContent.type";
import { TNode } from "../types/TNode.type";

export const node = <T>(
  element: string | MintComponent | MintTemplate,
  props: null | (T & IProps) = null,
  initialContent: null | TRawContent = null
): TNode<T> => {
  // <@ REMOVE FOR PRODUCTION
  if (element === "<>" && props !== null) {
    const acceptableProps = ["mIf", "mFor", "mKey"];
    const keys: Array<string> = [];
    for (let x of Object.keys(props)) {
      if (!acceptableProps.includes(x)) keys.push(x);
    }
    if (keys.length > 0) {
      console.warn(
        `${MINT_WARN} Defining a Fragment with attributes i.e node("<>", { ${keys.join(
          ", "
        )} }) means these attributes will be ignored on render.`
      );
    }
  }
  // @>

  let mintNode: MintElement | MintComponent | MintTemplate;
  const content = createMintText(initialContent);

  if (typeof element === "string") {
    mintNode = new MintElement(element, props, content);
  } else {
    mintNode = element;
  }

  return new CreateNode(mintNode, props, content);
};
