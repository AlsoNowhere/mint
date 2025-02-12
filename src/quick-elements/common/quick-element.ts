import { node } from "../../nodes/node";

import { CreateNode } from "../../models/CreateNode.model";

import { IAttributes } from "../../interfaces/IAttributes.interface";

import { TRawContent } from "../../types/TRawContent.type";

export const quickElement = (
  name: string,
  attributesOrInitialContent?: null | IAttributes | TRawContent,
  initialContent?: null | TRawContent
) => {
  let attributes: null | IAttributes = null;
  let content: undefined | null | TRawContent;

  // ** If initialContent is defined then we used all arguments.
  if (initialContent !== undefined) {
    attributes = attributesOrInitialContent as IAttributes;
    content = initialContent;
  }
  // ** If the attributesOrInitialContent is not an Object (not an Array) then this must be attributes only.
  else if (
    typeof attributesOrInitialContent !== "string" &&
    !(attributesOrInitialContent instanceof Array) &&
    !(attributesOrInitialContent instanceof CreateNode)
  ) {
    attributes = attributesOrInitialContent as IAttributes;
  }
  // ** Otherwise we know that the second argument is the content and that
  // ** attributes should be null.
  else {
    attributes = null;
    content = attributesOrInitialContent as TRawContent;
  }

  return node(name, attributes, content);
};
