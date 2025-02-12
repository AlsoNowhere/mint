import { quickElement } from "./common/quick-element";

import { IAttributes } from "../interfaces/IAttributes.interface";

import { TRawContent } from "../types/TRawContent.type";

export const div = (
  attributesOrContent?: null | IAttributes | TRawContent,
  _content?: TRawContent
) => {
  return quickElement("div", attributesOrContent, _content);
};
