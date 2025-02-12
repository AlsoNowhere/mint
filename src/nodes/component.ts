import { createMintText } from "../logic/common/create-mint-text.logic";

import { MintComponent } from "../models/mint-nodes/MintComponent.model";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";
import { IAttributes } from "../interfaces/IAttributes.interface";

import { MINT_ERROR } from "../data/constants.data";

import { TRawContent } from "../types/TRawContent.type";

export const component = (
  element: string,
  scope: null | IConstructorScope = null,
  attributes: null | IAttributes = null,
  initialContent: null | TRawContent = null
) => {
  // <@ REMOVE FOR PRODUCTION
  if (element === "<>" && typeof initialContent === "string") {
    throw new Error(
      `${MINT_ERROR} Cannot define content as 'string' when Component is a Fragment (<>).`
    );
  }
  // @>

  // <@ REMOVE FOR PRODUCTION
  if (!!attributes?.mIf) {
    throw new Error(
      `${MINT_ERROR} Cannot add mIf directly to Components attribute in Component definition.`
    );
  }
  // @>

  // <@ REMOVE FOR PRODUCTION
  if (!!attributes?.mFor) {
    throw new Error(
      `${MINT_ERROR} Cannot add mFor directly to Components attribute in Component definition.`
    );
  }
  // @>

  const content = createMintText(initialContent);

  return new MintComponent(element, attributes, content, scope);
};
