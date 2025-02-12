import { quickElement } from "./common/quick-element";

import { IAttributes } from "../interfaces/IAttributes.interface";

import { TRawContent } from "../types/TRawContent.type";

export const span = (
  attributesOrContent?: null | IAttributes | TRawContent,
  _content?: TRawContent
) => {
  return quickElement("span", attributesOrContent, _content);
};
