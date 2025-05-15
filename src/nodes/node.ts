import { createMintText } from "../logic/common/create-mint-text.logic";

import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { MintContext } from "../models/mint-nodes/MintContext.model";
import { CreateNode } from "../models/CreateNode.model";

import { IProps } from "../interfaces/IProps.interface";

import { MINT_WARN } from "../data/constants.data";

import { TRawContent } from "../types/TRawContent.type";
// import { TNode } from "../types/TNode.type";

// type TNode =
//   | (<T extends Object>(
//       element: string,
//       props: null | (T & IProps),
//       initialContent: null | TRawContent
//     ) => CreateNode<T, MintElement>)
//   | (<T extends Object>(
//       element: MintComponent,
//       props: null | (T & IProps),
//       initialContent: null | TRawContent
//     ) => CreateNode<T, MintComponent>)
//   | (<T extends Object>(element: MintTemplate, props?: never, initialContent?: never) => CreateNode<T, MintTemplate>);

// ** Overload 1 (string -> Element)
export function node<T extends Object>(
  element: string,
  props?: null | (T & IProps),
  initialContent?: null | TRawContent
): CreateNode<T, MintElement>;

// ** Overload 2 (Component -> Component)
export function node<T extends Object>(
  element: MintComponent,
  props?: null | (T & IProps),
  initialContent?: null | TRawContent
): CreateNode<T, MintComponent>;

// ** Overload 3 (Template -> Template)
export function node<T extends Object>(element: MintTemplate): CreateNode<T, MintTemplate>;

// ** Overload 4 (Context -> Context)
export function node<T extends Object>(element: MintContext): CreateNode<T, MintContext>;

export function node<T extends Object>(
  element: string | MintComponent | MintTemplate | MintContext,
  props: null | (T & IProps) = null,
  initialContent: null | TRawContent = null
): CreateNode<T, MintElement | MintComponent | MintTemplate | MintContext> {
  // export const node = <T extends Object>(
  //   element: string | MintComponent | MintTemplate,
  //   props: null | (T & IProps) = null,
  //   initialContent: null | TRawContent = null
  // ): CreateNode<T, MintElement | MintComponent | MintTemplate> => {

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

  let mintNode: MintElement | MintComponent | MintTemplate | MintContext;
  const content = createMintText(initialContent);

  if (typeof element === "string") {
    mintNode = new MintElement(element, props, content);
  } else {
    mintNode = element;
    // (element as MintComponent)._children = content;
  }

  return new CreateNode(mintNode, props, content);
}
