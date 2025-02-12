import { CreateNode } from "../models/CreateNode.model";

import { IMainScope } from "../interfaces/IMainScope.interface";

import { MINT_ERROR } from "../data/constants.data";

import { TRawContent } from "../types/TRawContent.type";
import { TElement } from "../types/TElement.type";

export const handleAppErrors = <T>(
  rootElement: TElement,
  baseRootScope: (IMainScope & T) | null,
  initialContent: TRawContent
) => {
  // ** CATCH the user passing in non HTMLElement for rootElement.
  if (!(rootElement instanceof HTMLElement))
    throw "app -- rootElement -- You must pass a HTMLElement for the rootElement.";

  // ** CATCH the user passing in null for rootScope.
  if (baseRootScope === null)
    throw "app -- rootScope -- Cannot pass null as root scope. Root scope is defined against generic T as can't autofill from null.";

  // ** CATCH the user not passing in Object for rootScope.
  if (typeof baseRootScope !== "object")
    throw "app -- rootScope -- Value not Object.";

  // ** CATCH the user not passing either a string, MintElement or Array.
  if (
    typeof initialContent !== "string" &&
    !(initialContent instanceof Array) &&
    !(initialContent instanceof CreateNode)
  ) {
    throw "app -- content -- Must be string or Array.";
  }

  // ** CATCH the user passing "_children" keyword incorrectly.
  if (
    (initialContent instanceof Array && initialContent.includes("_children")) ||
    initialContent === "_children"
  ) {
    throw new Error(
      `${MINT_ERROR} Can only pass "_children" as child of Component.`
    );
  }
};
